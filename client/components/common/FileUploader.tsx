import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

type Props = {}

const FileUploader = ({thumbnail ,setValue}: {thumbnail: File,setValue: any}) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
          // Update the thumbnail value in the form
          setValue("thumbnail", acceptedFiles[0]);
        },
        [setValue]
      );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "image/*": [] }, // Accept only image files
      });  
  return (
    <div
        {...getRootProps()}
        className={`border-2 border-dashed w-full rounded-md p-6 text-center bg-[#E7E9E2] ${
          isDragActive ? "border-blue-400" : "border-gray-500"
        }`}
      >
        <input {...getInputProps()}/>
        {thumbnail ? (
          <div className='w-full'>
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail Preview"
              className="w-16 h-16 object-cover mx-auto mb-2 rounded-md"
            />
            <p className="text-xs text-gray-500">{thumbnail.name}</p>
          </div>
        ) : (
          <p className="text-gray-500">
            {isDragActive
              ? "Drop the file here..."
              : "Drag and drop an image here, or click to select one."}
          </p>
        )}
        
      </div>
  )
}

export default FileUploader