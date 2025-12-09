"use client"
//1) create context
//2) assign provider value which is to be made available
//3)wrap children with provider
//4)get provider value inside wrapped compon using useContext()
//only step 3 is happening out of this file in layout file
import { createContext, useContext, useState } from 'react'
const interviewData = createContext()
export const InterviewProvider = ({ children }) => {
    const [interviewInfo, setInterviewInfo] = useState(null)
    return (
        <interviewData.Provider value={{ interviewInfo, setInterviewInfo }}>
            {children}
        </interviewData.Provider>
    )

}
export const useInterview = () => useContext(interviewData)
//CUSTOM HOOK TO AVOID REPITITION