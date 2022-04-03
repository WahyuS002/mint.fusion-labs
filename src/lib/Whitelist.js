import whitelistAddresses from '../assets/whitelist.json'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

export function getProofForAddress(address) {
    // get merkle tree
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

    return merkleTree.getHexProof(keccak256(address))
}

// export default function Whitelist() {
//     const [merkleTree, setMerkleTree] = useState()

//     const getMerkleTree = () =>
//     {
//         if (merkleTree === undefined) {
//             const leafNodes = whitelistAddresses.map(addr => keccak256(addr));

//             merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
//         }

//         return merkleTree;
//     }

//     const getProofForAddress = (address) =>
//     {
//         return getMerkleTree().getHexProof(keccak256(address));
//     }

//     const getRawProofForAddress = (address) =>
//     {
//         return getProofForAddress(address).toString().replaceAll('\'', '').replaceAll(' ', '');
//     }
// }
