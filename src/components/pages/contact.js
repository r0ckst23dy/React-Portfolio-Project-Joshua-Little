import React from "react";
import contactPic from "../../../static/assets/images/contact/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
    return (
        <div className="content-page-wrapper">
            <div className="left-column"
                style={{
                    background: "url(" + contactPic + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div className="right-column">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="phone" />
                        </div>
                        <div className="text">434-818-2412</div>
                    </div>
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="envelope" />
                        </div>
                        <div className="text">jtlittle90@gmail.com</div>
                    </div>
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="map-marked-alt" />
                        </div>
                        <div className="text">Lynchburg,VA</div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Contact;

