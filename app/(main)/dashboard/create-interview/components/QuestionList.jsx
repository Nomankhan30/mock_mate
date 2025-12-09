import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2Icon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import QuestionsContainer from './QuestionsContainer'
import { Button } from '@/components/ui/button'
import { useUser } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient'
const QuestionList = ({ formData, onCreateLink }) => {
    const interviewId = uuidv4();
    const { user } = useUser()
    const [saveLoading, setSaveLoading] = useState(false)
    console.log("user has value", user)
    console.log("interviewId", interviewId)
    const [loading, setLoading] = useState(false)
    const [Questions, setQuestions] = useState("")
    console.log("Question Generate se pehlay")
    async function onFinish() {
        setSaveLoading(true)
        console.log("FORMAT DATA", formData)
        console.log("CREATED AT VALUE", user?.created_at)
        // submit generated data inside supabase table
        try {
            console.log("submit button is clicked")
            const { data, error } = await supabase
                .from('Interviews')
                .insert([
                    {
                        ...formData,
                        questionList: Questions,
                        userEmail: user?.email,
                        created_at: user?.created_at,
                        interviewId

                    }
                ])
                .select()
            //update user credits
            const { credits, credits_error } = await supabase
                .from('users')
                .update({ credits: 'otherValue' })
                .eq('email', Number(user?.email) - 1)
                .select()
            setSaveLoading(false)
            onCreateLink(interviewId)
            console.log("data after insertion", data)
            console.log("Credits after creating new interview", credits)
        }
        catch (e) {
            console.log("error from supabase insertion", e)
        }

    }

    const GenerateQuestions = async () => {
        console.log("Question is being generated")
        setLoading(true)
        try {
            const response = await axios.post("/api/ai-model",
                {
                    ...formData
                })
            console.log("response.data", response.data.interviewQuestions)
            console.log("beech ka tou chal gaya")

            console.log("response", response)
            setQuestions(response.data.interviewQuestions)
            setLoading(false)
        }
        catch (e) {
            toast("Server Error", "Try Again")
            setLoading(false)
        }


    }
    useEffect(() => {
        console.log("use effect called with formData", formData)
        if (formData) {
            GenerateQuestions()
        }


    }, [formData])
    return (
        <>
            <div>
                {loading &&
                    <div>
                        <div>
                            <Loader2Icon className='animate-spin' />
                        </div>
                        <div className='p-5 bg-amber-200 rounded-2xl border border-gray-200'>
                            <h2 className='font-bold'>Generating Interview Questions</h2>
                            <h2>AI is crafting personalized questions based on your description.</h2>
                        </div>
                    </div>


                }


            </div>
            <div>
                {console.log('LOADING VALUE--', loading)}
                <QuestionsContainer Questions={Questions} />
            </div>
            <Button onClick={onFinish} className={"active:scale-98"}>
                Finish
                {saveLoading && <Loader2 className='animate-spin' onClick={onCreateLink} />}
                {/* <Loader2 className='animate-spin' /> */}
            </Button>
        </>

    )
}

export default QuestionList