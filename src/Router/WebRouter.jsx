import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import ErrorPage from "../Components/ErrorPage";
import Main from "../Layouts/Main/Main";
import Home from "../Layouts/Main/Home/Home";
import AllClubs from "../Layouts/Main/AllClubs/AllClubs";
import About from "../Layouts/Main/About/About";
import ClubDetails from "../Layouts/Main/ClubDetails/ClubDetails";
import LoginPage from "../Layouts/Main/Auth/LoginPage";
import RegisterPage from "../Layouts/Main/Auth/RegisterPage";
import ForgotPasswordPage from "../Layouts/Main/Auth/ForgotPasswordPage";
import CheckoutPayment from "../Layouts/Main/Payment/CheckoutPayment";
import PaymentSuccess from "../Layouts/Main/Payment/PaymentSuccess";
import PaymentFailed from "../Layouts/Main/Payment/PaymentFailed";
import MyProfile from "../Layouts/Dashboard/MyProfile/MyProfile";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DashboardHome from "../Layouts/Dashboard/DashboardHome/DashboardHome";
import AddClubs from "../Layouts/Dashboard/Moderator/AddClubs/AddClubs";
import ManageClubs from "../Layouts/Dashboard/Admin/ManageClubs/ManageClubs";
import ManageUsers from "../Layouts/Dashboard/Admin/ManageUsers/ManageUsers";
import Analytics from "../Layouts/Dashboard/Admin/Analytics/Analytics";
import ManageAppliedApplications from "../Layouts/Dashboard/Moderator/ManageAppliedApplications/ManageAppliedApplications";
import AllReviews from "../Layouts/Dashboard/Moderator/AllReviews/AllReviews";
import MyApplications from "../Layouts/Dashboard/Member/MyApplications/MyApplications";
import MyReviews from "../Layouts/Dashboard/Member/MyReviews/MyReviews";
import EditApplication from "../Layouts/Dashboard/Member/EditApplication/EditApplication";
import App from "../App";
import UpdateClub from "../Layouts/Dashboard/Moderator/UpdateClub/UpdateClub";
import IsLoginUser from "./Validation/IsLoginUser";
import IsAdmin from "./Validation/IsAdmin";
import IsModerator from "./Validation/IsModerator";
import IsMember from "./Validation/IsMember";
import AllEvents from "../Layouts/Main/AllEvents/AllEvents";

const WebRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Main></Main>,
          children: [
            {
              path: "/",
              element: <Home></Home>,
            },
            {
              path: "/all-clubs",
              element: <AllClubs></AllClubs>,
            },
             {
              path: "/all-events",
              element: <AllEvents></AllEvents>,
            },
            {
              path: "/about",
              element: <About></About>,
            },
            {
              path: "/club-details/:id",
              element: <ClubDetails></ClubDetails>,
            },
            {
              path: "/login",
              element: <LoginPage></LoginPage>,
            },
            {
              path: "/register",
              element: <RegisterPage></RegisterPage>,
            },
            {
              path: "/forgot",
              element: <ForgotPasswordPage></ForgotPasswordPage>,
            },
            // payment routes
            {
              path: "/payment",
              element: (
                <IsLoginUser>
                  <CheckoutPayment></CheckoutPayment>
                </IsLoginUser>
              ),
            },
            {
              path: "/payment-success",
              element: (
                <IsLoginUser>
                  <PaymentSuccess></PaymentSuccess>
                </IsLoginUser>
              ),
            },
            {
              path: "/payment-failed",
              element: (
                <IsLoginUser>
                  <PaymentFailed></PaymentFailed>
                </IsLoginUser>
              ),
            },
            // profile
            {
              path: "/profile",
              element: (
                <IsLoginUser>
                  <MyProfile></MyProfile>
                </IsLoginUser>
              ),
            },
          ],
        },
        {
          path: "/dashboard",
          element: (
            <IsLoginUser>
              <Dashboard></Dashboard>
            </IsLoginUser>
          ),
          children: [
            {
              path: "/dashboard",
              element: <Navigate to={"/dashboard/home"}></Navigate>,
            },
            {
              path: "/dashboard/home",
              element: <DashboardHome></DashboardHome>,
            },
            // admin
            {
              path: "/dashboard/manage-users",
              element: (
                <IsAdmin>
                  <ManageUsers></ManageUsers>
                </IsAdmin>
              ),
            },
            {
              path: "/dashboard/analytics",
              element: (
                <IsAdmin>
                  <Analytics></Analytics>
                </IsAdmin>
              ),
            },
            // moderator
            {
              path: "/dashboard/add",
              element: (
                <IsModerator>
                  <AddClubs></AddClubs>
                </IsModerator>
              ),
            },
                                    {
              path: "/dashboard/manage-clubs",
              element: (
                <IsModerator>
                  <ManageClubs></ManageClubs>
                </IsModerator>
              ),
            },
             {
              path: "/dashboard/update-club/:id",
              element: (
                <IsModerator>
                  <UpdateClub></UpdateClub>
                </IsModerator>
              ),
            },
            {
              path: "/dashboard/manage-applications",
              element: (
                <IsModerator>
                  <ManageAppliedApplications></ManageAppliedApplications>
                </IsModerator>
              ),
            },
            {
              path: "/dashboard/all-reviews",
              element: (
                <IsModerator>
                  <AllReviews></AllReviews>
                </IsModerator>
              ),
            },
            // member
            {
              path: "/dashboard/my-applications",
              element: (
                <IsMember>
                  <MyApplications></MyApplications>
                </IsMember>
              ),
            },
            {
              path: "/dashboard/my-reviews",
              element: (
                <IsMember>
                  <MyReviews></MyReviews>
                </IsMember>
              ),
            },
            {
              path: "/dashboard/edit-application/:id",
              element: (
                <IsMember>
                  <EditApplication></EditApplication>
                </IsMember>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default WebRouter;
