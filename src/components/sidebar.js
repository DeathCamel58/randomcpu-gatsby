import React from "react"
import {Link, useStaticQuery, graphql, StaticQuery} from "gatsby"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card";
import {GatsbyImage} from "gatsby-plugin-image";
import parse from "html-react-parser";
import Row from "react-bootstrap/Row";

const Sidebar = ({ isHomePage, children }) => {
    const SiteTitleAndPagesAndTags = useStaticQuery(graphql`
        query SiteTitleAndPagesAndTags {
            wp {
                allSettings {
                    generalSettingsTitle
                    generalSettingsDescription
                }
            }
            allWpPage(
                sort: {fields: [date], order: DESC}
            ) {
                nodes {
                    uri
                    date(formatString: "MMMM DD, YYYY")
                    author {
                        node {
                            name
                        }
                    }
                    title
                }
            }
            allWpTag(
                sort: {fields: count, order: DESC},
                limit: 5,
                filter: {count: {gt: 2}}
            ) {
                edges {
                    node {
                        name
                        uri
                    }
                }
            }
        }
    `)

    const pages = SiteTitleAndPagesAndTags.allWpPage.nodes;
    const tags = SiteTitleAndPagesAndTags.allWpTag.edges;

    return (
        <Nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse show">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item" key="1">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    {pages.map(page => {
                        const title = page.title

                        return (
                            <li className="nav-item" key={page.uri}>
                                <Link to={page.uri} className="nav-link">
                                    {parse(title)}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Popular Tags</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    {tags.map(tag => {
                        const title = tag.node.name
                        const uri = tag.node.uri

                        return (
                            <li className="nav-item" key={uri}>
                                <Link to={uri} className="nav-link">
                                    {parse(title)}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Nav>
    )
}

export default Sidebar
