'use client'

import NextNProgress from 'nextjs-progressbar'

export default function TopProgress() {
  return (
    <NextNProgress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow
      options={{ showSpinner: false }}
    />
  )
}
