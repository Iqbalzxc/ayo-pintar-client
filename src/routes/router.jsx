import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Tutors from "../pages/Tutors/Tutors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsTutor from "../pages/Dashboard/Student/Apply/AsTutor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import ClassDetails from "../pages/Dashboard/Student/Enroll/ClassDetails";
import Blog from "../pages/Blog/Blog";
import Faq from "../pages/Home/Faq/Faq";
import TutorCP from "../pages/Dashboard/Tutor/TutorCP";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tutors",
        element: <Tutors />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/class/:id",
        element: <SingleClass />,
        loader: ({ params }) =>
          fetch(`https://ayo-pintar-server.onrender.com/class/${params.id}`),
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      // student routes
      {
        path: "student-cp",
        element: <StudentCP />,
      },
      {
        path: "enrolled-class",
        element: <EnrolledClasses />,
      },
      {
        path: "my-selected",
        element: <SelectedClass />,
      },
      {
        path: "my-payments",
        element: <MyPaymentHistory />,
      },
      {
        path: "apply-tutor",
        element: <AsTutor />,
      },
      {
        path: "user/payment",
        element: <Payment />,
      },
      {
        path: "class-details",
        element: <ClassDetails />,
      }, 

      // Tutor Routes
      {
        path: "tutor-cp",
        element: <TutorCP />,
      }
    ],
  },
]);
