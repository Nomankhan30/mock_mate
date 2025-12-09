"use client"
import React, { useContext, useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useState } from 'react'
import userDetails from '@/context/userDetails'
function Provider({ children }) {
    const [user, setUser] = useState(null)
    console.log("provider.js of app chala")

    const CreateNewUser = async () => {

        //get Currently Logged In User Data
        // debugger
        try {
            const { data: { user } } = await supabase.auth.getUser()
            console.log("user from provider", user)
            if (!user) {
                return
            }
            const currentUser = user

            //check if current logged in user exists in supabase data
            //avoid duplicacy
            // console.log("data==", user)
            // console.log("daty==", user[0])
            let { data: userdata, error } = await supabase
                .from('users')
                .select('id')
                .eq("email", user?.email)
            //inserting logged in user data
            if (userdata.length == 0) {
                const supadata = await supabase.from("users").insert(
                    {

                        created_at: user?.created_at,
                        name: user.user_metadata.name,
                        picture: user.user_metadata.picture,
                        email: user.email
                    }

                )
                console.log("RESPONSE FROM SUPA", supadata)
                setUser(user)
                console.log("my usery state", user)
                // }

            }
            //debugger
            setUser(currentUser)
            console.log("my Currentuser ", user)
            console.log("my Currentuser ", user.user_metadata)
        }
        catch (e) {
            console.log("error in provider of app")
        }
    }


    // console.log("my user state", user)
    //run first time only
    useEffect(() => {
        console.log("efffect")
        CreateNewUser()
    }, [])
    return (<userDetails.Provider value={{ user, setUser }}>
        <div>{children}</div>
    </userDetails.Provider>)
}

export default Provider
export function useUser() { //to rey
    const context = useContext(userDetails)
    return context

}