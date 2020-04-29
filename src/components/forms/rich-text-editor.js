import React, { Component } from 'react';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = { editorState: EditorState.createEmpty() };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    // method that handles changes from initial state in rich text editor 
    onEditorStateChange(editorState) {
        //setState can take in two arguments 
        this.setState(
            // first argument updates editorStates value
            { editorState },
            // once state has been established, thesecond argument passes the properties of the new state (setState) to handleRichTextEditorChange method
            this.props.handleRichTextEditorChange(
                // draftToHtml checks string and turns it into html
                //convertToRaw(HOC) takes the current content and converts into a string
                //getCurrentContent gets on new content in rich text editor
                draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            )
        );
    }

    getBase64(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => { };
    }

    //method to handle the process of uploading 
    uploadFile(file) {
        return new Promise((resolve, reject) => {
            this.getBase64(file, data => resolve({ data: { link: data } }));
        });
    }

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        links: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: this.uploadFile,
                            alt: { present: true, mandatory: false },
                            previewImage: true,
                            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg "
                        }
                    }}
                />
            </div>
        );
    }
}