import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

const ImageUpload = ({ ad, setAd }) => {
  const handleUpload = (e) => {
    let files = e.target.files;
    files = [...files];
    if (files?.length) {
      setAd({ ...ad, uploading: true });
      files.map((f) => {
        // upload
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            f,
            1080,
            720,
            "JPEG",
            100,
            0,
            async (uri) => {
              try {
                const { data } = await axios.post("/upload-image", {
                  image: uri,
                });
                setAd((prev) => ({
                  ...prev,
                  photos: [data, ...prev.photos],
                  uploading: false,
                }));
              } catch (err) {
                console.log("photo upload err => ", err);
                setAd({ ...ad, uploading: false });
              }
            },
            "base64"
          );
        });
      });
    } else {
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setAd({ ...ad, removing: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          removing: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, removing: false });
    }
  };

  return (
    <>
      <div className="d-flex mt-4 mb-2">
        <label className="btn btn-secondary align-self-center ">
          {ad.uploading ? "Uploading..." : ad.removing ? "Removing..." : "Upload photos"}
          <input onChange={handleUpload} type="file" accept="image/*" multiple hidden />
        </label>

        {ad.photos?.map((file, index) => (
          <Avatar
            key={index}
            src={file?.Location}
            shape="square"
            size={46}
            className="mx-2"
            onClick={() => handleDelete(file)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
