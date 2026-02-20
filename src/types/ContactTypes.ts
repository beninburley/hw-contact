export interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface TouchedState {
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  email: boolean;
}

export type State =
  | {
      status: "Editing";
      contact: FormState;
      touched: TouchedState;
    }
  | {
      status: "Submitting";
      contact: FormState;
      touched: TouchedState;
    }
  | {
      status: "Submitted";
      contact: FormState;
      touched: TouchedState;
    }
  | {
      status: "Error";
      contact: FormState;
      touched: TouchedState;
      message: string;
    };

export type ContactField = keyof FormState;

type ValidationErrors = Partial<Record<ContactField, string>>;

export type Action =
  | { type: "changeField"; field: ContactField; value: string }
  | { type: "blurField"; field: ContactField }
  | { type: "submitStart" }
  | { type: "submitComplete"; errors: ValidationErrors };

export type ContactState = "Submitting" | "Submitted" | "Editing" | "Error";

export const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

export const initialTouchedState: TouchedState = {
  firstName: false,
  lastName: false,
  phone: false,
  email: false,
};

export const initialState: State = {
  status: "Editing",
  contact: initialFormState,
  touched: initialTouchedState,
};

function assertNever(x: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(x)}`);
}

export function contactReducer(state: State, action: Action): State {
  switch (action.type) {
    case "changeField":
      return {
        status: "Editing",
        contact: { ...state.contact, [action.field]: action.value },
        touched: state.touched,
      };

    case "blurField":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };

    case "submitStart":
      if (state.status !== "Editing" && state.status !== "Error") return state;
      return {
        status: "Submitting",
        contact: state.contact,
        touched: state.touched,
      };

    case "submitComplete":
      if (state.status !== "Submitting") return state;
      if (Object.keys(action.errors).length === 0) {
        return {
          status: "Submitted",
          contact: state.contact,
          touched: state.touched,
        };
      }
      return {
        status: "Error",
        contact: state.contact,
        touched: { firstName: true, lastName: true, email: true, phone: true },
        message: "Please fix validation errors.",
      };
  }
  return assertNever(action);
}
