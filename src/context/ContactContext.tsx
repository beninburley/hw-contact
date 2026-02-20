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
    field: ContactField,
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

    //AI helped me create the timeout to display the state status
    setTimeout(() => {
      const { firstName, lastName, email, phone } = state.contact;
      const isValidNow =
        validateField("firstName", firstName) === "" &&
        validateField("lastName", lastName) === "" &&
        validateField("email", email) === "" &&
        validateField("phone", phone) === "";

      if (isValidNow) {
        dispatch({ type: "submitSuccess" });
      } else {
        dispatch({
          type: "submitError",
          message: "Please fix validation errors.",
        });
      }
    }, 1000); // 1 second
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
  // AI Helped me with this function... I'm not sure why would we need some of the error messages
  if (!context) {
    throw new Error("useContactContext must be used inside <ContactProvider>");
  }

  return context;
};
