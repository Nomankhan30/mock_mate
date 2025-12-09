"use client"
import React, { useEffect } from 'react'
import { useUser } from '@/app/provider'
import Image from 'next/image'
const DashboardHeader = () => {
    const { user } = useUser()
    const avatarUrl = user?.user_metadata?.avatar_url

    console.log("=== DEBUG INFO ===")
    console.log("1. user exists:", !!user)
    console.log("2. user_metadata exists:", !!user?.user_metadata)
    console.log("3. avatar_url value:", avatarUrl)
    console.log("4. avatar_url type:", typeof avatarUrl)
    console.log("5. avatar_url length:", avatarUrl?.length)
    console.log("6. Is empty string:", avatarUrl === "")
    console.log("7. Is undefined:", avatarUrl === undefined)
    console.log("8. Is null:", avatarUrl === null)
    console.log("9. Trimmed value:", `"${avatarUrl?.trim()}"`)
    console.log("==================")
    useEffect(() => {
        console.log("compo re render")
        console.log("compo re user valye", user)
    }, [user])
    // console.log("user value 9o==", user)
    return (
        <div className='flex justify-between border-2 p-4 rounded-2xl'>
            <div className='flex flex-col'>
                <h2 className='text-lg font-bold'>Welcome! {user?.user_metadata?.name}</h2>
                <p className='text-black'>Your AI-powered interview assistant is here. How may I help you?</p>
            </div>
            <div className=''>
                {/* {user?.user_metadata?.avatar_url} */}
                {user?.user_metadata?.avatar_url && <Image className="rounded-full" width={50} height={50} src={user?.user_metadata?.avatar_url} alt="user avatar" />}
            </div>
        </div>
    )
}

export default DashboardHeader
