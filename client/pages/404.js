import React from 'react'
import Link from 'next/link'

import { useAppContext } from '../context/appContext'

import useHasMounted from '../components/hooks/useHasMounted'

const MyLink = (props) => {
  const { title, path } = props
  return (
    <Link href={path}>
      <span className="hover:border-b pb-2 bg-slate-800 px-2 p-1 rounded-sm cursor-pointer">
        {title}
      </span>
    </Link>
  )
}

const Custom404 = () => {
  const { user } = useAppContext()

  // check first render hydratation
  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  console.log(user)

  return (
    <div className="bg-black h-screen text-slate-300">
      <div className="flex flex-col items-center mx-auto pt-20 bg-black">
        <img src="/images/error404.jpg" alt="404 page" />
        <p className=" mt-3 text-2xl border-b border-slate-500 pb-3">
          <span className="text-7xl mb-5 text-center block font-semibold">
            Oops!
          </span>{' '}
          We can&apos;t seem to find the page you&apos;re looking for :(
        </p>
        <div className="w-max pt-3 text-center">
          <p>Here are some helpful links instead:</p>
          <ul className="flex space-x-4 mt-2 justify-center">
            <MyLink title="Home" path="/" />
            <MyLink title="Collections" path="/collections/?id=9" />
            <MyLink title="Exhibitions" path="/exhibitions" />
            {user && <MyLink title="My Arts" path="/userCollection" />}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Custom404
