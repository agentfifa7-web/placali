import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AIAssistant } from '@/components/ai-assistant'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <main className="site-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
      <AIAssistant />
    </main>
  )
}
