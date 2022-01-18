import React, { Component } from 'react'
import './index.css'

export default class FooterControl extends Component {
    state = {
        area: {x: 10, y:10, width:80, height:80},
        frameData: [],
        decoratorValue: 'decorator',
        lineWidthValue: '',
        strokeStyleValue: '',
        fillStyleValue: 'transparent',
        maskFillStyleValue: 'transparent',
        scanRegionLeft: '',
        scanRegionRight: '',
        scanRegionTop: '',
        scanRegionBottom: '',
        unitSelection: '%',
        decoratorIsDisabled: true,
        lineWidthIsDisabled: true,
        strokeStyleIsDisabled: true,
        fillStyleIsDisabled: true,
        maskFillStyleIsDisabled: true,
    }

    componentDidMount() {
        this.props.cd(this.changeDisabled)
    }

    openCamera = async () => {
        if(window.enhancer.isOpen()) { 
            return;
        } else {
            document.querySelector('#recognizerUI').appendChild(window.enhancer.getUIElement());
            await window.enhancer.open(true);
            // A decorator must be set to select a style
            if(window.enhancer.getViewDecorator().type.length !== 0) {
                this.setState({
                    lineWidthIsDisabled: false,
                    strokeStyleIsDisabled: false,
                    fillStyleIsDisabled: false,
                    maskFillStyleIsDisabled: false,
                })
            }
            this.setState({decoratorIsDisabled: false})
        }
    }

    getFrame = async () => {
        if(!window.enhancer.isOpen()) {
            return;
        } else {
            let frameData = window.enhancer.getFrame();
            document.querySelector('.show-frame').innerHTML = '';
            frameData.canvas.style.height = '100%'
            document.querySelector('.show-frame').appendChild(frameData.canvas);
        }
    }

    decoratorChange = (e) => {
        // if decorator is crossline or crosshair, can not set FillStyle and MaskFillStyle
        if(e.target.value === 'crossline' || e.target.value === 'crosshair') {
            this.setState({
                fillStyleIsDisabled: false,
                maskFillStyleIsDisabled: false
            })
        } else if(e.target.value === 'rectangle' || e.target.value === 'focus') {
            this.setState({
                lineWidthIsDisabled: false,
                strokeStyleIsDisabled: false,
                fillStyleIsDisabled: false,
                maskFillStyleIsDisabled: false
            })
        } else if(e.target.value === 'decorator') {
            this.setState({
                lineWidthIsDisabled: true,
                strokeStyleIsDisabled: true,
                fillStyleIsDisabled: true,
                maskFillStyleIsDisabled: true
            })
        }
        window.enhancer.setViewDecorator(e.target.value, this.state.area);
    }

    lineWidthChange = (e) => {
        let DecoratorInfo = window.enhancer.getViewDecorator();
        if(e.target.value === '') {
            window.enhancer.setViewDecoratorLineWidth(DecoratorInfo.type[0],5);
        } else {
            window.enhancer.setViewDecoratorLineWidth(DecoratorInfo.type[0],parseInt(e.target.value));
        }
    }

    strokeStyleChange(e) {
        let DecoratorInfo = window.enhancer.getViewDecorator();
        if(e.target.value === '') {
            window.enhancer.setViewDecoratorStrokeStyle(DecoratorInfo.type[0],'rgb(254,142,20)');
        } else {
            window.enhancer.setViewDecoratorStrokeStyle(DecoratorInfo.type[0],e.target.value);
        }
    }

    fillStyleChange(e) {
        let DecoratorInfo = window.enhancer.getViewDecorator();
        window.enhancer.setViewDecoratorFillStyle(DecoratorInfo.type[0],e.target.value);
    }

    maskFillStyleChange(e) {
        let DecoratorInfo = window.enhancer.getViewDecorator();
        window.enhancer.setViewDecoratorMaskFillStyle(DecoratorInfo.type[0],e.target.value);
    }

