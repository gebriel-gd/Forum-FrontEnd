import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import {
  AxiosInstance,
  axiosInstance,
  endPoint,
} from "../../Pages/endPoint/api";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookie.get("accessToken"); //this will have to modify to fit this project's auth.js

      if (token) {
        try {
          const response = await axiosInstance.get(endpoint.getUserById, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            dispatch({
              type: "SET_USER",
              payload: response.date?.user,
            });
          }
        } catch (error) {
          console.log("Authentication Error", error);
          dispatch({ type: "LOGOUT" });
          navigate("/");
        }
      } else {
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      }
    };
    checkAuthentication;
  }, [navigate]);

  const logout = () => {
    Cookie.remove("accessToken");

    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const login = async (email, password) => {
    try {
      const response = axiosInstance.post(endPoint.LOGIN, { email, password });
      if (response.status === 200) {
        const { accessToken, user } = (await response).data;

        Cookie.set("accessToken");
        dispatch({
          type: "SET_USER",
          payload: (await response).data?.data?.user,
        });
        navigate("/home");
      }
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ state, logout,login }}>
      {childre}
    </AuthContext.Provider>
  );
};
