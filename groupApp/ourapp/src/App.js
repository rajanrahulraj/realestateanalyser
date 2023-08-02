
import React, { useState, useEffect } from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
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
import TaxiZoneMap from './pages/TaxiZoneMap'


import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import Test from "./pages/Test"
import T from "./components/HistoryTaxi"
import Price from "./pages/Price"
import Easy from "./pages/Easy"




import Navigation from "./components/Navigation"
import Prebusy from './pages/Prebusy'
import Preprice from './pages/Preprice'


ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend)


function App () {

  return (


    <BrowserRouter>
      <Navigation />

      <Routes>

        <Route path="/" element={<Auth />} />
        <Route path="/taxi" element={<TaxiZoneMap />} />
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/T" element={<T />} />
        <Route path="/price" element={<Price />} />
        <Route path="/easy" element={<Easy />} />
        <Route path="/prebusy" element={<Prebusy />} />
        <Route path="/preprice" element={<Preprice />} />








      </Routes>
    </BrowserRouter>
    // </div >

  )
}


export default App;

