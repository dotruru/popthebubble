import { render, screen, fireEvent } from '@testing-library/react'
import { HackPackView } from './HackPackView'

describe('HackPackView', () => {
  it('defaults to the Check in tab', () => {
    render(<HackPackView />)
    const checkinTab = screen.getByRole('tab', { name: 'Check in' })
    expect(checkinTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Check in first so we know you're hacking/i)).toBeInTheDocument()
  })

  it('switches to the Milestones tab on click', () => {
    render(<HackPackView />)
    fireEvent.click(screen.getByRole('tab', { name: 'Milestones' }))
    expect(screen.getByText(/Post a milestone update/i)).toBeInTheDocument()
  })
})
