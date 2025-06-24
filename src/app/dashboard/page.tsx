import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarRight } from "@/components/sidebar-right"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import ButtonGradient from "@/assets/svg/ButtonGradient.jsx";
import Benefits1 from "@/components/Benefits1";
import Collaboration1 from "@/components/Collaboration1";
import Footer from "@/components/Footer";
import Header1 from "@/components/Header1";
import Hero1 from "@/components/Hero1";
import Pricing1 from "@/components/Pricing1";


export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        
        <Header1 />
        
        <Hero1 />
        <Benefits1 />

        <Footer />
        <ButtonGradient />
      </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
