import React, { useEffect, useState } from "react";
import "./Order.style.css";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "../../axios";
import { storage } from "../../FirabaseConfig";

function Order({ user }) {
  const [service, setService] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const params = useLocation().search;
  const serviceId = params.slice(1);
  const history = useHistory();

  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    Axios.get(`/api/services/${serviceId}`)
      .then((response) => {
        let data = response.data;
        if (response.data.length >= 1) {
          data = response.data[0];
        }

        let { title, description, image } = data;
        setService({ title, description, image });
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleImageSelect = (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let order = {
      username: user.name,
      email: user.email,
      service: service,
      description: description,
      status: "pending",
      price: price,
      image: "",
    };

    const storageRef = storage.ref();
    const uploadTask = storageRef.child(`order-images/${img.name}`).put(img);

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
          Axios.post("/api/orders/", {
            ...order,
            image: downloadURL,
          })
            .then((response) => {
              alert(response.data);
              history.push("/customer/servicelist");
              window.location.reload(false);
            })
            .catch((error) => alert(error.message));
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="addOrder__form">
      <input
        type="text"
        className="form-control"
        placeholder="Your name/Company's name"
        value={user.name}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Your email address"
        value={user.email}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Service Name"
        value={service.title}
      />

      <textarea
        rows="5"
        type="text"
        className="form-control"
        placeholder="Project details"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row">
        <div className="col-6">
          <input
            type="number"
            className="form-control"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="coverImg" className="uploadProject">
            <i className="fas fa-cloud-upload-alt"></i> Upload project file
          </label>
          <input
            type="file"
            accepts="image/*"
            id="coverImg"
            className="d-none"
            onChange={handleImageSelect}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-dark my-3">
        SUBMIT
      </button>
    </form>
  );
}

export default Order;
