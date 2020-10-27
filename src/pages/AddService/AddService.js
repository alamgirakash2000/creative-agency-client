import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { storage } from "../../FirabaseConfig";
import axios from "../../axios";
import "./AddService.style.css";

function AddService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleImageSelect = (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const storageRef = storage.ref();

    const uploadTask = storageRef
      .child(`volunteer-images/${img.name}`)
      .put(img);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        alert(error.message);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          axios
            .post("/api/services/", {
              title: title,
              image: downloadURL,
              description,
            })
            .then((response) => {
              alert(response.data);
              window.location.reload(false);
            })
            .catch((error) => alert(error.message));
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="addService__form">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="">
            <strong>Service Title</strong>
          </label>
          <input
            required
            className="form-control mb-4"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">
            <strong>Description</strong>
          </label>
          <textarea
            rows="5"
            required
            placeholder="Enter Description"
            className="form-control mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-6 ">
          <div className="my-2 p-3">
            <label htmlFor="coverImg" className="uploadImg">
              <i class="fas fa-cloud-upload-alt"></i> Upload Image
            </label>
            <input
              type="file"
              accepts="image/*"
              id="coverImg"
              className="d-none"
              onChange={handleImageSelect}
            />
          </div>

          <img src={imgUrl} alt="" className="selectedImg" />
        </div>
      </div>

      <button type="submit" className="btn px-4 my-3 btn-success">
        SUBMIT
      </button>
    </form>
  );
}

export default AddService;
