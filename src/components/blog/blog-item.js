import React from "react";

const BlogItem = props => {
    const {
        id,
        blog_staus,
        content,
        title,
        feature_image_url

    } = props.blogItem;

    return (
        <div>
            <h1>{title}</h1>
            <div>{content}</div>
        </div>
    )

}

export default BlogItem;