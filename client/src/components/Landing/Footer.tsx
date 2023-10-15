import React from "react";
import Subscribe from "./Subscribe";
import Solana from "../../../assets/images/solana.jpg";
import Image from "next/image";

function Footer() {
  return (
    <div>
      <Subscribe />

      <footer className="deneb_footer">
        {/* <BackToTop/> */}
        <div className="widget_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget widget_link">
                  <div className="widget_title">
                    <h4>Quick Link</h4>
                  </div>
                  <ul>
                    <li>
                      <a href="#"> Home </a>
                    </li>
                    <li>
                      <a href="#"> Products</a>
                    </li>
                    <li>
                      <a href="#"> About </a>
                    </li>
                    <li>
                      <a href="#"> Features </a>
                    </li>{" "}
                    <li>
                      <a href="#"> Contact </a>
                    </li>
                  </ul>
                </div>
              </div>{" "}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget widget_link">
                  <div className="widget_title">
                    <h4>Resources</h4>
                  </div>
                  <ul>
                    <li>
                      <a href="#"> Download Whitepaper </a>
                    </li>
                    <li>
                      <a href="#">Smart Token</a>
                    </li>
                    <li>
                      <a href="#"> Blockchain Explore </a>
                    </li>
                    <li>
                      <a href="#"> Crypto Api</a>
                    </li>{" "}
                    <li>
                      <a href="#"> Internet </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget widget_contact">
                  <div className="widget_title">
                    <h4> We accept following payment systems</h4>
                  </div>
                  <div className="widget widegt_about">
                    <ul className="social">
                      <li>
                        <a href="#">
                          <Image
                            src={Solana.src}
                            alt="Solana Pay"
                            width={371}
                            height={163}
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 copyright_text_bg">
                <div className="copyright_text">
                  <p>©2023 TrustyPass. All rights reserved</p>
                </div>{" "}
                <div className="copyright_text_icons">
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-youtube"></i>
                  <i className="bi bi-twitter"></i>
                  <i className="bi bi-linkedin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
