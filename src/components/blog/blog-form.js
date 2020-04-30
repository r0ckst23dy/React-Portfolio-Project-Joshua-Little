import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";
// TODO add handlesubmit helper git branch already created 
export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      blog_status: "",
      content: "",
      featured_image: "",
      apiUrl: "https://jtlittle.devcamp.space/portfolio/portfolio_blogs",
      apiAction: "post"
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.featuredImageRef = React.createRef();
  }


  deleteImage(imageType) {
    axios
      .delete(`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleFeaturedImageDelete();

      })
      .catch(error => {
        console.log('delete image error', error);

      });

  }

  // TODO use destructoring for this method
  componentWillMount() {
    const { id, title, blog_status, content } = this.props.blog;
    if (this.props.editMode) {
      this.setState({
        blog: this.props.blog,
        // id: this.props.blog.id,
        // title: this.props.blog.title,
        // blog_status: this.props.blog.blog_status,
        // content: this.props.blog.content,
        apiUrl: `https://api.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
        apiAction: "patch"
      });
    }
  }
  componentConfig() {
    return {
      iconFiletypes: [".jpeg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: file => this.setState({ featured_image: file })
    };
  }


  handleRichTextEditorChange(content) {
    this.setState({ content });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    if (this.state.featured_image) {
      formData.append("portfolio_blog[featured_image]", this.state.featured_image);

    }

    return formData;
  }

  //passes data up to parent component
  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true
    })
      .then(response => {

        if (this.state.featured_image) {
          this.featuredImageRef.current.dropzone.removeAllFiles();
        }

        //sets states for keys to values as empty strings
        this.setState({
          title: "",
          blog_status: "",
          content: "",
          featured_image: ""
        });


        //creates record and passes it to blog modal
        if (this.props.editMode) {
          // update edit blog detail
          this.props.handleUpdateFormSubmission(response.date.portfolio_blog);
        } else {
          this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);

        }


      })
      .catch(error => {
        console.log("handleSubmit for blog error", error);
      });

    event.preventDefault();
  }

  //handles changes in form data
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            onChange={this.handleChange}
            type="text"
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="blog_status"
            placeholder="Blog Status"
            value={this.state.blog_status}
          />
        </div>

        <div className="one-column">
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}
          />
        </div>

        <div className="image-uploader">
          {this.props.editMode && this.props.blog.featured_image_url ?
            (<div className="portfolio-manager-image-wrapper">
              <img src={this.props.blog.featured_image_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("featured_image")}>Remove FIle</a>
              </div>
            </div>) : (
              <DropzoneComponent
                ref={this.featuredImageRef}
                config={this.componentConfig()}
                djsConfig={this.djsConfig()}
                eventHandlers={this.handleFeaturedImageDrop()}
              >
                <div className="dz-message">Featured Image</div>
              </DropzoneComponent>)}
        </div>
        <button className="save-btn">Save</button>
      </form>
    );
  }
}
