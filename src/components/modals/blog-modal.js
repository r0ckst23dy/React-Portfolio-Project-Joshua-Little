import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    //inline style are a best practice with third party modal library
    //it overrides any default code for style for modal
    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%",
        width: "800px",
      },
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0.75)",
      },
    };

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(
      this
    );
  }

  //blog record from blog form. passes record to blog
  handleSuccessfulFormSubmission(blog) {
    this.props.handleSuccessfulNewBlogSubmission(blog);
  }
  render() {
    return (
      <div>
        <ReactModal
          style={this.customStyles}
          onRequestClose={() => {
            this.props.handleModalClose();
          }}
          isOpen={this.props.modalIsOpen}
        >
          <BlogForm
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
          />
        </ReactModal>
      </div>
    );
  }
}
