import React, { createContext, useContext, useReducer } from "react";
import {
  contactReducer,
  initialState,
  type Action,
  type ContactField,
  type FormState,
  type State,
} from "../types/ContactContex";

type ContactContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
  handleChange: (
    field: ContactField
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (field: ContactField) => () => void;
  handleSubmit: () => void;
  getError: (field: keyof FormState) => string | undefined;
  isProfileValid: () => boolean;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const handleBlur = (field: ContactField) => () => {
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
    <ContactContext.Provider
      value={{
        state,
        dispatch,
        handleChange,
        handleBlur,
        handleSubmit,
        getError,
        isProfileValid,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = (): ContactContextValue => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContactContext must be used inside <ContactProvider>");
  }

  return context;
};