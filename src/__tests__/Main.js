import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import Main from '../components/Main'


describe('Main', () => {

    function renderMain() {
        window.electron = {
            get: mockAPI_Get
        }
        const {container} = render(<Main/>)

        return {container}
    }
    
    test('main component renders', async () => {

        const {container} = renderMain()
        // eslint-disable-next-line
        expect(container.querySelector('#Main')).toBeInTheDocument()
    })

    test('new visit form can be opened and closed', () => {
        const {container} = renderMain()

        const addButton = screen.getByRole('button', {name: /ziyaret ekle/i})
        
        user.click(addButton)

        // eslint-disable-next-line
        const newEntrySection = container.querySelector('#NewVisitForm')
        expect(newEntrySection).toBeInTheDocument()

        const closeButton = screen.getByRole('button', {name: /close button/i})
        user.click(closeButton)
        expect(newEntrySection).not.toBeInTheDocument()

    })

})

function mockAPI_Get() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({visits: [{
                id: '1',
                loc: ['Place1'],
                date: '2020-01-01',
                startTime: '09:00:00',
                endTime: '17:00:00',
                allVisitors: ['Employee1', 'Employee2'],
                workDone: 'Work1',
                cost: 12
            }]})
        }, 100)
    })
}
