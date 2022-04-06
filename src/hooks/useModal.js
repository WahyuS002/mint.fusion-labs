import { useState } from 'react'

// Centralizes modal control
const useModal = () => {
    const [mintedModalOpen, setMintedModalOpen] = useState(false)

    const closeMintedModal = () => setMintedModalOpen(false)
    const openMintedModal = () => setMintedModalOpen(true)

    return { mintedModalOpen, closeMintedModal, openMintedModal }
}

export default useModal
