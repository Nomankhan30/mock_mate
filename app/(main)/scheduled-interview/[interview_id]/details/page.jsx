"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import { useEffect, useState } from 'react'
import InterviewDetailsContainer from './_components/InterviewDetailsContainer'
import CandidateList from './_components/CandidateList'
const Interview_Details = () => {
    const { interview_id } = useParams()
    const { user } = useUser()
    const [Interview_Details, setInterview_Details] = useState()
    const GetInterviewDetail = async () => {
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq("userEmail", user?.email)
            .eq("interviewId", interview_id)
            .order("created_at", { ascending: false })


        console.log("INTERVIEWS VALUE from details", Interviews)
        setInterview_Details(Interviews?.data?.[0])

    }
    useEffect(() => {
        user && GetInterviewDetail()

    }, [user])
    return (
        <div className='mt-5'>
            <h2 className='text-2xl font-bold'>Interview Details</h2>
            <InterviewDetailsContainer interviewDetails={Interview_Details} />
            <CandidateList candidates={Interview_Details?.["Interview_Feedback"]?.[0]} />
        </div>
    )
}

export default Interview_Details
