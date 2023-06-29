import React, { Component } from 'react'
import moment from 'moment'
import deleteIcon from '../assets/delete.png'
import editButton from '../assets/edit.png'

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
                    <button onClick={this.handleEdit} id='edit-btn' aria-label='edit button'>
                        <img alt='Edit Icon' src={editButton}/>
                    </button>
                </td>
                <td>
                    <button onClick={this.handleDelete} id='delete-btn' aria-label='delete button'>
                        <img alt='Delete Icon' src={deleteIcon}/>
                    </button>
                </td>
            </tr>
        )
    }
}
