import React, { useEffect, useState } from "react";
import "./Home.style.css";
import { Link } from "react-router-dom";
import axios from "../../axios";

import bannerLogo from "../../images/logos/Frame.png";
import logo1 from "../../images/logos/slack.png";
import logo2 from "../../images/logos/google.png";
import logo3 from "../../images/logos/netflix.png";
import logo4 from "../../images/logos/uber.png";
import logo5 from "../../images/logos/airbnb.png";
import WorksCarousel from "../../components/WorksCarousel/WorksCarousel";
import { Avatar } from "@material-ui/core";

function Home() {
  const [services, setService] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => alert(error.message));

    axios
      .get("/api/services")
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className="home">
      {/*Banner*/}
      <div className="home__banner">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="home__bannerLeft p-4">
                <h1>Let's Grow Your Brand To The Next Level</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
                  veniam aut voluptates consequatur, impedit aspernatur
                  reiciendis assumenda architecto libero perferendis.
                </p>

                <button className="btn btn-dark px-5">Hire us</button>
              </div>
            </div>
            <div className="col-md-7">
              <div className="home__bannerRight">
                <img src={bannerLogo} alt="" className="w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Services*/}
      <div className="home__services container py-5">
        <div className="row companies my-4">
          <div className="col-4 col-md-2">
            <img src={logo1} alt="" className="w-100" />
          </div>
          <div className="col-4 col-md-2">
            <img src={logo2} alt="" className="w-100" />
          </div>
          <div className="col-4 col-md-2">
            <img src={logo3} alt="" className="w-100" />
          </div>
          <div className="col-4 col-md-2">
            <img src={logo4} alt="" className="w-100" />
          </div>
          <div className="col-4 col-md-2">
            <img src={logo5} alt="" className="w-100" />
          </div>
        </div>
        <h3 className="text-center">
          Provide awesome <span className="text-success">service</span>
        </h3>
        <div className="row my-4">
          {services.map((service) => (
            <div className="col-lg-4 col-md-6 my-3" key={service._id}>
              <Link to={`/customer/order?${service._id}`}>
                <div className="home__service p-3 h-100">
                  <img src={service.image} alt="" />
                  <h5 className="py-2">{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/*Works*/}
      <div className="home__works">
        <div className="container py-5">
          <h3 className="text-light text-center">
            Here are some of <span className="text-success">our works</span>
          </h3>
          text
          <WorksCarousel />
        </div>
      </div>

      {/*Clients Feedback*/}
      <div className="home__feedback container py-5">
        <h3 className="text-center">
          Clients <span className="text-success">Feedback</span>
        </h3>
        <div className="row my-4">
          {reviews.slice(0, 6).map((review) => (
            <div key={review._id} className="col-lg-4 col-md-6 my-3">
              <div className="p-3 home__review">
                <div className="home__reviewHeader d-flex pb-3">
                  <Avatar alt={review.username} src={review.image} />
                  <div className="ml-3">
                    <h5 className="m-0">{review.username}</h5>
                    <p>
                      <strong>{review.company}</strong>
                    </p>
                  </div>
                </div>
                <p>{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*Footer*/}
      <div className="footer">
        <div className="container py-2">
          <div className="row py-5">
            <div className="col-md-6">
              <h3>Let us handle your project, professionally</h3>

              <p>
                With well written codes, we build amazing apps for all
                platforms, mobile and web apps in general.
              </p>
            </div>
            <div className="col-md-6">
              <form action="">
                <input
                  type="text"
                  placeholder="Your email address"
                  className="form-control my-3"
                />
                <input
                  type="text"
                  placeholder="Your Name/companies name"
                  className="form-control my-3"
                />
                <textarea
                  type="text"
                  rows="8"
                  placeholder="Your message"
                  className="form-control my-3"
                />
                <button type="" className="btn btn-dark px-5">
                  SEND
                </button>
              </form>
            </div>
          </div>

          <p className="text-center">
            copyright orange lab {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
