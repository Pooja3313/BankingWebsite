import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoneyTransfer = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [customers, setCustomers] = useState([]);
  const { id } = useParams(); // Get the customer ID from URL parameters
  const Navigate = useNavigate();
  useEffect(() => {
    // Fetch all customers except the sender
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/customers");
        if (!response.ok) {
          throw new Error("Error fetching customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Set the sender ID directly from the URL parameter ID
    setSenderId(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const receiverObj = customers.find(
        (customer) => customer._id === receiverId
      );

      if (!receiverObj) {
        throw new Error("Receiver not found.");
      }

      const response = await fetch("/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: senderId,
          receiver: receiverId,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transfer money");
      }

      console.log("Transfer response:", response.data);
      toast.success("Money transferred successfully!");
      Navigate("/AllCustomer");
    } catch (error) {
      console.error("Error transferring money:", error);
      toast.error("Error transferring money. Please try again later.");
    }
  };

 
  return (
    <div className="container-sm">
      <section
        className="section register min-vh-100 d-flex flex-column align-items-center  py-4"
        id="register"
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Money Transfer</h5>
            <form className="row g-6" onSubmit={handleSubmit}>
              <div className="card justify-content-center">
                <div className="col-md-12">
                  <label htmlFor="sender" className="form-label">
                    Sender:
                  </label>
                  {/* Display sender name based on senderId */}
                  <input
                    type="text"
                    className="form-control"
                    id="sender"
                    value={
                      customers.find((customer) => customer._id === senderId)
                        ?.name || ""
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="receiver" className="form-label">
                  Receiver:
                </label>
                <select
                  id="receiver"
                  className="form-select"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                >
                  <option value="" selected>
                    Select Receiver
                  </option>
                  {/* Filter out the sender's name from the dropdown */}
                  {customers
                    .filter((customer) => customer._id !== senderId)
                    .map((customer) => (
                      <option key={customer._id} value={customer._id}>
                        {customer.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-12">
                <label htmlFor="amount" className="form-label">
                  Amount:
                </label>
                <input
                  type="number"
                  className="form-select"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Transfer Money
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoneyTransfer;
