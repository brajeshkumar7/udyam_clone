import React from "react";
import StepForm from "../components/StepForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "../components/ProgressBar";
import "react-toastify/dist/ReactToastify.css";

export default function Step1Page({ schema, formData, setFormData }) {
    const navigate = useNavigate();
    const handleNext = async (data) => {
        setFormData(prev => ({ ...prev, ...data }));
        const finalData = { ...formData, ...data };

        // 1. First validate adhar from backend
        try {
            const validateRes = await fetch("http://localhost:4000/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    aadhaarNumber: finalData.aadhaarNumber,
                    panNumber: finalData.panNumber,
                }),
            });
            const validateJson = await validateRes.json();

            if (!validateRes.ok) {
                // Validation failed, show error from backend
                toast.error(validateJson.error);
                return;
            } else {
                toast.success("Aadhaar validated successfully!");
            }
        } catch (err) {
            toast.error("Unable to validate Aadhaar with server");
            return;
        }
        toast.success("Step 1 completed!");
        setTimeout(() => {
            navigate("/step2");
        }, 1500);
    };

    return (
        <>
            <ProgressBar currentStep={0} steps={["Step 1", "Step 2", "Success"]} />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg bg-white shadow-lg rounded p-6">
                    <h2 className="text-2xl font-bold mb-4">Step 1: Aadhaar & OTP</h2>
                    <StepForm stepData={schema} onNext={handleNext} />
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
