import Link from 'next/link'
import React from 'react'

/**
 * The AssignmentCard component is responsible for rendering an individual assignment card on the course page.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.assignment - The assignment object containing details such as title, course, and submissions.
 * @param {Object} props.student - The student object if the user is a student, otherwise null.
 * 
 * @returns {JSX.Element} - The JSX element representing the assignment card.
 */
const AssignmentCard = ({assignment, student}) => {
  return (
    <div>
        <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-500 flex justify-between items-center px-6 py-4">
            <div>
                <h3 className='font-medium dark:text-gray-100'>{ assignment.title} </h3>
                <p className=' dark:text-gray-300'>Course: { assignment.course.name }</p>
            </div>
            <div className='flex gap-2 items-center'>
                <p className='dark:text-gray-400'>Completed by { assignment.submissions.length }/{ assignment.course.enrolled.length } Students</p>
                {
                    student ? (
                        <Link href={`/assignments/submit/${assignment._id}?courseId=${assignment.course._id}`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</Link>
                    ) : (
                        <Link href={`/assignments/${assignment._id}`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View</Link>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default AssignmentCard