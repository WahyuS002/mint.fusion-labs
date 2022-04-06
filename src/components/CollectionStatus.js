import React from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import Web3 from 'web3'

export default function CollectionStatus() {
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)

    let web3 = new Web3()

    return (
        <>
            {!data.paused && !data.loading && blockchain.smartContract !== null ? (
                <div className="mb-6">
                    <div className="bg-gray-800 rounded-full px-6 py-1 text-gray-200 inline-block font-semibold text-sm uppercase">
                        <div className="flex items-center">
                            <span className="rounded-full w-3 h-3 bg-green-400 inline-block"></span>
                            <span className="ml-2">{data.isWhitelistMintEnabled ? 'Whitelist Mint' : 'Public Mint'}</span>
                        </div>
                    </div>
                </div>
            ) : null}

            <AnimatePresence>
                {!data.loading && blockchain.smartContract !== null ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h1 className="text-4xl font-bold uppercase tracking-wider">Mint Is {data.paused ? 'Paused' : 'Live'}</h1>
                        <h4 className="mt-6 text-xl">{data.cost > 0 ? web3.utils.fromWei(data.cost.toString(), 'ether') + ' ETH' : 'Free'} Mint Price</h4>
                        <h4 className="mt-2 text-xl">Max {data.maxMintAmountPerAddress} Per Address</h4>
                    </motion.div>
                ) : (
                    <h1 className="text-4xl font-bold uppercase tracking-wider">Connect your Wallet</h1>
                )}
            </AnimatePresence>
        </>
    )
}
