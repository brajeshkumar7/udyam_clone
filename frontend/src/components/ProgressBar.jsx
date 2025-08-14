import React from "react";

export default function ProgressBar({ currentStep, steps }) {
    return (
        <div className="w-full flex flex-col items-center mt-8 ">
            <div className="relative w-3/4">
                {/* Background line */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 z-0"></div>

                {/* Progress line */}
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 z-10 transition-all duration-300"
                    style={{
                        width: `${(currentStep / (steps.length - 1)) * 100}%`
                    }}
                ></div>

                {/* Circles */}
                <div className="relative flex justify-between w-full z-20">
                    {steps.map((stepLabel, index) => {
                        const isCompleted = index < currentStep;
                        const isActive = index === currentStep;
                        const isLast = index === steps.length - 1;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${isCompleted ? "text-green-500" : isActive ? "text-blue-500" : "text-gray-500"
                                    }`}
                            >
                                {/* Circle */}
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                    ${isCompleted ? "bg-green-500 border-green-500 text-white" : isActive && isLast ? "bg-green-500 border-green-500 text-white" : isActive ? "border-blue-500" : "border-gray-400"}
                  `}
                                >
                                    {isCompleted || (isActive && isLast) ? "✔" : index + 1}
                                </div>
                                {/* Label */}
                                <span className="mt-2 text-xs md:text-sm font-medium text-center w-20">
                                    {stepLabel}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
