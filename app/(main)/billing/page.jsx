// import React from 'react'

// const BillingPage = () => {
//     return (
//         <div>
//             I am Billing
//         </div>
//     )
// }

// export default BillingPage
/////////////////////second one
// 'use client';
// import { useUser } from '@/app/provider';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useState } from 'react';
// import { supabase } from '@/services/supabaseClient';
// import BillingUI from './_components/billing_ui';
// const SubscribeComponent = () => {
//     const { user } = useUser()
//     const [interviews, setInterviews] = useState([])
//     const GetInterviewList = async () => {
//         // debugger
//         let { data: Interviews, error } = await supabase
//             .from('Interviews')
//             .select('*')
//             .eq("userEmail", user?.email)
//             .order("created_at", { ascending: false })


//         console.log("INTERVIEWS VALUE nhidy", Interviews)
//         setInterviews(Interviews)
//         handleSubmit()
//     }
//     const handleSubmit = async () => {
//         const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
//         const stripe = await loadStripe(
//             process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
//         );
//         if (!stripe) {
//             return;
//         }
//         console.log("stripe value", stripe)
//         // return
//         try {
//             const response = await axios.post('/api/stripe', {
//                 id: interviews?.interviewId || "02000",
//                 priceId: priceId
//             });
//             const data = response.data;
//             if (!data.ok) throw new Error('Something went wrong');
//             window.location.href = data.result.url;;
//         } catch (error) {
//             console.log("error in billing page")
//             console.log(error);
//         }
//     };
//     return (
//         <div className='flex flex-col mt-4' variant="outline">
//             <BillingUI />
//             <button onClick={GetInterviewList}>
//                 Upgrade in 10 Dollars
//             </button>
//         </div>
//     );
// };
// export default SubscribeComponent;
/////////////

'use client';
import { useUser } from '@/app/provider';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { supabase } from '@/services/supabaseClient';

const SubscribeComponent = () => {
    const { user } = useUser();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(1); // Index of selected plan

    const plans = [
        { credits: 10, price: 9.99, popular: false, priceId: "price_1SZfMdLd52kB2P3tywxHvoHb" },
        {
            credits: 5, price: 4.99, popular: true, priceId: "price_1SZfMdLd52kB2P3tESNKaTyB"
        },
        { credits: 20, price: 14.99, popular: false, rocket: true, save: '25%', priceId: "price_1SZfMdLd52kB2P3tTNz1cB7W" }
    ];

    const GetInterviewList = async () => {
        console.log("interview list is called bro,understand")
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq("userEmail", user?.email)
            .order("created_at", { ascending: false });

        console.log("INTERVIEWS VALUE", Interviews);
        setInterviews(Interviews);
        handleSubmit();
    };

    const handleSubmit = async () => {
        setLoading(true);
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        );

        if (!stripe) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/stripe', {
                id: interviews?.interviewId,
                priceId: plans[selectedPlan].priceId,
                credits: plans[selectedPlan].credits,
            });
            const data = response.data;
            console.log("data at front end aya", data)
            if (!data.ok) throw new Error('Something went wrong');

            console.log("data.result.checkoutSession==", data.result.checkoutSession)
            // return
            window.location.href = data.result.url;
            // window.location.href = data.result.url.id;
        } catch (error) {
            console.log("error in billing page", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            {/* rounded-3xl shadow-2xl max-w-md */}
            <div className="border  bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
                {/* Close Button */}
                {/* <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button> */}

                {/* Header with Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <div className="w-20 h-20 bg-[#799EFF]  rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user?.email?.[0]?.toUpperCase() || ''}
                        </div>
                        {/* dollar svg */}
                        <div className="absolute -bottom-1 -right-1 bg-amber-100 rounded-full p-2 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="absolute -top-2 -left-2 text-yellow-400">✨</div>
                        <div className="absolute -top-1 -right-3 text-green-400">✨</div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        {/* Boost Your Profile For more Views */}
                        Boost Your Skills
                    </h2>
                    <p className="text-gray-500 text-center mt-2 text-sm">
                        {/* Activate now to become a top profile in your area and find up to 4x more connections. */}
                        Ace Real Time Interviews by unlocking more Mock Interviews. Add more credits now.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="shrink grid grid-cols-3 gap-3 mb-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedPlan(index)}
                            className={` relative cursor-pointer rounded-2xl p-4 transition-all duration-300 ${selectedPlan === index
                                ? ' border-2 border-black shadow-lg scale-105'
                                : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-[#799EFF] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        Popular
                                    </span>
                                </div>
                            )}
                            {plan.save && (
                                <div className="  absolute -top-3 transform -translate-x-1.2">
                                    <span className="whitespace-nowrap bg-[#799EFF] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                        Save {plan.save}
                                    </span>
                                </div>
                            )}
                            <div className=" flex flex-col items-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {plan.credits}
                                    {plan.rocket && <span className="ml-1">🚀</span>}
                                </div>
                                <div className="text-sm font-semibold text-gray-600">
                                    ${plan.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buy Button */}
                <button
                    onClick={GetInterviewList}
                    disabled={loading}
                    className="w-full bg-[#799EFF] from-gray-800 to-gray-900 text-white font-bold py-4 rounded-full hover:from-gray-900  transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                    {loading ? 'Processing...' : `Buy ${plans[selectedPlan].credits} Credits`}
                </button>

                {/* Terms Button */}
                <button className="w-full bg-white border-2 border-gray-800 text-gray-800 font-bold py-4 rounded-full hover:bg-gray-50 transition-all duration-300">
                    Our Terms
                </button>

                {/* Footer Text */}
                <p className="text-xs text-gray-400 text-center mt-4">
                    By continuing, you agree to our terms and conditions
                </p>
            </div>
        </div>
    );
};

export default SubscribeComponent;