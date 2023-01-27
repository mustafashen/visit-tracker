import React, { Component } from 'react'
import moment from 'moment'

export default class Visit extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        const visitElem = this.props.visit
        return (
            <tr>
                {Object.keys(visitElem).map((key, idx) => {
                    const cellKey = `${visitElem.id}-${idx}`
                    if(key === 'id'){
                        return false
                    } else if(key === 'date') {
                        return <td key={cellKey}>
                               {
                                moment(visitElem[key]).format('YYYY-MM-DD')
                               }
                               </td>
                    } else if((key === 'startTime') || (key === 'endTime')){
                        return <td key={cellKey}>{visitElem[key].slice(0, 5)}</td>
                    } else if(key === 'allVisitors') {
                        return <td key={cellKey}>{visitElem[key].join(', ')}</td>
                    } else {
                        return <td key={cellKey}>{visitElem[key]}</td>
                    }
                })}
            </tr>
        )
    }
}
