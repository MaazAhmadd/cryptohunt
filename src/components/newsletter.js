import React from "react";

export default function Newsletter() {
  let [correct, setCorrect] = React.useState(false);
  return (
    <div className="newsletter-outer-outer">
      <div className="newsletter-outer">
        <div className="newsletter-main">
          <div className="newsletter_left">
            <img src="bike.svg" alt="Logo" />
          </div>
          <div className="newsletter_right">
            <div className="newsletter_subscribe">
              <div style={{ fontSize: "22px", fontWeight: "600" }}>
                Subscribe to our newsletter
              </div>
            </div>
            <div className="newsletter_line">
              Get the best high potential coins right into your inbox.
            </div>
            <div>
              <div
                id="mc_embed_signup"
                style={{ width: "80%", float: "left", marginTop: "5%" }}
              >
                <form
                  action="https://con.us5.list-manage.com/subscribe/post?u=ecfebd4ed89f081787b30a7ea&id=afc6e39fd9"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                  noValidate
                >
                  <div className="newsletter_line" id="mc_embed_signup_scroll">
                    <div style={{ marginBlock: "1rem" }}>
                      <div>Enter a valid email e.g name@gmail.com</div>
                      <input
                        onChange={(e) => {
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                            ? setCorrect(true)
                            : setCorrect(false);
                        }}
                        type="email"
                        name="EMAIL"
                        className="email"
                        id="mce-EMAIL"
                        placeholder="email address"
                        required
                        style={{
                          fontFamily: "inherit",
                          transition:
                            "border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out",
                          border: "1px solid #ced4da",
                          borderRadius: ".25rem",
                          height: "calc(1.5em + .75rem + 2px)",
                          padding: ".375rem .75rem",
                          fontSize: "1rem",
                          display: "block",
                          width: "100%",
                        }}
                      />
                    </div>
                    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_ecfebd4ed89f081787b30a7ea_afc6e39fd9"
                        tabIndex={-1}
                        defaultValue
                      />
                    </div>
                    <div className="clear">
                      <input
                        onClick={(e) => {
                          if (!correct) {
                            e.preventDefault();
                            return false;
                          }
                        }}
                        type="submit"
                        defaultValue="Subscribe"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="button"
                        style={{
                          fontFamily: "inherit",
                          overflow: "visible",
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
                          color: "#fff",
                          backgroundColor: "#007bff",
                          borderColor: "#007bff",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
