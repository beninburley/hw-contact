import React from "react";
import { TextInput } from "./TextInput";
import { ContactPreview } from "./ContactPreview";
import { useContactContext } from "../context/ContactContext";

export const ContactEditor: React.FC = () => {
  const { state, handleSubmit, isProfileValid } = useContactContext();

  const statusColor: Record<typeof state.status, string> = {
    Editing: "#2563eb",
    Submitting: "#d97706",
    Submitted: "#16a34a",
    Error: "#dc2626",
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Profile Editor</h2>

      <div style={{ marginBottom: "1rem" }}>
        <span
          style={{
            background: statusColor[state.status],
            color: "white",
            padding: "0.25rem 0.6rem",
            borderRadius: "999px",
            fontSize: "0.85rem",
          }}
        >
          {state.status}
        </span>
      </div>

      <TextInput label="First Name" field="firstName" />
      <TextInput label="Last Name" field="lastName" />
      <TextInput label="Email" field="email" />
      <TextInput label="Phone Number" field="phone" />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isProfileValid() || state.status === "Submitting"}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: !isProfileValid() ? "not-allowed" : "pointer",
          opacity: !isProfileValid() ? 0.6 : 1,
        }}
      >
        Submit
      </button>

      <ContactPreview />
    </div>
  );
};
