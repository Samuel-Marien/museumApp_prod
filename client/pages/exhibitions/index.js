import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAppContext } from '../../context/appContext'
import { getExhibition } from '../../components/API'

import MyHeader from '../../components/MyHeader'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import MySpinner from '../../components/MySpinner'

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

const imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_EXHIBITION
const replacementImage = '../images/landing8.jpg'

const ExhibitionHome = () => {
  const router = useRouter()
  const { user } = useAppContext()
  const [myExhibitions, setMyExhibitions] = useState([])
  const [myOffset, setMyOffset] = useState(0)

  // check authentication:
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const maxPlusOffset = 2752
  const itemByPage = 10

  useEffect(() => {
    const response = async () => {
      const data = await getExhibition(itemByPage, myOffset)
      setMyExhibitions(data)
    }
    response()

    return function cleanup() {
      console.log('clean')
    }
  }, [itemByPage, myOffset])

  const handlePlusOffset = () => {
    return myOffset === maxPlusOffset
      ? setMyOffset(0)
      : setMyOffset((myOffset += itemByPage))
  }

  const handleMinusOffset = () => {
    return myOffset === 0
      ? setMyOffset(maxPlusOffset)
      : setMyOffset((myOffset -= itemByPage))
  }

  // console.log(typeof myExhibitions)

  return (
    <>
      <MyHeader description="Exhibitions Home" />
      <div
        className="text-slate-700 h-screen"
        style={{
          background: 'url(../images/landing42.png)',
          backgroundSize: 'cover',
          backgroundPosition: ' bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Navbar />
        <div className="container mx-auto">
          <div>
            <p className="font-myTitle tracking-widest text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl border border-slate-600 container mx-auto py-3 text-slate-400 text-center mt-4">
              All our Exhibitions
            </p>
          </div>

          {/* thumbnails container  */}
          {Object.entries(myExhibitions).length === 0 ? (
            <MySpinner />
          ) : (
            <div
              className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-5  gap-6 p-4 sm:p-0"
            >
              {myExhibitions.map((item) => {
                return (
                  <Card
                    userConnected={true}
                    key={item.id}
                    cardSize="14rem"
                    isLoading={user}
                    id={item.id}
                    title={item.title}
                    text={item.organizing_department}
                    dateStart={item.start_date}
                    dateEnd={item.end_date}
                    myUrl={
                      item.primary_image
                        ? `${imageUrl}/size2/${item.primary_image}`
                        : replacementImage
                    }
                  />
                )
              })}
            </div>
          )}

          {/* Pagination container  */}
          <div className="my-5 p-1 flex justify-center space-x-2 text-slate-700">
            <button
              onClick={handleMinusOffset}
              className="text-2xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
            >
              <BsFillArrowLeftCircleFill />
            </button>
            <div className=" p-1 flex ">
              <p className="font-myTitle tracking-wide font-thin">
                Page : {Math.ceil(myOffset / itemByPage + 1)} /{' '}
                {Math.ceil(maxPlusOffset / itemByPage + 1)}
              </p>
            </div>
            <button
              onClick={handlePlusOffset}
              className="text-2xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExhibitionHome
