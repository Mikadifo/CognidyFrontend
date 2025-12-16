"use client";

type Props = {
  password: string;
};

export default function PasswordRules({ password }: Props) {
  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[!@#$%^&*(),.?\":{}|<>]/.test(password) },
  ];

  return (
    <div style={{ marginTop: "10px" }}>
      {rules.map((rule) => (
        <p key={rule.label} style={{ 
          color: rule.valid ? "green" : "red",
          fontSize: "14px",
          margin: "2px 0"
        }}>
          {rule.valid ? "✔" : "✘"} {rule.label}
        </p>
      ))}
    </div>
  );
}
