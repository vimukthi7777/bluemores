import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2 = {'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Bluemores was born from a deep passion for heritage craftsmanship and timeless design. Specializing in batik and custom jewelry, we are dedicated to creating pieces that celebrate culture, artistry, and individuality. Each design reflects the beauty of traditional techniques blended with modern elegance, allowing our customers to wear something truly meaningful and unique.</p>
          <p>From handcrafted batik creations to personalized jewelry made with care and precision, Bluemores focuses on quality, authenticity, and attention to detail. We believe that fashion is more than style — it is a form of self-expression. Every piece we create tells a story, honoring tradition while embracing contemporary sophistication.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Bluemores is to preserve the art of batik and elevate custom jewelry through exceptional craftsmanship and thoughtful design. We are committed to delivering high-quality, meaningful pieces that inspire confidence, celebrate individuality, and provide a seamless, enjoyable shopping experience for every customer.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select ond vet each product to ensure it meets our stringent quoty standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience::</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About;
