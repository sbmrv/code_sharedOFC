import React, { FC, useState, useRef } from "react";
import CommonLayout from "./CommonLayout";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { toast } from "react-toastify";

Modal.setAppElement(document.body);
// Modal.setAppElement("#your-root-element-id");
export interface PageAddListing7Props {
  formik: any;
}

const PageAddListing7: FC<PageAddListing7Props> = ({ formik }) => {
  const [image, setImage] = useState("" as any);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shouldCrop, setShouldCrop] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] as any;
    const base = await convertImageToBase64(file);
    openModal();
    setImage(base);

    if (file) {
      // Check if the file size is under 1MB
      if (file.size <= 2 * 1024 * 1024) {
        const base = await convertImageToBase64(file);
        openModal();
        // formik.setFieldValue("cover_image", base);
        setImage(base);
      } else {
        // Show a toast or perform any desired action for files exceeding 1MB
        toast.error("image size should be under 1MB");
      }
    }
  };
  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string); // Resolve with the base64 string
      };
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      if (files.length + formik.values.galleryImgs.length >= 8) {
        toast.error("You can upload only 8 images.");
        return;
      }
      const newBase64Array: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const base64 = await getBase64(files[i]);
        if (base64) {
          newBase64Array.push(base64);
        }
      }
      formik.setFieldValue("galleryImgs", newBase64Array);
    }
  };

  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = () => {
    setShouldCrop(true);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedBase64 = cropper.getCroppedCanvas().toDataURL();
      formik.setFieldValue("cover_image", croppedBase64); // Set the value in Formik
      setImage(croppedBase64);
      closeModal();
    }
    setShouldCrop(false);
  };

  // drag n drop feature vvv
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDropSingleImage = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFileChange(e as any);
  }
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length >= 8) {
      toast.error("You can upload a maximum of 8 images.");
      return;
    }
    if (files) {
      const newBase64Array: string[] = [];

      for (let i = 0; i < files.length; i++) {
        try {
          const base64 = await getBase64(files[i]);
          if (base64) {
            newBase64Array.push(base64);
          }
        } catch (error) {
          console.error("Error converting file to base64:", error);
        }
      }
      const totalImages =
        formik.values.galleryImgs.length + newBase64Array.length;
      if (totalImages >= 8) {
        toast.error("You can have a maximum of 8 images.");
        return;
      }

      formik.setFieldValue("galleryImgs", newBase64Array);
    }
  };

  return (
    <CommonLayout
      index="07"
      backtHref="/add-listing-6"
      nextHref="/add-listing-8"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Pictures of the place</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            A few beautiful photos will help customers have more sympathy for
            your property.
          </span>
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}

        <div className="space-yt-8">
          {formik.errors && formik.errors.cover_image && (
            <span className="text-red-500 text-sm">
              {formik.errors.cover_image}
            </span>
          )}
          {/* --------could select single image----galleryImgs----- */}
          <div>
            <span className="text-lg font-semibold">Cover image</span>
            <div className="mt-5 ">
              <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDropSingleImage}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />

                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={{
                          overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                          content: {
                            top: "50%",
                            left: "50%",
                            right: "auto",
                            bottom: "auto",
                            marginRight: "-50%",
                            transform: "translate(-50%, -50%)",
                          },
                        }}
                      >
                        {modalIsOpen && (
                          <>
                            <Cropper
                              src={image}
                              style={{ height: 200, width: "100%" }}
                              initialAspectRatio={16 / 9}
                              guides={true}
                              crop={shouldCrop ? onCrop : undefined}
                              ref={cropperRef}
                            />
                            {shouldCrop ? undefined : (
                              <div className="flex justify-center pt-1">
                                <ButtonPrimary onClick={onCrop}>
                                  Crop
                                </ButtonPrimary>
                              </div>
                            )}
                          </>
                        )}
                      </Modal>
                    </label>

                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </div>
              {formik.values.cover_image ? (
                <img
                  src={formik.values.cover_image}
                  alt={`Cover_image`}
                  style={{ height: "10%", width: "20%" }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {/* --------could select multiple images--------- */}
          <div>
            <span className="text-lg font-semibold">Pictures of the place</span>
            <div className="mt-5 ">
              <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload-2"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-2"
                        name="file-upload-2"
                        type="file"
                        onChange={(e) => handleChange(e)}
                        multiple
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex row"
              style={{ minWidth: "300px", overflowY: "auto" }}
            >
              {formik.values.galleryImgs.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  style={{ height: "10%", width: "20%", marginLeft: "5px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing7;
