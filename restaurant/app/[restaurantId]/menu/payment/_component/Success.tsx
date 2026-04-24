"use client"
import React, { useEffect, useRef } from 'react'
import {AnimatePresence, motion} from 'motion/react'
import { Check, CheckCircle } from 'lucide-react'
// import React from 'react-confetti'
import ReactConfetti from 'react-confetti'
import {useWindowSize} from 'react-use';
import Image from 'next/image'
import QRCodeStyling from 'qr-code-styling'

type Props = {}

function Success({data}: any) {

  //console.log("Success data",data);

    const {width,height} = useWindowSize();
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        image:
          "",
        dotsOptions: {
          color: "#646464",
          type: "rounded"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20
        },
      });

      const qrRef = useRef(null);
      useEffect(() => {
        qrCode.append(qrRef.current);
        
      },[])

      useEffect(() => {
        qrCode.update({
          data:data?.orderCode
        })
      },[data])

      const downloadQRHander = () => {
        qrCode.download({
            extension: "png"
          });
      }

  return (
    <motion.div
    initial={{opacity: 0,scale:0}}
    animate={{opacity:1,scale:1}}
    transition={{ease:"easeInOut",duration:0.4,delayChildren:0.4}}
    className='bg-rGray absolute inset-0 flex items-center justify-center w-screen h-screen px-4'
    >
        <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={1500}
        initialVelocityY={50}
        />
        <AnimatePresence>
            <div className='flex flex-col justify-center items-center gap-6'>
                {/* success icon */}
                <motion.div
                  animate={{ scale: [0.9, 1, 0.9] }} // Bounce effect
                  transition={{
                    duration: 0.8,
                    repeat: 2, // Infinite loop
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                // style={ball}
                className='scale-150 p-2 shadow-xl text-4xl rounded-full flex items-center justify-center bg-rGreen w-16 h-16 text-white font-extrabold'
                >
                         <Check scale={400} width={36} height={36}/>
                </motion.div>

                <div className='text-center space-y-1'>
                    <h2 className='text-3xl font-serif font-semibold'>Thank you for ordering!!</h2>
                    <p className='text-sm font-semibold text-richWhite-700'>We will let you know when your order is ready.</p>
                </div>

                <div ref={qrRef} />
                
                <button
                onClick={() => downloadQRHander()}
                className='py-3 w-full text-center bg-rGreen text-rGray font-semibold rounded-xl mt-6 hover:bg-opacity-90'>Downlaod</button>

            </div>
        </AnimatePresence>
    </motion.div>
  )
}

export default Success