"use client"
import React from 'react'
import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
const InterviewModes = () => {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <Link href="dashboard/create-interview" className='border-2 m-2 p-2 rounded-lg cursor-pointer'>
                <Video className='p-3 bg-blue-100 w-15 h-13 text-primary' />
                {/* className='w-[15px] text-black p-3  h-[14px]'  */}
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-black'>Create Interviews with AI to schedule them with candidates</p>
            </Link>
            <Link href="/phone_screening">
                <div className='border-2 m-2 p-2 rounded-lg'>
                    <Phone className='bg-blue-100  w-15 h-13 p-3 text-primary' />
                    <h2 className='font-bold'>Create Phone Screening Calls</h2>
                    <p className='text-black'>Kickstart your interview flow with quick phone screenings.</p>
                </div>
            </Link>

        </div>
    )
}

export default InterviewModes
