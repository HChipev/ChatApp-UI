import CustomGoogleLoginButton from "../components/CustomGoogleLoginButton";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../store/slices/identitySlice";
import { useNavigate } from "react-router-dom";

const GoogleLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (credentials: TokenResponse) => {
      console.log(credentials);
      dispatch(setIsAuthenticated(true));
      navigate("/");
    },
    onError: () => dispatch(setIsAuthenticated(false)),
  });

  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900 bg-gray-100">
      <div className="p-8 rounded shadow-md w-96 dark:bg-gray-800 bg-gray-200 dark:text-white text-black">
        <h2 className="text-2xl font-semibold mb-6">Google login</h2>
        <CustomGoogleLoginButton onClick={() => login()}>
          <div className="flex justify-between w-full">
            Sign in with Google
            <FontAwesomeIcon icon={["fab", "google"]} bounce />
          </div>
        </CustomGoogleLoginButton>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
