import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
    componentDidMount() {
        this.initSettings()
    }

    initSettings = async () => {
        window.enhancer = await window.Dynamsoft.DCE.CameraEnhancer.createInstance();
        const callbackCameraOpen = () => {
            console.log("camera opened");
        };
        // if close camera, should set the selection box to not selectable
        const callbackCameraClose = () => {
            this.props.changeDisabled()
            console.log("camera closeed");
        };
        const callbackCameraChange = () => { 
            console.log("camera changed");
        };
        const callbackResolutionChange = () => {
            console.log("camera resolution changed");
        };
        window.enhancer.on("cameraOpen", callbackCameraOpen);
        window.enhancer.on("cameraClose", callbackCameraClose);
        window.enhancer.on("cameraChange", callbackCameraChange);
        window.enhancer.on("resolutionChange", callbackResolutionChange);
    }

    render() {
        return (
            <div id="recognizerUI"></div>
        )
    }
}
