import React, { Component } from 'react'
import NewEntrySection from './NewVisitForm'
import Order from './Order'
import QueryForm from './QueryForm'
import UpdateVisitForm from './UpdateVisitForm'
import VisitList from './VisitList'
import moment from 'moment'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visits: [],
        visitorChoices: ['Basri', 'Kemal', 'Pinar', 'Gizem'],
        locationChoices: ['Baytek', 'Cemsel', 'Erbek', 'Bilge'],
        visitToUpdate: ''
    }

    this.create = this.create.bind(this)
    this.refreshState = this.refreshState.bind(this)
    this.query = this.query.bind(this)
    this.delete = this.delete.bind(this)
    this.activateEdit = this.activateEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.update = this.update.bind(this)
  }

  async refreshState(stringInput) {
    await window.electron.get(stringInput)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        console.log(result)
        this.setState({visits: result.visits})
      }
    })

  }

  async create(visit) {
    console.log(visit)
    await window.electron.post(visit)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        console.log(result)
        this.refreshState()
      }
    })
  }

  async query(queryParams) {
    let queryString = ``
    console.log(queryParams)
    if(queryParams.allLocations) {
        if(queryString) queryString += '&'
      queryString += `loc=${JSON.stringify(queryParams.allLocations)}`}
    if(queryParams.allVisitors) {
        if(queryString) queryString += '&'
      queryString += `allVisitors=${JSON.stringify(queryParams.allVisitors)}`}
    if(queryParams.workDone) {
        if(queryString) queryString += '&'
      queryString += `workSearch="${queryParams.workDone}"`}
    // if(queryParams.visitorClause) {
    //     if(queryString) queryString += '&'
    //   queryString += `"visitorClause":"${queryParams.visitorClause}"`}
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
    if(queryParams.order) {
      if(queryString) queryString += '&'
      queryString += `order=["${queryParams.order[0]}","${queryParams.order[1]}"]`
    }
    console.log(queryString)

    this.refreshState(queryString)
  }

  async delete(id) {
    window.electron.delete(id)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        console.log(result)
        this.refreshState()
      }
    })
  }

  async update(visit) {
    window.electron.put(visit)
    .then(result => {
      if(result.Error) console.log(result.Error)
      else {
        console.log(result)
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
      visitToUpdate: ''
    }, () => console.log(this.state))
  }

  async componentDidMount() {
    await this.refreshState()
  }

  render() {
    return (
      <div>
        <NewEntrySection createNewVisit={this.create} 
                         visitorChoices={this.state.visitorChoices}
                         locationChoices={this.state.locationChoices}/>
        <QueryForm locationChoices={this.state.locationChoices} 
                   visitorChoices={this.state.visitorChoices}
                   makeNewQuery={this.query}/>
        <Order makeNewQuery={this.query}/>
        <VisitList visits={this.state.visits}
                   deleteVisit={this.delete}
                   activateEdit={this.activateEdit}/>
        {this.state.visitToUpdate ? <UpdateVisitForm updateVisit={this.update}
                                    visitorChoices={this.state.visitorChoices}
                                    locationChoices={this.state.locationChoices}
                                    closeEdit={this.closeEdit}
                                    visitToUpdate={this.state.visitToUpdate}/> 
                              : false}
      </div>
    )
  }
}
