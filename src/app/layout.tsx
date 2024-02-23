import '@/styles/globals.css'
import { Metadata } from 'next'
import { cn } from "@/lib/utils"
import { Plus_Jakarta_Sans } from "next/font/google"

import { ReactNode } from "react"
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme/theme-provider'

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  icons: {
    icon: [{
      url: '/favicon.svg',
      href: '/favicon.svg'
    }]
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  )
}
