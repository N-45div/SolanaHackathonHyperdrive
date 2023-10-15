import React from "react";
import StorageImg from "../../../../assets/images/storage.png";

function Storage() {
  return (
    <div>
      <div className="container">
        <section className="rowx grow Statistic">
          <div
            className="col50 Statistic-img"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <img src={StorageImg.src} alt="" />
          </div>
          <div
            className="col50 stat_mine"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <header> Decentralized Storage: </header>
            <p>
              Distribute your data globally, eliminating single points of
              failure.
            </p>
            <button className="market-btn ">
              {" "}
              <a href="#/"> Learn More</a>{" "}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Storage;
