import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from "@snap/camera-kit";
import Title from '../components/Title';
import BestSeller from '../components/BestSeller'

const AR = () => {
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const cameraKitRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const inventory = [
    {
      category: 'Bracelet',
      variations: [
        { name: 'Blue Stone', lensId: '6dfdaca0-300c-4fa5-a04a-298a1a90c1e6', groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' },
        { name: 'Green Stone', lensId: '613a70c1-6b2e-4e9b-bea8-a18100bc8daa', groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' },
      ]
    },
    {
      category: 'Necklace',
      variations: [
        { name: 'Silver', lensId: '8b223cbe-03be-43d3-96b1-eeb31a49b2c4', groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' },
      ]
    },
    {
      category: 'Earring',
      variations: [
        { name: 'Blue', lensId: '11794d5b-2af2-47e3-afae-5ff6e3fd907b', groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' },
        { name: 'Red', lensId: 'c409845d-7026-41d0-80da-2992c3982adc', groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' },
      ]
    }
  ];

  useEffect(() => {
    const initCamera = async () => {
      if (!canvasRef.current) return;
      const cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzcyMTc0NzY2LCJzdWIiOiI4MTExNzRjNS1jNDYyLTRjN2EtYmQ4OC01YjE2YmQ4N2ZmODV-U1RBR0lOR35iYzM3YzQ1YS1lMTc3LTQxYWUtOGMwMi1mZDY1ODE2NmYyNmMifQ.-ar__2U-2T5f1-qlkuLNjVTqfcOJP4BuivPHJuAfqt4' // Ensure this is active
      });
      
      cameraKitRef.current = cameraKit;
      const session = await cameraKit.createSession({ liveRenderTarget: canvasRef.current });
      sessionRef.current = session;

      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      await session.setSource(mediaStream);
      await session.play();
    };

    initCamera();
    return () => sessionRef.current?.pause();
  }, []);

  const handleApplyLens = async (lensId, groupId) => {
    if (!sessionRef.current || !cameraKitRef.current) return;
    setLoading(true);
    try {
      const lens = await cameraKitRef.current.lensRepository.loadLens(lensId, groupId);
      await sessionRef.current.applyLens(lens);
    } catch (error) {
      console.error("Lens failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-4 sm:px-[5vw] flex flex-col items-center mb-20'>
      <div className='text-2xl text-center pt-8 border-t w-full'>
        <Title text1={'AR TRY-ON'} text2={'OUR BEST JEWELRIES'} />
      </div>

      {/* Main Category Selection */}
      <div className='flex flex-wrap justify-center gap-4 my-8'>
        {inventory.map((item) => (
          <button 
            key={item.category}
            onClick={() => setActiveCategory(item)}
            className={`px-6 py-2 border transition-all ${activeCategory?.category === item.category ? 'bg-black text-white' : 'border-black'}`}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Variation Selection (Shows only when a category is picked) */}
      {activeCategory && (
        <div className='flex flex-wrap justify-center gap-3 mb-10 animate-fadeIn'>
          {activeCategory.variations.map((variant) => (
            <button
              key={variant.name}
              onClick={() => handleApplyLens(variant.lensId, variant.groupId)}
              className='text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-300 transition-colors'
            >
              {variant.name}
            </button>
          ))}
        </div>
      )}

      {/* AR Viewport */}
      <div className='relative w-full max-w-[700px] aspect-[3/4] sm:aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white'>
        {loading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/60 z-10 text-white backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-2'>
              <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
              <p className='text-sm font-light'>Loading AR Experience...</p>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className='w-full h-full object-cover -scale-x-100' />
      </div>
      
      <BestSeller/>
    </div>
  );
}

export default AR;

