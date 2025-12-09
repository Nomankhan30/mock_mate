import React from 'react'
// import { Button } from '@/components/ui/button'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'
const CandidateList = ({ candidates }) => {
    return (
        <div className='p-5'>
            <h2 className='font-bold my-5'>Candidates {candidates?.length}</h2>
            {
                candidates?.map((candidate, key) => (
                    <div className="flex gap-3 p-5" key={key}>
                        {/*Showing user first initial */}
                        <div className="flex items-center justify-between gap-3">
                            <h2 className='font-bold items-center px-4 p-3 bg-primary rounded-lg'>candidate.userName?.[0]</h2>
                            <div className='text-sm'>
                                <h2 className='font-bold'>{candidate?.userName}</h2>
                                <h2 className='text-sm'>Completed On:{candidate?.created_at}</h2>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <h2 className='text-primary'>5/10</h2>
                            <CandidateFeedbackDialog candidate={candidates} />

                        </div>

                    </div>
                ))
            }
            I AM CANDIDATE LIST
        </div>
    )
}

export default CandidateList
