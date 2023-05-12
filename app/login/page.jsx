import Image from 'next/image'
import { getProviders } from 'next-auth/react'
import { LoginButton } from '../../components/AuthButtons'
import './login.css'
import spotifyLogo from 'public/spotify-logo.svg'

const Login = async () => {
    const providers = await getProviders()

    return (
        <div className="login">
            <div className="login__inner">
                <div className="login__branding">
                    <h2>Heardupe</h2>
                    <span>x</span>
                    <Image src={spotifyLogo} alt="Spotify Logo"></Image>
                    {/* ADD: explanation text */}
                </div>
                {Object.values(providers).map(provider => {
                    return <LoginButton key={provider.id} {...provider}></LoginButton>
                })}
            </div>
        </div>
    )
}

export default Login