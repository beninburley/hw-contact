import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
