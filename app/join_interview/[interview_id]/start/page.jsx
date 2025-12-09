// "use client"
// import { useInterview } from '@/context/interviewData'
// import axios from 'axios'
// import { Mic, Timer } from 'lucide-react'
// import Image from 'next/image'
// import React, { useState, useEffect, useRef } from 'react'
// import { Phone } from 'lucide-react'
// import Vapi from '@vapi-ai/web';
// import StopAlert from './_component/stopalert'
// import { toast } from 'sonner'
// const Page = () => {
// conversationRef = useRef(null)
//     const vapiRef = useRef(null)
//     if (!vapiRef.current) {
//         vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_MOCK_INTERVIEWER);
//     }
//     const vapi = vapiRef.current

//     const { interviewInfo, setInterviewInfo } = useInterview()
//     const [activeUser, setactiveUser] = useState(false)
//     const [content, setContent] = useState("")
//     const GenerateFeedback = async () => {
//         console.log("content value has gone", content)
//         const response = await axios.post('/api/ai-feedback', {
//             content: content
//         })
//         console.log("response of conversation", response?.message)
//         console.log("response only", response)
//     }
//     console.log("dkneechay", interviewInfo)



//     useEffect(() => {
//         console.log("our content", content)
//         vapi.on('call-start', () => {
//             console.log('Voice conversation started');
//             toast("Interview Started...")
//             // Track analytics, show notifications, etc.
//         });
//         vapi.on('speech-start', () => {
//             console.log('User started speaking');
//             setactiveUser(false)
//         });

//         vapi.on('message', (message) => {
//             console.log('vapi message', message);
//             console.log('vapi message type', message?.type);
//             console.log('vapi message type', message?.conversation);
//             if (!message.content || !message.role) {
//                 console.log("nothing to store")
//                 return
//             }
//             setContent(message?.content)
//             debugger;

//         });

//         vapi.on('call-end', () => {
//             console.log('Voice conversation ended');
//             setactiveUser(true)
//             toast("Interview Ended...")
//             GenerateFeedback()



//             // Save conversation data, show feedback form, etc.
//         });


//     }, [])
//     // using interview info from context
//     function stopInterview() {
//         console.log("confirm alert chaal from stopInterview")
//         vapi.stop()
//         console.log("log fun")
//         console.log("loggy fun", content)

//     }
//     //event listener for call-start event

//     console.log("vapi created", vapi)

//     const startCall = async () => {
//         //if info is available
//         // debugger;
//         // const assistant = await vapi.assistants.create({
//         const assistant = {
//             name: "Mock Interview Assistant",
//             firstMessage: `Hi! ${interviewInfo?.userName} how are you? are you ready for your ${interviewInfo?.interviewData?.job} interview`,
//             model: {
//                 provider: "openai",
//                 model: "gpt-4o",
//                 temperature: 0.7,
//                 messages: [{
//                     role: "system",
//                     content: `You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.
// Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
// "Hey there! Welcome to your ${interviewInfo?.interviewData?.job} interview. Let's get started with a few questions!"
// Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the Questions: ${interviewInfo?.interviewData?.job.questionList} }
// If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
// "Need a hint? Think about how React tracks component updates!"
// Provide brief, encouraging feedback after each answer. Example:
// "Nice! That's a solid answer."
// "Hmm, not quite! Want to try again?"
// Keep the conversation natural and engaging-use casual phrases like "Alright, next up ... " or "Let's tackle a tricky one!"
// After Questions end which are provided to you, wrap up the interview smoothly by summarizing their performance. Example:
// "That was great! You handled some tough questions well. Keep sharpening your skills!"
// End on a positive note for example:
// 'Thanks for chatting! Hope to see you crushing projects soon!'
// Key Guidelines:
// Be friendly, engaging, and witty. Keep responses short and natural, Like a real conversation
// Adapt based on the candidate's confidence level.
// Ensure the interview remains focused on candidate's desired job`
//                 }]
//             },
//             voice: {
//                 provider: "11labs",
//                 voiceId: "21m00Tcm4TlvDq8ikWAM"
//             }


//         }
//         const interviewStart = await vapi.start(assistant)
//         console.log("Interview is started", interviewStart)



//         // });

//     }
//     useEffect(() => {
//         console.log("Updated conversation content:", content);
//     }, [content]);

//     useEffect(() => {
//         interviewInfo && startCall()
//     }, [interviewInfo])
//     return (
//         <div className=' p-20 md:p-30 lg:40 xl:50'>

