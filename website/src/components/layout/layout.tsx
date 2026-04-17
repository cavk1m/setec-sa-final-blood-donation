import React from "react";
import Header from "../shared/header";
import { Footer } from "../shared/footer";
import MobileBottomNav from "../shared/mobile-nav";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};
function getUserInfo() {
  throw new Error("Function not implemented.");
}
