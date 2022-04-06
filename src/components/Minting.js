import React, { useEffect, useState } from 'react'
import Slider from 'react-input-slider'

import MintedModal from './MintedModal'
import useModal from '../hooks/useModal'
import { AnimatePresence } from 'framer-motion'

import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'

import { toast } from 'react-toastify'

import { getProofForAddress, isWhitelist } from '../lib/Whitelist'

import HashLoader from 'react-spinners/HashLoader'

export default function Minting() {
    const { mintedModalOpen, closeMintedModal, openMintedModal } = useModal()

    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)

    const [claimingNft, setClaimingNft] = useState(false)

    const [mintAmount, setMintAmount] = useState({ x: 10 })

    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: '',
        SCAN_LINK: '',
        NETWORK: {
            NAME: '',
            SYMBOL: '',
            ID: 0,
        },
        NFT_NAME: '',
        SYMBOL: '',
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
    })

    const getConfig = async () => {
        const configResponse = await fetch('/config/config.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        const config = await configResponse.json()
        SET_CONFIG(config)
    }

    const getData = () => {
        if (blockchain.account !== '' && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account))
        }
    }

    const claimNFTs = () => {
        let cost = data.cost
        let gasLimit = CONFIG.GAS_LIMIT
        let totalCostWei = String(cost * mintAmount.x)

        if (data.paused) {
            toast.info('Minting will open soon.')
        } else {
            console.log('Current Wallet Supply : ', data.currentWalletSupply)
            if (data.currentWalletSupply + mintAmount.x > data.maxMintAmountPerAddress) {
                toast.warning('You have exceeded the max limit of minting.')
            } else if (parseInt(mintAmount.x) + parseInt(data.totalSupply) > data.maxSupply) {
                toast.warning('You have exceeded the max limit of minting.')
            } else {
                if (data.isWhitelistMintEnabled) {
                    return whitelistMintTokens(gasLimit, totalCostWei)
                } else {
                    return mintTokens(gasLimit, totalCostWei)
                }
            }
        }
    }

    const whitelistMintTokens = (gasLimit, totalCostWei) => {
        if (!isWhitelist(blockchain.account)) {
            return toast.error('This address is not whitelisted!')
        } else {
            toast.info(`Minting your ${CONFIG.NFT_NAME}...`)
            setClaimingNft(true)
            return blockchain.smartContract.methods
                .whitelistMint(mintAmount.x, getProofForAddress(blockchain.account))
                .send({
                    gasLimit: gasLimit,
                    to: CONFIG.CONTRACT_ADDRESS,
                    from: blockchain.account,
                    value: totalCostWei,
                })
                .once('error', () => {
                    toast.error('Sorry, something went wrong please try again later.')
                    setClaimingNft(false)
                })
                .then(() => {
                    toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                    setClaimingNft(false)
                    dispatch(fetchData(blockchain.account))
                    openMintedModal()
                })
        }
    }

    const mintTokens = (gasLimit, totalCostWei) => {
        toast.info(`Minting your ${CONFIG.NFT_NAME}...`)
        setClaimingNft(true)
        return blockchain.smartContract.methods
            .mint(mintAmount.x)
            .send({
                gasLimit: gasLimit,
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,
            })
            .once('error', (err) => {
                console.log(err)
                toast.error('Sorry, something went wrong please try again later.')
                setClaimingNft(false)
            })
            .then((receipt) => {
                console.log(receipt)
                toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                setClaimingNft(false)
                dispatch(fetchData(blockchain.account))
                openMintedModal()
            })
    }

    useEffect(() => {
        getConfig()
    }, [])

    useEffect(() => {
        getData()
    }, [blockchain.account])

    return (
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {mintedModalOpen && <MintedModal handleClose={closeMintedModal} />}
            </AnimatePresence>

            {claimingNft ? (
                <div className="flex h-full bg-black/90 backdrop-blur-3xl absolute inset-0 w-full z-10">
                    <div className="flex w-full h-screen">
                        <div className="m-auto text-white">
                            <HashLoader color="#82A4A3" loading={true} size={50} />
                            <h4 className="text-xl mt-12">Minting in Progress...</h4>
                        </div>
                    </div>
                </div>
            ) : null}
            <div>
                <Slider
                    axis="x"
                    x={mintAmount.x}
                    xmax={50}
                    xmin={1}
                    onChange={({ x }) => setMintAmount((state) => ({ ...state, x }))}
                    styles={{
                        track: {
                            backgroundColor: '#B4C4CE',
                        },
                        active: {
                            backgroundColor: '#1A1B1C',
                        },
                    }}
                    disabled={!data.loading && blockchain.smartContract !== null ? false : true}
                />
            </div>
            <div className="mt-4">
                {!data.loading && blockchain.smartContract !== null ? (
                    <button
                        className={
                            (data.paused ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-300') +
                            ' text-2xl px-28 py-2 rounded-xl  border-4 border-gray-800 transition-all duration-200 ease-in-out'
                        }
                        onClick={(e) => {
                            claimNFTs()
                        }}
                        disabled={data.paused ? true : false}
                    >
                        Mint {mintAmount.x}
                    </button>
                ) : null}

                {blockchain.account === '' || blockchain.smartContract === null ? (
                    <button
                        className="text-2xl px-28 py-2 rounded-xl bg-white border-4 border-gray-800 hover:bg-gray-300 transition-all duration-200 ease-in-out"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(connect())
                            getData()
                        }}
                    >
                        Connect
                    </button>
                ) : (
                    <>
                        {data.loading ? (
                            <button className="text-2xl px-16 py-2 rounded-xl bg-white border-4 border-gray-800 hover:bg-gray-300 transition-all duration-200 ease-in-out" disabled>
                                Loading . . .
                            </button>
                        ) : null}
                    </>
                )}
            </div>
        </>
    )
}
