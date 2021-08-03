import React from "react"
import {Link, graphql} from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Card from "react-bootstrap/Card"
import { GatsbyImage } from "gatsby-plugin-image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath},
                   }) => {
    const posts = data.allWpPost.nodes

    if (!posts.length) {
        return (
            <Layout isHomePage>
                <Seo title="All posts"/>
                <p>
                    No blog posts found. Add posts to your WordPress site and they'll
                    appear here!
                </p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage>
            <Seo title="All posts"/>

            <Row data-masonry='{"percentPosition": true }'>
                {posts.map(post => {
                    const title = post.title

                    return (
                        <Col sm={6}>
                            <Card key={post.url} className="article-card">
                                {/* if we have a featured image for this post let's display it */}
                                {post.featuredImage ?
                                    <Link to={post.uri}>
                                        <GatsbyImage
                                            image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                                            alt={post.featuredImage.node.alt ? post.featuredImage.node.alt : "Post Image"}
                                            className="card-img-top" />
                                    </Link>
                                    :null
                                }
                                <div className="card-body">
                                    <Link to={post.uri} className="no-underline-link">
                                        <h5 className="card-title">{parse(title)}</h5>
                                    </Link>
                                    {parse(post.excerpt)}
                                </div>
                                <div className="card-footer">
                                    <Row>
                                        <Col>{post.date}</Col>
                                        <Col className="pull-right">{post.author.node.name}</Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {previousPagePath && (
                <>
                    <Link to={previousPagePath}>Previous page</Link>
                    <br/>
                </>
            )}
            {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
        </Layout>
    );
}

export default BlogIndex

export const pageQuery = graphql`query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
  allWpPost(
    sort: {fields: [date], order: DESC}
    limit: $postsPerPage
    skip: $offset
  ) {
    nodes {
      excerpt
      uri
      date(formatString: "MMMM DD, YYYY")
        author {
            node {
                name
            }
        }
      title
      excerpt
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                  quality: 100
                  placeholder: BLURRED
                  layout: FULL_WIDTH
                  formats: [AUTO, WEBP, AVIF]
                  blurredOptions: {width: 100}
              )
            }
          }
        }
      }
    }
  }
}
`
