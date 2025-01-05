import EventNavbar from "@/components/ui/event_navbar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            <EventNavbar />
            { children }
        </main>
    )
}