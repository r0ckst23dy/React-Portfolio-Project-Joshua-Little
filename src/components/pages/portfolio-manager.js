import React, { Component } from 'react';
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from '../portfolio/portfolio-form';


export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: []
        }
        this.handleSuccessFormSubmission = this.handleSuccessFormSubmission.bind(this);
        this.handleFormSubimssionError = this.handleFormSubimssionError.bind(this);
    }

    handleSuccessFormSubmission(portfoliioItem) {
        // TODO
        // update the portfolioItems State
        // and add the portfolioItem to the list 

    }

    handleFormSubimssionError(error) {
        console.log('handleSubmissionFormError error', error);

    }

    getPortfolioItems() {
        axios
            .get('https://jtlittle.devcamp.space/portfolio/portfolio_items', { withCredentials: true })
            .then(response => {
                // handle success
                this.setState({
                    portfolioItems: [...response.data.portfolio_items]
                })
            })
            .catch(error => {
                // handle error
                console.log("woops, there is an error", error);
            });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleSuccessFormSubmission={this.handleSuccessFormSubmission}
                        handleFormSubimssionError={this.handleFormSubimssionError}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList data={this.state.portfolioItems} />
                </div>
            </div>
        );
    }
}