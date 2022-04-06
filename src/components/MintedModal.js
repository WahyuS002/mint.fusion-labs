import React from 'react'
import MintedImg from '../assets/minted.png'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'

export default function MintedModal({ handleClose }) {
    return (
        <Backdrop onClick={handleClose}>
            <div className="flex justify-center overflow-hidden">
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="md:w-3/4 relative"
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: [0, 1, 0.95] }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 25,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0,
                        transition: {
                            duration: 0.15,
                            ease: 'easeOut',
                        },
                    }}
                >
                    <img draggable={false} src={MintedImg} alt="" />
                    <button
                        className="absolute left-36 bottom-28 md:left-[21rem] md:bottom-[4rem] px-12 text-lg font-bold text-white py-2 rounded-md bg-gray-800 border-4 border-white z-10 hover:bg-black transition-all duration-300 ease-in-out hidden md:block"
                        onClick={handleClose}
                    >
                        FINISH
                    </button>
                    <div className="flex justify-center">
                        <button className="block md:hidden" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </div>
        </Backdrop>
    )
}
