import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { User, Home, Building2, Calendar, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Clientes", to: "/customers", icon: <User className="ml-2 w-4 h-4 inline hover:text-card" /> },
  { label: "Propriedades", to: "/properties", icon: <Building2 className="ml-2 w-4 h-4 inline hover:text-card" /> },
  { label: "Visitas", to: "/visits", icon: <Calendar className="ml-2 w-4 h-4 inline hover:text-card" /> },
  { label: "Aluguéis", to: "/rentals", icon: <KeyRound className="ml-2 w-4 h-4 inline hover:text-card" /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <>
      <header className="w-full bg-card/80 shadow-lg py-4 px-8 flex items-center justify-between min-h-[64px] z-20 relative">
        <div className="flex items-center gap-3">
          <Link to="/home" className="text-xl font-bold text-primary font-quicksand">
            RealtorApp
          </Link>
        </div>
        <nav className="flex-1 flex items-center justify-center">
          <NavigationMenu className="mr-28">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                  <NavigationMenuLink asChild active={location.pathname === item.to}>
                    <Link to={item.to} className="px-4 py-2 font-medium flex flex-row items-center whitespace-nowrap">
                      {item.label}
                      {item.icon}   
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <Button
          variant="destructive"
          className="bg-card shadow-none text-destructive hover:text-card"
          size={"icon"}
          onClick={() => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </header>
      <main className="w-full flex-1">{children}</main>
    </>
  );
}
