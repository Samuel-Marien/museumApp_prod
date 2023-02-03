import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'

import { useAppContext } from '../../context/appContext'

import { getOneExhibition } from '../../components/API'
import useHasMounted from '../../components/hooks/useHasMounted'

import MyHeader from '../../components/MyHeader'
import Navbar from '../../components/Navbar'
import MySpinner from '../../components/MySpinner'
import MyToast from '../../components/MyToast'

import { HiOutlineSaveAs } from 'react-icons/hi'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

const notify = (artName, filename, artSection) =>
  artName
    ? toast.custom(
        <MyToast
          toastName={artName}
          myUrl={filename}
          artSection={artSection}
          isShow={true}
          isVisible={false}
        />,
        {
          duration: 1500,
          position: 'top-center'
        }
      )
    : toast.error('Here is an error!')

const MyItem = (props) => {
  const { itemUrl } = props
  return (
    <motion.img
      key={`https://${itemUrl}`}
      src={`https://${itemUrl}`}
      initial={{ x: 300, opacity: 0.6 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          opacity: { duration: 1.5 },
          x: { duration: 1 }
        }
      }}
      exit={{
        x: -300,
        opacity: 0
      }}
    />
  )
}

const Exhibition = () => {
  const { saveExhibArt, user } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [myExhibition, setMyExhibition] = useState([])
  const [myCurrentImage, setMyCurrentImage] = useState(0)

  // check authentication:
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    // router.isReady => fetch info on reload
    if (router.isReady) {
      const response = async () => {
        const data = await getOneExhibition(id)
        setMyExhibition(data)
      }
      response()
    }
    return function cleanup() {
      console.log('clean')
    }
  }, [router.isReady, id])

  const handleSubmit = (e) => {
    notify(
      myExhibition.title,
      `https://${myExhibition.images[myCurrentImage].standard_size_url}`,
      'Exhibition'
    )
    e.preventDefault()
    saveExhibArt(
      myExhibition.title,
      myExhibition.id,
      myExhibition.images[myCurrentImage].id,
      myExhibition.images[myCurrentImage].caption,
      myExhibition.images[myCurrentImage].citation,
      myExhibition.images[myCurrentImage].credit,
      myExhibition.images[myCurrentImage].largest_derivative_url,
      myExhibition.images[myCurrentImage].standard_size_url,
      myExhibition.images[myCurrentImage].thumbnail_url,
      myExhibition.images[myCurrentImage].date
    )
  }

  const maxPlusImage = myExhibition.images && myExhibition.images.length

  const handlePlusImage = () => {
    return myCurrentImage === maxPlusImage - 1
      ? setMyCurrentImage(0)
      : setMyCurrentImage((myCurrentImage += 1))
  }

  const handleMinusImage = () => {
    return myCurrentImage === 0
      ? setMyCurrentImage(maxPlusImage - 1)
      : setMyCurrentImage((myCurrentImage -= 1))
  }

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  console.log(myExhibition)

  return (
    <>
      <MyHeader description="Detailed exhibition" />
      <div
        className="text-slate-700 h-screen"
        style={{
          background: `url(/images/landing42.png)`,
          backgroundSize: 'cover',
          backgroundPosition: ' bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Toaster />
        <Navbar />
        {Object.entries(myExhibition).length === 0 ? (
          <MySpinner />
        ) : (
          <div className="font-myText">
            <div className="font-myTitle tracking-widest text-4xl mt-4 first-letter:text-slate-800 first-letter:text-5xl text-center text-slate-400">
              {myExhibition.title}
            </div>
            <div className=" text-sm md:text-base italic font-thin mt-2 text-center text-slate-400">
              <p className="flex my-4 justify-center space-x-6 items-center">
                <span className="font-myTitle tracking-widest font-thin not-italic ml-3">
                  | {myExhibition.organizing_department} |
                </span>
                <span
                  className="font-myTitle tracking-wider text-2xl flex items-center justify-center 
                  ml-2 border border-slate-500 rounded-sm px-1 py-0.5 cursor-pointer shadow 
                  active:translate-y-1 transition-all duration-300 bg-slate-500 text-slate-200 
                  hover:bg-slate-200 hover:text-slate-500 "
                  onClick={handleSubmit}
                >
                  <span className="mr-2 text-base not-italic animate-pulse hover:animate-none">
                    Save
                  </span>
                  <span>
                    <HiOutlineSaveAs />
                  </span>
                </span>
              </p>
            </div>

            {/* large screens */}
            <div
              style={{ minHeight: '600px', minWidth: '800px' }}
              className="hidden  mx-auto md:flex flex-col justify-center overflow-hidden w-max "
            >
              {myExhibition.images && (
                <AnimatePresence>
                  <MyItem
                    itemUrl={`${
                      myExhibition.images[myCurrentImage] &&
                      myExhibition.images[myCurrentImage].largest_derivative_url
                    }`}
                  />
                </AnimatePresence>
              )}
            </div>

            {/* little screen device  */}
            <div
              style={{ minHeight: '300px' }}
              className="md:hidden mx-auto flex justify-center mt-5 overflow-hidden w-full p-2 rounded shadow-xl"
            >
              {myExhibition.images && (
                <AnimatePresence>
                  <MyItem
                    itemUrl={`${
                      myExhibition.images[myCurrentImage] &&
                      myExhibition.images[myCurrentImage].largest_derivative_url
                    }`}
                  />
                </AnimatePresence>
              )}
            </div>

            {/* Pagination container  */}
            <div className="mt-4 flex justify-center w-full  text-slate-400 ">
              <div className="flex space-x-4">
                <button
                  className=" text-2xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
                  onClick={handleMinusImage}
                >
                  <BsFillArrowLeftCircleFill />
                </button>
                <p className="font-myTitle tracking-wide font-thin ">
                  {myCurrentImage + 1}/{maxPlusImage}
                </p>
                <button
                  className="text-2xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
                  onClick={handlePlusImage}
                >
                  <BsFillArrowRightCircleFill />
                </button>
              </div>
            </div>

            {myExhibition.images && (
              <div className="mt-1 text-center w-11/12 md:w-10/12 lg:w-8/12 xl:w-5/12 p-1 px-5 mx-auto  justify-between">
                <p className="font-semibold tracking-wide ">
                  {myExhibition.images[myCurrentImage] &&
                    myExhibition.images[myCurrentImage].caption}
                </p>
                <div className="flex justify-center space-x-6 mt-1">
                  <p className="italic text-slate-400 text-sm md:text-base">
                    {myExhibition.images[myCurrentImage] &&
                      myExhibition.images[myCurrentImage].citation}
                  </p>
                  <p className="font-semibold text-sm border px-1 flex self-center shadow-lg rounded-lg bg-slate-700 text-slate-100">
                    {myExhibition.images[myCurrentImage] &&
                      myExhibition.images[myCurrentImage].date}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Exhibition
