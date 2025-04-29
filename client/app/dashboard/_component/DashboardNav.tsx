import { BellIcon, ChefHat, LogOut, Menu, Settings } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getPersistor, makeStore, useAppDispatch, useAppSelector } from "@/redux/redux";
import { setIsSidebarCollapsed } from "@/redux/states/globalSlice";
import Image from "next/image";
import { useLogoutMutation } from "@/redux/api/auth";
import { toast } from "react-toastify";
import { setLogout } from "@/redux/states/authSlice";

type Props = {};

function DashboardNav({}: Props) {

    const dispatch = useAppDispatch();

    const {isSidebarCollapsed} = useAppSelector((state) => state.global);
    const {user,token} = useAppSelector((state) => state.auth)


    const [ isModal , setIsModal ] = useState(false);
    const [ isOpen , setIsOpen ] = useState(false);

    const [logout] = useLogoutMutation();

    const logoutHandler = async() => {
        try {
           const res = await logout(token || "")
                       .unwrap()
                       .then(
                          () => {
                            dispatch(setLogout())
                            toast.success("User logout successfully!")
                            getPersistor()?.purge();
                          }
                       )
        } catch (error) {
            toast.error("Something wrong")
        }
    }

  return (
    <nav className="bg-white w-screen h-full flex flex-row items-center justify-between px-5">
      <div className="flex flex-row items-center gap-6">
        {/* Logo and name */}
        <Menu className={`h-6 w-6 text-primary cursor-pointer rounded-full hover:opacity-75 ${isSidebarCollapsed ? "-ml-2 md:ml-0" : "ml-4"}`} onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}/>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Link href={"/"} className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary text-blue-500" />
            <span className={`font-bold text-2xl`}>Restro</span>
          </Link>
        </motion.div>  
      </div>

      <div className="flex items-center gap-4 py-2 h-full">
        {
          isOpen ? 
          <Image src={'/openSignBoard1.png'} alt="open-sign" width={70} height={50} className="mr-8  cursor-pointer hover:scale-110 transition-all duration-200" onClick={() => setIsOpen(false)} /> :
          <Image src={'/closeSignBoard1.png'} alt="close-sign" width={65} height={50} className="mr-10 cursor-pointer mt-3 hover:scale-110 transition-all duration-200" onClick={() => setIsOpen(true)} />
        }
        <div className="cursor-not-allowed">
          <BellIcon color="#4b5563"/>
        </div>
        <div className="bg-gray-400 w-[2px] h-2/3"/>
        <div className="flex items-center gap-2">
            {/* user iamge & name */}
                <Image
                src={user?.thumbnail }
                alt="user-img"
                width={40}
                height={40}
                className="rounded-full bg-blue-400"
                /> 
                <div className="text-lg font-semibold hidden md:block text-gray-700">{user?.name}</div>
        </div>
        <div className="relative">
          <Settings color="#4b5563" className="cursor-pointer" onClick={() => setIsModal(!isModal)}/>
          {
            isModal && <div className="absolute px-4 py-2 w-36 flex flex-col gap-4 items-center justify-center bg-gray-200 border-2 shadow-xl rounded-xl top-10 right-0">
                <div className="flex items-center gap-2 cursor-pointer">
                    <p className="font-semibold" onClick={logoutHandler}>Log out</p>
                    <LogOut scale={60} color="#ef4444 "/>
                </div>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
