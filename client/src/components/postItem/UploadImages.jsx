import React, { useState } from "react";
import "./UploadImages.css";

const UploadImages = () => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadImage, setUploadImage] = useState();

  const handleOnChange = (changeEvent) => {
    const file = changeEvent.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB in bytes
        alert("File size exceeds 2MB. Please select a smaller file");
        changeEvent.target.value = null;
        setImageSrc(null);
        return;
      }
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setUploadImage(undefined);
    };
    reader.readAsDataURL(file);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("upload_preset", "user-uploads");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dibnqoge8/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setImageSrc(data.secure_url);
    setUploadImage(data);
  };

  return (
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
      {imageSrc && uploadImage && (
        <p className="success-notification">Image uploaded successfully</p>
      )}
    </form>
  );
};

export default UploadImages;
