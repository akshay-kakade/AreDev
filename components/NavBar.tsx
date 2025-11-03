
'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from 'next/dynamic'
import { Menu, X } from "lucide-react"
import GradientText from "./GradientText"
import GooeyNav from './GooeyNav'

const items = [
  { label: "Home", href: "/" },
  { label: "Create Event", href: "/admin" },
  { label: "Manage Event", href: "/admin/events" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  return (
    <header className="w-full sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <Image src="/icons/logo.png" alt="logo" width={48} height={48} />
          <GradientText
            colors={["#40ffaa", "#407900", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="text-2xl font-bold"
          >
            AreDev
          </GradientText>
        </Link>

        {/* Desktop nav */}
        <div className="ml-auto max-w-full overflow-x-auto hidden sm:block">
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

      
        <button
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden ml-auto p-2 rounded-md border border-white/10 text-white/80 hover:text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

   
      <div
        id="mobile-menu"
        className={`${open ? 'block' : 'hidden'} sm:hidden px-4 pb-3`}
      >
       <ul className="flex flex-col gap-2 list-none rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className={`block w-full rounded-md px-3 py-2 text-base ${
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                    ? 'bg-[#5dfeca] text-[#0b1f17]'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul> 
      </div>
    </header>
  )
}

const DynamicNavBar = dynamic(() => Promise.resolve(NavBar), { ssr: false })

export default DynamicNavBar

///01:25:49
///01:25:49
