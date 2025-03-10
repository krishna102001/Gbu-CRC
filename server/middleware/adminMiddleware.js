import jwt from "jsonwebtoken";
const adminMiddleWare = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(402).json({ success: false, message: "Token Not Found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(402)
      .json({ success: false, message: "Unauthorized User" });
  }
};

export default adminMiddleWare;
