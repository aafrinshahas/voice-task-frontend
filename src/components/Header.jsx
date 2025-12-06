import React from 'react'
import heroimage from '../assets/images/heroimage.png'

const Header = () => {
return (
<div className='text-center font-semibold p-8 text-4xl'>
<h1>Voice Enabled Task Tracker</h1>
<div className='flex items-center justify-center pt-10'>
<img src={heroimage} className='h-[180px]' alt='Hero Image'></img>
</div>

</div>
)
}

export default Header