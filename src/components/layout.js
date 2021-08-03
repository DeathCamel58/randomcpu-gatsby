import React from "react"
import {Link, useStaticQuery, graphql} from "gatsby"
import parse from "html-react-parser"
import { Helmet } from "react-helmet"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Sidebar from "./sidebar";
import Header from "./header";

const Layout = ({isHomePage, children}) => {
    const {
        wp: {
            generalSettings: {title},
        },
    } = useStaticQuery(graphql`
        query LayoutQuery {
            wp {
                generalSettings {
                    title
                    description
                }
            }
        }
    `)

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="global-wrapper" data-is-root-path={isHomePage}>
                            <header className="global-header">
                                {isHomePage ? (
                                    <h1 className="main-heading">
                                        <Link to="/">{parse(title)}</Link>
                                    </h1>
                                ) : (
                                    <Link className="header-link-home" to="/">
                                        {title}
                                    </Link>
                                )}
                            </header>

                            <div>{children}</div>

                            <footer>
                                © {new Date().getFullYear()}, Built with
                                {` `}
                                <a href="https://www.gatsbyjs.com">Gatsby</a>
                                {` `}
                                And <a href="https://wordpress.org/">WordPress</a>
                            </footer>
                        </div>
                    </main>
                </Row>
                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                        crossOrigin="anonymous"
                    />
                </Helmet>
            </Container>
        </>
    )
}

export default Layout
