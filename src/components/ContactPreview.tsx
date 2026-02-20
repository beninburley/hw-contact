import React from "react";

interface ProfilePreviewProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isValid: boolean;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  firstName,
  lastName,
  phone,
  email,
  isValid,
}) => {
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f900",
      }}
    >
      <h3>Profile Preview</h3>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Name:</strong> {firstName + " " + lastName || "(not provided)"}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Email:</strong> {email || "(not provided)"}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Phone Number:</strong> {phone || "(not provided)"}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Status:</strong>{" "}
        <span style={{ color: isValid ? "green" : "red" }}>
          {isValid ? "✓ Valid" : "✗ Invalid"}
        </span>
      </div>
    </div>
  );
};
