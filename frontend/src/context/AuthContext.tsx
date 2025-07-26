import {
  createContext,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";

interface IUserResponse {
  username: string | null;
  token: string | null;
}

type AuthStateType = {
  user: IUserResponse | null;
};

type AuthActionType = {
  type: "LOGIN" | "LOGOUT";
  payload: any;
};

type AuthContextType = {
  user: IUserResponse | null;
  dispatch: ActionDispatch<any>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => {},
});

export const authReducer = (
  state: AuthStateType,
  action: AuthActionType
): any => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
