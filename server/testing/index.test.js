import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../server.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";
import Company from "../models/Company.js";

vi.mock("bcrypt");
vi.mock("cloudinary");
vi.mock("../models/User.js");
vi.mock("../models/Company.js");

// Clear database mock before each test
beforeEach(() => {
  vi.resetAllMocks();
});

describe("POST /api/users/register", () => {
  it("it should register a new user successfully", async () => {
    vi.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
    vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed_password");

    cloudinary.uploader.upload = vi.fn().mockResolvedValue({
      secure_url: "https://mocked.cloudinary/image.png",
    });

    // mock user find one and create
    vi.spyOn(User, "findOne").mockResolvedValue(null);
    vi.spyOn(User, "create").mockResolvedValue({
      _id: "mockedId",
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      image: "https://mocked.cloudinary/image.png",
    });

    const response = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
      registration: "REG123",
      role: "student",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe("john@example.com");
    expect(response.body.user.role).toBe("student");
    expect(response.body.token).toBeDefined();
  });

  it("it should return error for missings required fields", async () => {
    const response = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "rrijdcknmd",
      password: "P23",
      registration: "REG123",
      role: "student",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Incorrect Format");
  });
});

describe("POST /api/users/login", () => {
  it("should login user successfully", async () => {
    const mockUser = {
      _id: "mockedUserId",
      email: "john@example.com",
      name: "John Doe",
      password: "hashedpassword",
      image: "mocked.png",
      role: "student",
    };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app).post("/api/users/login").send({
      email: "john@example.com",
      password: "Password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe("john@example.com");
    expect(response.body.token).toBeDefined();
  });

  it("should return invalid format", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Incorrect Format");
  });

  it("should fail when user not found", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).post("/api/users/login").send({
      email: "krishna@gmail.com",
      password: "12345",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User Not Found");
  });

  it("should include company data if role is hr", async () => {
    const mockUser = {
      _id: "mockedUserId",
      email: "hr@example.com",
      name: "HR User",
      password: "hashedpassword",
      image: "mocked.png",
      role: "hr",
    };

    const mockCompany = {
      name: "Internorbit",
      domain: "internorbit.com",
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    Company.findOne.mockResolvedValue(mockCompany);

    const response = await request(app).post("/api/users/login").send({
      email: "hr@example.com",
      password: "Password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.role).toBe("hr");
    expect(response.body.user.company).toEqual(mockCompany);
  });
});
