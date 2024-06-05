import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  // HANDLE LOGIN GOOGLE
  const handleLogin = () => {
    googleLogin()
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user)
        if (user) {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: "user",
            gender: "tidak difinisikan",
            address: "tidak difinisikan",
            phone: "tidak didefinisikan",
          };

          if (user.email && user.displayName) {
            return axios
              .post("https://ayo-pintar-server.onrender.com/new-user", userImp)
              .then(() => {
                navigate("/");
                return "Pendaftaran Berhasil";
              })
              .catch((err) => {
                throw new Error(err);
              });
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // email of the user account used.
        // const email = error.customData.email;
        // authcredential type that was used
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="flex items-center justify-center my-3">
      <button
        onClick={() => handleLogin()}
        className="flex items-center outline-none bg-white border border-l-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        <span>Login dengan Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
