import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

function Home() {

  
  return (
    <>

      <section id="hero" className="hero d-flex align-items-center section-bg">
        <div className="container">
          <div className="row justify-content-between gy-5">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h2 data-aos="fade-up">Secure, Reliable, and Professional <br />Banking Website</h2>
              <p data-aos="fade-up" data-aos-delay="100">Hello Customers!!!</p>
              <div className="d-flex">
                <NavLink to="/AllCustomer" className="btn-book-a-table">AllCustomers</NavLink>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
              <img src="assets/img/bank.png" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Home;