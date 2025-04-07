import Subscription from "../models/Subscriptions.js";

export const emailSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await Subscription.findOne({ email });
    if (data) {
      return res
        .status(400)
        .json({ success: false, message: "Already Subscribed" });
    }
    await Subscription.create({
      email,
    });
    res.status(200).json({ success: true, message: "Successfully Subscribed" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed Try again" });
  }
  console.log(email);
};

export const emailUnSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    await Subscription.deleteOne({ email });
    res
      .status(200)
      .json({ success: true, message: "Successfully UnSubscribed" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed Try again" });
  }
};
