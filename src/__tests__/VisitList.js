import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import VisitList from '../components/VisitList'

describe('visit list', () => {

    const visits = [
        {
            id: '1',
            loc: ['Place1'],
            date: '2020-01-01',
            startTime: '09:00:00',
            endTime: '17:00:00',
            allVisitors: ['Employee1', 'Employee2'],
            workDone: 'Work1',
            cost: 12
        },        
        {
            id: '2',
            loc: ['Place2'],
            date: '2021-01-01',
            startTime: '10:00:00',
            endTime: '18:00:00',
            allVisitors: ['Employee2', 'Employee3'],
            workDone: 'Work2',
            cost: 121
        },

    ]

    test('lists visits properly', () => {
        render(<VisitList visits={visits}/>)

        const visits_table = screen.getByRole('table')

        // eslint-disable-next-line
        const visits_tbody = visits_table.querySelector('tbody')

        const visits_tbody_rows = within(visits_tbody).getAllByRole('row')
        expect(visits_tbody_rows).toHaveLength(visits.length)
    })
    
})