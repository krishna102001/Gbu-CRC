import mongoose from "mongoose";

const placementRecordSchema = new mongoose.Schema({
  session: { type: String, required: true, unique: true },
  numberOfCompanies: { type: Number, required: true },
  numberOfStudentsApplied: { type: Number, required: true },
  numberOfStudentsPlaced: { type: Number, required: true },
});

const PlacementRecord = mongoose.model(
  "PlacementRecord",
  placementRecordSchema
);

export default PlacementRecord;
