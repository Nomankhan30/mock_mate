import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai"
import { PROMPT } from "../../(main)/data/Question_Prompt.js"

export async function POST(req) {
    const { job, jobDesc, Duration, type } = await req.json()
    const Prompt = PROMPT
        // regex global for replacing all occcurences.
        .replace(/{{jobTitle}}/g, job)
        .replace(/{{jobDescription}}/g, jobDesc)
        .replace(/{{duration}}/g, Duration)
        .replace(/{{type}}/g, type)
    //console.log("PROMPT BEFORE API HIT", Prompt)
    return NextResponse.json({
        interviewQuestions: [
            {
                question: 'In React, how do you manage state for a complex component, and when would you consider using the Context API or a state management library like Redux/Zustand instead of just local component state (`useState`)?',
                type: 'Technical'
            },
            {
                question: 'Node.js is known for its non-blocking I/O model. Can you explain what this means for an Express.js application, and how you ensure asynchronous operations (like database calls or external API requests) are handled efficiently without blocking the event loop?',
                type: 'Technical'
            },
            {
                question: 'When designing a RESTful API for a MERN application using Express.js and MongoDB, how do you approach data modeling for relationships (e.g., between users and their posts)? Specifically, when would you choose to embed related documents versus using references, and what are the trade-offs?',
                type: 'Technical/Problem Solving'
            },
            {
                question: 'Imagine your MERN application is deployed, and users are reporting that the frontend is showing stale data even though the backend API indicates new data has been successfully saved. What steps would you take to diagnose and troubleshoot this issue across the MERN stack?',
                type: 'Problem Solving'
            }
        ]
    })
    try {
        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        const ai = new GoogleGenAI({});

        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: Prompt,
            });
            console.log("*****RESPONSE TOU AYA HAI********", response.text);
            // convert plain/raw json text into proper json
            const cleanedText = response.text.replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()
            // convert json into js object for using in js
            const jsonResponse = JSON.parse(cleanedText)
            //return response.text
            return jsonResponse
        }

        const response = await main();
        // const openai = new OpenAI({
        //     baseURL: "https://openrouter.ai/api/v1",
        //     baseURL:""
        //     apiKey: process.env.GEMINI_API_KEY,
        // })

        // const completion = await openai.chat.completions.create({
        //     model: "google/gemini-2.0-flash-exp:free",
        //     messages: [
        //         { role: "user", content: Prompt }
        //     ],
        // })
        // console.log("RESPONSE AS COMPLETION", completion.choices[0].message)
        // return NextResponse.json(completion.choices[0].message)
        console.log("MY RESPOOOOOOONSY", response)
        //return NextResponse.json(response)
    }
    catch (e) {
        console.log("MYERROR:", e)
        return NextResponse.json(e)
    }

}