import whitelistAddresses from '../assets/whitelist.json'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

export function getProofForAddress(address) {
    // get merkle tree
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

    return merkleTree.getHexProof(keccak256(address))
}

export function isWhitelist(address) {
    // get merkle tree
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    const rootHash = '0x' + merkleTree.getRoot().toString('hex')

    const claimingAddress = keccak256(address)
    const getProofForAddress = merkleTree.getHexProof(claimingAddress)

    const isWhitelist = merkleTree.verify(getProofForAddress, claimingAddress, rootHash)

    return isWhitelist
}
