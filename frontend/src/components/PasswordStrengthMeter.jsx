import { Check, X } from "lucide-react";
import React from "react";

const CheckCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <X className="h-4 w-4 text-red-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-red-500"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength; // Ensure the function returns a value
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-yellow-500";
    if (strength === 2) return "bg-yellow-400";
    if (strength === 3) return "bg-orange-500";
    if (strength === 4) return "bg-green-700";
  };

  const getText = (strength) => {
    if (strength === 0) return "Weak";
    if (strength === 1) return "Okay";
    if (strength === 2) return "Good";
    if (strength === 3) return "Strong";
    if (strength === 4) return "Very Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{getText(strength)}</span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(index + 1) : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <CheckCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
