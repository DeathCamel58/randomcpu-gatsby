import React from "react"
import {Link, useStaticQuery, graphql, StaticQuery} from "gatsby"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Col from "react-bootstrap/Col"

const Header = ({ isHomePage, children }) => {
    return (
        <Navbar className="navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
                Company Name
            </Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                   aria-label="Search" />
        </Navbar>
    )
}

export default Header
