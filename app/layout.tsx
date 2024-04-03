import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-950 text-zinc-50 antialiased ${inter.className}`}
      >
        <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
          <Header />
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  )
}
