"use client"
import { useState, React } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Copy, List, ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
const Interview = ({ interview_id, formData }) => {
  const [disable, setDisable] = useState(true)
  const URL = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id
  // debugger;
  // const [interviewId,setInterviewId]=useState(interview_id)
  const GetInterviewURL = () => {
    console.log("VALUE OF HOST URL=", process.env.NEXT_PUBLIC_HOST_URL)
    console.log("VALUE OF HOST URL=", process.env.NEXT_PUBLIC_SUPABASE_URL)
    return URL
  }
  const onClickCopy = async () => {
    await navigator.clipboard.writeText(URL)
    toast("Link Copied")
  }
  return (
    <div className="gap-2 p-3 mt-2 flex flex-col items-center border-2 border-black">
      <Image src="/check-mark.png" alt="Check Mark"
        width={200}
        height={200}
        className='w-[50px] h-[50px]'
      />
      <h2 className='font-bold text-lg'>Your AI Interview is Ready!</h2>
      <p className='font-semibold'>Share this link with candidates to start the preparation</p>
      <div className=' w-full  p-5 mt-5 border border-amber-900 rounded-lg'>
        <div className=' flex flex-row justify-between items-center'>
          <h2 className='font-bold'>Interview Link</h2>
          <h2 className='text-white bg-[#799EFF] rounded-lg p-2 border '>Valid for 30 days</h2>
        </div>
        <div className='gap-2 mt-5 flex flex-row items-center rounded-lg'>
          <Input defaultValue={URL} disabled={true} className="" />
          <Button onClick={() => { onClickCopy() }} className="bg-[#799EFF] rounded"><Copy /> Copy Link</Button>
        </div>
        <hr className="my-5 border-black border-t-4" />
        <div className="px-4 flex flex-row gap-6 items-center ">
          <h2 className=" text-xs text-gray-500"><Clock className='w-5 h-5' />5 MINS {formData?.duration}</h2>
          <h2 className="text-xs text-gray-500"><List className=' w-5 h-5' />5 MINS {formData?.duration}</h2>
          <h2 className="text-xs text-gray-500"><Calendar className='w-5 h-5' />5 MINS {formData?.duration}</h2>

        </div>
      </div>
      <div className='  flex flex-col w-full p-5 mt-5 border border-amber-900 rounded-lg'>
        <h2 className="font-bold ">Share Via</h2>
        <div className=" flex gap-4 mt-2 ">
          <Button variant="outline" className="">EMAIL</Button>
          <Button variant="outline" className="">SLACK</Button>
          <Button variant="outline" className="">WHATSAPP</Button>
        </div>
      </div>
      <div className="w-full justify-between flex gap-4 mt-2">
        <Link href="/dashboard">
          <Button variant="outline"><ArrowLeft />Back to Dashboard</Button>
        </Link>
        <Link href="/create-interview"><Button ><Plus />Create New Interview</Button></Link>

      </div>
    </div >
  )
}

export default Interview
