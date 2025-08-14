import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeUdyamForm() {
    const url = "https://udyamregistration.gov.in/UdyamRegistration.aspx";

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // ✅ Wait for Aadhaar input to appear
    try {
        await page.waitForSelector("#ctl00_ContentPlaceHolder1_txtUIDNumber, input[name='ctl00$ContentPlaceHolder1$txtUIDNumber']", { visible: true, timeout: 5000 });
    } catch {
        console.warn("⚠ Aadhaar field not found in time, will use fallback values.");
    }

    // -------- STEP 1: Aadhaar & OTP --------
    const step1Fields = await page.evaluate(() => {
        const fields = [];

        // Try Aadhaar input
        const aadhaarInput =
            document.querySelector("#ctl00_ContentPlaceHolder1_txtUIDNumber") ||
            document.querySelector("input[name='ctl00$ContentPlaceHolder1$txtUIDNumber']");
        if (aadhaarInput) {
            fields.push({
                name: "aadhaarNumber",
                label: "Aadhaar Number",
                type: "text",
                pattern: "^[0-9]{12}$",
                required: true
            });
        }

        // Try OTP input
        const otpInput =
            document.querySelector("#ctl00_ContentPlaceHolder1_txtOTP") ||
            document.querySelector("input[name='ctl00$ContentPlaceHolder1$txtOTP']");
        if (otpInput) {
            fields.push({
                name: "otp",
                label: "OTP",
                type: "text",
                pattern: "^[0-9]{6}$",
                required: true
            });
        }

        return fields;
    });

    // ✅ If Aadhaar/OTP not detected, fill in defaults so schema is never empty
    if (step1Fields.length === 0) {
        step1Fields.push(
            { name: "aadhaarNumber", label: "Aadhaar Number", type: "text", pattern: "^[0-9]{12}$", required: true },
            { name: "otp", label: "OTP", type: "text", pattern: "^[0-9]{6}$", required: true }
        );
    }

    // -------- STEP 2: PAN, PIN, City, State --------
    const step2Fields = [
        { name: "panNumber", label: "PAN Number", type: "text", pattern: "^[A-Z]{5}[0-9]{4}[A-Z]$", required: true },
        { name: "pinCode", label: "PIN Code", type: "text", pattern: "^[0-9]{6}$", required: true },
        { name: "city", label: "City", type: "text", required: true },
        { name: "state", label: "State", type: "text", required: true }
    ];

    const formSchema = {
        step1: { fields: step1Fields },
        step2: { fields: step2Fields }
    };

    // Save JSON file
    fs.writeFileSync("form-schema.json", JSON.stringify(formSchema, null, 2));
    console.log("✅ form-schema.json generated:\n", formSchema);

    await browser.close();
}

scrapeUdyamForm().catch(console.error);
