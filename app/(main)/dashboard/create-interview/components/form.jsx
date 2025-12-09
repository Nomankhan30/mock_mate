"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { InterviewTypes } from '@/app/(main)/data/interview_types_data'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowRight } from 'lucide-react'
const Form = ({ handleInputChange, GoToNext }) => {
    // can select multiple types of questions
    const [interviewType, setinterviewType] = useState([])
    // debugger;
    function select_unselect_interview_type(type) {
        //setinterviewType(type)

        const data = interviewType.includes(type)
        console.log("so the data is", data, type)
        //debugger;
        //value haigi iska matlab remove kr raha hai by again clicking
        if (data) {
            console.log("typeoo", type)
            console.log("interviewType", interviewType)

            const result = interviewType.filter(item =>
                item != type
            )
            console.log("result ki value", result)
            setinterviewType(result)

        }
        else { //first time adding
            console.log("type did work",)
            setinterviewType(prev => [...prev, type])
            console.log("In tar view", interviewType)

        }
    }
    useEffect(() => {
        if (interviewType.length > 0) {
            handleInputChange("type", interviewType)
        }
    }, [interviewType])
    return (
        <div className=''>
            <div className=''>
                {/* label associated with input */}
                <Label htmlFor="job" className='text-sm font-medium'>Job Position</Label>
                <Input onChange={(e) => handleInputChange("job", e.target.value)} id="job" type="text" placeholder="e.g. Full Stack Developer" className="mt-2" />
            </div>
            <div className='mt-5'>
                {/* label associated with input */}
                <Label htmlFor="jobDesc" className='text-sm font-medium'>Job Position</Label>
                <Textarea id="jobDesc" placeholder="Enter Detailed Job Description Here..." className="mt-2"
                    onChange={(e) => handleInputChange("jobDesc", e.target.value)}
                />
            </div>
            <div className='mt-5'>
                {/* label associated with input */}
                <h2 className='font-medium text-sm '>Interview Duration</h2>
                {/* onValueChange custom shadcn attribute */}
                <Select onValueChange={(value) => handleInputChange("Duration", value)}>
                    <SelectTrigger className='w-full mt-3'>
                        <SelectValue placeholder='Select Interview Duration' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 Min">5 Min</SelectItem>
                        <SelectItem value="15 Min">15 Min</SelectItem>
                        <SelectItem value="30 Min">30 Min</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='mt-5 '>
                <h2 className='text-sm font-medium'>Interview Type</h2>
                <div className=' mt-2 flex gap-4 flex-wrap'>
                    {InterviewTypes.map((val, ind) =>
                    (<div onClick={() => {
                        // (prev)=>settypeMarked([...prev],[val.title]:!typeMarked)
                        select_unselect_interview_type(val.title)
                    }} key={ind} className={interviewType.includes(val.title) ? 'gap-2  cursor-pointer border border-gray flex p-1 px-4 items-center rounded-2xl bg-amber-500' : 'gap-2 hover:bg-secondary cursor-pointer border border-gray flex p-1 px-4 items-center rounded-2xl'}>
                        <val.icon className='' />
                        <span>{val.title}</span>
                    </div>
                    )
                    )}
                </div>
            </div>
            <div className='mt-7 flex justify-end'>
                <Button onClick={() => GoToNext()}>Generate Questions <ArrowRight /></Button>
            </div>
        </div>

    )
}

export default Form
