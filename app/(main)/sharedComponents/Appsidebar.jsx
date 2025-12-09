"use client"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Plus } from "lucide-react"
import { sidebarItems } from "../data/sidebarData"
export function AppSidebar() {
    const pathName = usePathname() //get current path
    console.log("pathname==", pathName)
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-col items-center">
                <Image src={"/app_logo.svg"} alt="logo" width={100}
                    height={50}
                    className="border w-[250px]"

                />
                <Button className="w-full mt-5"><Plus /> Create New Interview</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem className={`p-1 ${pathName == item.path ? "bg-amber-100" : ""}`} key={item.id}>
                                    <SidebarMenuButton className="p-4" asChild>
                                        <Link href={item.path}>
                                            <item.icon className={`${pathName == item.path ? "text-primary" : ""}`} />
                                            <span className={`text-[16px] font-medium ${pathName == item.path ? "text-primary" : ""}`}>{item.name}</span>
                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}