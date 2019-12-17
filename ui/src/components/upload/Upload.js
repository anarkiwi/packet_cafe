import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { connect } from "react-redux";

import Dropzone  from 'components/dropzone/Dropzone';
import Progress from 'components/progress/Progress';

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
            resultId: null,
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }

    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
        });
        try {
            console.log("Awaiting Uploads");
            await Promise.all(promises);

            this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
            // Not Production ready! Do some error handling here instead...
            this.setState({ successfullUploaded: true, uploading: false });
        }
    }

    sendRequest(file) {
        const sessionId = this.props.sessionId;
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = {
                state: "pending",
                percentage: (event.loaded / event.total) * 100
                };
                this.setState({ uploadProgress: copy });
            }
            });

            req.upload.addEventListener("load", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy });
            resolve(req.response);
            });

            req.upload.addEventListener("error", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "error", percentage: 0 };
            this.setState({ uploadProgress: copy });
            console.log("error event: %o", event);
            reject(req.response);
            });
            console.log("sessionId: %o", sessionId);
            const formData = new FormData();
            //
            formData.append("file", file, file.name);
            formData.append("sessionId", sessionId);
            req.open("POST", "/express-upload");
            // req.setRequestHeader("Content-Type", "multipart/form-data");
            req.send(formData);
        });
    }

    renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
            return (
            <div className="ProgressWrapper">
                <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                <img
                className="CheckIcon"
                alt="done"
                src="baseline-check_circle_outline-24px.svg"
                style={{
                    opacity:
                    uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                }}
                />
            </div>
            );
        }
    }

    renderActions() {
        if (this.state.successfullUploaded) {
            return (
            <Button
                onClick={() =>
                this.setState({ files: [], successfullUploaded: false })
                }
            >
                Clear
            </Button>
            );
        } else {
            return (
            <Button
                disabled={this.state.files.length < 0 || this.state.uploading}
                onClick={this.uploadFiles}
            >
                Submit
            </Button>
            );
        }
    }

    render(){
        return(
        <div>
            <Header as='h2' color='teal' textAlign='center'>
                    Upload PCAP files:
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <div>
                        <Dropzone
                        onFilesAdded={this.onFilesAdded}
                        disabled={this.state.uploading || this.state.successfullUploaded}
                        />
                    </div>
                    <div className="Files">
                        {this.state.files.map(file => {
                        return (
                            <div key={file.name} className="Row">
                            <br /><span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
                            </div>
                        );
                        })}
                    </div>
                    <div className="Actions">{this.renderActions()}</div>
                    </Segment>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps) (Upload)