import React from 'react';

type Props = {
  btnHandler: () => void;
  content: string;
  extraCss: string;
};

function BlueBtn({ btnHandler, content, extraCss }: Props) {
  return (
    <button
      onClick={btnHandler}
      className={`rounded-xl bg-blue-400 px-4 py-3 text-gray-100 ${extraCss} text-sm font-semibold transition-all duration-200 hover:bg-blue-300`}
    >
      {content}
    </button>
  );
}

export default BlueBtn;
