import React, { Component } from 'react'
import Visit from './Visit'

export default class VisitList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Ziyaret Yeri</th>
                        <th>Tarih</th>
                        <th>Giris Saati</th>
                        <th>Cikis Saati</th>
                        <th>Ziyaretciler</th>
                        <th>Yapilan Is</th>
                        <th>Yapilan Masraf</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.visits.map((visit) => {
                        return <Visit key={visit.id} visit={visit}/>
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        )
    }
}
