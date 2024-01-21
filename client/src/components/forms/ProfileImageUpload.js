import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

const ProfileImageUpload = ({ photo, setPhoto, uploading, setUploading }) => {
  // context
  const [auth, setAuth] = useAuth();

  const handleUpload = (e) => {
    let file = e.target.files[0];
    if (file) {
      setUploading(true);
      setPhoto({ ...photo, uploading: true });
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
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
              setPhoto(data);
              setUploading(false);
            } catch (err) {
              //console.log("photo upload err => ", err);
            }
          },
          "base64"
        );
      });
    } else {
      setPhoto({ ...photo, uploading: false });
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="d-flex mt-4 mb-2">
        <label className="btn btn-secondary align-self-center ">
          {uploading ? "Uploading..." : "Upload photos"}
          <input onChange={handleUpload} type="file" accept="image/*" hidden />
        </label>

        {photo?.Location ? (
          <Avatar src={photo?.Location} shape="square" size={46} className="mx-2" onClick={() => handleDelete()} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProfileImageUpload;
