import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import closeIcon from '../assets/close.png'
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
          }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleCloseForm = this.handleCloseForm.bind(this)
    }

    // Sets the state on input value change
    
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
        this.handleCloseForm()
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

    handleCloseForm() {
      this.props.closeAddForm()
    }

    render() {

    return (
      <div id='NewVisitForm' className='pop-up-form-ctn'>
        <div className='form-wrp'>
          <div className='form-top-bar'>
              <h2>Yeni Ziyaret</h2>
              <button onClick={this.handleCloseForm}
                      type='button'
                      aria-label='close button'>
                <img src={closeIcon}/>
              </button>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className='input-blocks'>
                <b>Ziyaret Yeri</b>
                <div className='cb-list-blocks'>
                  {
                    this.props.locationChoices.map(key => {
                      const locRadKey = uuid()
                      return <div key={uuid()}
                                  className='cb-wrp'>
                        <input type="radio" name={'locSel'} key={locRadKey} id={locRadKey}
                              onChange={this.handleChange}
                              value={key}
                              checked={this.state.visit.loc === key}
                              className='cb-input'
                              >                        
                              </input>
                        <label htmlFor={locRadKey} key={uuid()}>{key}</label>
                      </div>
                    })
                  }
                </div>
            </div>
            <div className='input-blocks'>
                <b>Tarih</b>
                <input name='date' id='date' type='date' 
                       value={this.state.visit.date} onChange={this.handleChange}
                       className='kb-input'/>
            </div>
            <div className='input-blocks'>
                <b>Giriş-Çıkış saatleri</b>
                <input name='startTime' id='startTime' type='time' 
                       value={this.state.visit.startTime} onChange={this.handleChange}
                       className='kb-input'/>
                <input name='endTime' id='endTime' type='time' 
                       value={this.state.visit.endTime} onChange={this.handleChange}
                       className='kb-input'/>
            </div>
            <div className='input-blocks'>
                <b>Ziyaret Edenler</b>
                <div className='cb-list-blocks'>
                  {
                    this.props.visitorChoices.map(key => {
                      const visCBKey = uuid()
                      return <div key={uuid()}
                                  className='cb-wrp'>
                        <input type="checkbox" value={key} name={'visSel'} key={visCBKey} id={visCBKey}
                                onChange={this.handleChange} 
                                checked={this.state.visit.allVisitors.includes(key)}
                                className='cb-input'></input>
                        <label htmlFor={visCBKey} key={uuid()}>{key}</label>
                      </div>
                    })
                  }
                </div>
            </div>
            <div className='input-blocks'>
                <b>Yapılan İş</b>
                <input name='workDone' id='workDone' 
                       type='text' value={this.state.visit.workDone} onChange={this.handleChange}
                       className='kb-input'/>
            </div>
            <div className='input-blocks'>
                <b>Yapılan Masraf</b>
                <input name='cost' id='cost' 
                       type='number' step='1.00' 
                       value={this.state.visit.cost} onChange={this.handleChange}
                       className='kb-input'/>
            </div>
            <div className='input-blocks'>
              <button type='submit'>Ziyaret Ekle</button>
              <button type='button' onClick={this.handleClear}>Temizle</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
