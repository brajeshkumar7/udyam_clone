import React from "react";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function SuccessPage() {
    const navigate = useNavigate();
    useEffect(() => {
        // Clear history so user can't go back
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
        setTimeout(() => navigate("/"), 7000);
    }, []);
    return (<>
        <ProgressBar currentStep={2} steps={["Step 1", "Step 2", "Success"]} />
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="text-center">
                <img
                    src="/success-tick-svgrepo-com.svg"
                    alt="Success"
                    className="w-24 h-24 mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-green-700">Registration Successful!</h1>
            </div>
        </div>
    </>
    );
}
