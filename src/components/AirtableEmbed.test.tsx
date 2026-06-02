import { render, screen } from '@testing-library/react'
import { AirtableEmbed } from './AirtableEmbed'

describe('AirtableEmbed', () => {
  it('renders an iframe when a src is provided', () => {
    render(<AirtableEmbed src="https://airtable.com/embed/shrABC" title="Check-in" />)
    const frame = screen.getByTitle('Check-in') as HTMLIFrameElement
    expect(frame.tagName).toBe('IFRAME')
    expect(frame.src).toContain('https://airtable.com/embed/shrABC')
  })

  it('renders a placeholder pointing to Discord when src is empty', () => {
    render(<AirtableEmbed src="" title="Check-in" />)
    expect(screen.queryByTitle('Check-in')).toBeNull()
    expect(screen.getByText(/pinned in our Discord/i)).toBeInTheDocument()
  })
})
