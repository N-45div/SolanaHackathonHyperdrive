import React from "react";
import Oshape from "../../../public/images/oshape.png";
import AuthImg from "../../../../assets/images/auth.png";

function Authentication() {
  return (
    <div className="grow-bg">
      <div className="container ">
        <section className="rowx grow">
          <div
            className="col50"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <header> Blockchain Authentication:</header>
            <p>Ensure secure access with blockchain-based authentication.</p>
            <button className="market-btn">
              {" "}
              <a href="#/"> Learn More</a>{" "}
            </button>
          </div>
          <div className="col50 grow-img">
            <img src={AuthImg.src} alt="" />
          </div>
        </section>
      </div>
      <div
        className="oshape"
        data-aos="zoom-in"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <img src={Oshape.src} alt="" />
      </div>
    </div>
  );
}

export default Authentication;
