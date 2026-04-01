import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {};

const FileUploader = ({
  thumbnail,
  setValue,
  previewUrl,
}: {
  thumbnail: File;
  setValue: any;
  previewUrl?: any;
}) => {
  const [preview, setPreview] = useState(previewUrl);
  console.log('Preview', previewUrl);
  console.log('thumbnail', thumbnail);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Update the thumbnail value in the form
      setValue('thumbnail', acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
    [setValue],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': [] }, // Accept only image files
  });
  return (
    <div
      {...getRootProps()}
      className={`flex max-h-20 w-full items-center justify-center rounded-md border-2 border-dashed bg-opacity-50 p-6 text-center ${
        isDragActive ? 'border-blue-400' : 'border-gray-500'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="flex w-full items-center">
          <img
            src={preview}
            alt="Thumbnail Preview"
            className="mx-auto mb-2 h-16 w-16 rounded-md object-cover"
          />
          <div>
            <p className="text-xs text-gray-500">{thumbnail?.name}</p>
            <button
              className="text-sm underline"
              onClick={() => {
                setValue('thumbnail', null);
                setPreview(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag and drop an image here, or click to select one.'}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
