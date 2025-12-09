import { LayoutDashboard, CalendarCheck, List, WalletCards, Settings } from "lucide-react"
export const sidebarItems = [
    {
        id: 1,
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        id: 2,
        name: "Scheduled Interview",
        icon: CalendarCheck,
        path: "/scheduled-interview"
    },
    {
        id: 3,
        name: "All Interview",
        icon: List,
        path: "/all-interview"
    },
    {
        id: 4,
        name: "Billing",
        icon: WalletCards,
        path: "/billing"
    },
    {
        id: 5,
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }





]