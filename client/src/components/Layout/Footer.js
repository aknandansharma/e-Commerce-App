import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer bg-dark text-light p-3">
      <h4 className="text-center">All Right Reserved &copy; aknandansharma</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Private Policy</Link>
      </p>
    </div>
  );
}

export default Footer