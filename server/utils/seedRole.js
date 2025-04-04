import Role from "../models/Role.js";

const seedRoles = async () => {
  const roles = [
    { role: "admin", permissions: ["add", "view", "update", "delete"] },
    { role: "hr", permissions: ["add", "view", "update", "delete"] },
    { role: "student", permissions: ["view", "update", "delete"] },
    { role: "pc", permissions: ["view", "add"] },
  ];

  try {
    await Role.deleteMany(); // Clear existing roles
    await Role.insertMany(roles);
    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

export default seedRoles;
