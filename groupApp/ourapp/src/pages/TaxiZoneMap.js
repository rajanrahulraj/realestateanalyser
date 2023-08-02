// referencing from https://www.youtube.com/watch?v=D4jq5Bd9bTA
// referencing from https://codewithwolf.com/how-to-change-marker-color-react-leaflet

import React, { useState, useEffect } from 'react'
import TaxiZones from '../data/ManhattanTaxiData.json'
import Mymap from '../Mymap'
// import 'leaflet/dist/leaflet.css'
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from 'react-leaflet'
import { parse } from 'papaparse'
import schooldata from '../data/schooldata.json'
import hospitaldata from '../data/hospitaldata.json'
import taxidata from '../data/2021taxi.json'
import T from '../components/HistoryTaxi'
import HistoryRealEstate from '../components/HistoryRealEstate'

import * as L from "leaflet"
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend)

// Helper function to get the color based on the value and gradient
const getColor = (value, gradient) => {
  const length = gradient.length
  const index = Math.floor(value * length)
  return gradient[Math.min(index, length - 1)]
}

const DateFilter = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <label htmlFor="datePicker">Select Date: </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  )
}

const TaxiZoneMap = () => {

  const [selectedDate, setSelectedDate] = useState("2021-01-01")
  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  console.log(selectedDate)
  const onEachZone = (zone, layer) => {

    const zoneName = zone.properties.zone
    const IDName = zone.properties.location_id
    // Bind a tooltip to the zone showing the IDName
    layer.bindTooltip("Location ID: " + IDName)
    layer.bindPopup(zoneName)
    // chart test
    const updateHeatmapStyle = (value) => {
      const maxPU = 1000 // Adjust this value according to your data
      const heatValue = value / maxPU

      // Define a gradient for the heatmap colors
      const gradient = ["green", "yellow", "red"]

      // Set the style of the zone layer based on the heatValue
      layer.setStyle({
        fillColor: getColor(heatValue, gradient),
        fillOpacity: 0.6,
        color: "black",
        weight: 2,
      })
    }


    const matchedObject = taxidata.find((item) => item.LocationID === IDName && item.Date === selectedDate)
    // const data2018 = taxidata.filter((item) => item.Date === "2021-01-01")
    // console.log(data2018)
    // console.log(matchedObject)
    if (matchedObject) {
      const matchedProperty = matchedObject.PU_passenger
      layer.setPopupContent(zoneName)

      updateHeatmapStyle(matchedProperty)


    }
  }


  // Function to calculate the heatmap values based on the selected date
  // const calculateHeatmapValues = () => {
  //   const maxPU = 1000 // Adjust this value according to your data
  //   const heatmapValues = {}

  //   taxidata.forEach((item) => {
  //     if (item.Date === selectedDate) {
  //       const heatValue = item.PU_passenger / maxPU
  //       heatmapValues[item.LocationID] = heatValue
  //     }
  //   })

  //   return heatmapValues
  // }

  // // State for the heatmap values
  // const [heatmapValues, setHeatmapValues] = useState({})

  // // useEffect to update the heatmap values whenever the selected date changes
  // useEffect(() => {
  //   const newHeatmapValues = calculateHeatmapValues()
  //   setHeatmapValues(newHeatmapValues)
  // }, [selectedDate, taxidata])


  // Chart
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({})

  //test for taxi chart
  const startDate = 0
  const endDate = 200
  const newArray = []

  const pickUpNumber = taxidata.map((item) => item.PU_passenger)
  const IDNumber = taxidata.map((item) => item.LocationID)
  for (let i = startDate; i <= endDate; i++) {
    if (IDNumber[i] == 4) {
      newArray.push(pickUpNumber[i])
    }
  }

  // console.log(newArray)

  useEffect(() => {
    setChartData({
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "Number of pick up passengers",
          data: newArray,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
        },
      ],
    })
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Busyness",
        },
      },
    })
  }, [])


  const [schoolmarkerVisible, schoolsetMarkerVisible] = useState(false)

  const schooltoggleMarkerVisibility = () => {
    schoolsetMarkerVisible(!schoolmarkerVisible)
  }

  const [markerVisible, setMarkerVisible] = useState(false)

  const toggleMarkerVisibility = () => {
    setMarkerVisible(!markerVisible)
  }
  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  })

  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
  }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    })

  //  Use the state hook:
  const [icon, setIcon] = useState(greenIcon)



  return (
    <div className="TaxiZoneMap">
      <Mymap />
      <button type="button" className="btn btn-success" onClick={schooltoggleMarkerVisibility}>
        {schoolmarkerVisible ? 'Hide Schools' : 'Show Schools'}
      </button>
      <button type="button" className="btn btn-primary" onClick={toggleMarkerVisibility}>
        {markerVisible ? 'Hide Hospitals' : 'Show Hospitals'}
      </button>
      <div className="d-flex">
        <MapContainer style={{ border: '5px solid rgba(255,125,58,0.6)', height: "80vh", width: "50%" }} zoom={12} center={[40.79, -74]}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON data={TaxiZones.features}
            onEachFeature={onEachZone} />
          {schoolmarkerVisible && schooldata.map(item => (
            <Marker key={item.OBJECTID} position={[item.LATITUDE, item.LONGITUDE]} icon={icon}>
              <Popup>
                {item.NAME}</Popup>
            </Marker>
          ))}
          {markerVisible && hospitaldata.map(item => (
            <Marker key={item.OBJECTID} position={[item.LATITUDE, item.LONGITUDE]}>
              <Popup>
                {item.NAME}</Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="col">
          <div className="bar">


            {/* <div className="bar"><Bar options={chartOptions} data={chartData} /></div> */}
            <T />
            {/* <HistoryRealEstate /> */}

          </div>
        </div>




        {/* <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        /> */}
        {/* <DateFilter selectedDate={selectedDate} onDateChange={handleDateChange} /> */}
      </div>
    </div>
  )

}
export default TaxiZoneMap