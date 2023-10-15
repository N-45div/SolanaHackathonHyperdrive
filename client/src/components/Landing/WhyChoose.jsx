import React from "react";
import Choose from "../../../assets/images/3dsecure.png";
import Ushape from "../../public/images/ushape.png";

function WhyChoose() {
  return (
    <div className="rowx container WhyChoose">
      <div
        className="col50 choose-Img"
        data-aos="zoom-in"
        data-aos-duration="3000"
      >
        <img src={Choose.src} alt="choose" />
      </div>
      <div className="col50 choose" data-aos="fade-up" data-aos-duration="3000">
        <h1> Why Choose Trusty Pass?</h1>

        <ul>
          <li>
            <b> Built on Solana :</b> Experience unparalleled transaction speed
            and website deployment efficiency.
          </li>
          <li>
            <b> Decentralized Hosting :</b> Rely on a resilient,
            globally-distributed network for secure and always-available
            websites.
          </li>
          <li>
            <b> Advanced Security :</b> Our cutting-edge cryptographic
            techniques shield your website from cyber threats and attacks.
          </li>
          <li>
            <b> Seamless Integration :</b> Effortlessly integrate with popular
            Web3 tools and platforms for a seamless user experience.
          </li>
        </ul>
      </div>
      <aside className="ushape">
        <img src={Ushape.src} alt="ushape" />
      </aside>
    </div>
  );
}

export default WhyChoose;
