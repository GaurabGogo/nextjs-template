import React, { useRef, useState, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ImageCropperProps {
  imageFile: File | null;
  filename: string;
  setCroppedImage: (image: File | null) => void;
  handleClose: () => void;
  type: "thumbnail" | "banner";
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageFile,
  filename,
  setCroppedImage,
  handleClose,
  type,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const newDate = Date.now();
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a File object from the Blob
            const file = new File(
              [blob],
              `${filename}-${newDate.toString()}.jpg`,
              {
                type: "image/jpeg",
              }
            );
            console.log(file);
            setCroppedImage(file);
          }
        },
        "image/jpeg",
        0.8 // Quality setting (0 to 1)
      );
      handleClose();
    }
  };

  // Use switch statement to determine aspect ratio based on type
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    switch (type) {
      case "thumbnail":
        setAspectRatio(1 / 1);
        break;
      case "banner":
        setAspectRatio(3 / 1);
        break;
      default:
        setAspectRatio(1 / 1);
        break;
    }
  }, [type]);

  return (
    <div className="profile-uploader">
      {imageUrl && (
        <Cropper
          src={imageUrl}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={aspectRatio || 1}
          guides={false}
          ref={cropperRef}
          className="cropper-container"
        />
      )}
      <div className="btn-container">
        <button className="btn save-btn uppercase" onClick={onCrop}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
