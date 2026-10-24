import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["draft", "sent", "paid"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);