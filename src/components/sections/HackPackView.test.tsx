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

  it('uses a horizontally scrollable tab list', () => {
    render(<HackPackView />)
    const tablist = screen.getByRole('tablist', { name: 'Scrollable hacker pack sections' })
    expect(tablist).toHaveStyle({ overflowX: 'auto' })
  })

  it('combines milestones and final submission in one progress tab', () => {
    render(<HackPackView />)
    fireEvent.click(screen.getByRole('tab', { name: 'Progress & Submit' }))
    expect(screen.getByText(/Milestones — post as you build/i)).toBeInTheDocument()
    expect(screen.getByText(/Your final submission/i)).toBeInTheDocument()
    expect(screen.getByTitle('Progress and final submission form')).toBeInTheDocument()
  })

  it('shows the complete judging rubric with point bands', () => {
    render(<HackPackView />)
    fireEvent.click(screen.getByRole('tab', { name: 'Judging' }))
    expect(screen.getByText(/90 core points/i)).toBeInTheDocument()
    expect(screen.getByText(/Does it actually work/i)).toBeInTheDocument()
    expect(screen.getByText(/judges complete full flow end-to-end themselves/i)).toBeInTheDocument()
    expect(screen.getByText(/Better than incumbent/i)).toBeInTheDocument()
    expect(screen.getByText(/>=50% on a measured metric users care about/i)).toBeInTheDocument()
    expect(screen.getByText(/Rigour & credibility/i)).toBeInTheDocument()
    expect(screen.getByText(/Money changed hands/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Build in public/i).length).toBeGreaterThan(0)
  })
})
