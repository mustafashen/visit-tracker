import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import NewEntrySection from '../components/NewVisitForm'

describe('NewEntrySection', () => {

    it('renders without errors', () => {
        const visitorChoices = ['Basir', 'Kemal', 'Pinar', 'Gizem']
        const locationChoices = ['Baytek', 'Cemsel', 'Erbek', 'Bilge']

        const {container} = render(<NewEntrySection locationChoices={locationChoices}
                                visitorChoices={visitorChoices}/>)
        
        // check if all elements are there
        
        // Visit location inputs
        locationChoices.forEach(loc => {
            const radioButtons = screen.getByRole('radio', {name: new RegExp(loc)})
            expect(radioButtons).toBeInTheDocument()
        })
        
        // Date input
        //eslint-disable-next-line
        const date = container.querySelector('#date')
        expect(date).toBeInTheDocument()
        
        // Start time input
        //eslint-disable-next-line
        const startTime = container.querySelector('#startTime')
        expect(startTime).toBeInTheDocument()

        // end time input
        //eslint-disable-next-line
        const endTime = container.querySelector('#endTime')
        expect(endTime).toBeInTheDocument()

        // Visitor inputs
        visitorChoices.forEach(visitor => {
            const checkBoxes = screen.getByRole('checkbox', {name: new RegExp(visitor)})
            expect(checkBoxes).toBeInTheDocument()
        })

        // Work done input
        //eslint-disable-next-line
        const workDone = container.querySelector('#workDone')
        expect(workDone).toBeInTheDocument()

        // Cost input
        //eslint-disable-next-line
        const cost = container.querySelector('#cost')
        expect(cost).toBeInTheDocument()

        // Add button
        //eslint-disable-next-line
        const addButton = screen.getByRole('button', {name: /ziyaret ekle/i})
        expect(addButton).toBeInTheDocument()

        // Clear button
        //eslint-disable-next-line
        const clearButton = screen.getByRole('button', {name: /temizle/i})
        expect(clearButton).toBeInTheDocument()

    })
})