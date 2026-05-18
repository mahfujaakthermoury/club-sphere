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
import AddClubs from "../Layouts/Dashboard/Manager/AddClubs/AddClubs";
import ManageClubs from "../Layouts/Dashboard/Admin/ManageClubs/ManageClubs";
import ManageUsers from "../Layouts/Dashboard/Admin/ManageUsers/ManageUsers";
import Analytics from "../Layouts/Dashboard/Admin/Analytics/Analytics";
import ManageAppliedApplications from "../Layouts/Dashboard/Manager/ManageAppliedApplications/ManageAppliedApplications";
import EventRegistrations from "../Layouts/Dashboard/Manager/EventRegistrations/EventRegistrations";
import MyApplications from "../Layouts/Dashboard/Member/MyApplications/MyApplications";
import MyEvents from "../Layouts/Dashboard/Member/MyEvents/MyEvents";
import EditApplication from "../Layouts/Dashboard/Member/EditApplication/EditApplication";
import App from "../App";
import UpdateClub from "../Layouts/Dashboard/Manager/UpdateClub/UpdateClub";
import IsLoginUser from "./Validation/IsLoginUser";
import IsAdmin from "./Validation/IsAdmin";
import IsManager from "./Validation/IsManager";
import IsMember from "./Validation/IsMember";
import AllEvents from "../Layouts/Main/AllEvents/AllEvents";
import AddEvents from "../Layouts/Dashboard/Manager/AddEvents/AddEvents";
import UpdateEvent from "../Layouts/Dashboard/Manager/UpdateEvent/UpdateEvent";
import ManageEvent from "../Layouts/Dashboard/Admin/ManageEvent/ManageEvent";

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
            // manager
            {
              path: "/dashboard/add",
              element: (
                <IsManager>
                  <AddClubs></AddClubs>
                </IsManager>
              ),
            },
            {
              path: "/dashboard/manage-clubs",
              element: (
                <IsManager>
                  <ManageClubs></ManageClubs>
                </IsManager>
              ),
            },
            {
              path: "/dashboard/update-club/:id",
              element: (
                <IsManager>
                  <UpdateClub></UpdateClub>
                </IsManager>
              ),
            },
            {
              path: "/dashboard/addEvent",
              element: (
                <IsManager>
                  <AddEvents></AddEvents>
                </IsManager>
              ),
            },
             {
              path: "/dashboard/manage-events",
              element: (
                <IsManager>
                  <ManageEvent></ManageEvent>
                </IsManager>
              ),
            },
             {
              path: "/dashboard/update-event/:id",
              element: (
                <IsManager>
                  <UpdateEvent></UpdateEvent>
                </IsManager>
              ),
            },
            {
              path: "/dashboard/club-members",
              element: (
                <IsManager>
                  <ManageAppliedApplications></ManageAppliedApplications>
                </IsManager>
              ),
            },
            {
              path: "/dashboard/event-registrations",
              element: (
                <IsManager>
                  <EventRegistrations></EventRegistrations>
                </IsManager>
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
              path: "/dashboard/my-event",
              element: (
                <IsMember>
                  <MyEvents></MyEvents>
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
