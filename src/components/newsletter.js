import React from "react";

export default function Newsletter() {
  return (
    <div className="newsletter-outer-outer">
      <div className="newsletter-outer">
        <div className="newsletter-main">
          <div
            style={{
              width: "100%",
              verticalAlign: "middle",
              borderStyle: "none",
            }}
          >
            <img src="bike.svg" alt="Logo" />
          </div>
          <div className="newsletter_right">
            <div style={{ textAlign: "left", paddingTop: "5px" }}>
              <div style={{ fontSize: "22px", fontWeight: "600" }}>
                Subscribe to our newsletter
              </div>
            </div>
            <div style={{ fontSize: "12px", textAlign: "left" }}>
              Get the best high potential coins right into your inbox.
            </div>
            <div>
              <div style={{ width: "80%", float: "left", marginTop: "5%" }}>
                <div style={{ marginBlock: "1rem" }}>
                  <input
                    style={{
                      font: "400 13.3333px Arial",
                      WebkitRtlOrdering: "logical",
                      cursor: "text",
                      textAlign: "start",
                      appearance: "auto",
                      letterSpacing: "normal",
                      wordSpacing: "normal",
                      textTransform: "none",
                      textIndent: "0px",
                      textShadow: "none",
                      WebkitWritingMode: "horizontal-tb !important",
                      textRendering: "auto",
                      margin: "0",
                      fontFamily: "inherit",
                      overflow: "visible",
                      transition:
                        "border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                      height: "calc(1.5em + .75rem + 2px)",
                      padding: ".375rem .75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      display: "block",
                      background: "rgb(255, 255, 255) !important",
                      color: "rgb(0, 0, 0) !important",
                      width: "100%",
                    }}
                    type="email"
                    placeholder="Your email"
                    id="INPUT_12"
                  />
                </div>
                <button
                  style={{
                    font: "400 13.3333px Arial",
                    alignItems: "flex-start",
                    textIndent: "0px",
                    textShadow: "none",
                    letterSpacing: "normal",
                    wordSpacing: "normal",
                    WebkitWritingMode: "horizontal-tb !important",
                    textRendering: "auto",
                    margin: "0",
                    fontFamily: "inherit",
                    overflow: "visible",
                    textTransform: "none",
                    WebkitAppearance: "button",
                    transition:
                      "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out",
                    border: "1px solid transparent",
                    padding: ".375rem .75rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    borderRadius: ".25rem",
                    textAlign: "center",
                    verticalAlign: "middle",
                    display: "inline-block",
                    fontWeight: "400",
                    color: "#fff",
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  type="button"
                  id="BUTTON_13"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