//             <h2 className='flex justify-between font-bold text-xl'>
//                 AI INTERVIEW SESSION
//                 <span className='flex gap-2 items-center border '>
//                     <Timer />
//                     00:00:00
//                 </span>
//             </h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
//                 {/* 2 cols for interviewer and interviewee */}
//                 <div className='gap-3 flex flex-col items-center justify-center  h-[400px] rounded-lg border'>
//                     <div className='relative'>
//                         {!activeUser && <span className='absolute rounded-full bg-primary opacty-75 inset-0 animate-ping'></span>}
//                         <Image className="w-[60px] h-[60px] object-cover rounded-full" src="/ai_interviewer.jpg" alt="AI interviewer" width={100} height={100} />
//                     </div>

//                     <h2>AI Recruiter</h2>
//                 </div>
//                 <div className='gap-3 flex-col flex items-center justify-center bg-white h-[400px] rounded-lg border'>
//                     <div className='relative'>
//                         {activeUser && <span className='absolute rounded-full bg-primary text-white inset-0 animate-ping'></span>}
//                         <h2 className='font-bold text-2xl bg-primary text-white rounded-full p-3 px-5'>{interviewInfo?.userName[0]}</h2>
//                     </div>
//                     <h2>{interviewInfo?.userName}</h2>
//                 </div>
//             </div>
//             <div className='gap-2 flex justify-center items-center'>
//                 <Mic className='cursor-pointer mt-3 p-2 h-10 bg-gray-300  w-10 rounded-full' />
//                 <StopAlert stopInterview={stopInterview}>
//                     <Phone className='cursor-pointer mt-3 py-2 bg-gray-300  w-10 h-10 rounded-full' />

//                 </StopAlert>

//             </div>


//         </div>
//     )
// }

// export default Page

