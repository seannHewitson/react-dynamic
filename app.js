import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let modules = [];
var testModules = [
    {
        name: 'helloWorld',
        props: {
            text: 'Hello'
        }
    },
    {
        name: 'helloWorld',
        props: {
            text: 'world'
        }
    }
]

class App extends React.Component{

    constructor(){
        super();
        this.state = {
            modules: []
        };
    }

    componentDidMount(){
        //  Fetch Components list from API.
        //  Iterate API and import actual compoments.
        testModules.forEach((test) => {
            modules.push({
                module: require(`../modules/${test.name}/index.jsx`).default,
                props: test.props
            })
        })
        //  Update State, loading all components.
        this.setState({modules: modules});
    }

    render(){
        var self = this;
        return (
            <div>{(
                Object.keys(self.state.modules).map(function(key, index){
                    const Comp = self.state.modules[key].module;
                    return (
                        <Comp key={index} {...self.state.modules[key].props} />
                    );
                })
            )}</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
