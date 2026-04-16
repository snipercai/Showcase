import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag>Tag Content</Tag>)
    expect(screen.getByText('Tag Content')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Tag variant="primary">Primary Tag</Tag>)
    const tag = screen.getByText('Primary Tag')
    expect(tag).toHaveClass('bg-accent-primary/10')
  })

  it('handles click events when onClick is provided', () => {
    const handleClick = vi.fn()
    render(<Tag onClick={handleClick}>Clickable Tag</Tag>)
    fireEvent.click(screen.getByText('Clickable Tag'))
    expect(handleClick).toHaveBeenCalled()
  })
})
