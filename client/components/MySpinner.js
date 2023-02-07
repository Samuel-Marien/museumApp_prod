import React, { useState } from 'react'
import Link from 'next/link'

const RoundedSpinner = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="h-96 flex flex-col justify-center items-center space-x-2"
    >
      <svg
        className="h-20 w-20 animate-spin stroke-slate-400"
        viewBox="0 0 256 256"
      >
        <line
          x1="128"
          y1="32"
          x2="128"
          y2="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="224"
          y1="128"
          x2="192"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="128"
          y1="224"
          x2="128"
          y2="192"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="32"
          y1="128"
          x2="64"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
      </svg>
    </div>
  )
}

const MyLink = (props) => {
  const { title, path } = props
  return (
    <Link href={path}>
      <span className="hover:border-b hover:shadow-lg border-slate-500 pb-2 bg-slate-200 px-2 p-1 rounded-sm cursor-pointer">
        {title}
      </span>
    </Link>
  )
}

const UserMessage = () => {
  return (
    <div>
      <div>
        <p className=" mt-3 text-2xl pb-3">
          <span className="text-7xl mb-5 text-center block font-semibold">
            Oops!
          </span>{' '}
          We can&apos;t seem to find the page you&apos;re looking for :(
        </p>
        <div className=" pt-3 text-center flex flex-col items-center justify-center  w-full">
          <p className=" underline">Here are some helpful links instead:</p>
          <ul className="flex space-x-4 mt-2 justify-center">
            <MyLink title="Home" path="/" />
            <MyLink title="Collections" path="/collections/?id=9" />
            <MyLink title="Exhibitions" path="/exhibitions" />
          </ul>
        </div>
      </div>
    </div>
  )
}

const MySpinner = () => {
  const [displayMsg, setDisplayMsg] = useState(false)

  setTimeout(() => {
    setDisplayMsg(true)
  }, 10000)

  return (
    <div>
      {displayMsg ? (
        <div className=" flex justify-center items-center space-x-2">
          <UserMessage />
        </div>
      ) : (
        <div className=" flex justify-center items-center space-x-2">
          <RoundedSpinner />
        </div>
      )}
    </div>
  )
}

export default MySpinner
