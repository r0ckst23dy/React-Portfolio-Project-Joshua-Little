import React, { Component } from "react";

//library for connecting with API
import axios from "axios";

//import from internal file
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        //must call super() for a constructor class 
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []
        };

        //must call bind method in constructor 
        this.handleFilter = this.handleFilter.bind(this);
    }

    //method for filtering api data 
    handleFilter(filter) {
        if ( filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        }else
        {
            this.getPortfolioItems(filter);
        }
    }

    //method for get request
    getPortfolioItems(filter = null) {
        axios
            .get('https://jtlittle.devcamp.space/portfolio/portfolio_items')
            .then(response => {
                if (filter) {
                    this.setState({
                        data: response.data.portfolio_items.filter(item => {
                            return item.category === filter;
                        })
                    });
                } else {
                    this.setState({
                        data: response.data.portfolio_items
                    });
                }
                // handle success

            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    portfolioItems() {

        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item} />;
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                    <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                    <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>                     
                    <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>All</button>                     
                </div>
                <div className="portfolio-items-wrapper">
                        {this.portfolioItems()}
                </div>
                
            </div>

        );
    }
}