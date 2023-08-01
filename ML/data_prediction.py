from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import pickle
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
from datetime import date


app = Flask(__name__)
CORS(app)

data = pd.read_csv('./data/2020-2021month.csv')

prediction_dates = []
today = date.today()
start_date = today


@app.route('/passengerCount', methods=['GET'])
def getPassengerCount():
    location_id = int(request.args.get('location_id'))
    month_count = int(request.args.get('month_count'))
    # Get the drop off predictions
    predictions_DO = getDropOffPassengerPredictions(location_id, month_count)

    # get pickup passenger count
    predictions_PU = getPickupPassengerCount(location_id, month_count)

    with open('./models/models_Passenger.pkl', 'rb') as f:
        models_dict = pickle.load(f)

    # Get the model for the selected LocationID from the models_dict
    model_for_location = models_dict[location_id]

    # Prepare the exogenous features for prediction (future values of DropOff_count and PickUp_count)
    future_features = pd.DataFrame({'DropOff_count': predictions_DO,  # Replace with the desired future values
                                    'PickUp_count': predictions_PU})  # Replace with the desired future values

    # Make predictions for the future years using the ARIMA model
    predictions = model_for_location.predict(start=len(future_features),
                                             end=len(future_features) + len(prediction_dates) - 1,
                                             exog=future_features)

    result = []
    for i, prediction in enumerate(predictions.tolist()):
        result.append({'location_id': location_id,
                  'prediction': prediction,
                  'prediction_period': prediction_dates[i]})

    return result

@app.route('/realestate/priceprediction')
def realEstatePredictions():
    location_id = int(request.args.get('location_id'))
    num_years = int(request.args.get('num_years'))
    with open('./models/models_RealEstate.pkl', 'rb') as f:
        models_dict = pickle.load(f)
    year = list(range(today.year, today.year+num_years))
    # Get the model for the specific LocationID
    model_for_location = models_dict[location_id]

    # Define the future years for which you want to make predictions
    future_years = np.array(year).reshape(-1, 1)

    # Make predictions for the future years
    predictions = model_for_location.predict(future_years)
    print(predictions)

    # Get the most recent 'FULLVAL' value for the given LocationID
    most_recent_fullval = model_for_location.predict(future_years[0].reshape(-1, 1))

    # Calculate the growth rate as a percentage
    growth_rate = ((predictions - most_recent_fullval) / most_recent_fullval) * 100

    result = []
    # Print the predictions and growth rate
    for i, year in enumerate(future_years.flatten().tolist()):
        result.append({'location_id': location_id, 'year': year, 'predicted_val': predictions[i],
                'growth_rate': growth_rate[i]})
    return result


def getDropOffPassengerPredictions(location_id, num_months):
    with open('./models/model_DO.pkl', 'rb') as f:
        models = pickle.load(f)

    # Get the model corresponding to the LocationID
    model = models[location_id]

    # Get the historical data needed for the model, either training data or other historical data
    # In this example, we use the training data as historical data
    location_data = data[data['LocationID'] == location_id]
    historical_data = location_data['DropOff_count'].values

    # Calculate the end of the forecast based on the start of the forecast and the number of months in the forecast
    end_date = start_date + pd.DateOffset(months=num_months)

    # Use the model to make predictions and get future data
    predictions_DO = model.predict(start=len(historical_data), end=len(historical_data) + num_months - 1)

    # Print prediction results
    print(f'Predictions for LocationID {location_id} from {start_date} to {end_date}:')
    for i, prediction in enumerate(predictions_DO):
        prediction_date = start_date + pd.DateOffset(months=i)
        print(f'{prediction_date}: {prediction}')

    return predictions_DO

def getPickupPassengerCount(location_id, num_months):
    with open('./models/model_PU.pkl', 'rb') as f:
        models = pickle.load(f)

    # Get the model corresponding to the LocationID
    model = models[location_id]

    # Get the historical data needed for the model, either training data or other historical data
    # In this example, we use the training data as historical data
    location_data = data[data['LocationID'] == location_id]
    historical_data = location_data['PickUp_count'].values

    # Calculate the end of the forecast based on the start of the forecast and the number of months in the forecast
    end_date = start_date + pd.DateOffset(months=num_months)

    # Use the model to make predictions and get future data
    predictions_PU = model.predict(start=len(historical_data), end=len(historical_data) + num_months - 1)

    # Print prediction results
    print(f'Predictions for LocationID {location_id} from {start_date} to {end_date}:')
    prediction_dates.clear()
    for i, prediction in enumerate(predictions_PU):
        prediction_date = start_date + pd.DateOffset(months=i)
        prediction_dates.append(prediction_date)
        print(f'{prediction_date}: {prediction}')

    return predictions_PU


if __name__ == "__main__":
    app.run(host='localhost', port=5000)