import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress'
const CandidateFeedbackDialog = ({ candidate }) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={"text-primary"} variant="outline">
                        View Report
                    </Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Feedback</DialogTitle>
                        <DialogDescription asChild>
                            <div className='mt-4'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className='font-bold items-center px-4 p-3 bg-primary rounded-lg'>candidate.userName?.[0]</h2>
                                        <div className='text-sm'>
                                            <h2 className='font-bold'>{candidate?.userName}</h2>
                                            <h2 className='text-sm'>{candidate?.userEmail}</h2>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <h2 className='text-primary text-2xl font-bold'>7/10</h2>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='font-bold'>Skills Assesment</h2>
                                    <div className='mt-4 grid grid-cols-2'>
                                        <div className='mt-3' >
                                            <h2 className='flex justify-between'>Technical Skills
                                                <span>9/10</span>
                                                <Progress value={9 * 10} className="mt-1" />
                                            </h2>
                                        </div>
                                        <div className='mt-3' >
                                            <h2 className='flex justify-between'>Communication Skills
                                                <span>7/10</span>
                                                <Progress value={7 * 10} className="mt-1" />
                                            </h2>
                                        </div>
                                        <div className='mt-3' >
                                            <h2 className='flex justify-between'>Problem Solving Skills
                                                <span>8/10</span>
                                                <Progress value={8 * 10} className="mt-1" />
                                            </h2>
                                        </div>
                                        <div className='mt-3' >
                                            <h2 className='flex justify-between'>Experience
                                                <span>8/10</span>
                                                <Progress value={8 * 10} className="mt-1" />
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <h2 className='font-bold'>Performance Summary</h2>
                                    <div className='p-5 bg-secondary rounded-md my-3'>
                                        {feedback?.summary?.map((summar, index) => (
                                            <p key={key}>{summar}</p>
                                        ))}
                                    </div>


                                </div>
                                <div className='mt-5 flex items-center p-5 rounded-md'>
                                    <div>
                                        <h2 className='font-bold'>RECOMMENDATION MSG:</h2>
                                        <p>feedback?.Recommendation</p>

                                    </div>
                                    <Button variant="outline">Send Msg</Button>


                                </div>

                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CandidateFeedbackDialog
