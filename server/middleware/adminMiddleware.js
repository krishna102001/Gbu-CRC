import jwt from "jsonwebtoken";
const adminMiddleWare = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: "Token Not Found" });
  }
  console.log(token);
  if (!token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "token is invalid" });
  }

  token = token.split(" ")[1];
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
