import React, { Component } from 'react'
import moment from 'moment'

export default class Visit extends Component {
    
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleDelete() {
        this.props.deleteVisit(this.props.visit.id)
    }

    handleEdit() {
        this.props.activateEdit(this.props.visit)
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
                                moment(visitElem[key]).format('DD/MM/YYYY')
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
                <td>
                    <button onClick={this.handleDelete}>x</button>
                </td>
                <td>
                    <button onClick={this.handleEdit}>Duzenle</button>
                </td>
            </tr>
        )
    }
}
