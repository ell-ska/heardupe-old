'use client'
import { useSearchParams } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import '../app/css/components/buttons.css'

const LoginButton = ({ name, id }) => {

    const baseUrl = location?.origin
    const callbackUrl = useSearchParams().get('callbackUrl')

    // console.log(baseUrl + callback)

    return (
        <button
            className='button'
            onClick={() => signIn(id, { callbackUrl: `${baseUrl}${callbackUrl}` })}
        >Login with {name}</button>
    )   
}

const LogoutButton = () => {
    return (
        <button className='button button--small' onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
    )
}

export { LoginButton, LogoutButton }