import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type for props
interface HomeLoaderProps {
  loading: boolean;
}

const imagesList: string[] = [
  "https://zilcommerce-docs.s3.ap-south-1.amazonaws.com/logo.jpeg",
];

const HomeLoader: React.FC<HomeLoaderProps> = ({ loading }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1800); // Wait for fade-out animation before hiding loader
      return () => clearTimeout(timer);
    }
    setShowLoader(true);
  }, [loading]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed h-[100dvh] w-screen flex items-center justify-center bg-gray-50 top-0 left-0 z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white rounded-xl p-8 shadow-lg max-w-[70%] w-[32rem] h-[32rem]"
            initial={{ scale: 1.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, ease: [0.8, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <Image
                    src={imagesList[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    width={320}
                    height={320}
                    className="object-contain h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomeLoader;
