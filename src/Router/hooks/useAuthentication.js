import { useContext } from "react";

import AuthenticationContext from "../context/AuthenticationContext";

const useAuthentication = () => useContext(AuthenticationContext);

export default useAuthentication;
