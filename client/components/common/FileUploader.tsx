import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';

type Props = {}

const FileUploader = ({thumbnail ,setValue ,previewUrl}: {thumbnail: File,setValue: any,previewUrl:any}) => {
   const [ preview , setPreview ] = useState(previewUrl);
   console.log("Preview",previewUrl)
   console.log("thumbnail",thumbnail)
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
          // Update the thumbnail value in the form
          setValue("thumbnail", acceptedFiles[0]);
          setPreview(URL.createObjectURL(acceptedFiles[0]));
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
        className={`border-2 border-dashed w-full rounded-md p-6 text-center bg-[#E7E9E2] bg-opacity-50 ${
          isDragActive ? "border-blue-400" : "border-gray-500"
        }`}
      >
        <input {...getInputProps()}/>
        {preview ? (
          <div className='w-full'>
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="w-16 h-16 object-cover mx-auto mb-2 rounded-md"
            />
            <p className="text-xs text-gray-500">{thumbnail?.name}</p>
            <button className='text-sm underline' onClick={() => {
              setValue("thumbnail",null);
              setPreview(null);
            }}>Cancel</button>
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