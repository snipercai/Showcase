import { type InputHTMLAttributes, forwardRef, useState, useCallback } from 'react'
import { Search, X, Loader2 } from 'lucide-react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
  isLoading?: boolean
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = '', onSearch, isLoading = false, ...props }, ref) => {
    const [value, setValue] = useState('')

    const handleClear = useCallback(() => {
      setValue('')
      onSearch?.('')
    }, [onSearch])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(value)
      }
      if (e.key === 'Escape') {
        handleClear()
      }
    }, [value, onSearch, handleClear])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      props.onChange?.(e)
    }, [props.onChange])

    return (
      <div className={`relative flex items-center ${className}`}>
        <Search className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2 rounded-xl input-cyber focus:outline-none focus:ring-2 focus:ring-accent-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          {...props}
        />
        {isLoading && (
          <Loader2 className="absolute right-10 w-4 h-4 text-text-muted animate-spin pointer-events-none" />
        )}
        {value && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors"
            tabIndex={-1}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
