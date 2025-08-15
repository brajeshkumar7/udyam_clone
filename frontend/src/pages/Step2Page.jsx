import React from "react";
import StepForm from "../components/StepForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "../components/ProgressBar";
import "react-toastify/dist/ReactToastify.css";

export default function Step2Page({ schema, formData, setFormData }) {
    const navigate = useNavigate();
    // 🟢 Updated handleSubmit to validate Aadhaar & PAN before submission
    const handleSubmit = async (data) => {
        const finalData = { ...formData, ...data };

        // 1. First validate from backend
        try {
            const validateRes = await fetch(import.meta.env.MODE === 'development' ? 'http://localhost:4000/validate' : '/validate', {
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
                toast.success("Aadhaar/PAN validated successfully!");
            }
        } catch (err) {
            toast.error("Unable to validate Aadhaar/PAN with server");
            return;
        }

        // 2. Only submit if backend validation succeeded
        fetch(import.meta.env.MODE === 'development' ? 'http://localhost:4000/submit' : '/submit', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Form submitted successfully!");
                sessionStorage.clear();
                setTimeout(() => navigate("/success"), 1500);
            })
            .catch(err => toast.error("Error: " + err));
    };



    return (
        <>
            <ProgressBar currentStep={1} steps={["Step 1", "Step 2", "Success"]} />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg bg-white shadow-lg rounded p-6">
                    <h2 className="text-2xl font-bold mb-4">Step 2: PAN & Address</h2>
                    <StepForm stepData={schema} onNext={handleSubmit} isLastStep />
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

