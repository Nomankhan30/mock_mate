import { feedback } from "@/app/(main)/data/Feedback_Prompt"
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"
export async function POST(req) {
  console.log("post has really hit req", req)
  const { content } = await req.json()
  console.log("content value", content)
  const FINAL_PROMPT = feedback.replace('{{conversation}}', content)
  console.log("final prompt value", FINAL_PROMPT)
  // return NextResponse.json("hi jee")
  return NextResponse.json({
    feedback: {
      rating: {
        technicalSkills: 1,
        communication: 2,
        problemSolving: 0,
        experience: 1
      },
      summary: 'The interview started with a foundational question regarding state management in React. The candidate struggled to provide even an initial response, stopping mid-sentence without articulating any part of an answer. This limited interaction did not allow for assessment of their technical depth or problem-solving approach.',
      recommendation: 'Not recommended for hire at this stage.',
      recommendationMsg: 'The candidate was unable to formulate an answer to the first core technical question, suggesting a significant gap in foundational React knowledge necessary for a MERN Stack Developer role.'
    }
  }
  )
  try {
    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: FINAL_PROMPT,
      });
      console.log("*****RESPONSE TOU AYA HAI********", response.text);
      // convert plain/raw json text into proper json
      const cleanedText = response.text.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
      console.log("cleanedText value", cleanedText)
      // convert json into js object for using in js
      const jsonResponse = JSON.parse(cleanedText)
      //return response.text
      console.log("crashed before json response return", jsonResponse)
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
    return NextResponse.json(response)
  }
  catch (e) {
    console.log("MYERROR:", e)
    return NextResponse.json(e)
  }

}


`
import React, { useState } from 'react';
import Vapi from '@vapi-ai/web';

function VapiCallComponent() {
  const [vapi] = useState(() => new Vapi('YOUR_PUBLIC_API_KEY'));
  const [isCallActive, setIsCallActive] = useState(false);

  // Set up event listeners
  React.useEffect(() => {
    vapi.on('call-start', () => {
      console.log('Call started');
      setIsCallActive(true);
    });

    vapi.on('call-end', () => {
      console.log('Call ended');
      setIsCallActive(false);
    });

    vapi.on('error', (error) => {
      console.error('Vapi error:', error);
    });

    // Clean up listeners when component unmounts
    return () => {
      vapi.stop();
    };
  }, [vapi]);

  const startCall = () => {
    vapi.start('YOUR_ASSISTANT_ID');
  };

  const endCall = () => {
    vapi.stop();
  };

  return (
    <div>
      {!isCallActive ? (
        <button onClick={startCall}>Start Call</button>
      ) : (
        <button onClick={endCall}>End Call</button>
      )}
    </div>
  );
}

export default VapiCallComponent;

`