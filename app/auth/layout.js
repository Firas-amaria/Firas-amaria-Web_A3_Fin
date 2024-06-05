import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

/**
 * AuthLayout is a functional component that handles the layout for authenticated and unauthenticated users.
 * It uses Next.js's getServerSession function to check if a user is authenticated.
 * If the user is authenticated, it redirects to the dashboard page.
 * If the user is not authenticated, it renders the children components.
 *
 * @param {Object} props - The props passed to the AuthLayout component.
 * @param {React.ReactNode} props.children - The children components to be rendered.
 *
 * @returns {React.ReactElement} - The rendered component.
 */

const AuthLayout = async ({children}) => {
  // Use Next.js's getServerSession function to get the user session

  const session = await getServerSession(authOptions);

  return session ? (
    redirect('/dashboard')
  ) : (
    <div>
      {children}
    </div>
  )
}

export default AuthLayout