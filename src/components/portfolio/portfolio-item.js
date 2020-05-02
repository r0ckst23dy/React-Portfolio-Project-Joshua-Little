import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItemClass: ""
        };
    }

    //method for onMouseEnter event handler
    handleMouseEnter() {
        //updates state when mouse moves over component 
        this.setState({ portfolioItemClass: "image-blur" });
    }

    //method for onMouseLeave event handler
    handleMouseLeave() {
        //updates state when mouse moves away from component
        this.setState({ portfolioItemClass: "" });

    }


    render() {

        const { id, logo_url, description, thumb_image_url } = this.props.item;
        return (
            <Link to={`/portfolio/${id}`} >
                <div className="portfolio-item-wrapper"
                    //listens for mouse event over component
                    //arrow function keeps the function from being called until even occurs
                    onMouseEnter={() => this.handleMouseEnter()}
                    //listens for mouse event leaving the component
                    onMouseLeave={() => this.handleMouseLeave()}

                >

                    <div
                        //curly brackets make the className an object and able to add image-blur class style
                        className={"portfolio-img-background " + this.state.portfolioItemClass}
                        style={{
                            backgroundImage: "url(" + thumb_image_url + ")"
                        }}
                    />

                    <div className="img-text-wrapper">
                        <div className="logo-wrapper">
                            <img src={logo_url} />
                        </div>
                        <div className="subtitle">{description}</div>
                    </div>
                </div>
            </Link>
        );
    }
}