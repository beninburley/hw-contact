import React from "react";
import { useContactContext } from "../context/ContactContext";

export const ProfilePreview: React.FC = () => {
  const { state, isProfileValid } = useContactContext();
  const { firstName, lastName, phone, email } = state.contact;
  const fullName = `${firstName} ${lastName}`.trim();

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
        <strong>Name:</strong> {fullName || "(not provided)"}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Email:</strong> {email || "(not provided)"}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Phone Number:</strong> {phone || "(not provided)"}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Status:</strong>{" "}
        <span style={{ color: isProfileValid() ? "green" : "red" }}>
          {isProfileValid() ? "✓ Valid" : "✗ Invalid"}
        </span>
      </div>
    </div>
  );
};
