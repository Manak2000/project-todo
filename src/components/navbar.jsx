import React from 'react'

const navbar = () => {
    return (
        <nav className='flex justify-between bg-violet-900 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-x1 mx-9'>itask</span>
            </div>
            <ul className="flex gap-9 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>

            </ul>

        </nav>
    )
}

export default navbar
