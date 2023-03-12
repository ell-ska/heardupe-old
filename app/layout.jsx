import Header from './Header.jsx'
import Footer from './Footer.jsx'
import './css/variables.css'
import './css/base.css'

export const metadata = {
  title: 'HeardleDupe',
  description: "A dupe of Spotify's music quiz Heardle",
  icons: {
    icon: '/favicon.svg'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Header></Header>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  )
}
