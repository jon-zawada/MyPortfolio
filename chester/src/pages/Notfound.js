import { Helmet } from "react-helmet";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Notfound() {
  return (
    <>
      <Helmet>
        <title>404</title>
        <meta
          name="description"
          content=""
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-about-area mi-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="notfound">
                  <div className="notfound-inner text-center">
                    <h1>404</h1>
                    <h3>Whoops!!! Page not found!</h3>
                    <Link to="/" className="mi-button">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Notfound;
