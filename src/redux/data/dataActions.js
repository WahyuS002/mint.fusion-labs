// log
import store from '../store'
import { toast } from 'react-toastify'

const fetchDataRequest = () => {
    return {
        type: 'CHECK_DATA_REQUEST',
    }
}

const fetchDataSuccess = (payload) => {
    return {
        type: 'CHECK_DATA_SUCCESS',
        payload: payload,
    }
}

const fetchDataFailed = (payload) => {
    return {
        type: 'CHECK_DATA_FAILED',
        payload: payload,
    }
}

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(fetchDataRequest())
        try {
            let totalSupply = await store.getState().blockchain.smartContract.methods.totalSupply().call()
            let cost = await store.getState().blockchain.smartContract.methods.cost().call()
            let paused = await store.getState().blockchain.smartContract.methods.paused().call()
            let maxMintAmountPerAddress = await store.getState().blockchain.smartContract.methods.maxMintAmountPerAddress().call()
            let maxSupply = await store.getState().blockchain.smartContract.methods.maxSupply().call()
            let isWhitelistMintEnabled = await store.getState().blockchain.smartContract.methods.whitelistMintEnabled().call()

            let currentWallet = await store.getState().blockchain.account
            let walletOfOwner = await store.getState().blockchain.smartContract.methods.walletOfOwner(currentWallet).call()
            let currentWalletSupply = walletOfOwner.length

            dispatch(
                fetchDataSuccess({
                    totalSupply,
                    cost,
                    paused,
                    maxMintAmountPerAddress,
                    isWhitelistMintEnabled,
                    currentWalletSupply,
                    maxSupply,
                })
            )
        } catch (err) {
            console.log(err)
            dispatch(fetchDataFailed('Could not load data from contract.'))
            toast.error('Could not load data from contract.')
        }
    }
}
