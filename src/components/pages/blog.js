import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import { FortAwesomeIcon, FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true
        }

        this.getBlogItems = this.getBlogItems.bind(this);
        this.activateInfiniteScroll();
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            console.log('window.innerHeight', window.innerHeight);
            console.log('document.documentElement.scrollTop', document.documentElement.scrollTop);
            console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);

            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                console.log('get more posts');

            }
        };
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        axios
            .get("https://jtlittle.devcamp.space/portfolio/portfolio_blogs",
                { withCredentials: true })
            .then(response => {
                this.setState({
                    blogItems: response.data.portfolio_blogs,
                    totalCount: response.data.meta.total_records,
                    isLoading: false
                });

            })
            .catch(error => {
                console.log('getBlogItems', error);

            })
    }

    componentDidMount() {
        this.getBlogItems();
    }
    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem} />
        });

        return (
            <div className="blog-container">

                <div className="content-container">
                    {blogRecords}
                </div>
                {this.state.isLoading ? (
                    <div className="content-loader">
                        < FontAwesomeIcon icon="spinner" spin />
                    </div>) : null
                }
            </div>
        );
    }


}
export default Blog;