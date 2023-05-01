'use client'
import { signIn } from 'next-auth/react'
import '../css/components/buttons.css'

const LoginButton = ({ name, id }) => {
    return (
        <button
            className='button'
            onClick={() => signIn(id, { callbackUrl: '/' })}
            >Login with {name}</button>
    )   
}

export default LoginButton