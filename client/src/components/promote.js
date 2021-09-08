import React from "react";

export default function Promote() {
  return (
    <div className="promote_coin_hero">
      <div style={{ textAlign: "left", width: "100%" }}>
        <img
          style={{
            width: "20%",
            marginLeft: "39%",
            verticalAlign: "middle",
            borderStyle: "none",
          }}
          src="promote.svg"
          alt="promote"
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", fontWeight: "700" }}>
          Promote your coin
        </div>
        <div style={{ fontSize: "18px" }}>Get the visibility you need.</div>
      </div>
      <div
        style={{
          boxShadow: "0 5px 15px rgb(0 0 0 / 35%)",
          borderRadius: "0.5rem",
          margin: "20px 0",
          display: "flex",
          flexWrap: "wrap ",
        }}
      >
        <div
          style={{
            textAlign: "center",
            flexBasis: "0",
            flexGrow: "1",
            maxWidth: "100%",
            position: "relative",
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div>Average daily users</div>
          <div>100 000</div>
        </div>
        <div
          style={{
            textAlign: "center",
            flexBasis: "0",
            flexGrow: "1",
            maxWidth: "100%",
            position: "relative",
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div>Twitter followers</div>
          <div>36 000</div>
        </div>
        <div
          style={{
            textAlign: "center",
            flexBasis: "0",
            flexGrow: "1",
            maxWidth: "100%",
            position: "relative",
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div>Newsletter subscribers</div>
          <div>7 000</div>
        </div>
      </div>
      <div
        style={{
          margin: "0 0 20px",
          boxShadow: "0 5px 15px rgb(0 0 0 / 35%)",
          borderRadius: ".5em",
          textAlign: "center",
          marginBottom: "6%",
        }}
      >
        <div>Official Alexa rank by Amazon</div>
        <a href="https://www.alexa.com/siteinfo/cryptohunt.cc" target="_blank">
          cryptohunt.cc Competitive Analysis, Marketing Mix and Traffic - Alexa
        </a>
      </div>
      <div style={{ fontSize: "18px" }}>
        To promote your coin
        <br />
        <a href="mfdilto:condtact@codinhudnt.ccd?">
          Mail to: contact@cryptohunt.cc
        </a>
        <br />
        <div style={{ fontSize: ".9rem" }}>
          Do never pay anyone for a promotion on our platform, unless you have
          received a confirmation email from this address.
        </div>
      </div>
    </div>
  );
}
