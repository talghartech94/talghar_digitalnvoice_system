import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema(
  {
    stateProvinceCode: { type: Number, required: true, unique: true },
    stateProvinceDesc: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Province", provinceSchema);