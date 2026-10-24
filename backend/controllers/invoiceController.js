import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.status(201).json(invoice);
};

export const getInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
};