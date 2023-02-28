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
        costMax: '',
        orderSelection: ''
      },
      selectedDateSpan: '',
      disabledDatePick: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // QueryForm expected to make query when an input change
  // This function immediately updates state 
  // Then submits the updated state
  
  handleChange(evt) {
    if (evt.target.name === 'toggleDateSel') {
      this.setState({
        visitQuery: {
          ...this.state.visitQuery,
          dateMin: '',
          dateMax: ''
        },
        disabledDatePick: !this.state.disabledDatePick
      }, () => this.handleSubmit())
    } else if (evt.target.name === 'orderSel') {
      this.setState({
        visitQuery: {
          ...this.state.visitQuery,
          orderSelection: evt.target.value
        }
      }, () => this.handleSubmit())
    } else if (evt.target.name === 'locSel') {
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
      this.setState({
        selectedDateSpan: evt.target.value
      }, () => {

        if (!this.state.selectedDateSpan) {
          this.setState({
            visitQuery: {
              ...this.state.visitQuery,
              dateMin: '',
              dateMax: ''
            }
          }, () => this.handleSubmit())
        } else {
          let [dateMin, dateMax] = ['','']
        
          dateMax = moment().format('YYYY-MM-DD')
          
          switch (this.state.selectedDateSpan) {
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
        }


      })
    } else {
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
        costMax: '',
        orderSelection: ''
      },
      selectedDateSpan: '',
      disabledDatePick: false
    }, () => this.handleSubmit())
  }

  handleSubmit() {
    
    let finalQuery = {...this.state.visitQuery}

    if(finalQuery.orderSelection) {
      finalQuery.orderSelection = finalQuery.orderSelection.split('-')
    }
    if(finalQuery.allLocations.length < 1) {
      finalQuery.allLocations = ''
    }
    
    if(finalQuery.allVisitors.length < 1) {
      finalQuery.allVisitors = ''
    }
    this.props.makeNewQuery(finalQuery)
    
  }

  render() {
    return (
      <form id='QueryForm'>   
        <h2>Sırala</h2>
        <div id='Order' className='input-blocks'>
          <select onChange={this.handleChange} value={this.state.visitQuery.orderSelection} name='orderSel'>
            <option></option>
            <option value={'date-ASC'}>Tarihe gore artan</option>
            <option value={'date-DESC'}>Tarihe gore azalan</option>
            <option value={'cost-ASC'}>Masrafa gore artan</option>
            <option value={'cost-DESC'}>Mastafa gore azalan</option>
          </select>
        </div>
        <h2>Filtre</h2>
        <div className='input-blocks'>
          <b>Ziyaret Yeri</b>
          <div className='cb-list-blocks'>
            {
              this.props.locationChoices.map(key => {
                const locCbKey = uuid()
                return <div key={uuid()}
                            className='cb-wrp'>
                  <input type="checkbox" value={key} name={'locSel'} key={locCbKey} id={locCbKey}
                         onChange={this.handleChange} 
                         checked={this.state.visitQuery.allLocations.includes(key)}
                         className='cb-input'></input>
                  <label htmlFor={locCbKey} key={uuid()}>{key}</label>
                </div>
              })
            }
          </div>
        </div>
        <div className='input-blocks'>
          <b>Tarih Aralığı</b>
          <select name='selectedDateSpan' id='selectedDateSpan'
                  onChange={this.handleChange}
                  select='selected'
                  value={this.state.selectedDateSpan}>
            <option></option>
            <option value="last5Year">Son bes yil</option>
            <option value="last2Year">Son iki yil</option>
            <option value="lastYear">Son bir yil</option>
            <option value="last6Month">Son 6 ay</option>
            <option value="last3Month">Son 3 ay</option>
            <option value="lastMonth">Son bir ay</option>
            <option value="lastWeek">Son bir hafta</option>
          </select>
          <div className='cb-wrp'>
            <input type='checkbox'
                   onChange={this.handleChange}
                   name='toggleDateSel'
                   id='toggleDateSel'
                   className='cb-input'
                   checked={this.state.disabledDatePick}></input>
            <label htmlFor='toggleDateSel'>Ayrintili Tarih Sec</label>
          </div>
          {
            <div>
              <input name='dateMin' id='dateMin' 
                      value={this.state.visitQuery.dateMin} 
                      onChange={this.handleChange} 
                      type='date'
                      className='kb-input'
                      disabled={!this.state.disabledDatePick}/>
              <input name='dateMax' id='dateMax' 
                      value={this.state.visitQuery.dateMax} 
                      onChange={this.handleChange} 
                      type='date'
                      className='kb-input'
                      disabled={!this.state.disabledDatePick}/>
            </div>
          }
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
                          checked={this.state.visitQuery.allVisitors.includes(key)}
                          className='cb-input'></input>
                  <label htmlFor={visCBKey} key={uuid()}>{key}</label>
                </div>
              })
            }
          </div>
        </div>
        <div className='input-blocks'>
          <b>Yapılan İş Ara</b>
          <input type='text' name='workDone' id='workDone' 
                 value={this.state.visitQuery.workDone} 
                 onChange={this.handleChange}
                 className='kb-input'
                 placeholder='Yapilan Is'/>
        </div>
        <div className='input-blocks'>
          <b>Yapılan Masraf Aralığı</b>
          <input name='costMin' id='costMin' 
                  value={this.state.visitQuery.costMin} 
                  onChange={this.handleChange} 
                  type='number'
                  className='kb-input'
                  placeholder='Min'/>
          <input name='costMax' id='costMax' 
                  value={this.state.visitQuery.costMax} 
                  onChange={this.handleChange} 
                  type='number'
                  className='kb-input'
                  placeholder='Max'/>
        </div>
        <div>
            <div className='input-blocks'>
                <b>Giriş Saati Aralığı</b>
                <input name='startTimeMin' id='startTimeMin' 
                       value={this.state.visitQuery.startTimeMin} 
                       onChange={this.handleChange} 
                       type='time'
                       className='kb-input'/>
                <input name='startTimeMax' id='startTimeMax' 
                       value={this.state.visitQuery.startTimeMax} 
                       onChange={this.handleChange} 
                       type='time'
                       className='kb-input'/>
            </div>
            <div className='input-blocks'>
                <b>Çıkış Saati Aralığı</b>
                <input name='endTimeMin' id='endTimeMin' 
                       value={this.state.visitQuery.endTimeMin} 
                       onChange={this.handleChange} 
                       type='time'
                       className='kb-input'/>
                <input name='endTimeMax' id='endTimeMax' 
                       value={this.state.visitQuery.endTimeMax} 
                       onChange={this.handleChange} 
                       type='time'
                       className='kb-input'/>
            </div>
        </div>
        <div className='input-blocks'>
          <button type='button' onClick={this.handleClear}>Yenile</button>
        </div>
      </form>
    )
  } 
}
