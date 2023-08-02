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
import realdata from '../data/pricehistory.json'
import { Line } from 'react-chartjs-2'

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
// import { Chart, LineController, LineElement, PointElement } from 'chart.js'
// Chart.register(LineController, LineElement, PointElement, LinearScale, Title)
// Chart.register(PointElement)

// Helper function to get the color based on the value and gradient
const getColor = (value, gradient) => {
  const length = gradient.length
  const index = Math.floor(value * length)
  return gradient[Math.min(index, length - 1)]
}


const Easy = () => {
  // Calculate the trendline using linear regression
  const calculateTrendline = (data) => {
    const n = data.length
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumX2 = 0

    for (let i = 0; i < n; i++) {
      sumX += i
      sumY += data[i]
      sumXY += i * data[i]
      sumX2 += i * i
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const trendline = []
    for (let i = 0; i < n; i++) {
      trendline.push(slope * i + intercept)
    }

    return trendline
  }
  const [dropoffLocationID, setDropoffLocationID] = useState(4)
  const [data, setData] = useState([])
  // Create an array of options for the Location ID dropdown
  const locationIDOptions = []
  for (let i = 3; i <= 200; i++) {
    locationIDOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }


  useEffect(() => {
    fetchData()
  }, [dropoffLocationID])

  const fetchData = async () => {
    try {
      const url = `/app/realestate/priceByLocation?locationid=${dropoffLocationID}`
      const response = await fetch(url)
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleFilterChange = (filterName, value) => {
    if (filterName === 'dropoffLocationID') {
      setDropoffLocationID(value)
    }
  }


  // Process data to prepare it for the bar chart
  const prepareChartData = () => {
    const labels = data.map((item) => item.year)
    const barData = data.map((item) => item.price)
    // Sort the data based on the year labels in ascending order
    const sortedData = labels.map((label, index) => ({
      label: label,
      price: barData[index],
    })).sort((a, b) => a.label - b.label)

    // Extract the sorted labels and barData after sorting
    const sortedLabels = sortedData.map((item) => item.label)
    const sortedLineData = sortedData.map((item) => item.price)
    // Calculate the trendline using linear regression
    const trendline = calculateTrendline(sortedLineData)
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: 'Price',
          data: sortedLineData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          pointRadius: 0, // Hide data points
        },
        {
          label: 'Trendline',
          data: trendline,
          borderColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 0, // Hide data points
          borderDash: [5, 5], // Add dashed line for trendline
        },
      ],
    }
  }
  const [realestatedata, setRealestateData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData2 = async () => {
    try {
      const url = `/app/realestate/priceHistory`
      const response = await fetch(url)
      const jsonData = await response.json()
      setRealestateData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }


  // Filter the data for the year 2018
  const data2018 = realdata.filter((item) => item.year === 2018)
  console.log(data2018)

  const onEachZone = (zone, layer) => {

    const zoneName = zone.properties.zone
    const IDName = zone.properties.location_id

    layer.bindPopup(zoneName + ", Location ID: " + IDName)
    // chart test
    const updateHeatmapStyle = (value) => {
      const maxPU = 10000000 // Adjust this value according to your data
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

    // Convert locationid to a string before the comparison
    const stringLocationID = data2018.map((item) => item.locationid.toString())

    // Find the matched object with the IDName
    const matchedObject = data2018.find((item, index) => stringLocationID[index] === IDName)

    console.log(matchedObject)


    if (matchedObject) {
      const matchedProperty = matchedObject.price

      layer.setPopupContent(zoneName + ", Location ID: " + IDName + ", Price: " + matchedProperty)

      updateHeatmapStyle(matchedProperty)


    }
    // Set the selected location ID when a zone is clicked
    handleFilterChange('dropoffLocationID', IDName)
  }




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
            <label>
              Location ID:
              <select
                value={dropoffLocationID}
                onChange={(e) => handleFilterChange('dropoffLocationID', e.target.value)}
              >
                {locationIDOptions}
              </select>
            </label>

          </div>
        </div>


        {/* <DateFilter selectedDate={selectedDate} onDateChange={handleDateChange} /> */}
      </div>
    </div>
  )

}
export default Easy