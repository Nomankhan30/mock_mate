"use client"
import { toast } from "sonner"
import { ArrowLeft } from 'lucide-react'
import { useState, React } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Form from './components/form'
import QuestionList from "./components/QuestionList"
import Interview from "./components/generate_interview_link_page"
import { useUser } from "@/app/provider"
const CreateInterview = () => {
    console.log("CREATE INTERVIEW CALLED")
    const { user } = useUser()
    const route = useRouter()
    const [step, setStep] = useState(1)
    const [interview_id, setInterviewId] = useState()
    const [formData, setformData] = useState({})
    const onCreateLink = (interview_id) => {
        console.log("onCREATELINK INVOKED", interview_id)
        setInterviewId(interview_id)
        setStep(step + 1)

    }
    const onGoToNext = () => {
        console.log("inside on Go To Next()")
        console.log("onGoToNext")
        if (user?.credits <= 0) {
            toast("YOU HAVE CONSUMED YOUR CREDITS. PLEASE ADD MORE CREDITS.")
            return
        }
        if (!formData?.job || !formData?.jobDesc || !formData?.Duration || !formData?.type) {
            console.log("there is an erro")
            toast.error("Please fill all fields")
            return
        }
        setStep(step + 1)
    }
    function handleInputChange(field, value) {
        setformData(prev => ({ ...prev, [field]: value }))
    }
    console.log("route value ==", route)
    console.log("my form data", formData)
    return (
        <div>
            <div className='border-2 border-black mt-5 px-10 md:px-20 lg:px-30 xl:px-40 flex gap-5 items-center'>
                <ArrowLeft className="cursor-pointer" onClick={() => route.push("/dashboard")} />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step * 33.33} className="my-4" />
            {step == 1 ? <Form GoToNext={() => onGoToNext()} handleInputChange={handleInputChange} /> : step == 2 ? <QuestionList onCreateLink={onCreateLink} formData={formData} /> : step == 3 ? <Interview interview_id={interview_id} formData={formData} /> : null}
            {/* [&>div]:bg-red-300 */}
        </div>
    )
}

export default CreateInterview
