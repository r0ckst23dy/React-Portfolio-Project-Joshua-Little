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

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}