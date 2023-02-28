import React, { Component } from 'react'
import Visit from './Visit'

export default class VisitList extends Component {
    render() {
        return (
            <table id='VisitList'>
                <thead>
                    <tr>
                        <th>Ziyaret Yeri</th>
                        <th>Tarih</th>
                        <th>Giris Saati</th>
                        <th>Cikis Saati</th>
                        <th>Ziyaretciler</th>
                        <th>Yapilan Is</th>
                        <th>Yapilan Masraf</th>
                        <th>Duzenle</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.visits.map((visit) => {
                        return <Visit key={visit.id} visit={visit} 
                                      deleteVisit={this.props.deleteVisit}
                                      activateEdit={this.props.activateEdit}/>
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        )
    }
}
