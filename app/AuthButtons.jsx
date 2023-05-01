'use client'
import { signIn, signOut } from 'next-auth/react'
import './css/components/buttons.css'

const LoginButton = ({ name, id }) => {
    return (
        <button
            className='button'
            onClick={() => signIn(id, { callbackUrl: '/' })}
            >Login with {name}</button>
    )   
}

const LogoutButton = () => {
    return (
        <button onClick={() => signOut()}>Log out</button>
    )
}

export { LoginButton, LogoutButton }