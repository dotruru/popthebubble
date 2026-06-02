import { render, screen, fireEvent } from '@testing-library/react'
import { HackPackView } from './HackPackView'

describe('HackPackView', () => {
  it('defaults to the Check in tab', () => {
    render(<HackPackView />)
    const checkinTab = screen.getByRole('tab', { name: 'Check in' })
    expect(checkinTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/36h build clock/i)).toBeInTheDocument()
    expect(screen.getByText(/Start here when you arrive/i)).toBeInTheDocument()
    const frame = screen.getByTitle('Check-in form') as HTMLIFrameElement
    expect(frame.src).toContain('https://airtable.com/embed/app8MAWW2caOl7ooC/pagdY3ibpv6H3Xi6o/form')
    expect(frame).toHaveAttribute('height', '533')
  })

  it('switches to the Milestones tab on click', () => {
    render(<HackPackView />)
    fireEvent.click(screen.getByRole('tab', { name: 'Milestones' }))
    expect(screen.getByText(/Post a milestone update/i)).toBeInTheDocument()
  })
})
