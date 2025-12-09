import React from 'react'
import { Calendar, Clock, MessageCircleQuestionIcon } from 'lucide-react'
const InterviewDetailsContainer = ({ interviewDetails }) => {
    return (
        <div className='p-5 rounded-lg mt-3 bg-amber-200'>
            hi i am interview details container
            <h2>{interviewDetails?.job}</h2>
            <div className='lg:pr-52 flex items-center justify-between'>
                <div className='mt-4'>
                    <h2 className='text-sm'>DURATION</h2>
                    <h2 className='font-bold gap-2 items-center flex text-md'><Clock className='h-4 w-4' />{interviewDetails?.Duration}sample</h2>
                </div>
                <div className='mt-4'>
                    <h2 className='text-sm'>Created at</h2>
                    <h2 className='font-bold gap-2 items-center flex text-md'><Calendar className='h-4 w-4' />{interviewDetails?.created_at}sample</h2>
                </div>
                <div className='mt-4'>
                    <h2 className='text-sm'>Type</h2>
                    <h2 className='font-bold gap-2 items-center flex text-md'><Clock className='h-4 w-4' />{interviewDetails?.type}sample</h2>
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='font-bold'>Job Description</h2>
                <p className='text-sm loading-6'>{interviewDetails?.jobDesc}lets see what is your job description is hi bye 2 cyp cgu</p>
            </div>
            <div className='mt-4'>
                <h2 className='font-bold'>Interview Questions</h2>
                <div className='grid grid-cols-2 gap-4 mt-3'>
                    {interviewDetails?.questionList.map((item, key) => (
                        <h2 className="flex text-xs" key={key}><MessageCircleQuestionIcon className='h-4 w-4' />{index + 1}.{item?.question}</h2>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InterviewDetailsContainer
