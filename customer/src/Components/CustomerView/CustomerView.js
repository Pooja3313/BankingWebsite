import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import "./CustomerView.css";

const CustomerView = () => {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams(); // Get the customer ID from URL parameters

  useEffect(() => {
    axios
      .get(`/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, [id]); // Fetch data when the ID parameter changes

  if (!customer) {
    return <div>Loading...</div>; // Add loading indicator while fetching data
  }

  return (
    <div>
      <h2>{customer.name}</h2>
      <p>Email: {customer.email}</p>
      <p>Current Balance: {customer.currentBalance}</p>
      <div className="d-flex">
        <NavLink to="/AllCustomer" className="btn-book-a-table">
          Back
        </NavLink>
      </div>
      <div className="d-flex">
        <NavLink to={`/MoneyTransfer/${id}`} className="btn-book-a-table">
          MoneyTransfer
        </NavLink>
      </div>
    </div>
  );
};

export default CustomerView;
