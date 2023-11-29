import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuthentication from "../../hooks/useAuthentication";

function RequireAbility({ requiredAbilities }) {
  const location = useLocation();
  const { userAbilities, isUserLoggedIn } = useAuthentication();

  const userHasRequiredAbilities = userAbilities.find((ability) =>
    requiredAbilities?.includes(ability),
  );

  if (userHasRequiredAbilities) {
    return <Outlet />;
  }
  if (isUserLoggedIn) {
    return <Navigate to="/unauthorised" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAbility;
