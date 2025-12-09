"use client"
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import Interview_Card from '../dashboard/components/interview_card'
const Page = () => {
    console.log("all interviewsyyy list")
    const [interviewList, setInterviewList] = useState([])
    const { user } = useUser()
    console.log("user value", user)
    const GetInterviewList = async () => {
        // debugger
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq("userEmail", user?.email)
            .order("created_at", { ascending: false })


        console.log("INTERVIEWS VALUE", Interviews)
        setInterviewList(Interviews)
    }
    useEffect(() => {
        //if user exists
        user && GetInterviewList()
        // debugger;
    }, [user])
    return (
        <div className=' my-5'>
            <h2 className='p-2 font-bold text-2xl'>ALL Created Interviews</h2>

            {interviewList.length == 0 &&
                <div className='flex flex-col gap-3 p-5 items-center '>
                    <Video className='w-15 h-13 bg-blue-100 text-primary' />
                    <h2>You haven&apos;t created any Interview yet.</h2>
                    <Button>+ Create New Interview</Button>
                </div>
            }
            {interviewList.length > 0 &&
                <div className=' gap-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  '>
                    {interviewList.map((interviewItem, key) => (
                        <Interview_Card interview={interviewItem} key={key} />
                    ))
                    }
                    {/* gap-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
                </div>
            }
        </div>

    )
}

export default Page
