import React, { Component } from 'react'

export default class Order extends Component {
  constructor(props) {
    super(props)
    this.orderVisits = this.orderVisits.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
        orderSelection: ''
    }
  }

  orderVisits() {
    const orderVal = '' + this.state.orderSelection
    console.log(orderVal)
    const orderArr = orderVal.split('-')
    console.log(orderArr)
    this.props.makeNewQuery({order: orderArr})       
  }
  
  handleChange(evt) {
    this.setState({
        orderSelection: evt.target.value
    }, () => this.orderVisits())
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange} value={this.state.orderSelection}>
            <option></option>
            <option value={'date-ASC'}>Tarihe gore artan</option>
            <option value={'date-DESC'}>Tarihe gore azalan</option>
            <option value={'cost-ASC'}>Masrafa gore artan</option>
            <option value={'cost-DESC'}>Mastafa gore azalan</option>
        </select>
      </div>
    )
  }
}
