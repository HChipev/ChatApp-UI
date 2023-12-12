import CustomGoogleLoginButton from "../components/CustomGoogleLoginButton";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/identitySlice";
import { useGoogleLoginMutation } from "../store/slices/api/identityApiSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { addNotification } from "../store/slices/notificationSlice";

const GoogleLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();

  const login = useGoogleLogin({
    onSuccess: async (credentials: TokenResponse) => {
      try {
        const {
          tokens: { token },
        } = await googleLogin({
          googleId: credentials.access_token,
        }).unwrap();

        dispatch(setCredentials(token));

        navigate("/");
      } catch (error) {
        dispatch(
          addNotification({
            id: Date.now(),
            type: "error",
            message: String((error as { data: any }).data),
          })
        );
      }
    },
    onError: () => dispatch(setCredentials(null)),
  });

  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900 bg-gray-200">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="p-8 rounded shadow-md w-96 dark:bg-gray-800 bg-gray-100 dark:text-white text-black">
          <h2 className="text-2xl font-semibold mb-6">Google login</h2>

          <CustomGoogleLoginButton onClick={() => login()}>
            <div className="flex justify-between w-full">
              Sign in with Google
              <FontAwesomeIcon icon={["fab", "google"]} bounce />
            </div>
          </CustomGoogleLoginButton>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginPage;
