import React, { useReducer } from "react";
import { TextInput } from "./TextInput";
import { ProfilePreview } from "./ContactPreview";
import {
  contactReducer,
  initialState,
  type FormState,
  type ContactField,
} from "../types/ContactContex";

export const ContactEditor: React.FC = () => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const validateField = (field: keyof FormState, value: string): string => {
    if (field === "email" && !value.includes("@")) {
      return "Email must contain '@'";
    } else if (field === "firstName" && value.trim() === "") {
      return "Name is required";
    } else if (field === "phone" && value.length < 10) {
      return "Please enter a valid phone number";
    }

    return "";
  };

  const handleChange =
    (field: ContactField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "changeField", field, value: e.target.value });
    };

  const handleBlur =
    (field: ContactField) => (_e: React.FocusEvent<HTMLInputElement>) => {
      dispatch({ type: "blurField", field });
    };
  const handleSubmit = () => {
    dispatch({ type: "submitStart" });
  };

  const isProfileValid = (): boolean => {
    const { firstName, lastName, email, phone } = state.contact;

    return (
      validateField("firstName", firstName) === "" &&
      validateField("lastName", lastName) === "" &&
      validateField("email", email) === "" &&
      validateField("phone", phone) === ""
    );
  };

  const getError = (field: keyof FormState): string | undefined => {
    if (!state.touched[field]) {
      return undefined;
    }

    return validateField(field, state.contact[field]) || undefined;
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Profile Editor</h2>

      <TextInput
        label="First Name"
        value={state.contact.firstName}
        onChange={handleChange("firstName")}
        onBlur={handleBlur("firstName")}
        error={getError("firstName")}
      />
      <TextInput
        label="Last Name"
        value={state.contact.lastName}
        onChange={handleChange("lastName")}
        onBlur={handleBlur("lastName")}
        error={getError("lastName")}
      />

      <TextInput
        label="Email"
        value={state.contact.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        error={getError("email")}
      />

      <TextInput
        label="Phone Number"
        value={state.contact.phone}
        onChange={handleChange("phone")}
        onBlur={handleBlur("phone")}
        error={getError("phone")}
      />
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      <ProfilePreview
        firstName={state.contact.firstName}
        lastName={state.contact.lastName}
        phone={state.contact.phone}
        email={state.contact.email}
        isValid={isProfileValid()}
      />
    </div>
  );
};
