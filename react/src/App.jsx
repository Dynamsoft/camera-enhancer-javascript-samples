import React, { Component } from 'react'
import Video from './Video';
import FooterControl from './FooterControl';

export default class App extends Component {
    state = {changeDisabled: Function}

    cd = (fn) => {this.setState({changeDisabled: fn})}

    render() {
        return (
            <div>
                <Video changeDisabled={this.state.changeDisabled}/>
                <FooterControl cd={this.cd}/>
            </div>
        )
    }
}
