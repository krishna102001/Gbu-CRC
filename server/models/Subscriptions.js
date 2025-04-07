import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
