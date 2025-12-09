import React from 'react'
import Header from './_components/header'
import { InterviewProvider } from '@/context/interviewData'
const InterviewLayout = ({ children }) => {
    return (
        <div className=''>
            <Header />
            <InterviewProvider>
                {children}
            </InterviewProvider>

        </div>
    )
}

export default InterviewLayout
