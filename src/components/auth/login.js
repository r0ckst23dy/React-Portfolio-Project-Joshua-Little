import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Login extends Component {
    constructor(props) {
        super(props);

        //initial state with two keys and two empty string values 
        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        //bind function for keyword this for handleChange and handleSubmit event handler
        //bind() changes the scope of this for the event handler               
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    //event handler that targets and changes the value of the key value pairs listed in intial state
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    //event handler that submits the new values from the intial key value pair
    handleSubmit(event) {
        axios
            .post("https://api.devcamp.space/sessions",
                {
                    client: {
                        email: this.state.email,
                        password: this.state.password
                    }
                },

                { withCredentials: true }

            )

            .then(response => {
                if (response.data.status === "created") {
                    this.props.handleSuccessfulAuth();
                } else {
                    this.setState({
                        errorText: "Wrong email or password"
                    });
                    this.props.handleUnuccessfulAuth();
                }
            })

            .catch(error => {
                this.setState({
                    errorText: "An error occurred",
                });
                this.props.handleUnsuccessfulAuth();
            });



        event.preventDefault();
    }

    //render function is necessary for every class function
    //within the render function there is tametershe return function  which will return one JSX element aka <div>
    //the input element has parameters that the event handler user for changing
    render() {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASH</h1>

                <div>{this.state.errorText}</div>

                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope"/>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                            <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    
                        <button className="btn" type="submit">Login</button>
                    

                </form>

            </div>
        );
    }
}