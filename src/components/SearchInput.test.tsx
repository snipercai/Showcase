import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
  it('renders input element', () => {
    render(<SearchInput />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('applies custom placeholder', () => {
    render(<SearchInput placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const handleChange = vi.fn()
    render(<SearchInput onChange={handleChange} />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalled()
  })
})
