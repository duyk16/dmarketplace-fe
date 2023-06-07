'use client'
import { Footer, Header } from '@/components'
import { Web3Provider } from '@/provider'
import './globals.css'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>DMarket</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-between bg-white">
        <Web3Provider>
          <Header />
          <main className="flex flex-col items-center justify-between flex-1 w-full mt-20 p-4">
            {children}
          </main>
          <Footer />
        </Web3Provider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
      </body>
    </html>
  )
}
