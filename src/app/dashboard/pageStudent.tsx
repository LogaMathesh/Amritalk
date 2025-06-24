import { AppSidebar1 } from "@/components/app-sidebar1"
import { Separator } from "@/components/ui/separator"
import { SidebarRight } from "@/components/sidebar-right"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import ButtonGradient from "@/assets/svg/ButtonGradient.jsx";
import Benefits2 from "@/components/Benefits2"
import Collaboration from "@/components/Collaboration";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero2 from "@/components/Hero2";
import Pricing from "@/components/Pricing";


export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar1 />
      <SidebarInset>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        
        <Header />
        
        <Hero2 />
        <Benefits2 />
        <Footer />
        <ButtonGradient />
      </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