    setScanRegion = () => {
        const {scanRegionLeft, scanRegionTop, scanRegionRight, scanRegionBottom, unitSelection} = this.state
        // set scan region
        window.enhancer.setScanRegion({
            regionLeft: parseInt(scanRegionLeft) || 0,
            regionTop: parseInt(scanRegionTop) || 0, 
            regionRight: parseInt(scanRegionRight) || 100, 
            regionBottom: parseInt(scanRegionBottom) || 100, 
            // if true use %, if false use px
            regionMeasuredByPercentage: unitSelection === '%' ? true : false
        });
    }

    changeDisabled = () => {
        this.setState({
            decoratorIsDisabled: true,
            lineWidthIsDisabled: true,
            strokeStyleIsDisabled: true,
            fillStyleIsDisabled: true,
            maskFillStyleIsDisabled: true,
        })
    }
    render() {
        return (
            <footer>
                <div className="btn-group">
                    <button className="open-camera" onClick={this.openCamera}>open camera</button>
                    <button className="get-frame" onClick={this.getFrame}>get frame</button>
                    <select name="decorator" id="decorator" onChange={this.decoratorChange} disabled={this.state.decoratorIsDisabled}>
                        <option value="decorator">setViewDecorator</option>
                        <option value="rectangle">rectangle</option>
                        <option value="focus">focus</option>
                        <option value="crossline">crossline</option>
                        <option value="crosshair">crosshair</option>
                    </select>
                    <select name="LineWidth" id="LineWidth" onChange={this.lineWidthChange} disabled={this.state.lineWidthIsDisabled}>
                        <option value="">setViewDecoratorLineWidth</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <select name="StrokeStyle" id="StrokeStyle" onChange={this.strokeStyleChange} disabled={this.state.strokeStyleIsDisabled}>
                        <option value="">setViewDecoratorStrokeStyle</option>
                        <option value="skyblue">skyblue</option>
                        <option value="red">red</option>
                        <option value="purple">purple</option>
                    </select>
                    <select name="FillStyle" id="FillStyle" onChange={this.fillStyleChange} disabled={this.state.fillStyleIsDisabled}>
                        <option value="transparent">setViewDecoratorFillStyle</option>
                        <option value="rgba(135, 206, 235, 0.3)">skyblue</option>
                        <option value="rgba(255, 0, 0, 0.3)">red</option>
                        <option value="rgba(128, 0, 128, 0.3)">purple</option>
                    </select>
                    <select name="MaskFillStyle" id="MaskFillStyle" onChange={this.maskFillStyleChange} disabled={this.state.maskFillStyleIsDisabled}>
                        <option value="transparent">setViewDecoratorMaskFillStyle</option>
                        <option value="rgba(135, 206, 235, 0.3)">skyblue</option>
                        <option value="rgba(255, 0, 0, 0.3)">red</option>
                        <option value="rgba(128, 0, 128, 0.3)">purple</option>
                    </select>
                </div>
                <div className="frame">
                    <div className="set-frame">
                        <input type="number" placeholder="scan region left" v-model="scanRegionLeft" onChange={(e)=>{this.setState({scanRegionLeft: e.target.value})}}/>
                        <input type="number" placeholder="scan region right" v-model="scanRegionRight" onChange={(e)=>{this.setState({scanRegionRight: e.target.value})}}/>
                        <select id="unit-selection" v-model="unitSelection" onChange={(e)=>{this.setState({unitSelection: e.target.value})}}>
                            <option value="%">%</option>
                            <option value="px">px</option>
                        </select>
                        <input type="number" placeholder="scan region top" v-model="scanRegionTop" onChange={(e)=>{this.setState({scanRegionTop: e.target.value})}}/>
                        <input type="number" placeholder="scan region bottom" v-model="scanRegionBottom" onChange={(e)=>{this.setState({scanRegionBottom: e.target.value})}}/>
                        <button className="set-scan-region" onClick={this.setScanRegion}>set</button>
                    </div>
                    <div className="show-frame"></div>
                </div>
            </footer>
        )
    }
}
