export const validateAdhar_Pan = (req, res) => {
    const { aadhaarNumber, panNumber } = req.body;
    const aadhaarRegex = /^[0-9]{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (aadhaarNumber && !aadhaarRegex.test(aadhaarNumber)) {
        return res.status(400).json({ error: "Invalid Aadhaar Number" });
    }
    if (panNumber && !panRegex.test(panNumber)) {
        return res.status(400).json({ error: "Invalid PAN Number" });
    }

    res.json({ success: true });
};
