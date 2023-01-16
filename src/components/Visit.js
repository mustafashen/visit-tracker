import React, { Component } from 'react'

export default class Visit extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <tr>
                {Object.keys(this.props.visit).map((key, idx) => {
                    return <td key={idx}>{this.props.visit[key]}</td>
                })}
            </tr>
        )
    }
}
