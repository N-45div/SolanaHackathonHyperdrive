import React from "react";
import { useState } from "react";
import cryptoData from "../../Props/crypto"; //imported props

function Plan() {
  const [active, setActive] = useState(1);

  return (
    <div className=" Features">
      <div
        className="rowx active-row  container"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-duration="1200"
        data-aos-easing="ease-in-sine"
      >
        {cryptoData.map((item, index) => {
          const { coinName, id, coinText, coinDetails, image } = item;
          return (
            <aside
              key={index}
              onClick={() => setActive(id)}
              className={`${
                id === active ? "bg-blue " : "transp"
              }  activeclass`}
            >
              <div className="coin-image" data-aos="zoom-in">
                <img src={image.src} alt="btc" />
              </div>
              <h1 className="coinText"> {coinName}</h1>
              <p>{coinText}</p>
              <button
                className={`${
                  id === active ? "mining-btn" : " btn-circle  "
                } off-mine-btn  `}
              >
                <a href="/#/">{coinDetails}</a>

                <div className="icon">
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
          );
        })}
      </div>
    </div>
  );
}

export default Plan;
