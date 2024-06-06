'use client';
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";

/**
 * CreateAssignment component for creating new assignments.
 * @returns {JSX.Element} - The JSX element for the CreateAssignment component.
 */
const CreateAssignment = () => {
    // State variables for error and submitting status
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    // Get parameters from the URL
    const params = useParams();
     // Get router object for navigation
    const router = useRouter();

    /**
     * Handle form submission for creating a new assignment.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Set submitting status to true
        setSubmitting(true);

        // Send POST request to create a new assignment
        const reponse = await fetch('/api/assignments/create', {
            method: 'POST',
            body: formData
        })

        // Check the response status
        if(reponse.status === 200) {
            // Set submitting status to false
            setSubmitting(false);

            // Show success toast
            toast.success('Assignment created successfully');

            // Navigate to the course page
            router.push('/courses/' + params.courseId);
        }else{
            // Show error toast
            toast.error('Something went wrong');
            return;
        }
    }

    return (
        <div>
            <div className="w-full m-auto max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create new assignment</h5>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment title</label>
                        <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Assignment name" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment description</label>
                        <textarea name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Assignment details" rows="5" ></textarea>
                    </div>

                    <input type="hidden" name="courseId" value={params.courseId} />


                    {error && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{submitting ? 'Creating...' : 'Create assignment'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAssignment