import React, { useState } from "react";
import "./UploadImages.css";

const UploadImages = () => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadImage, setUploadImage] = useState();

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setUploadImage(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input className="file-input" type="file" name="file" />
        </p>
        <div className="image-container">
          <img className="upload-image" src={imageSrc} />
        </div>
        {imageSrc && !uploadImage && (
          <p className="button-container">
            <button className="upload-button">Upload Image</button>
          </p>
        )}
      </form>
    </>
  );
};

export default UploadImages;
