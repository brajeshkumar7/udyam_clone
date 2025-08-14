import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Step1Page from "./pages/Step1Page";
import Step2Page from "./pages/Step2Page";
import SuccessPage from "./pages/SuccessPage";

function App() {
    const [schema, setSchema] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetch("/form-schema.json")
            .then(res => res.json())
            .then(setSchema);
    }, []);

    if (!schema) return <p>Loading...</p>;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Step1Page
                        schema={schema.step1}
                        formData={formData}
                        setFormData={setFormData}
                    />
                }
            />
            <Route
                path="/step2"
                element={
                    <Step2Page
                        schema={schema.step2}
                        formData={formData}
                        setFormData={setFormData}
                    />
                }
            />
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
    );
}

export default App;
