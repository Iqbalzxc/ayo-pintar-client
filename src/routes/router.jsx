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
import FaqPage from "../pages/FaqPage/FaqPage";
import TutorCP from "../pages/Dashboard/Tutor/TutorCP";
import AddClasses from "../pages/Dashboard/Tutor/AddClasses";
import MyClasses from "../pages/Dashboard/Tutor/MyClasses";
import PendingClass from "../pages/Dashboard/Tutor/PendingClass";
import ApprovedClass from "../pages/Dashboard/Tutor/ApprovedClass";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTutor from "../pages/Dashboard/Admin/ManageTutor";
import BlogPage from "../pages/Blog/BlogPage";

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
        path: "blog/:id",
        element: <BlogPage/>
      },
      {
        path: "faq",
        element: <FaqPage />,
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
      },
      {
        path: "add-classes",
        element: <AddClasses />
      },
      {
        path: "my-classes",
        element: <MyClasses />
      },
      {
        path: "my-pending",
        element: <PendingClass />
      },
      {
        path: "my-approved",
        element: <ApprovedClass />
      },

      // Admin Routes
      {
        path: "admin-home",
        element: <AdminHome />
      },
      {
        path: "manage-class",
        element: <ManageClasses />
      },
      {
        path: "manage-users",
        element: <ManageUsers />
      },
      {
        path: "manage-tutor",
        element: <ManageTutor />
      }
    ],
  },
]);
