import Minting from './components/Minting'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="min-h-screen bg-granny font-rubik">
            <div className="p-9">
                <Navbar />
            </div>
            <div className="flex justify-center">
                <div className="max-w-3xl text-center">
                    <h1 className="text-4xl font-bold uppercase tracking-wider">Mint Is Live</h1>
                    <h4 className="mt-6 text-xl">0.01 ETH Mint Price</h4>
                    <h4 className="mt-2 text-xl">Max 50 Per Transaction</h4>

                    <div className="mt-8">
                        <Minting />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