"use client"
import { useInterview } from '@/context/interviewData'
import axios from 'axios'
import { Mic, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import Vapi from '@vapi-ai/web';
import StopAlert from './_component/stopalert'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
// import { feedback } from '@/app/(main)/data/Feedback_Prompt'
import { supabase } from '@/services/supabaseClient'
import { useRouter } from 'next/navigation'
const Page = () => {
    const vapiRef = useRef(null)
    const route = useRouter()
    const { interview_id } = useParams()
    if (!vapiRef.current) {
        vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_MOCK_INTERVIEWER);
    }
    const vapi = vapiRef.current

    const { interviewInfo, setInterviewInfo } = useInterview()
    console.log("interviewInfo", interviewInfo)
    const [activeUser, setactiveUser] = useState(false)

    // Change: Store conversation as an array of messages using ref
    const conversationRef = useRef([])

    // IMPORTANT: Move GenerateFeedback outside useEffect or use ref
    const GenerateFeedback = async (conversationData) => {
        const conversationText = conversationData
            .map(msg => `${msg.role}: ${msg.content}`)
            .join('\n\n')

        console.log("Full conversation being sent:", conversationText)
        console.log("Total messages:", conversationData.length)

        if (!conversationText.trim()) {
            console.error("No conversation data to send!")
            return
        }

        try {
            const response = await axios.post('/api/ai-feedback', {
                content: conversationText
            })
            console.log("response at frontend", response)
            console.log("Feedback response:", response.data)
            //save data to supa

            const { data, error } = await supabase
                .from('Interview_Feedback')
                .insert([
                    {
                        userName: interviewInfo?.userName,
                        userEmail: interviewInfo?.userEmail,
                        id: interview_id,
                        feedback: response.data
                    }

                ])
                .select()
            console.log("data", data)
            // route.replace("/join_interview/" + interview_id + "/completed")
        } catch (error) {
            console.error("Error generating feedback:", error)
        }
    }

    useEffect(() => {
        vapi.on('call-start', () => {
            console.log('Voice conversation started');
            toast("Interview Started...")
            // Reset conversation at start
            conversationRef.current = []
        });

        vapi.on('speech-start', () => {
            console.log('User started speaking');
            setactiveUser(false)
        });

        vapi.on('message', (message) => {
            console.log('=== VAPI MESSAGE ===');
            console.log('Type:', message.type);
            console.log('Full message:', message);
            console.log('==================');

            // Try transcript messages
            // if (message.type === 'transcript') {
            //     console.log('📝 Transcript detected!');
            //     console.log('Role:', message.role);
            //     console.log('Transcript:', message.transcript);
            //     console.log('Transcript Type:', message.transcriptType);

            //     if (message.transcriptType === 'final' && message.transcript) {
            //         const conversationMessage = {
            //             role: message.role,
            //             content: message.transcript,
            //             timestamp: new Date().toISOString()
            //         }

            //         conversationRef.current.push(conversationMessage)
            //         console.log('✅ Stored transcript message:', conversationMessage)
            //         console.log('📊 Total messages now:', conversationRef.current.length)
            //     }
            // }

            //Try conversation-update messages
            if (message.type === 'conversation-update') {
                console.log('💬 Conversation update detected!');
                console.log('Conversation array:', message.conversation);

                if (message.conversation && Array.isArray(message.conversation)) {
                    conversationRef.current = message.conversation.map(msg => ({
                        role: msg.role,
                        content: msg.content || msg.text || msg.transcript,
                        timestamp: msg.timestamp || new Date().toISOString()
                    }))
                    console.log('✅ Updated full conversation:', conversationRef.current)
                }
            }

            // Try function-call messages (some Vapi versions use this)
            if (message.type === 'function-call' && message.functionCall) {
                console.log('🔧 Function call detected:', message.functionCall);
            }

            // Try speech-update messages
            if (message.type === 'speech-update') {
                console.log('🗣️ Speech update:', message);
            }
        });

        vapi.on('call-end', () => {
            console.log('Voice conversation ended');
            console.log('Final conversation:', conversationRef.current)
            setactiveUser(true)
            toast("Interview Ended...")

            // IMPORTANT: Pass the ref value directly to avoid closure issues
            if (conversationRef.current.length > 0) {
                GenerateFeedback(conversationRef.current)
            } else {
                console.warn('No conversation data captured!')
                console.log('Check message types - maybe using wrong event')
            }
        });

        // Cleanup
        return () => {
            vapi.removeAllListeners()
        }
    }, [])

    function stopInterview() {
        console.log("Stopping interview")
        console.log("Current conversation:", conversationRef.current)
        vapi.stop()
    }

    const startCall = async () => {
        const assistant = {
            name: "Mock Interview Assistant",
            firstMessage: `Hi! ${interviewInfo?.userName} how are you? are you ready for your ${interviewInfo?.interviewData?.job} interview`,
            model: {
                provider: "openai",
                model: "gpt-4o",
                temperature: 0.7,
                messages: [{
                    role: "system",
                    content: `You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.job} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the Questions: ${interviewInfo?.interviewData?.job.questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging-use casual phrases like "Alright, next up ... " or "Let's tackle a tricky one!"
After Questions end which are provided to you, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note for example:
'Thanks for chatting! Hope to see you crushing projects soon!'
Key Guidelines:
Be friendly, engaging, and witty. Keep responses short and natural, Like a real conversation
Adapt based on the candidate's confidence level.
Ensure the interview remains focused on candidate's desired job
Here are the questions which are to be asked only ${interviewInfo?.interviewData?.questionList}
`
                }]
            },
            voice: {
                provider: "11labs",
                voiceId: "21m00Tcm4TlvDq8ikWAM"
            }
        }

        const interviewStart = await vapi.start(assistant)
        console.log("Interview is started", interviewStart)
    }

    useEffect(() => {
        if (interviewInfo) {
            startCall()
        }
    }, [interviewInfo])

    return (
        <div className='p-20 md:p-30 lg:40 xl:50'>
            <h2 className='flex justify-between font-bold text-xl'>
                AI INTERVIEW SESSION
                <span className='flex gap-2 items-center border'>
                    <Timer />
                    00:00:00
                </span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                <div className='gap-3 flex flex-col items-center justify-center h-[400px] rounded-lg border'>
                    <div className='relative'>
                        {!activeUser && <span className='absolute rounded-full bg-primary opacity-75 inset-0 animate-ping'></span>}
                        <Image className="w-[60px] h-[60px] object-cover rounded-full" src="/ai_interviewer.jpg" alt="AI interviewer" width={100} height={100} />
                    </div>
                    <h2>AI Recruiter</h2>
                </div>
                <div className='gap-3 flex-col flex items-center justify-center bg-white h-[400px] rounded-lg border'>
                    <div className='relative'>
                        {activeUser && <span className='absolute rounded-full bg-primary text-white inset-0 animate-ping'></span>}
                        <h2 className='font-bold text-2xl bg-primary text-white rounded-full p-3 px-5'>{interviewInfo?.userName[0]}</h2>
                    </div>
                    <h2>{interviewInfo?.userName}</h2>
                </div>
            </div>
            <div className='gap-2 flex justify-center items-center'>
                <Mic className='cursor-pointer mt-3 p-2 h-10 bg-gray-300 w-10 rounded-full' />
                <StopAlert stopInterview={stopInterview}>
                    <Phone className='cursor-pointer mt-3 py-2 bg-gray-300 w-10 h-10 rounded-full' />
                </StopAlert>
            </div>
        </div>
    )
}

export default Page