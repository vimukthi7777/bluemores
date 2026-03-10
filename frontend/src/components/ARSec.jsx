import React from 'react' 
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
const ARSec = () => {
    const navigate = useNavigate(); 
  return (
  <div className='flex flex-col sm:flex-row border border-gray-400 mt-5'> 
    {/* Left Side: Image */}
    <img className='w-full sm:w-1/2' src={assets.AR_banner} alt="AR Banner" />
    
    {/* Right Side: Content */} 
    <div className='w-full sm:w-1/2 flex flex-col items-center justify-center p-10 gap-6'> 
      <div className='text-[#414141] text-center'> 
        <h1 className='prata-regular text-3xl lg:text-5xl leading-tight'>
          Try It On Before Buy
        </h1>
      </div> 
      
      <button 
      onClick={() => navigate('/ar')}
        className='bg-black text-white text-xs tracking-widest px-10 py-4 uppercase' 
      >
        AR TRY IT ON
      </button>
    </div> 
  </div> 
)
}

export default ARSec
