import React from "react";
import SecurityBg from "../../../assets/images/securitybg.jpg";

function Banner() {
  return (
    <div
      className=" secuiry_bg"
      style={{
        backgroundImage: `url(${SecurityBg.src})`,
      }}
    >
      <section className="container rowx landing-page">
        <aside className="col50 ">
          <h1
            className="header-text"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Empowering Web3 Website Management on Solana{" "}
          </h1>
          <p className="landing-p" data-aos-duration="3000">
            Welcome to Trusty Pass Your Gateway to Seamless Website Management
            in the Web3 Era. Revolutionize your online presence with Trusty
            Pass, a state-of-the-art Web3 website manager built on the
            lightning-fast Solana blockchain.
          </p>
          <button
            className="landing-btn"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            {" "}
            Try for FREE
            <div
              className="icon"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="3000"
            >
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 10.9999C1.36839 11.0007 1.23793 10.9755 1.11609 10.9257C0.994256 10.8759 0.88344 10.8026 0.79 10.7099C0.696272 10.617 0.621877 10.5064 0.571109 10.3845C0.52034 10.2626 0.494202 10.1319 0.494202 9.99993C0.494202 9.86792 0.52034 9.73721 0.571109 9.61535C0.621877 9.49349 0.696272 9.38289 0.79 9.28993L4.1 5.99993L0.92 2.68993C0.733749 2.50257 0.629208 2.24911 0.629208 1.98493C0.629208 1.72074 0.733749 1.46729 0.92 1.27993C1.01296 1.1862 1.12356 1.11181 1.24542 1.06104C1.36728 1.01027 1.49799 0.984131 1.63 0.984131C1.76201 0.984131 1.89272 1.01027 2.01458 1.06104C2.13644 1.11181 2.24704 1.1862 2.34 1.27993L6.2 5.27993C6.38323 5.46686 6.48586 5.71818 6.48586 5.97993C6.48586 6.24168 6.38323 6.493 6.2 6.67993L2.2 10.6799C2.11024 10.7769 2.00217 10.855 1.88202 10.91C1.76187 10.9649 1.63203 10.9955 1.5 10.9999Z"
                  fill="#3671E9"
                />
              </svg>
            </div>
          </button>
        </aside>
      </section>
    </div>
  );
}

export default Banner;
