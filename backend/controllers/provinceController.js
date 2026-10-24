import Province from "../models/Province.js";
import { syncProvinces } from "../services/provinceService.js";

export const syncAll = async (req, res) => {
  const summary = await syncProvinces();
  res.json(summary);
};

export const getProvinces = async (req, res) => {
  const provinces = await Province.find().sort({ stateProvinceCode: 1 });
  res.json(provinces);
};