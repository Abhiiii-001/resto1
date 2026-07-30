'use client';

import { useRef, useState } from 'react';
import {
  Eye,
  Share2,
  Download,
  QrCode,
  Smartphone,
  Wifi,
  MapPin,
  Phone,
  ChevronRight,
  CheckCircle2,
  BadgeAlert,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/redux/redux';
import { useGetRestaurantDetailsQuery, useRaiseApprovalRequestMutation } from '@/redux/api/restaurant';
import { skipToken } from '@reduxjs/toolkit/query';
import { RESTAURANT_BASE_URL } from '@/constants/Urls';
import ShareModal from '@/app/_component/ShareLinkModal';
import QRCodeTemplate from '@/app/_component/templates/QRCodeTemplate';
import Loader from '@/components/common/Loader';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function QRDisplayPage() {
  const router = useRouter();
  const { restaurantId, user } = useAppSelector((state) => state.auth);
  const isRestaurant = user?.role === 'Restaurant';
  const { data: restaurantData, isLoading } = useGetRestaurantDetailsQuery(
    restaurantId ?? skipToken,
  );
  const [raiseApproval, { isLoading: isRaisingApproval }] =
    useRaiseApprovalRequestMutation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const downloadQrRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!downloadQrRef.current) return;
    setIsDownloading(true);
    const node = downloadQrRef.current;
    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 3,
        style: { fontFamily: '"Inter", sans-serif', background: '#fff' },
        imagePlaceholder:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'restaurant-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRaiseApproval = async () => {
    try {
      const response = await raiseApproval({ restaurantId: restaurantId ?? restaurantData?.id }).unwrap();
      if (!response || !response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }
      toast.success('Approval request raised successfully!');
    } catch (err: unknown) {
      console.error('Approval request failed:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Approval request failed!');
      }
    }
  };

  const getQRCodeDataUrl = () => {
    const restaurantBaseUrl = RESTAURANT_BASE_URL || 'https://example.com';
    return `${restaurantBaseUrl}/${restaurantId}`;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex h-full w-full flex-col px-4 py-6 md:px-10 bg-gray-50/50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          QR Code
        </h2>
        <div className="mt-2 flex items-center text-sm font-medium text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground">QR Code</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-7">
          {/* QR Code Display Card */}
          <div
            className="lg:col-span-4"
            ref={qrRef}
            style={{ fontFamily: 'sans-serif' }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-2 lg:p-8 shadow-lg">
              {/* Restaurant Header */}
              <div className="relative z-10 mb-6 text-center">
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="h-full w-full rounded-full overflow-hidden border border-gray-100 shadow-sm relative">
                    <Image
                      src={restaurantData?.thumbnail || '/placeholder.svg'}
                      alt={`${restaurantData?.name} Logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shadow-md border-2 border-white z-20">
                    <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {restaurantData?.name}
                </h1>
                <p className="mt-1 mx-auto max-w-xs text-base text-muted-foreground leading-relaxed">
                  {restaurantData?.slogan}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <div className="flex items-center rounded-full bg-gray-50 border border-border px-3 py-1.5 text-xs text-muted-foreground">
                    <MapPin className="mr-1.5 h-3 w-3 text-primary" />
                    <span>{restaurantData?.address}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="relative mx-auto max-w-sm rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md">
                    <Smartphone className="h-4 w-4" />
                    Scan to Order
                  </div>
                </div>

                <div className="relative flex items-center justify-center rounded-xl bg-white p-5 shadow-inner">
                  <QRCodeSVG
                    value={getQRCodeDataUrl() || 'https://example.com'}
                    size={220}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#1f2937"
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full border-2 border-border bg-white p-1 shadow-md">
                    <div className="relative h-full w-full rounded-full overflow-hidden">
                      <Image
                        src={restaurantData?.thumbnail || '/placeholder.svg'}
                        alt={`${restaurantData?.name} Logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Wifi className="h-4 w-4" />
                  <span>Point your camera here to scan</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md">
                  🍽️ Scan · Order · Enjoy · Repeat
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                QR Code Actions
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Share or download your restaurant QR code.
              </p>
            </div>

            {/* Action Buttons */}
            {
              restaurantData?.isPublished ?
                <div className="flex flex-col gap-3 mt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full gap-3 text-base lg:h-14"
                  >
                    <a
                      href={getQRCodeDataUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 text-base lg:h-14"
                    onClick={() => setIsOpenShareModal(true)}
                  >
                    <Share2 className="h-5 w-5" />
                    Share QR Code
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 text-base lg:h-14 border-primary/30 text-primary hover:bg-primary/5"
                    disabled={isDownloading}
                    onClick={handleDownload}
                  >
                    {isDownloading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download QR (PNG)
                      </>
                    )}
                  </Button>
                </div> :
                <div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 text-base lg:h-14 border-primary/30 text-primary hover:bg-primary/5"
                    disabled={isRaisingApproval || !isRestaurant}
                    onClick={handleRaiseApproval}
                  >
                    {isRaisingApproval ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Raising Approval...
                      </>
                    ) : (
                      <>
                        <BadgeAlert className="h-5 w-5" />
                        Raise Approval Request
                      </>
                    )}
                  </Button>
                </div>
            }

            {/* QR Code Details */}
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <h4 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                <QrCode className="h-4 w-4 text-primary" />
                QR Code Details
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Format', value: 'PNG (High Quality)' },
                  { label: 'Size', value: '1024×1024 px' },
                  { label: 'Type', value: 'Menu Link' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    Active
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <h4 className="mb-4 font-semibold text-foreground">
                💡 Usage Tips
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'Place QR codes on every table for easy access',
                  'Print in high quality for best scanning results',
                  'Display at counter and entrance for visibility',
                  'Share on social media to reach more customers',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                <Phone className="h-4 w-4 text-primary" />
                Need Help?
              </h4>
              <p className="mb-4 text-sm text-muted-foreground">
                Our support team is here to help you with QR code setup and
                customization.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/contact')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpenShareModal && (
        <ShareModal url={getQRCodeDataUrl()} setOpen={setIsOpenShareModal} />
      )}

      <QRCodeTemplate
        downloadQrRef={downloadQrRef}
        restaurantData={restaurantData}
        qrCodeDataUrl={getQRCodeDataUrl() || 'https://example.com'}
      />
    </div>
  );
}
