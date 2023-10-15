import React from "react";
import Solana1 from "../../../assets/images/solana1.png";
// import Solana2 from "../assets/images/solana2.png";
import Line from "../../public/images/line2.png";
import Lines from "../../public/images/line.png";
import Image from "next/image";
function Subscribe() {
  return (
    <div
      className="subscribe-bg "
      data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="1800"
      id="contact"
    >
      <section className="deneb_cta">
        <div className="container">
          <div className="cta_wrapper subscribe-img  ">
            {/* <div className="Solana2">
              <Image src={Solana2.src} alt="solana" width={100} height={100} />
            </div> */}
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="cta_content">
                  <h3>Start mining now</h3>
                  <p>
                    Join now with Trusty Pass to get the latest news and start
                    mining now
                  </p>
                </div>
              </div>{" "}
              <div className="col-lg-6">
                <div className="cta_content">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="col-lg-2">
                <div className="button_box">
                  <button className="subscribe-btn">
                    <a href="#" className="">
                      Subscribe
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="Solana1">
              <Image src={Solana1.src} alt="solana" width={300} height={300} />
            </div>{" "}
          </div>
        </div>
      </section>

      <div className="line-img container ">
        <div className="First-img">
          <img src={Line.src} alt="line" />
        </div>{" "}
        <div className="second-img">
          <img src={Lines.src} alt="lines" />
        </div>{" "}
      </div>
    </div>
  );
}

export default Subscribe;
