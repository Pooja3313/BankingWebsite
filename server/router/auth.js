const express = require('express');
const Customer = require('../model/CustomerSchema');
const router = express.Router();
const Transfer = require('../model/TransferSchema');
// const mongoose = require('mongoose');

// GET all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/transfer', async (req, res) => {
  try {
    const { sender, receiver, amount } = req.body;

    // Log the data received from the frontend for debugging
    console.log('Received transfer request:', req.body);

    // Validate sender and receiver IDs (assuming they are MongoDB ObjectIDs)
    if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
      console.log('Invalid sender or receiver ID provided.');
      return res.status(400).json({ message: 'Invalid sender or receiver ID provided.' });
    }

    // Check if sender and receiver IDs exist in the database
    const senderExists = await Customer.findById(sender);
    const receiverExists = await Customer.findById(receiver);
    if (!senderExists || !receiverExists) {
      console.log('Sender or receiver not found in the database.');
      return res.status(400).json({ message: 'Sender or receiver not found in the database.' });
    }
   

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.log('Invalid amount provided.');
      return res.status(400).json({ message: 'Invalid amount provided.' });
    }

    // Check if sender has sufficient balance for the transfer
    if (senderExists.currentBalance < parsedAmount) {
      return res.status(400).json({ message: 'Insufficient balance for the transfer.' });
    }

    // Update sender's balance
    senderExists.currentBalance -= parsedAmount;
    await senderExists.save();

    // Update receiver's balance
    receiverExists.currentBalance += parsedAmount;
    await receiverExists.save();
    
    // Create a new transfer instance based on the Transfer model
    const newTransfer = new Transfer({
      sender,
      receiver,
      amount,
      timestamp:new Date(),
    });
    // Save the transfer data to the database
    await newTransfer.save();

     

    // Log success message
    console.log('Money transferred successfully!');

    // Respond with a success message
    res.status(200).json({ message: 'Money transferred successfully!' });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error transferring money:', error);

    // Respond with an error message
    res.status(400).json({ message: 'Error transferring money. Please try again later.' });
  }
});


module.exports = router;
