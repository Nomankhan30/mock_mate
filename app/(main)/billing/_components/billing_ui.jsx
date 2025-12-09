import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function BillingUI({ onSelect }) {
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
            >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-200"></div>
                <h2 className="text-xl font-semibold">Boost Your Profile For more Views</h2>
                <p className="text-gray-500 mt-1 text-sm max-w-sm">
                    Activate now to become a top profile in your area and find up to 4x
                    more connections.
                </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
                {/* Option 1 */}
                <Card className="rounded-2xl border p-3 cursor-pointer hover:shadow-md transition" onClick={() => onSelect(1)}>
                    <CardContent className="text-center">
                        <p className="text-lg font-semibold">10</p>
                        <p className="text-gray-500 text-sm">$5.99</p>
                    </CardContent>
                </Card>

                {/* Option 2 Popular */}
                <Card className="rounded-2xl border p-3 relative cursor-pointer hover:shadow-md transition" onClick={() => onSelect(2)}>
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#4F9AFF] text-white text-xs px-2 py-1 rounded-full">
                        Popular
                    </span>
                    <CardContent className="text-center mt-2">
                        <p className="text-lg font-semibold">5</p>
                        <p className="text-gray-500 text-sm">$29.99</p>
                    </CardContent>
                </Card>

                {/* Option 3 Save 33% */}
                <Card className="rounded-2xl border p-3 relative cursor-pointer hover:shadow-md transition" onClick={() => onSelect(3)}>
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Save 33%
                    </span>
                    <CardContent className="text-center mt-2">
                        <p className="text-lg font-semibold">10</p>
                        <p className="text-gray-500 text-sm">$39.99</p>
                    </CardContent>
                </Card>
            </div>

            <Button className="w-full max-w-md py-6 rounded-2xl text-base">
                Buy 5 Boosts
            </Button>

            <button className="mt-4 text-gray-500 text-sm">Our Terms</button>
        </div>
    );
}
