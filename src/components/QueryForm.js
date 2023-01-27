import React, { Component } from 'react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'
/* 
- bir sey degistiginde hemen query yapsin
*/
export default class QueryForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visitQuery: {
        allLocations: [],
        visitorClause: '',
        dateMin: '',
        dateMax: '',
        startTimeMin: '',
        startTimeMax: '',
        endTimeMin: '',
        endTimeMax: '',
        allVisitors: [],
        workDone: '',
        costMin: '',
        costMax: ''
      },
      selectedLocation: this.props.locationChoices.reduce((elems, key) => ({ ...elems, [key]: false}), {}),
      selectedVisitor: this.props.visitorChoices.reduce((elems, key) => ({ ...elems, [key]: false}), {}),
      selectedDateSpan: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(evt) {
    if (Object.keys(this.state.selectedLocation)
                     .includes(evt.target.name)) {
        this.setState({
          selectedLocation: {...this.state.selectedLocation,
                            [evt.target.name]: evt.target.checked
          }
        })
    } else if (Object.keys(this.state.selectedVisitor)
                     .includes(evt.target.name)) {
        this.setState({
          selectedVisitor: {...this.state.selectedVisitor,
                              [evt.target.name]: evt.target.checked
          }
        })
    } else if (evt.target.name === 'selectedDateSpan') {
        this.setState({
          selectedDateSpan: evt.target.value
        })
    } else {
        const newVisitObj = this.state.visitQuery
        newVisitObj[evt.target.name] = evt.target.value
           
        this.setState({
            visitQuery: newVisitObj
        })
    }
    // this.handleSubmit()
  }

  handleClear() {
    this.setState({
      visitQuery: {
        allLocations: [],
        visitorClause: '',
        dateMin: '',
        dateMax: '',
        startTimeMin: '',
        startTimeMax: '',
        endTimeMin: '',
        endTimeMax: '',
        allVisitors: [],
        workDone: '',
        costMin: '',
        costMax: ''
      }})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    
    let finalQuery = {...this.state.visitQuery}
    
    if(this.state.selectedDateSpan) {
      finalQuery.dateMax = moment().format('YYYY-MM-DD')
      switch (this.state.selectedDateSpan) {
        case 'last5Year':
          finalQuery.dateMin = moment().subtract(5, 'year').format('YYYY-MM-DD')
        break;
        case 'last2Year':
          finalQuery.dateMin = moment().subtract(2, 'year').format('YYYY-MM-DD')
        break;
        case 'lastYear':
          finalQuery.dateMin = moment().subtract(1, 'year').format('YYYY-MM-DD')
          break;
        case 'last6Month':
          finalQuery.dateMin = moment().subtract(6, 'month').format('YYYY-MM-DD')
          break;
        case 'last3Month':
          finalQuery.dateMin = moment().subtract(3, 'month').format('YYYY-MM-DD')
          break;
        case 'lastMonth':
          finalQuery.dateMin = moment().subtract(1, 'month').format('YYYY-MM-DD')
          break;
        case 'lastWeek':
          finalQuery.dateMin = moment().subtract(1, 'week').format('YYYY-MM-DD')
        break;
        default:
          break;
      }
    }

    for (const [key, value] of Object.entries(this.state.selectedLocation)) {
      if(value) finalQuery.allLocations.push(key)
    }

    for (const [key, value] of Object.entries(this.state.selectedVisitor)) {
      if(value) finalQuery.allVisitors.push(key)
    }

    if(finalQuery.allLocations.length < 1) {
      finalQuery.allLocations = ''
    }
    
    if(finalQuery.allVisitors.length < 1) {
      finalQuery.allVisitors = ''
    }
    console.log(finalQuery)
    this.props.makeNewQuery(finalQuery)
    this.handleClear()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      {/* <form> */}
        <h2>Filtre</h2>
        <div>
            {
              Object.keys(this.state.selectedLocation).map(key => {
                const locCbKey = uuid()
                return <div key={uuid()}>
                  <label htmlFor={locCbKey} key={uuid()}>{key}</label>
                  <input type="checkbox" name={key} key={locCbKey} id={key}
                         onChange={this.handleChange} 
                         checked={this.state.selectedLocation[key]}></input>
                </div>
              })
            }
        </div>
        <div>
            <div>
                <input name='startTimeMin' id='startTimeMin' 
                       value={this.state.visitQuery.startTimeMin} 
                       onChange={this.handleChange} 
                       type='time'/>
                <input name='startTimeMax' id='startTimeMax' 
                       value={this.state.visitQuery.startTimeMax} 
                       onChange={this.handleChange} 
                       type='time'/>
            </div>
            <div>
                <input name='endTimeMin' id='endTimeMin' 
                       value={this.state.visitQuery.endTimeMin} 
                       onChange={this.handleChange} 
                       type='time'/>
                <input name='endTimeMax' id='endTimeMax' 
                       value={this.state.visitQuery.endTimeMax} 
                       onChange={this.handleChange} 
                       type='time'/>
            </div>
        </div>
        <div>
        <select name='selectedDateSpan' id='selectedDateSpan'
                onChange={this.handleChange}
                select='selected'>
            <option></option>
            <option value="last5Year">Son bes yil</option>
            <option value="last2Year">Son iki yil</option>
            <option value="lastYear">Son bir yil</option>
            <option value="last6Month">Son 6 ay</option>
            <option value="last3Month">Son 3 ay</option>
            <option value="lastMonth">Son bir ay</option>
            <option value="lastWeek">Son bir hafta</option>
        </select>
          <div>
              <input name='dateMin' id='dateMin' 
                      value={this.state.visitQuery.dateMin} 
                      onChange={this.handleChange} 
                      type='date'/>
              <input name='dateMax' id='dateMax' 
                      value={this.state.visitQuery.dateMax} 
                      onChange={this.handleChange} 
                      type='date'/>
          </div>
        </div>
        <div>
          {
            Object.keys(this.state.selectedVisitor).map(key => {
              const visCBKey = uuid()
              return <div key={uuid()}>
                <label htmlFor={visCBKey} key={uuid()}>{key}</label>
                <input type="checkbox" name={key} key={visCBKey} id={key}
                        onChange={this.handleChange} 
                        checked={this.state.selectedVisitor[key]}></input>
              </div>
            })
          }
        </div>
        <input type='text' name='workDone' id='workDone' value={this.state.visitQuery.workDone} onChange={this.handleChange}/>
        <div>
                <input name='costMin' id='costMin' 
                       value={this.state.visitQuery.costMin} 
                       onChange={this.handleChange} 
                       type='number'/>
                <input name='costMax' id='costMax' 
                       value={this.state.visitQuery.costMax} 
                       onChange={this.handleChange} 
                       type='number'/>
        </div>
        <input type='submit' value='Ara'/>
        <button type='button' onClick={this.handleClear}>Temizle</button>
      </form>
    )
  }
}
