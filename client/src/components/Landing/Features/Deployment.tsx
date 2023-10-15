import React from "react";
import Cic from "../../../public/images/cic.png";
import DeployImg from "../../../../assets/images/deploy.png";

function Deployment() {
  return (
    <div className="market container">
      <div className="cic">
        <img src={Cic.src} alt="circle" />
      </div>
      <header
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        Unleashing the Potential Trusty Pass offers a range of features to
        empower your website and enhance user experiences.{" "}
      </header>

      <section className="rowx grow">
        <div
          className="col50 Invest"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <header> Instant Deployment:</header>
          <p>
            Launch your website in seconds with Solana's lightning-fast
            transaction speed.
          </p>
          <button className="market-btn">
            {" "}
            <a href="#/"> Learn More</a>{" "}
          </button>
        </div>
        <div
          className="col50"
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <img src={DeployImg.src} alt="" />
        </div>
      </section>
    </div>
  );
}

export default Deployment;
