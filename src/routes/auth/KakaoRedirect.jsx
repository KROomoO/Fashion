import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParmas = new URLSearchParams(location.search);

    const code = queryParmas.get("code");
    const state = queryParmas.get("state");
};

export default KakaoRedirect;
