import { memo } from 'react'
import cn from 'classnames'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchInput = memo(function SearchInput({
  value,
  onChange,
  placeholder = '搜索...',
  className,
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'w-full px-4 py-3 rounded-xl',
        'input-cyber',
        'font-body text-sm',
        className
      )}
    />
  )
})
