// "use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowRight, Copy, Send } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useUser } from '@/app/provider'
import { creationDate } from '@/app/lib/date'
const Interview_Card = ({ interview, viewDetails = false }) => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interviewId
    const { user } = useUser()
    // debugger;
    //window.location.href = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interviewId
    const data = user?.email
    const copyLink = () => {
        console.log("copied render", interview)
        navigator.clipboard.writeText(interview?.url)
        toast("Copied")
    }
    return (
        <div className='border w-full md:mt-2 flex flex-col p-2   rounded-lg '>
            <div className='items-center w-full gap-1 flex '>
                {/* {JSON.stringify(user)} */}
                <div className='md:text-lg text-center py-2  w-10 h-10 sm:h-12 px-3 sm:w-12 text-white font-bold  bg-primary rounded-full'>{user?.email?.[0].toUpperCase() || "⭐"} </div>
                <h2 className='p-2 w-[70%] text-xs font-semibold pt-1 sm:pt-2  sm:text-sm md:text-lg '>{creationDate(interview?.created_at)}</h2>
            </div>
            <h2 className='w-full text-center line-clamp-1 text-lg font-bold mt-2  '>{interview?.job}</h2>
            <h2 className='text-lg items-center w-full flex flex-col sm:flex-row  font-semibold md:text-xl mt-2 sm:justify-between'>{interview?.Duration}
                <span className='text-primary'>{interview?.candidates} Candidates</span>

            </h2>

            {!viewDetails ? <div className=' w-full gap-2 xl:gap-2  flex-col md:flex-row   mt-2 flex'>
                <Button className="text-base" onClick={copyLink} variant="outline"><Copy className='' />Copy Link</Button>
                <Button className="text-base" variant="outline"><Send className=' ' />Send</Button>
            </div>
                :
                <Link className='flex justify-center  ' href={`/scheduled-interview/` + interview?.interviewId + "/details"}>
                    {/* size={null} shadcn sizes nullify */}
                    <Button size={"custom"} className="  my-2 sm:px-2 border-2  md:text-xl font-semibold " variant="outline">
                        View Details <ArrowRight className='p-0' />
                    </Button>
                </Link>

            }


        </div>

    )
}

export default Interview_Card
