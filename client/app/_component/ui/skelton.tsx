'use client';

export type SkeltonProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: string;
};

export default function Skeleton({
  className = '',
  width,
  height,
  rounded = 'rounded-md',
}: SkeltonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${rounded} ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}
