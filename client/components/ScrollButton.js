import React from 'react'

import { BsArrowDownCircle } from 'react-icons/bs'

const ScrollButton = (props) => {
  const { href } = props
  return (
    <a href={href} className="flex items-center text-slate-500 animate-pulse">
      <BsArrowDownCircle />
      <span className="ml-3 font-myTitle">Scroll down</span>
    </a>
  )
}

export default ScrollButton
