"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ChefHat, Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux";
import { useLogoutMutation } from "@/redux/api/auth";
import { toast } from "react-toastify";
import { setLogout } from '@/redux/states/authSlice';
import { motion, useScroll, useTransform } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle";


const navLinks = [
    {
        name:'Home',
        path:'/',        
    },
    {
        name:'Contact Us',
        path:'/contact-us',        
    },
    {
        name:'About Us',
        path:'/about-us',        
    },
]

const Navbar = () => {

    const path = usePathname();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const { token , isAuthenticated} = useSelector((state: RootState) => state.auth);
    const [isMobileBar,setIsMobileBar] = useState(false);

    const logoutHandler = async() => {
        const toastId = toast.loading("Loading...");
        try {
            const res = await logout(token || "" ).unwrap();
            console.log(res);
            if(res){
                dispatch(setLogout())
            }
        } catch (error) {
            console.log("Logout failed!",error);
        }
        toast.dismiss(toastId);

    }

    return (
          <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex justify-between items-center p-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="font-bold text-2xl">FoodFlow</span>
              </motion.div>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#features">
                  <Button variant="ghost">Features</Button>
                </Link>
                <Link href="#dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="#pricing">
                  <Button variant="ghost">Pricing</Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost">About</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost">Contact</Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </div>
          </nav>
    )
  }
  
  export default Navbar;