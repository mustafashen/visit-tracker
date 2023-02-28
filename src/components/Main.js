import React, { Component } from 'react'
import NewEntrySection from './NewVisitForm'
import QueryForm from './QueryForm'
import UpdateVisitForm from './UpdateVisitForm'
import VisitList from './VisitList'
import moment from 'moment'
import editIcon from '../assets/page.png'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visits: [],
        visitorChoices: ['Basir', 'Kemal', 'Pinar', 'Gizem'],
        locationChoices: ['Baytek', 'Cemsel', 'Erbek', 'Bilge'],
        visitToUpdate: '',
        newVisitShow: false
    }

    this.create = this.create.bind(this)
    this.refreshState = this.refreshState.bind(this)
    this.query = this.query.bind(this)
    this.delete = this.delete.bind(this)
    this.activateEdit = this.activateEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.update = this.update.bind(this)
    this.closeAddForm = this.closeAddForm.bind(this)
  }

  // Makes a new get request and sets state
  // This is go to get method after every API operation
  
  async refreshState(stringInput) {
    await window.electron.get(stringInput)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        this.setState({visits: result.visits})
      }
    })

  }

  async create(visit) {
    await window.electron.post(visit)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        this.refreshState()
      }
    })
  }
  
  // Creates get query string with given parameters
  // Makes get request via refreshState
  async query(queryParams) {
    let queryString = ``
    if(queryParams.allLocations) {
        if(queryString) queryString += '&'
      queryString += `loc=${JSON.stringify(queryParams.allLocations)}`}
    if(queryParams.allVisitors) {
        if(queryString) queryString += '&'
      queryString += `allVisitors=${JSON.stringify(queryParams.allVisitors)}`}
    if(queryParams.workDone) {
        if(queryString) queryString += '&'
      queryString += `workSearch="${queryParams.workDone}"`}
    if(queryParams.costMin || queryParams.costMax) {
        if(queryString) queryString += '&'
        queryString += `cost=[${queryParams.costMin ? queryParams.costMin : '""'},
                                 ${queryParams.costMax ? queryParams.costMax : '""'}]`}
    if(queryParams.dateMin || queryParams.dateMax) {
        if(queryString) queryString += '&'
        queryString += `dates=[${queryParams.dateMin ? `"${queryParams.dateMin}"` : '""'},
                                  ${queryParams.dateMax ? `"${queryParams.dateMax}"` : '""'}]`}
    if(queryParams.startTimeMin || queryParams.startTimeMax) {
        if(queryString) queryString += '&'
        queryString += `startTimeRange=[${queryParams.startTimeMin ? `"${queryParams.startTimeMin}"`: '""'},
                                      ${queryParams.startTimeMax ? `"${queryParams.startTimeMax}"` : '""'}]`}
    if(queryParams.endTimeMin || queryParams.endTimeMax) {
        if(queryString) queryString += '&'
        queryString += `endTimeRange=[${queryParams.endTimeMin ? `"${queryParams.endTimeMin}"` : '""'},
                                    ${queryParams.endTimeMax ? `"${queryParams.endTimeMax}"` : '""'}]`}
    if(queryParams.orderSelection) {
      if(queryString) queryString += '&'
      queryString += `order=["${queryParams.orderSelection[0]}","${queryParams.orderSelection[1]}"]`
    }

    this.refreshState(queryString)
  }


  async delete(id) {
    window.electron.delete(id)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        this.refreshState()
      }
    })
  }

  async update(visit) {
    window.electron.put(visit)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        this.refreshState()
      }
    })
  }

  async activateEdit(visit) {
    visit = {...visit}
    visit.loc = visit.loc[0]
    visit.date = moment(visit.date).format('YYYY-MM-DD')
    visit.startTime = visit.startTime.slice(0, 5)
    visit.endTime = visit.endTime.slice(0, 5)

    this.setState({
      visitToUpdate: ''
    }, () => {
      this.setState({
        visitToUpdate: visit
      }, () => console.log(this.state))
    })

  }

  closeEdit() {
    this.setState({
      visitToUpdate: false
    }, () => console.log(this.state))
  }

  closeAddForm() {
    this.setState({
      newVisitShow: false
    }, () => console.log(this.state))
  }

  async componentDidMount() {
    await this.refreshState()
  }

  render() {
    return (
      <div id='Main'>
        <div id='sidebar'>
          <div>
            <button id='add-visitor-btn' 
                    onClick={() => {this.setState({newVisitShow: true})}}>
              <img src={editIcon}/>
              <b>Ziyaret Ekle</b>
            </button>
            {
              this.state.newVisitShow ? 
              <NewEntrySection createNewVisit={this.create} 
                visitorChoices={this.state.visitorChoices}
                locationChoices={this.state.locationChoices}
                closeAddForm={this.closeAddForm}/> :
              false
            }
          </div>
          <div>
            <QueryForm locationChoices={this.state.locationChoices} 
              visitorChoices={this.state.visitorChoices}
              makeNewQuery={this.query}/>
          </div>
        </div>
        <div id='content'>
          <VisitList visits={this.state.visits}
            deleteVisit={this.delete}
            activateEdit={this.activateEdit}/>
          {
            this.state.visitToUpdate ? <UpdateVisitForm updateVisit={this.update}
                                        visitorChoices={this.state.visitorChoices}
                                        locationChoices={this.state.locationChoices}
                                        closeEdit={this.closeEdit}
                                        visitToUpdate={this.state.visitToUpdate}/> 
                                     : false
          }
        </div>
      </div>
    )
  }
}
