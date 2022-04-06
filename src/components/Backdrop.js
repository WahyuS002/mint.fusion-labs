import React from 'react'
import { motion } from 'framer-motion'

export default function Backdrop({ children, onClick }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClick}>
            <div className="flex h-full absolute w-full inset-0 z-10 bg-black/90">
                <div className="flex w-full h-screen">
                    <div className="m-auto">{children}</div>
                </div>
            </div>
        </motion.div>
    )
}
