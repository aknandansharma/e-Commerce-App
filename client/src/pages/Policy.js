import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://revieweurs.com/wp-content/uploads/2022/04/Privacy-Policy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            This privacy policy outlines the policies and procedures of
            ecommerce app regarding the collection, use, and disclosure of
            personal information received from users of our website, located at
            ecommerce app.
          </p>
          <p>
            By using our website, you agree to the collection, use, and
            disclosure of your personal information in accordance with this
            privacy policy. If you do not agree with the terms of this policy,
            please do not use our website.
          </p>
          <p>
            The personal information collected may include, but is not limited
            to, your name, email address, mailing address, phone number, and
            payment information.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
