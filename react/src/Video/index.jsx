import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
    state = {
        enhancer: {}
    }

    componentDidMount() {
        this.initSettings()
    }

    initSettings = async () => {
        const callbackCameraOpen = () => {
            console.log("camera opened");
        };
        // if close camera, should set the selection box to not selectable
        const callbackCameraClose = () => {
            this.props.setSelectDisabled();
            console.log("camera closeed");
        };
        const callbackCameraChange = () => { 
            console.log("camera changed");
        };
        const callbackResolutionChange = () => {
            console.log("camera resolution changed");
        };
        this.props.enhancer.then(r => {
            this.setState({enhancer: r}, () => {
                this.state.enhancer.on("cameraOpen", callbackCameraOpen);
                this.state.enhancer.on("cameraClose", callbackCameraClose);
                this.state.enhancer.on("cameraChange", callbackCameraChange);
                this.state.enhancer.on("resolutionChange", callbackResolutionChange);
            })
        })
    }

    render() {
        return (
            <div id="recognizerUI"></div>
        )
    }
}
