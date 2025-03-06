// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";


// const initialState = {
//   email: "",
//   password: "",
// };


// function Authlogin() {
//   const [formData, setFormData] = useState(initialState);
//   console.log("formData is here", formData)
//   const dispatch = useDispatch();
//   const { toast } = useToast();


//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(loginUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }


//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Sign in to your account
//         </h1>
//         <p className="mt-2">
//            Do not have account
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/register"
//           >
//              Register
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={loginFormControls}
//         buttonText={"Sign In"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default Authlogin;

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

// Dummy Guest Credentials
const guestCredentials = {
  email: "guest@example.com",
  password: "guest123",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  console.log("formData is here", formData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  // Guest Login Function
  function handleGuestLogin() {
    setFormData(guestCredentials); // Set guest email & password
    dispatch(loginUser(guestCredentials)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Logged in as Guest",
        });
      } else {
        toast({
          title: "Guest login failed",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Do not have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      {/* Guest Login Button */}
      <button
        onClick={handleGuestLogin}
        className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition"
      >
        Login as Guest
      </button>
    </div>
  );
}

export default AuthLogin;

