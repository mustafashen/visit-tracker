import React, { Component } from 'react'
import NewEntrySection from './NewVisitForm'
import QueryForm from './QueryForm'
import VisitList from './VisitList'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visits: [
          
        ],
        visitorChoices: ['Basri', 'Kemal', 'Pinar', 'Gizem'],
        locationChoices: ['Baytek', 'Cemsel', 'Erbek', 'Bilge']
    }

    this.create = this.create.bind(this)
    this.refreshState = this.refreshState.bind(this)
    this.query = this.query.bind(this)
  }

  async refreshState(stringInput) {
    const proxyServer = 'https://visit-cors-proxy.onrender.com/'
    const readRoute = 'https://visit-tracker-server.onrender.com/read-visit/'
    const queryString = stringInput ? `?${stringInput}` : ''
    const route = `${proxyServer}${readRoute}${queryString}`
    console.log(route)
    fetch(route, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resolve => resolve.json())
    .then(result => {
      console.log(result)
      if(Object.keys(result).length === 0) throw 'No result'
      else this.setState({visits: result})
    })
    .catch(err => {
      this.setState({visits: []})
      console.log(err)
    })
  }

  async create(visit) {
    
    // this.setState({visits: [...this.state.visits, {...visit}]})

    const proxyServer = 'https://visit-cors-proxy.onrender.com/'
    const createRoute = 'https://visit-tracker-server.onrender.com/create-visit'

    fetch(`${proxyServer}${createRoute}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `{"params": ${JSON.stringify(visit)}}`
    })
    .then(resolve => resolve.json())
    .then(result => {console.log(result)})
    .then(this.refreshState())

    // console.log(`{"params": ${JSON.stringify(visit)}}`)
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
        queryString += `cost=[${queryParams.costMin ? queryParams.costMin : ''},
                                 ${queryParams.costMax ? queryParams.costMax : ''}]`}
    if(queryParams.dateMin || queryParams.dateMax) {
        if(queryString) queryString += '&'
        queryString += `dates=[${queryParams.dateMin ? `"${queryParams.dateMin}"` : ''},
                                  ${queryParams.dateMax ? `"${queryParams.dateMax}"` : ''}]`}
    if(queryParams.startTimeMin || queryParams.startTimeMax) {
        if(queryString) queryString += '&'
        queryString += `startTimeRange=[${queryParams.startTimeMin ? `"${queryParams.startTimeMin}"`: ''},
                                      ${queryParams.startTimeMax ? `"${queryParams.startTimeMax}"` : ''}]`}
    if(queryParams.endTimeMin || queryParams.endTimeMax) {
        if(queryString) queryString += '&'
        queryString += `endTimeRange=[${queryParams.endTimeMin ? `"${queryParams.endTimeMin}"` : ''},
                                    ${queryParams.endTimeMax ? `"${queryParams.endTimeMax}"` : ''}]`}
    
    console.log(queryString)

    this.refreshState(queryString)
  }

  async componentDidMount() {
    await this.refreshState()
  }

  render() {
    return (
      <div>
        <NewEntrySection createNewVisit={this.create} 
                         visitorChoices={this.state.visitorChoices}/>
        <QueryForm locationChoices={this.state.locationChoices} 
                   visitorChoices={this.state.visitorChoices}
                   makeNewQuery={this.query}/>
        <VisitList visits={this.state.visits}/>
      </div>
    )
  }
}
