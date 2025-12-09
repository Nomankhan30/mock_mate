"use client"
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const Page = () => {
    const [id, setId] = useState(null)
    const route = useRouter()
    const GetInterviewId = async () => {
        if (id) {
            const { data, error } = await supabase.from("Interviews").select("interviewId").eq("interviewId", id)
            if (error) {
                console.log("ERROR", error)
                return
            }
            else if (data && data.length > 0) {
                console.log("data value", data)
                route.push(`/join_interview/${id}`)
            }
            else {
                toast('INVALID ID', {
                    description: "Get Valid Interview Id By Creating New Interview"
                })
            }
        }
        else {
            toast("ID FIELD IS NULL")
        }

    }
    return (
        <div className='h-screen bg-primary border-2 items-center flex flex-col gap-4 justify-center'>

            <div>
                <Image src="app_logo.svg" alt="logo" width={150} height={150} />
            </div>
            <h2 className=' text-white font-semibold text-lg'>Are You Ready for Acing Your Next Interview? Lets start with us</h2>
            <Image src="cover_pic.svg" alt="cover pic" width={200} height={200} />
            <div className='items-center w-full p-4 flex flex-col justify-center gap-2'>
                <label className="text-lg font-semibold text-white" htmlFor="id">Enter Your Interview Id</label>
                <Input onChange={(e) => setId(e.target.value)} className="w-60" id="id" />
            </div>
            <Button className="w-1/3 min-w-35 font-bold text-white bg-black" onClick={GetInterviewId}>Join Interview</Button>

        </div>
    )
}

export default Page
