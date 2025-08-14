import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function StepForm({ stepData, onNext, isLastStep }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [serverOtp, setServerOtp] = useState("");
    const otpRefs = useRef([]);

    // Auto-fill City/State from PIN
    useEffect(() => {
        if (formData.pinCode && formData.pinCode.length === 6) {
            fetch(`https://api.postalpincode.in/pincode/${formData.pinCode}`)
                .then(res => res.json())
                .then(data => {
                    if (data[0].Status === "Success") {
                        const po = data[0].PostOffice[0];
                        setFormData(prev => ({ ...prev, city: po.District, state: po.State }));
                        setErrors(prev => ({ ...prev, city: false, state: false }));
                    } else {
                        toast.error("Invalid PIN Code");
                        setFormData(prev => ({ ...prev, city: "", state: "" }));
                    }
                })
                .catch(() => {
                    toast.error("Failed to fetch city/state");
                });
        }
    }, [formData.pinCode]);

    const handleChange = (e, pattern) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (pattern) {
            const regex = new RegExp(pattern);
            setErrors(prev => ({ ...prev, [name]: !regex.test(value) }));
        }
    };

    const generateOtp = () => {
        if (!formData.aadhaarNumber || errors.aadhaarNumber) {
            toast.error("Please enter a valid Aadhaar number before generating OTP");
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setServerOtp(otp);
        setOtpGenerated(true);
        toast.info(`Generated OTP: ${otp}`, { autoClose: 5000 });
    };

    const handleOtpInput = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        if (!value) return;
        const newOtp = formData.otp ? formData.otp.split("") : Array(6).fill("");
        newOtp[index] = value;
        setFormData(prev => ({ ...prev, otp: newOtp.join("") }));
        if (index < 5 && value) otpRefs.current[index + 1].focus();
    };

    const handleSubmit = () => {
        // OTP validation if present in fields
        if (stepData.fields.some(f => f.name === "otp")) {
            if (!formData.otp || formData.otp.length !== 6) {
                toast.error("Enter a 6-digit OTP");
                return;
            }
            if (formData.otp !== serverOtp) {
                toast.error("Incorrect OTP");
                // Reset OTP state so user can generate a new OTP immediately
                setOtpGenerated(false);   // Hide OTP inputs and show Generate button
                setServerOtp("");         // Clear server side OTP stored
                setFormData(prev => ({ ...prev, otp: "" })); // Clear OTP input values
                return;
            }
        }

        for (const f of stepData.fields) {
            if (f.required && !formData[f.name]) {
                toast.error(`Please fill ${f.label}`);
                return;
            }
        }

        onNext(formData);
    };

    return (
        <div className="bg-white">
            {stepData.fields.map(field => {
                if (field.name === "otp" && otpGenerated) {
                    return (
                        <div key="otp" className="mb-4">
                            <label className="block mb-2 font-medium">{field.label}</label>
                            <div className="flex gap-2">
                                {Array(6).fill("").map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        ref={(el) => (otpRefs.current[i] = el)}
                                        onChange={(e) => handleOtpInput(e, i)}
                                        className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                ))}
                            </div>
                        </div>
                    );
                }

                if (field.name === "otp" && !otpGenerated) {
                    return (
                        <div key="otp-btn" className="mb-4">
                            <button
                                type="button"
                                onClick={generateOtp}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Generate OTP
                            </button>
                        </div>
                    );
                }

                return (
                    <div key={field.name} className="mb-4">
                        <label className="block mb-1 font-medium">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                                field.name === "city" || field.name === "state"
                                    ? null
                                    : handleChange(e, field.pattern)
                            }
                            readOnly={field.name === "city" || field.name === "state"}
                            placeholder={
                                (field.name === "city" || field.name === "state") && !formData[field.name]
                                    ? "Auto-filled"
                                    : ""
                            }
                            className={`w-full px-3 py-2 border rounded ${field.name === "city" || field.name === "state"
                                ? "bg-gray-100 border-gray-300"
                                : "border-gray-300 focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors[field.name] && (
                            <p className="text-red-500 text-sm">Invalid {field.label}</p>
                        )}
                    </div>
                );
            })}

            <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 mt-4"
            >
                {isLastStep ? "Submit" : "Next"}
            </button>
        </div>
    );
}
