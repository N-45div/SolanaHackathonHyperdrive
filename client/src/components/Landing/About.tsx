import React from "react";
import Plan from "./Plan";

function About() {
  return (
    <div className="earn" id="about">
      <header
        className="earn-header"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="3000"
      >
        About Trusty Pass
      </header>

      <div
        className="earn-form"
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="3000"
      >
        <section className="form-section">
          <p
            className="earn-rate"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="3000"
          >
            Trusty Pass redefines website management in the Web3 landscape.
            Leveraging the power of Solana's unmatched speed, we deliver a
            hosting solution that is not only fast but also decentralized and
            secure.
          </p>
        </section>
        <br /> <br />
        <section className=" crypto-width  ">
          <Plan />
        </section>
      </div>
    </div>
  );
}

export default About;
