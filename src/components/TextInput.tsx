import React from "react";
import { useContactContext } from "../context/ContactContext";
import type { ContactField } from "../types/ContactContex";

interface TextInputProps {
  label: string;
  field: ContactField;
}

export const TextInput: React.FC<TextInputProps> = ({ label, field }) => {
  const { state, handleChange, handleBlur, getError } = useContactContext();
  const error = getError(field);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        type="text"
        value={state.contact[field]}
        onChange={handleChange(field)}
        onBlur={handleBlur(field)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          border: error ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "300px",
        }}
      />
      {error && (
        <div
          style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
