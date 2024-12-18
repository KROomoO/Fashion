import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const PrivateRoute = () => {
    const jwtToken = JSON.parse(localStorage.getItem("jwt"));
    const isAuthenticated = !!jwtToken;

    const { categoryItem } = useOutletContext();

    if (isAuthenticated === false) {
        alert("로그인 후 이용해주세요");
    }

    return isAuthenticated ? (
        <Outlet context={{ categoryItem: categoryItem }} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
