import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileForm from "@/components/ProfileForm";
import { getServerSession } from "next-auth";

/**
 * Profile page component.
 * Fetches user session and renders the ProfileForm component with user data.
 * 
 * @returns {JSX.Element} - The Profile page component.
 */
const Profile = async () => {
    /**
     * Fetch the server session using next-auth's getServerSession function.
     * 
     * @param {object} authOptions - The options for the auth route.
     * @returns {Promise<object>} - The server session object.
     */
    const session = await getServerSession(authOptions);
    /**
     * Extract the user data from the session object.
     * 
     * @type {object}
     */
    const user = session?.user;

    return (
        <div className='w-full pt-10'>
            <div className="w-full m-auto max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <ProfileForm data={user} />
            </div>
        </div>
    )
}

export default Profile