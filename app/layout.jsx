import NextAuthProvider from './providers'
import Header from './Header'
import Footer from './Footer'
import './css/variables.css'
import './css/base.css'

export const metadata = {
  title: 'HeardleDupe',
  description: "A dupe of Spotify's music quiz Heardle",
  icons: {
    icon: '/favicon.svg'
  }
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
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