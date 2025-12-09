"use client"
import { useUser } from '@/app/provider'
import React from 'react'
import DashboardHeader from './components/dashboard_header'
import InterviewModes from './components/interviewmodes'
import AllInterviewsList from './components/all_interviews_list'
const dashboard = ({ children }) => {
    const user = useUser()
    return (
        <div className='w-full' >
            <DashboardHeader />
            <h2 className='my-4 mx-2 font-bold text-2xl'>DASHBOARD</h2>
            <InterviewModes />
            <AllInterviewsList />
        </div>
    )
}

export default dashboard
