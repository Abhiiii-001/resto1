import React from "react";

interface SkeletonProps {
  additionalClass?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  additionalClass
}) => {
  return (
    <div
      className={`skeleton rounded-xl bg-rGray ${additionalClass}`}
    />
  );
};

export default Skeleton;
