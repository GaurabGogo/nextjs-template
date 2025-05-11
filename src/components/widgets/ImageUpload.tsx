// components/ImageUpload.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import ImageCropper from "./ImageCropper";
import { Dialog } from "primereact/dialog";

interface ImageUploadProps {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  acceptedTypes?: string;
  maxQuantity?: number;
  type?: "thumbnail" | "banner";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImageFiles,
  acceptedTypes = "image/jpeg,image/png",
  maxQuantity = 1,
  type = "thumbnail",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const allowedFiles = selectedFiles.slice(0, maxQuantity - files.length);
    const newFiles = [...files, ...allowedFiles];

    setFiles(newFiles);
    setImageFiles(newFiles);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const allowedFiles = droppedFiles.slice(0, maxQuantity - files.length);
    const newFiles = [...files, ...allowedFiles];

    setFiles(newFiles);
    setImageFiles(newFiles);
    setDragOver(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  return (
    <div className="upload-dropzone-section">
      {files.length > 0 && (
        <div className="upload-dropzone-preview-container">
          {files.map((file, index) => (
            <ImagePreview
              index={index}
              file={file}
              key={index}
              files={files}
              setFiles={setFiles}
              setImageFiles={setImageFiles}
              type={type}
            />
          ))}
        </div>
      )}
      <div
        className={`upload-dropzone-container ${dragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple
          className="hidden-input"
          onChange={handleFileChange}
          accept={acceptedTypes}
          disabled={files.length >= maxQuantity}
        />

        <div className="upload-dropzone-icon">
          <LuImagePlus />
        </div>
        <h4>Drag photo OR Browse</h4>
        <p> (Max. File size: 2 MB)</p>
      </div>
    </div>
  );
};

export default ImageUpload;

interface ImagePreviewProps {
  files: File[];
  file: File;
  index: number;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  type: "thumbnail" | "banner";
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  files,
  file,
  index,
  setFiles,
  setImageFiles,
  type,
}) => {
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>(
    URL.createObjectURL(file)
  );

  const handleDeleteFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setImageFiles(updatedFiles);
  };

  const handleImageCropperClose = (): void => {
    setShowCropper(false);
    setImage(null);
  };

  const handleCroppedImage = (cropped: File | null) => {
    if (!cropped) return;

    const updatedFiles = [...files];
    updatedFiles[index] = cropped;
    setFiles(updatedFiles);
    setImageFiles(updatedFiles);
    setPreviewURL(URL.createObjectURL(cropped));
    setShowCropper(false);
    setImage(null);
  };

  return (
    <>
      <div
        className="product-image"
        onClick={() => {
          setImage(file);
          setShowCropper(true);
        }}
      >
        <Image src={previewURL} alt={file.name} height={200} width={200} />
        <FaTimes
          className="delete-image"
          onClick={() => handleDeleteFile(index)}
        />
      </div>
      <Dialog
        showHeader={false}
        visible={showCropper}
        closeOnEscape
        dismissableMask
        onHide={() => setShowCropper(false)}
        className="photo-cropper-dialog"
      >
        <div className="photo-cropper-dialog-content">
          <div className="dialog-close-btn" onClick={handleImageCropperClose}>
            <FaTimes />
          </div>
          {image && (
            <ImageCropper
              filename={file.name}
              imageFile={image}
              setCroppedImage={handleCroppedImage}
              handleClose={handleImageCropperClose}
              type={type}
            />
          )}
        </div>
      </Dialog>
    </>
  );
};
