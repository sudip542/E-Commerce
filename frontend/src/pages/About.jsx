import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto culpa quisquam tempore neque. Assumenda quae beatae at ratione omnis nam laborum necessitatibus doloribus, nobis suscipit sequi, autem, mollitia quia!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus fugit, reprehenderit iure praesentium fugiat modi vel, dicta sed in similique veritatis exercitationem aperiam ipsum culpa deserunt ut? Rerum, suscipit provident.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nostrum nesciunt blanditiis suscipit odio totam nisi asperiores assumenda recusandae eligendi, a magni doloribus quam magnam aspernatur mollitia nam quisquam ea?</p>
        </div>
      </div>

      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Quality Assurance:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, doloremque omnis beatae iste commodi possimus quos illum iusto totam, mollitia, laudantium cum libero officiis rem ex pariatur odit eius recusandae!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Convenience:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, doloremque omnis beatae iste commodi possimus quos illum iusto totam, mollitia, laudantium cum libero officiis rem ex pariatur odit eius recusandae!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Exceptional Customer Service:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, doloremque omnis beatae iste commodi possimus quos illum iusto totam, mollitia, laudantium cum libero officiis rem ex pariatur odit eius recusandae!</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About
