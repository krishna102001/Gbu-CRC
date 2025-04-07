import Role from "../models/Role.js";
const roleMiddleWare = (requiredRole, requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userRole = req.userRole;
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Not Desired role" });
      }

      const roleData = await Role.findOne({ role: userRole });
      // console.log(roleData);

      if (!roleData || !roleData.permissions.includes(requiredPermission)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient Permissions" });
      }
      next();
    } catch (error) {
      res.status(400).json({ message: "Server Error" });
    }
  };
};
export default roleMiddleWare;
