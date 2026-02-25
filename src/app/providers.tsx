import { ReactNode } from 'react'
import { ThemeProvider, DataProvider } from '@/shared/hooks'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </ThemeProvider>
  )
}
