import Subscription from "../models/Subscriptions.js";
import { sendMail } from "../utils/sendMail.js";

const content = {
  subject: "Successfully Subscribed the Mail",
  title: "You're In!",
  message: `Congratulations! You have successfully subscribed to our mailing list. You'll now receive updates, newsletters, and exciting news directly in your inbox.`,
  buttonText: "Click here for unsubscribe",
  buttonUrl: "https://gbu-crc.onrender.com//api/subscriptions/unsubscribe",
};

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
    await sendMail(email, "", content);
    res.status(200).json({ success: true, message: "Successfully Subscribed" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed Try again" });
  }
  //   console.log(email);
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
