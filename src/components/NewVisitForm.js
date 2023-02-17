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
            }}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleChange(evt) {
        if (evt.target.name === 'locSel') {
            this.setState({
            visit: {
                ...this.state.visit,
                loc: evt.target.value
            }
            })
        } else if (evt.target.name === 'visSel') {
            this.setState({
            visit: {
                ...this.state.visit,
                allVisitors: evt.target.checked ? [...this.state.visit.allVisitors].concat(evt.target.value) : 
                                                  [...this.state.visit.allVisitors].filter((val = evt.target.value) => {
                                                    if (evt.target.value === val) {
                                                      return false
                                                    }
                                                    return true 
                                                   })
            }
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
        }})
    }

    render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Yeni Ziyaret</h2>
        <div>
            {
              this.props.locationChoices.map(key => {
                const locRadKey = uuid()
                return <div key={uuid()}>
                  <label htmlFor={locRadKey} key={uuid()}>{key}</label>
                  <input type="radio" name={'locSel'} key={locRadKey} id={locRadKey}
                         onChange={this.handleChange}
                         value={key}
                         checked={this.state.visit.loc === key}
                         >                        
                         </input>
                </div>
              })
            }
        </div>
        <div>
            <label htmlFor='date'>Tarih:</label>
            <input name='date' id='date' type='date' value={this.state.visit.date} onChange={this.handleChange}/>
        </div>
        <div>
            <label htmlFor='startTime'>Giris Saati:</label>
            <input name='startTime' id='startTime' type='time' value={this.state.visit.startTime} onChange={this.handleChange}/>
            <label htmlFor='endTime'>Cikis Saati:</label>
            <input name='endTime' id='endTime' type='time' value={this.state.visit.endTime} onChange={this.handleChange}/>
        </div>
        <div>
          {
            this.props.visitorChoices.map(key => {
              const visCBKey = uuid()
              return <div key={uuid()}>
                <label htmlFor={visCBKey} key={uuid()}>{key}</label>
                <input type="checkbox" value={key} name={'visSel'} key={visCBKey} id={visCBKey}
                        onChange={this.handleChange} 
                        checked={this.state.visit.allVisitors.includes(key)}></input>
              </div>
            })
          }
        </div>
        <div>
            <label htmlFor='workDone'>Yapilan Is:</label>
            <input name='workDone' id='workDone' type='text' value={this.state.visit.workDone} onChange={this.handleChange}/>
        </div>
        <div>   
            <label htmlFor='cost'>Yapilan Masraf:</label>
            <input name='cost' id='cost' type='number' step='1.00' value={this.state.visit.cost} onChange={this.handleChange}/>
        </div>
        <input type='submit' value='Ziyaret Ekle'/>
        <button type='button' onClick={this.handleClear}>Temizle</button>
      </form>
    )
  }
}
