"use client"
import { useUser } from '@/app/provider'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Interview_Card from '../dashboard/components/interview_card'
const Scheduled_Interviews = () => {
    const { user } = useUser()
    const [interviewList, setInterviewList] = useState([])
    console.log("INTERVIEW LIST VALUE", interviewList)
    const GetInterviewList = async () => {
        const { data, error } = await supabase.from("Interviews")
            .select('created_at,job,Duration,interviewId,Interview_Feedback(userEmail)')
            .eq('userEmail', user?.email)
        //
        // console.log("USER EMAIL:", userEmail)
        // debugger
        // const { data, error } = await supabase.from("Interviews")
        //     .select('job,Duration')
        //     .eq("userEmail", user?.email)

        // .order("id", { ascending: false })
        console.log("scheduled list data result has come", data)
        if (error) {
            console.log("eerror", error)
        }
        else {
            console.log("datoo", data)
            setInterviewList(data)
        }
    }
    useEffect(() => {
        //INVOKE() WHEN USER NOT NULL
        console.log("user ine ffect", user)
        user && GetInterviewList()

    }, [user])
    return (
        <div >
            <h2 className="font-bold text-xl">Interview List with Candidate Feedback</h2>
            {interviewList?.length == 0 &&
                <div className='flex flex-col gap-3 p-5 items-center '>
                    <Video className='w-15 h-13 bg-blue-100 text-primary' />
                    <h2>You haven&apos;t created any Interview yet.</h2>
                    <Button>+ Create New Interview</Button>
                </div>
            }
            {interviewList.length > 0 &&
                < div className='gap-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                    {interviewList.map((interviewItem, key) => (
                        <Interview_Card viewDetails={true} interview={interviewItem} key={key} />

                    ))
                    }
                    {/* gap-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
                </div>
            }

            {/* REQUIRES TWO THINGS: 1)InterviewInfo/details
            2)feedback */}

        </div >
    )
}

export default Scheduled_Interviews
