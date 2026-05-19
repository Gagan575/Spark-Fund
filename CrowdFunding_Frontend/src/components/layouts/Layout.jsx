import { Outlet } from "react-router-dom";
import Header from "./Header";

import OwnerHeader from "./OwnerHeader";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ChatWidget from "../user/chat/ChatWidget";
import AIChatBot from "../user/chat/AIChatBot";
// import { MoonLoader } from "react-spinners";
// import CropBubble from "../pages/CropBubble";

export default function Layout({loading}) {
     const role = sessionStorage.getItem("role")
    
        // Decide which header to render
        const renderHeader = () => {
    
            switch (role) {
    
                case "admin":   // Admin
                    return <AdminHeader/>
    
                case "owner":
                    return <OwnerHeader />
    
                case "investor":   // Normal User
                    return <Header />
    
                default:    // Not logged in
                    return <Header />
            }
        }


    return (
        <>




            <div className="app-wrapper">
                  {renderHeader()}

                 <main className="main-content">
        <Outlet />
      </main>
                <ChatWidget />
                <AIChatBot />

                <Footer />
                
            </div>
        </>
    )
}