"use client"
import { useVerifyTokenMutation } from '@/redux/api/auth';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

function Verify({}: Props) {
  const { token } = useParams();
  const [verifyToken , {isLoading , isError,isSuccess}] = useVerifyTokenMutation();
  useEffect(() => {
    if(token){
        console.log("token",token);
        verifyToken(token[0]);
    }
  },[token])
  if(isLoading){
     return <div>Loading...</div>
  }
  return (
    <div>
       {
        isSuccess ? "User verified , Login now" : "Something wrong"
       }
    </div>
  )
}

export default Verify