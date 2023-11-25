import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layouts/Footer/Footer'
import Header from '@/components/layouts/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Black Fox Metaverse',
  description: 'BFM Location service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer/>
        </body>
    </html>
  )
}
