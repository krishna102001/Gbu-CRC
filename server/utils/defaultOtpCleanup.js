import Otp from "../models/Otp.js";

export const defaultOtpCleanup = async () => {
  try {
    const TEN_MINUTES_AGO = new Date(Date.now() - 10 * 60 * 1000);
    const result = await Otp.deleteMany({
      createdAt: { $lt: TEN_MINUTES_AGO },
    });
    console.log(`✅ Deleted ${result.deletedCount} expired OTPs.`);
  } catch (error) {
    console.error("❌ Error deleting expired OTPs:", error);
  }
};
