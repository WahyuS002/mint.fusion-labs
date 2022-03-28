import React, { useState } from 'react'
import Slider from 'react-input-slider'

export default function Minting() {
    const [state, setState] = useState({ x: 10 })

    return (
        <>
            <div>
                <Slider
                    axis="x"
                    x={state.x}
                    xmax={50}
                    onChange={({ x }) => setState((state) => ({ ...state, x }))}
                    styles={{
                        track: {
                            backgroundColor: '#B4C4CE',
                        },
                        active: {
                            backgroundColor: '#1A1B1C',
                        },
                    }}
                    disabled
                />
            </div>

            <div className="mt-4">
                <button className="text-2xl px-28 py-2 rounded-xl bg-white border-4 border-gray-800 hover:bg-gray-300 transition-all duration-200 ease-in-out">Connect</button>
            </div>
        </>
    )
}
