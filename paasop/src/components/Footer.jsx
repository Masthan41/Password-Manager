import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col bg-slate-950 text-white justify-center items-center w-full'>
            <h1 className="logo font-bold text-white text-2xl">
                <span className='text-green-400'> &lt;</span>
                <span> Pass</span><span className='text-green-400'>OP /&gt;</span>
            </h1>
            <div className='flex justify-center items-center'>
                Created with <img className='w-7 mx-2' src="icons/heart.png" alt="heart image" /> by Md Masthan
            </div>
        </div>
    )
}

export default Footer
