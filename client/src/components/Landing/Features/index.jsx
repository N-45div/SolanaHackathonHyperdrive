import React from "react";
import Deployment from "./Deployment";
import Authentication from "./Authentication";
import Storage from "./Storage";

function Features() {
  return (
    <div className="sentiments " id="Features">
      <Deployment />
      <Storage />
      <Authentication />
    </div>
  );
}

export default Features;
