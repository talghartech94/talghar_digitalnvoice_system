import Province from "../models/Province.js";


export const fetchProvinces = async () => {
  const res = await fetch(process.env.PROVINCE_API_URL, {
    headers: { Authorization: `Bearer ${process.env.PROVINCE_API_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`Province API failed with status ${res.status}`);
  }
  return res.json();
};

export const syncProvinces = async () => {
  const provinces = await fetchProvinces();

  const operations = provinces.map((p) => ({
    updateOne: {
      filter: { stateProvinceCode: p.stateProvinceCode },
      update: { $set: { stateProvinceDesc: p.stateProvinceDesc } },
      upsert: true,
    },
  }));

  const result = await Province.bulkWrite(operations);
  return {
    fetched: provinces.length,
    inserted: result.upsertedCount,
    updated: result.modifiedCount,
  };
};
