'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Menu, X, Activity } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link className="flex shrink-0 items-center gap-2 hover:opacity-80 transition-opacity" href="/">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">MediChain</span>
          </Link>

          <Separator orientation="vertical" className="h-6 hidden lg:block" />

          <nav className="hidden lg:flex min-w-0 items-center gap-1">
            {links.map(({ label, path }) => (
              <Link key={path} href={path}>
                <Button variant={isActive(path) ? 'secondary' : 'ghost'} size="sm" className="relative">
                  {label}
                  {isActive(path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <WalletButton />
            <ClusterUiSelect />
            <ThemeSelect />
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {showMenu && (
        <div className="lg:hidden border-t">
          <div className="w-full py-4 px-4 space-y-4">
            <nav className="flex flex-col gap-2">
              {links.map(({ label, path }) => (
                <Link key={path} href={path} onClick={() => setShowMenu(false)}>
                  <Button variant={isActive(path) ? 'secondary' : 'ghost'} className="w-full justify-start" size="lg">
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>

            <Separator />

            <div className="flex flex-col gap-2">
              <WalletButton />
              <ClusterUiSelect />
              <ThemeSelect />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
