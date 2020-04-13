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
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        });

    }

    //method for get request
    getPortfolioItems() {
        axios
            .get('https://jtlittle.devcamp.space/portfolio/portfolio_items')
            .then(response => {
                // handle success
                this.setState({
                    data: response.data.portfolio_items
                })
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
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button className="btn" onClick={() => this.handleFilter('Home-Fragrance')}>Home-Fragrance</button>
                <button className="btn" onClick={() => this.handleFilter('Lodge')}>Lodge</button>
                {this.portfolioItems()}
            </div>

        );
    }
}