'use client';

import {SessionProvider} from 'next-auth/react';

/**
 * Higher-order component (HOC) that wraps a component with NextAuth's SessionProvider.
 * This allows the component to access and use the session data provided by NextAuth.
 *
 * @function withSession
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped with the SessionProvider.
 * @returns {React.FC<React.ComponentProps<typeof WrappedComponent>>} - The wrapped component with SessionProvider.
 * @example
 * import { withSession } from './withSession';
 *
 * const MyComponent = () => {
 *   // Component logic
 * };
 *
 * export default withSession(MyComponent);
 */
const withSession = (WrappedComponent) => {
    return (props) => {
        return (
            <SessionProvider>
                <WrappedComponent {...props} />
            </SessionProvider>
        );
    };
};


export default withSession;