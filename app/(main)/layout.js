import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sharedComponents/Appsidebar" //Appsidebar is file name
import { Toaster } from "sonner"

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            {/* <Toaster position="top-right" /> */}
            {/* main for seo */}
            <main className="flex-1 p-4">
                <SidebarTrigger />
                <div className="">
                    {children}
                </div>

            </main>
        </SidebarProvider>
    )
}