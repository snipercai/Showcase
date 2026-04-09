import { type InputHTMLAttributes, forwardRef } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="search"
        className={`w-full px-4 py-2 rounded-xl input-cyber ${className}`}
        {...props}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'
