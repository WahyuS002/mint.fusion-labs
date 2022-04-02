import React from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

export default function CollectionStatus() {
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)

    return (
        <>
            <AnimatePresence>
                {!data.loading && blockchain.smartContract !== null ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h1 className="text-4xl font-bold uppercase tracking-wider">Mint Is Live</h1>
                        <h4 className="mt-6 text-xl">0.01 ETH Mint Price</h4>
                        <h4 className="mt-2 text-xl">Max 50 Per Transaction</h4>
                    </motion.div>
                ) : (
                    <h1 className="text-4xl font-bold uppercase tracking-wider">Connect your Wallet</h1>
                )}
            </AnimatePresence>
        </>
    )
}
