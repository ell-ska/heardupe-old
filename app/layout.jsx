import { Lexend } from '@next/font/google'
import NextAuthProvider from './providers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './css/variables.css'
import './css/base.css'

export const metadata = {
  title: 'Heardupe',
  description: "A dupe of Spotify's music quiz Heardle",
  icons: {
    icon: '/favicon.svg'
  }
}

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '700']
})

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={lexend.className}>
      <body>
        <NextAuthProvider>
          <div className="container">
            <Header></Header>
            {children}
            <Footer></Footer>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}

export default RootLayout