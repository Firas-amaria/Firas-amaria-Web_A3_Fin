'use client';
import { SessionProvider } from 'next-auth/react'
import React from 'react'

/**
 * This is a functional component that wraps its children with the NextAuth.js SessionProvider.
 * It is used to provide session management capabilities to its child components.
 * 
 * @param {React.ReactNode} children - The child components that will be wrapped by the SessionProvider.
 * @returns {React.ReactElement} - The wrapped child components with the SessionProvider.
 */
const SessionWrapper = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper