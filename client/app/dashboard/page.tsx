"use client"
import { useAppSelector } from '@/redux/redux'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8000',{
  path:"/socket-server-path"
})

function Dashboard() {

  const [ newOrderModal , setNewOrderModal ] = useState(null);

  const {user , isAuthenticated } = useAppSelector((state) => state.auth)
  console.log("User data",user);


  useEffect(() => {
     if(isAuthenticated){
        //join room
        socket.emit("joinRoom",user.role == "User" ? user?.restaurantId : user.id);

        //listen for new order
        socket.on('newOrder',(orderData) => {
          console.log("New Order Recieved",orderData);
          setNewOrderModal(orderData);
        });

        return () => {
          socket.off("newOrder");
        }
     }
  },[user])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard