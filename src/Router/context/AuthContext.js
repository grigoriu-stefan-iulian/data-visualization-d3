import PropTypes from "prop-types";
import { useMemo, createContext } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { abillities, authToken, sessionLoading, abilities } = useSelector(
    (state) => state.session
  );

  const contextValue = useMemo(
    () => ({
      abillities,
      isLoggedIn: authToken && !sessionLoading && abilities,
    }),
    [abillities, authToken, sessionLoading, abilities]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
