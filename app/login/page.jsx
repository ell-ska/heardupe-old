import Image from 'next/image'
import { Climate_Crisis } from 'next/font/google'
import { getProviders } from 'next-auth/react'
import { LoginButton } from '../../components/AuthButtons'
import './login.css'
import spotifyLogo from 'public/spotify-logo.svg'

const climateCrisis = Climate_Crisis({
	subsets: ['latin'],
	weight: '400',
})

const Login = async () => {
	const providers = await getProviders()

	return (
		<div className="login">
			<div className="login__inner">
				<div className={`login__branding ${climateCrisis.className}`}>
					<h2>Heardupe</h2>
					<span>x</span>
					<Image src={spotifyLogo} alt="Spotify Logo"></Image>
					{/* ADD: explanation text */}
				</div>
				{Object.values(providers).map((provider) => {
					return <LoginButton key={provider.id} {...provider}></LoginButton>
				})}
			</div>
		</div>
	)
}

export default Login
