import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const submitForm = async (req, res) => {
    try {
        const { aadhaarNumber, panNumber, pinCode, city, state } = req.body;
        const entry = await prisma.registration.create({
            data: { aadhaarNumber, panNumber, pinCode, city, state }
        });
        res.json({ success: true, data: entry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database insert failed" });
    }
};