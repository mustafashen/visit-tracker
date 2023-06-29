import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import Visit from '../components/Visit'

describe('visit', () => {

    const visit = {
        id: '1',
        loc: ['Place1'],
        date: '2020-01-01',
        startTime: '09:00:00',
        endTime: '17:00:00',
        allVisitors: ['Employee1', 'Employee2'],
        workDone: 'Work1',
        cost: 12
    }

    test('edit button calls edit method with right args', () => {
        const activateEdit = jest.fn()

        render(<Visit visit={visit}
                      activateEdit={activateEdit}/>)
        
        const editButton = screen.getByRole('button', {name: /edit button/i})
        user.click(editButton)

        expect(activateEdit).toHaveBeenCalledWith(visit)
    })

    test('delete button calls delete method with right args', () => {
        const deleteVisit = jest.fn()

        render(<Visit visit={visit}
                      deleteVisit={deleteVisit}/>)
        
        const deleteButton = screen.getByRole('button', {name: /delete button/i})
        user.click(deleteButton)

        expect(deleteVisit).toHaveBeenCalledWith(visit.id)
    })

    test('a test', () => {

        const formattedVisit = [
            'Place1', '01/01/2020',
            '09:00', '17:00', 'Employee1, Employee2',
            'Work1', '12'
        ]

        render(<Visit visit={visit}/>)

        const row = screen.getByRole('row')
        //eslint-disable-next-line
        const cells = row.querySelectorAll('td')

        for (let i = 0; i < cells.length - 2; i++) {
            const cell = cells[i]
            expect(cell.textContent).toEqual(formattedVisit[i])
        }
    })

})