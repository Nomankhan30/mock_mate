import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const StopAlert = ({ children, stopInterview }) => {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>{children}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Do you want to end the interview??</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your progress will not be saved.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={stopInterview}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default StopAlert
