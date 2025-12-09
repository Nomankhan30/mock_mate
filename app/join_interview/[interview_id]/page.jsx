"use client"
import React, { useEffect, useState } from 'react'
import Header from '../_components/header'
import Image from 'next/image'
import { Clock, Loader2Icon, MessageCircleWarning, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { useInterview } from '@/context/interviewData'
import { useRouter } from 'next/navigation'
// if (typeof window === "undefined") {
//     console.log("page.jsx SERVER → layout.jsx");
// } else {
//     console.log("CLIENT → layout.jsx");
// }

const Page = () => {
    console.log("wth")
    const { interview_id } = useParams()
    const [interviewData, setinterviewData] = useState()
    const [userName, setuserName] = useState()
    const [userEmail, setuserEmail] = useState()
    const [loading, setLoading] = useState(false)
    const { interviewInfo, setInterviewInfo } = useInterview()
    console.log("yes value rerender", interviewInfo)
    // debugger;
    const route = useRouter()
    const GetInterviewAllData = async () => {
        setLoading(true)
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select('*')
                .eq('interviewId', interview_id)

            if (Interviews.length == 0) {
                toast.error("INCORRECT INTERVIEW LINK")
                return;
            }
            console.log("my interviews value", Interviews)
            setinterviewData(Interviews) //local state
            setInterviewInfo({
                userName: userName,
                userEmail: userEmail,
                interviewData: Interviews[0]
            }
            )
            console.log("set interview data", interviewData)
            console.log("my interview bro", interviewInfo)
            setLoading(false)
            route.push("/join_interview/" + interview_id + "/start")
        }
        catch (e) {
            setLoading(false)
            console.log("error while retrieving all interview data based on id", e)
        }


    }
    const GetInterviewData = async () => {
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select('job, jobDesc, Duration, type')
                .eq('interviewId', interview_id)
            console.log("my interviews value", Interviews)
        }
        catch (e) {
            console.log("error while retrieving based on id", e)
        }


    }
    useEffect(() => {
        console.log("INTERVIEW ID", interview_id)
        interview_id && GetInterviewData()
    }, [interview_id])

    return (
        <div className=' border-amber-700 p-5 flex-col items-center border rounded-xl mt-15 px-10 md:px-25 lg:px-35 xl:px-45 flex justify-center'>
            <div className='w-full mb-5 border-amber-700 p-5 flex-col items-center border rounded-xl mt-15 px-10 md:px-20 lg:px-30 xl:px-40 flex justify-center'>
                <Image src="/next.svg" alt="logo image" width={200} height={100} />
                <h2 className='font-bold mt-6'>AI POWERED INTERVIEW PLATFORM</h2>
                <Image className="border w-full " src="/interview.svg" alt="interview" width={200} height={200} />
                <h2 className='mt-2 font-bold text-lg'>{interviewData?.job}</h2>
                <div className='mt-2 w-full items-center justify-center border flex gap-2'>
                    <h2 className='mt-3 text-sm flex flex-col gap-2'><Clock className='w-5 h-5' />
                        {interviewData?.[0]?.Duration || "15 MINS"}
                    </h2>
                    <h2 className='mt-3 text-sm flex flex-col gap-2'><Clock className='w-5 h-5' />
                        Google Inc
                    </h2>
                </div>
                <div className='w-full mt-4'>
                    <h2 className=' rounded-lg font-bold'>Enter Your Full Name</h2>
                    <Input disabled={loading} onChange={(e) => { setuserName(e.target.value) }} className="mt-4" placeholder="e.g. John Doe" />
                </div>
                <div className='w-full mt-4'>
                    <h2 className='rounded-lg font-bold'>Enter Your Email</h2>
                    <Input disabled={loading} onChange={(e) => { setuserEmail(e.target.value) }} className="mt-4" placeholder="e.g. JohnDoe@mock_mate.com" />
                </div>
                <div className='mt-4 p-4 text-white rounded-lg bg-[#799EFF]'>
                    <h2 className='font-bold  flex gap-2'><MessageCircleWarning /> Before you begin</h2>
                    <ul className='list-disc p-2'>
                        <li className='text-sm'>Test your camera and microphone.</li>
                        <li className='text-sm'>Make sure you have a stable connection.</li>
                        <li className='text-sm'>Find a quiet place for Interview.</li>
                    </ul>

                </div>
                <Button onClick={() => { GetInterviewAllData() }} className="mt-5 font-bold w-full">{loading ? <Loader2Icon className='animate-spin' /> :
                    (<>
                        <Video />
                        Join Interview
                    </>)}
                </Button>
            </div>

        </div>
    )
}

export default Page
