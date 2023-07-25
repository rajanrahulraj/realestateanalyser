// referencing from https://v5.bootcss.com/docs/5.3/components/navbar/#nav
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" >

      <div className="container-fluid">
        <i className="bi bi-buildings" style={{ color: 'goldenrod' }}></i>
        <span className="navbar-brand mb-0 h1">Real Estate Analyzer</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/taxi">Taxi</a>
            <a className="nav-link" href="/auth">Account</a>
            <a className="nav-link" href="/">Real Estate</a>
            <a className="nav-link disabled"></a>

          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navigation
