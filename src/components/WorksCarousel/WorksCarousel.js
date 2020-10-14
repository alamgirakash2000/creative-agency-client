import React from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
import "./WorkCarousel.style.css";

import work1 from "../../images/carousel-1.png";
import work2 from "../../images/carousel-2.png";
import work4 from "../../images/carousel-4.png";
import work5 from "../../images/carousel-5.png";

function WorksCarousel() {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  return (
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src={work1} alt="" />
        </div>
        <div class="swiper-slide">
          <img src={work2} alt="" />
        </div>
        <div class="swiper-slide">
          <img src={work4} alt="" />
        </div>
        <div class="swiper-slide">
          <img src={work5} alt="" />
        </div>
      </div>

      <div class="swiper-pagination"></div>
    </div>
  );
}

export default WorksCarousel;
