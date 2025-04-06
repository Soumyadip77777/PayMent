const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// ================= Signup =================

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid inputs"
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

// ================= Signin =================

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid email or password format"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({
            message: "User signed in successfully",
            token: token,
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        });
    }

    res.status(411).json({ message: "Incorrect username or password" });
});

// ================= Update User =================

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "Error while updating information" });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({ message: "Updated successfully" });
});

// ================= Search Users =================

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

// ================= Get Current User =================

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
});

module.exports = router;
