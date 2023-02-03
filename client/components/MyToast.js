import React from 'react'

const MyToast = (props) => {
  const { toastName, myUrl, artSection, isVisible, isShow } = props
  return (
    <div className="flex font-myText bg-slate-200 px-5 py-2 rounded border border-yellow-500 shadow-2xl">
      {/* Collection & Exhibition section  */}
      <img className={isShow ? 'h-20' : 'hidden'} src={myUrl} />
      <div className="text-center px-2">
        <p className={isShow ? 'font-myTitle tracking-widest' : 'hidden'}>
          🎉 Successfully saved!
        </p>
        <p className="font-bold tracking-wide">{toastName}</p>
        <p className={isShow ? 'block' : 'hidden'}>
          In your own <span className="font-bold">{artSection}</span>{' '}
          collection.
        </p>

        {/* Favorite section  */}
        <p className={isVisible ? 'font-myTitle tracking-widest' : 'hidden'}>
          🌟 Added to your favorite!
        </p>
      </div>
    </div>
  )
}

export default MyToast
