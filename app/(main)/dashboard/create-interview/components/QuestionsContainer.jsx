import React from 'react'

const QuestionsContainer = ({ Questions }) => {
    console.log("full questions object", Questions)
    return (
        <div className='p-5 border rounded-xl'>
            {Questions.length > 0 &&
                <div>
                    <h2 className='font-bold mt-4'>Generated Interview Questions</h2>
                    {Questions.map((Qarray, ind) => {
                        return (<div key={ind} className='border rounded-2xl p-4 mt-4'>
                            <h2 className='font-medium'>{Qarray.question}</h2>
                            <h2 className='text-primary'>Type:{Qarray.type}</h2>

                        </div>)
                    })}</div>


            }
        </div>
    )
}

export default QuestionsContainer
