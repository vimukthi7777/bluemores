import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from "@snap/camera-kit";
import Title from '../components/Title';
import ARSec from '../components/ARSec'

const AR = () => {
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const cameraKitRef = useRef(null); // Step 1: Create a ref for CameraKit
  const [loading, setLoading] = useState(false);

  const categories = [
    { 
      name: 'Bracelet', 
      lensId: '6dfdaca0-300c-4fa5-a04a-298a1a90c1e6', 
      groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' 
    },
    { 
      name: 'Necklace', 
      lensId: '8b223cbe-03be-43d3-96b1-eeb31a49b2c4',
      groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' 
    },
    { 
      name: 'Earring', 
      lensId: '11794d5b-2af2-47e3-afae-5ff6e3fd907b', 
      groupId: 'bb7b664e-69a3-4694-8c5c-07401e58f971' 
    }
  ];

  useEffect(() => {
    const initCamera = async () => {
      if (!canvasRef.current) return;

      const cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzcyMTc0NzY2LCJzdWIiOiI4MTExNzRjNS1jNDYyLTRjN2EtYmQ4OC01YjE2YmQ4N2ZmODV-U1RBR0lOR35iYzM3YzQ1YS1lMTc3LTQxYWUtOGMwMi1mZDY1ODE2NmYyNmMifQ.-ar__2U-2T5f1-qlkuLNjVTqfcOJP4BuivPHJuAfqt4'
      });
      
      // Step 2: Store the cameraKit instance
      cameraKitRef.current = cameraKit;

      const session = await cameraKit.createSession({ 
        liveRenderTarget: canvasRef.current 
      });
      
      sessionRef.current = session;

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });

      await session.setSource(mediaStream);
      await session.play();
    };

    initCamera();

    return () => {
      sessionRef.current?.pause();
    };
  }, []);

  const handleApplyLens = async (lensId, groupId) => {
    // Step 3: Use cameraKitRef to access the repository
    if (!sessionRef.current || !cameraKitRef.current) return;
    
    setLoading(true);
    try {
      // Corrected line: use cameraKitRef.current instead of sessionRef.current
      const lens = await cameraKitRef.current.lensRepository.loadLens(lensId, groupId);
      await sessionRef.current.applyLens(lens);
    } catch (error) {
      console.error("Lens failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-4 sm:px-[5vw] flex flex-col items-center'>
      <div className='text-2xl text-center pt-8 border-t w-full'>
        <Title text1={'AR TRY IT ON'} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 w-full'>
        {categories.map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleApplyLens(item.lensId, item.groupId)}
            className='border border-gray-300 p-8 flex flex-col items-center cursor-pointer hover:bg-black hover:text-white transition-all'
          >
            <p className='prata-regular text-lg uppercase tracking-widest'>{item.name}</p>
          </div>
        ))}
      </div>

      <div className='relative w-full max-w-[800px] aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-black'>
        {loading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-10 text-white'>
            Applying Lens...
          </div>
        )}
        <canvas ref={canvasRef} className='w-full h-full object-cover -scale-x-100' />
      </div>
      <ARSec />
    </div>
  );
}

export default AR;