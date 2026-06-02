import { render, screen } from '@testing-library/react'
import { SiteHeaderChrome } from './SiteHeaderChrome'

describe('SiteHeaderChrome', () => {
  it('shows Hack Pack when the visitor has portal access', () => {
    render(<SiteHeaderChrome showHackPack />)

    expect(screen.getByRole('link', { name: 'Hack Pack' })).toHaveAttribute('href', '/hackpack')
  })

  it('hides Hack Pack when the visitor does not have portal access', () => {
    render(<SiteHeaderChrome showHackPack={false} />)

    expect(screen.queryByRole('link', { name: 'Hack Pack' })).toBeNull()
  })
})
