import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllCustomer.css";
import { NavLink } from "react-router-dom";

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("https://bankingwebsite-1.onrender.com/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <section
      className="section register min-vh-100 d-flex flex-column align-items-center  py-4"
      id="register"
    >
      <div className="container">
        <div className="row ">
          <div class="card justify-content-center">
            <div class="card-body">
              <h3 class="card-title title">Records of All Customers</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-info table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Name</th>
                      {/* <th scope="col">Email</th>
                <th scope="col">Current Balance</th> */}
                      <th scope="col">View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr key={customer._id}>
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        {/* <td>{customer.email}</td>
                  <td>{customer.currentBalance}</td> */}
                        <td>
                          {/* Link to individual customer details */}
                          <button
                            className="btn btn-secondary "
                            type="button"
                            data-fancybox
                            data-src={`#details-${customer._id}`}
                          >
                            View
                          </button>
                          {/* <button className="btn btn-secondary" type="button">
                            View
                          </button> */}

                          {/* <NavLink
                          
                            to={`/CustomerView/${customer._id}`}
                          >
                            View
                          </NavLink> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {customers.map((customer) => (
                  <div
                    id={`details-${customer._id}`}
                    key={customer._id}
                    style={{ display: "none" }}
                  >
                    <div clasName="container">
                      <div clasName="row">
                        <table className="table table-bordered table-info table-striped table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Current Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{customer.name}</td>
                              <td>{customer.email}</td>
                              <td>{customer.currentBalance}</td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <h2>{customer.name}</h2>
                        <p>Email: {customer.email}</p>
                        <p>Current Balance: {customer.currentBalance}</p> */}
                        <div className="d-flex">
                          <NavLink
                            to={`/MoneyTransfer/${customer._id}`}
                            type="button"
                            className="btn btn-primary"
                          >
                            MoneyTransferd
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCustomer;
