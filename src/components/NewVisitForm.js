import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

export default class NewEntrySection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visit: {
                loc: '',
                date: '',
                startTime: '',
                endTime: '',
                allVisitors: [],
                workDone: '',
                cost: ''
            },
            selectedVisitor: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleAddVisitor = this.handleAddVisitor.bind(this)
    }

    handleChange(evt) {
        if (evt.target.name === 'selectedVisitor'){
            this.setState({
                [evt.target.name]: evt.target.value
            })
        } else {
            const newVisitObj = this.state.visit
            newVisitObj[evt.target.name] = evt.target.value
               
            this.setState({
                visit: newVisitObj
            })
        }
    }

    handleSubmit(evt) {
        evt.preventDefault()

        let finalVisit = this.state.visit
        finalVisit.id = uuid()
        finalVisit.loc = JSON.stringify([finalVisit.loc])
        finalVisit.allVisitors = JSON.stringify(finalVisit.allVisitors)
        
        this.props.createNewVisit(finalVisit)
        this.handleClear()
    }

    handleClear() {
        this.setState({
            visit: {
                loc: '',
                date: '',
                startTime: '',
                endTime: '',
                allVisitors: [],
                workDone: '',
                cost: ''
            },
            selectedVisitor: ''
        })
    }

    handleAddVisitor() {
        const newVisitObj = this.state.visit

        if (!newVisitObj.allVisitors.includes(this.state.selectedVisitor) &&
            this.state.selectedVisitor) {
            newVisitObj.allVisitors.push(this.state.selectedVisitor)
            this.setState({
                visit: newVisitObj
            })
        }
    }

    render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Yeni Ziyaret</h2>
        <label htmlFor='loc'>Ziyaret Yeri:</label>
        <input name='loc' id='loc'  type='text' value={this.state.visit.loc} onChange={this.handleChange}/>
        <br></br>
        
        <label htmlFor='date'>Tarih:</label>
        <input name='date' id='date' type='date' value={this.state.visit.date} onChange={this.handleChange}/>
        <br></br>
        
        <label htmlFor='startTime'>Giris Saati:</label>
        <input name='startTime' id='startTime' type='time' value={this.state.visit.startTime} onChange={this.handleChange}/>
        <label htmlFor='endTime'>Cikis Saati:</label>
        <input name='endTime' id='endTime' type='time' value={this.state.visit.endTime} onChange={this.handleChange}/>
        <br></br>

        <label htmlFor='selectedVisitor'>Ziyaretciler:</label>
        <select name='selectedVisitor' id='selectedVisitor' onChange={this.handleChange} select='selected'>
            {this.props.visitorChoices.map((visitor, idx) => {
                return <option key={idx}>{visitor}</option>
            })}
        </select>
        <button type='button' onClick={this.handleAddVisitor}>Ekle</button>
        {this.state.visit.allVisitors.map((elem, idx) => {
            return <span key={idx}>{elem},</span>
        })}
        <br></br>

        <label htmlFor='workDone'>Yapilan Is:</label>
        <input name='workDone' id='workDone' type='text' value={this.state.visit.workDone} onChange={this.handleChange}/>
        <br></br>
        
        <label htmlFor='cost'>Yapilan Masraf:</label>
        <input name='cost' id='cost' type='number' step='1.00' value={this.state.visit.cost} onChange={this.handleChange}/>
        <br></br>

        <input type='submit' value='Ziyaret Ekle'/>
        <button type='button' onClick={this.handleClear}>Temizle</button>
      </form>
    )
  }
}
