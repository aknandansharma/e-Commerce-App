import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            A full stack developer is a software engineer who possesses the
            skills to work on both the front-end and back-end of a website or
            application. They have a comprehensive understanding of the entire
            development process, from the client-side technologies such as HTML,
            CSS, and JavaScript to the server-side technologies such as Node.js,
            Express.js etc.
          </p>
          <p>
            A full stack developer can design and build the front-end of a
            website, which includes creating the user interface, implementing
            responsive design, and creating interactive elements. They can also
            develop the back-end, which involves setting up the server, writing
            server-side scripts, and integrating APIs.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
