'use client';
import { SessionProvider } from 'next-auth/react'
import React from 'react'

/**
 * this is a very important component for the Next.js structure
 * it contains the "children" property so that it can be used inside other layouts 
 * this can be used not only for the hidders but also the navbar and the dashboard layout
 */
const SessionWrapper = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper