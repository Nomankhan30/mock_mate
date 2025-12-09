"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supabaseClient"
import { useEffect, useState } from 'react'
import { useUser } from '../provider'
const Login = () => {
    console.log("bhai main hi hoon")
    // const { user } = useUser()
    const [data, setData] = useState(null)
    const route = useRouter()
    const SignInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/dashboard"
            }
        })
        console.log("i received this data", data)
        if (error) {
            console.error("Google Sign-In Error:", error.message)
            return
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center '>
            <div className='flex flex-col items-center border rounded-2xl p-8'>
                <Image src={'/app_logo.svg'} alt="logo"
                    width={400}
                    height={100}
                    className='w-[250px] rounded-2xl'
                />
                <h2 className='my-2 font-semibold'>AI POWERED INTERVIEW PLATFORM</h2>
                <div className='flex flex-col items-center gap-4'>
                    <Image src="/cover_pic.svg" alt="login"
                        width={600}
                        height={400}
                        className='w-[400px] h-[250px]' />
                    <h2 className='text-2xl font-bold text-center mt-5'>Welcome to MockMate</h2>
                    <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
                    <Button onClick={SignInWithGoogle} className="mt-7 w-full">Sign In With Google</Button>

                </div>
            </div>

        </div>
    )
}

export default Login
