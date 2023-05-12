'use client'
import { signIn, signOut } from 'next-auth/react'
import '../app/css/components/buttons.css'

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
        <button className='button button--small' onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
    )
}

export { LoginButton, LogoutButton }