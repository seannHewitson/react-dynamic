import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let Components = {};

class App extends React.Component{

    constructor(){
        super();
        this.state = {
            components: {}
        };
    }

    componentDidMount(){
        //  Fetch Components list from API.
        //  Iterate API and import actual compoments.
        Components['helloWorld'] = require(`../modules/helloWorld/index.jsx`).default;
        //  Update State, loading all components.
        this.setState({components: Components})
    }

    render(){
        var self = this;
        return (
            <div>{(
                Object.keys(self.state.components).map(function(key, index){
                    console.log(key);
                    const Comp = self.state.components[key];
                    return (
                        <Comp key={index} text='Hey' />
                    );
                })
            )}</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
