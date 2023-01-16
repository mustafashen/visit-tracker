import React, { Component } from 'react'
import NewEntrySection from './NewVisitForm'
import VisitList from './VisitList'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visits: [
          
        ],
        visitorChoices: ['Basri', 'Kemal', 'Pinar', 'Gizem']
    }

    this.create = this.create.bind(this)
  }

  create(visit) {
    this.setState({visits: [...this.state.visits, {...visit}]})
    console.log(this.state.visits)
  }

  render() {
    return (
      <div>
        <NewEntrySection createNewVisit={this.create} visitorChoices={this.state.visitorChoices}/>
        <VisitList visits={this.state.visits}/>
      </div>
    )
  }
}
