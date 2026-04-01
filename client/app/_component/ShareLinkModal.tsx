'use client';

import { ClipboardCopy, Copy, CopyIcon } from 'lucide-react';
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  XShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import { toast } from 'react-toastify';

export default function ShareModal({
  url,
  setOpen,
}: {
  url: string;
  setOpen: (open: boolean) => void;
}) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Share this link</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* WhatsApp */}
          <WhatsappShareButton url={url}>
            <div className="p-3 bg-green-100 rounded-xl text-center cursor-pointer">
              <WhatsappIcon size={32} round />
            </div>
          </WhatsappShareButton>

          {/* Facebook */}
          <FacebookShareButton url={url}>
            <div className="p-3 bg-blue-100 rounded-xl text-center cursor-pointer">
              <FacebookIcon size={32} round />
            </div>
          </FacebookShareButton>

          {/* Twitter */}
          <XShareButton url={url}>
            <div className="p-3 bg-sky-100 rounded-xl text-center cursor-pointer">
              <TwitterIcon size={32} round />
            </div>
          </XShareButton>

          {/* Email */}
          <EmailShareButton url={url}>
            <div className="p-3 bg-gray-100 rounded-xl text-center cursor-pointer">
              <EmailIcon size={32} round />
            </div>
          </EmailShareButton>

          <TelegramShareButton url={url}>
            <div className="p-3 bg-gray-100 rounded-xl text-center cursor-pointer">
              <TelegramIcon size={32} round />
            </div>
          </TelegramShareButton>

          {/* Copy */}
          <div
            onClick={copyToClipboard}
            className="p-3 bg-yellow-100 rounded-xl w-fit text-center cursor-pointer"
          >
            <Copy size={32} />
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="mt-5 w-full bg-gray-500 py-2 rounded-xl text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
