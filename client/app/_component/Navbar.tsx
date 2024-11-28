"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux";
import { useLogoutMutation } from "@/redux/api/auth";
import { toast } from "react-toastify";
import { setLogout } from '@/redux/states/authSlice';

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
       <div className="w-full bg-gray-950 mx-auto h-full border-b border-gray-400">
          <div className="flex justify-between items-center lg:w-10/12 mx-auto py-3 px-4">
            {/* Left Side */}
            <div className="flex items-center gap-3">
                <div className="text-3xl font-semibold text-gray-50">R</div>
                <h1 className="text-3xl font-semibold text-gray-50">Restro</h1>
            </div>

            {/* Middle side */}
            <div className="hidden md:flex items-center gap-8 text-gray-50 font-semibold text-lg">
                {
                    navLinks.map((link,index) => (
                        <div className="flex items-center gap-4" key={index}>
                            <Link href={link?.path} key={link.name} className={`${path == link.path ? "text-blue-400" : "text-gray-50"} hover:text-gray-400 transition-all duration-200`}>
                              <div>{link.name}</div>
                            </Link>
                        </div>
                    ) )
                    
                }
            </div>

            {/* End */}
            <div className="hidden md:block">
                {
                    isAuthenticated ? <div className="text-white flex items-center gap-6">
                    <Button variant={"default"} size={"lg"} asChild>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                    <Button variant={"outline"} size={"lg"} onClick={logoutHandler} asChild>
                            <Link href={"/"}>Log out</Link>
                    </Button>
                    <div></div>   {/*Add user sign*/}
                </div>
                    : <div className="text-white flex items-center gap-6">
                        <Button variant={"default"} size={"lg"} asChild>
                            <Link href={"/signup"}>Sign Up</Link>
                        </Button>
                        <Button variant={"outline"} size={"lg"} asChild>
                            <Link href={"/signin"}>Login</Link>
                        </Button>
                    </div>
                }
            </div>

            {/* Mobile view */}
            <div className="text-gray-50 relative md:hidden">
                <div onClick={() => setIsMobileBar((prev) => !prev)}>
                  <Menu />
                </div>
                <div className={`${isMobileBar ? "block" : "hidden"} px-4 py-5 transition-all duration-200 bg-gray-950 absolute text-white rounded-xl shadow-xl right-1 z-40 top-12 min-w-36`}>
                   <div className=" flex flex-col items-start justify-between gap-4">
                   {
                        navLinks.map((link,index) => (
                            <div className="flex items-center gap-4 py-2 border-b border-gray-400 w-full" key={index}>
                                <Link href={link?.path} key={link.name} className={`${path == link.path ? "text-blue-400" : "text-gray-50"} hover:text-gray-400 transition-all duration-200`}>
                                  <div>{link.name}</div>
                                </Link>
                            </div>
                        ) )
                    }
                   </div>
                </div>
            </div>

          </div>
       </div>
    )
  }
  
  export default Navbar;