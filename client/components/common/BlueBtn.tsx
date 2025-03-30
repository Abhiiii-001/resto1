import React from 'react'

type Props = {
    btnHandler: () => void;
    content: string;
    extraCss: string;
}

function BlueBtn({btnHandler,content,extraCss}: Props) {
  return (
    <button
            onClick={btnHandler}
            className={`bg-blue-400 px-4 py-3 text-gray-100 rounded-xl ${extraCss} text-sm font-semibold hover:bg-blue-300 transition-all duration-200`}>
                {content}
            </button>
  )
}

export default BlueBtn