import React, { Component } from 'react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

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
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(evt) {
    if (evt.target.name === 'locSel') {
        this.setState({
          visitQuery: {
            ...this.state.visitQuery,
            allLocations: evt.target.checked ? [...this.state.visitQuery.allLocations].concat(evt.target.value) : 
                                               [...this.state.visitQuery.allLocations].filter((val = evt.target.value) => {
                                                if (evt.target.value === val) {
                                                  return false
                                                }
                                                return true 
                                               })
          }
        }, () => this.handleSubmit())
    } else if (evt.target.name === 'visSel') {
        this.setState({
          visitQuery: {
            ...this.state.visitQuery,
            allVisitors: evt.target.checked ? [...this.state.visitQuery.allVisitors].concat(evt.target.value) : 
                                              [...this.state.visitQuery.allVisitors].filter((val = evt.target.value) => {
                                                if (evt.target.value === val) {
                                                  return false
                                                }
                                                return true 
                                               })
          }
        }, () => this.handleSubmit())
    } else if(evt.target.name === 'selectedDateSpan') {
      let [dateMin, dateMax] = ['','']

      dateMax = moment().format('YYYY-MM-DD')
      switch (evt.target.value) {
        case 'last5Year':
          dateMin = moment().subtract(5, 'year').format('YYYY-MM-DD')
        break;
        case 'last2Year':
          dateMin = moment().subtract(2, 'year').format('YYYY-MM-DD')
        break;
        case 'lastYear':
          dateMin = moment().subtract(1, 'year').format('YYYY-MM-DD')
          break;
        case 'last6Month':
          dateMin = moment().subtract(6, 'month').format('YYYY-MM-DD')
          break;
        case 'last3Month':
          dateMin = moment().subtract(3, 'month').format('YYYY-MM-DD')
          break;
        case 'lastMonth':
          dateMin = moment().subtract(1, 'month').format('YYYY-MM-DD')
          break;
        case 'lastWeek':
          dateMin = moment().subtract(1, 'week').format('YYYY-MM-DD')
        break;
        default:
          break;
      }
      this.setState({
        visitQuery: {
          ...this.state.visitQuery,
          dateMin,
          dateMax
        }
      }, () => this.handleSubmit())
    }else {
        const newVisitObj = this.state.visitQuery
        newVisitObj[evt.target.name] = evt.target.value
           
        this.setState({
            visitQuery: newVisitObj
        }, () => this.handleSubmit())
    }
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

  handleSubmit() {
    // evt.preventDefault()
    
    let finalQuery = {...this.state.visitQuery}

    if(finalQuery.allLocations.length < 1) {
      finalQuery.allLocations = ''
    }
    
    if(finalQuery.allVisitors.length < 1) {
      finalQuery.allVisitors = ''
    }
    console.log(finalQuery)
    this.props.makeNewQuery(finalQuery)
    // this.handleClear()
  }


  // componentDidUpdate() {
  //   const currentLocs = []
  //   const selectedLocation = this.state.selectedLocation

  //   const currentVisitors = []
  //   const selectedVisitor = this.state.selectedVisitor
    
  //   for (const [key, value] of Object.entries(selectedLocation)) {
  //     if(value) currentLocs.push(key)
  //   }

  //   for (const [key, value] of Object.entries(selectedVisitor)) {
  //     if(value) currentVisitors.push(key)
  //   }

  //   if(!(currentLocs.sort().join() ===
  //     this.state.visitQuery.allLocations.sort().join()))
  //     this.setState({
  //       visitQuery: {
  //         ...this.state.visitQuery,
  //         allLocations: currentLocs
  //       }
  //   })

  //   if(!(currentVisitors.sort().join() ===
  //     this.state.visitQuery.allVisitors.sort().join()))
  //     this.setState({
  //       visitQuery: {
  //         ...this.state.visitQuery,
  //         allVisitors: currentVisitors
  //       }
  //     })
    
  //   this.handleSubmit()
  // }


  render() {
    return (
      <form>
        <h2>Filtre</h2>
        <div>
            {
              this.props.locationChoices.map(key => {
                const locCbKey = uuid()
                return <div key={uuid()}>
                  <label htmlFor={locCbKey} key={uuid()}>{key}</label>
                  <input type="checkbox" value={key} name={'locSel'} key={locCbKey} id={locCbKey}
                         onChange={this.handleChange} 
                         checked={this.state.visitQuery.allLocations.includes(key)}></input>
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
            this.props.visitorChoices.map(key => {
              const visCBKey = uuid()
              return <div key={uuid()}>
                <label htmlFor={visCBKey} key={uuid()}>{key}</label>
                <input type="checkbox" value={key} name={'visSel'} key={visCBKey} id={visCBKey}
                        onChange={this.handleChange} 
                        checked={this.state.visitQuery.allVisitors.includes(key)}></input>
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
        <button type='button' onClick={this.handleSubmit}>Yenile</button>
        <button type='button' onClick={this.handleClear}>Temizle</button>
      </form>
    )
  } 
}
