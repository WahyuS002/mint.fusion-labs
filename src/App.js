import CollectionStatus from './components/CollectionStatus'
import Crowd from './components/Crowd'
import Minting from './components/Minting'
import Navbar from './components/Navbar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-granny font-rubik">
                <div className="p-9">
                    <Navbar />
                </div>
                <div className="flex justify-center">
                    <div className="max-w-3xl text-center">
                        <CollectionStatus />

                        <div className="mt-8">
                            <Minting />
                        </div>
                    </div>
                </div>
                <Crowd />
            </div>
        </>
    )
}

export default App
