import React, { Component } from 'react'
import DCE from './dce'
import Video from './Video';
import FooterControl from './FooterControl';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setSelectDisabled: null,
            enhancer: this.createInstance()
        }
    }

    createInstance = async () => {
        let enhancer = await DCE.createInstance();
        return enhancer;
    }

    setAppState = (changeDisabled) => {this.setState({setSelectDisabled: changeDisabled})}

    render() {
        return (
            <div>
                <Video setSelectDisabled={this.state.setSelectDisabled} enhancer={this.state.enhancer}/>
                <FooterControl setAppState={this.setAppState} enhancer={this.state.enhancer}/>
            </div>
        )
    }
}
