import { useState } from "react";

const API_URL = "http://localhost:5000/api/invoices";
const emptyForm = { invoiceNumber: "", customerName: "", amount: "" };

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage("Error: " + data.message);
        return;
      }
      setMessage("Saved invoice " + data.invoiceNumber);
      setForm(emptyForm);
    } catch {
      setMessage("Could not reach the server");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>New Invoice</h1>
      <form onSubmit={handleSubmit}>
        <input name="invoiceNumber" placeholder="Invoice number"
          value={form.invoiceNumber} onChange={handleChange} required />
        <br />
        <input name="customerName" placeholder="Customer name"
          value={form.customerName} onChange={handleChange} required />
        <br />
        <input name="amount" type="number" placeholder="Amount"
          value={form.amount} onChange={handleChange} required />
        <br />
        <button type="submit">Save</button>
      </form>
      <p>{message}</p>
    </div>
  );
}