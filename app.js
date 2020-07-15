import React, { Component } from 'react';

export default class Column extends Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            modules: []
        };
    }

    componentDidMount(){
        let modules = [];
        fetch(`/api/module/read/${this.props.row} ${this.props.align}`)
        .then(response => response.json())
        .then(data => {
            data.forEach((mod) => {
                modules.push({
                    module: require(`../modules/${mod.name}/index.jsx`).default,
                    props: mod.props
                })
            })
			this.setState({modules: modules});
        });
    }

    render(){
        var self = this;
        return (
            <div className={`${this.props.align} col`}>{
                <div>{(
                    Object.keys(self.state.modules).map(function(key, index){
                        const Comp = self.state.modules[key].module;
                        return (
                            <Comp key={index} {...self.state.modules[key].props} />
                        );
                    })
                )}</div>
            }</div>
        )
    }
}
