import { useRoutes } from "react-router-dom";
import Layout from "../layouts";
import Auth from "../layouts/auth";
import Dashboard from "../pages/Dashboard";
import Attendees from "../pages/Attendees";
import Speakers from "../pages/Speakers";
import Vendors from "../pages/Vendors";
import Exhibitors from "../pages/Exhibitors";
import Conferences from "../pages/Conferences";
import Themes from "../pages/Themes";
import Events from "../pages/Events";
import SimcardBooking from "../pages/SimcardBooking";
import Categories from "../pages/Categories";
import ProductList from "../pages/ProductList";
import TransactionList from "../pages/TransactionList";
import Wallets from "../pages/Wallet";
import TransactionDetail from "../pages/TransactionDetail";
import SellerDetail from "../pages/SellerDetail";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ErrorPage from "../pages/ErrorPage";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";
import AuthGuard from "../utils/route-guard/AuthGuard";
import GuestGuard from "../utils/route-guard/GuestGuard";

function Router() {
  const routes = [
    {
      path: "/",
      element:
        <AuthGuard>
          <Layout />
        </AuthGuard>,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "product-list",
          element: <ProductList />,
        },
        {
          path: "simcards",
          element: <SimcardBooking />,
        },
        {
          path: "wallets",
          element: <Wallets />,
        },
        {
          path: "transaction-list",
          element: <TransactionList />,
        },
        {
          path: "transaction-detail",
          element: <TransactionDetail />,
        },
        {
          path: "attendees",
          element: <Attendees />,
        },
        {
          path: "speakers",
          element: <Speakers />,
        },
        {
          path: "vendors",
          element: <Vendors />,
        },
        {
          path: "exhibitors",
          element: <Exhibitors />,
        },
        {
          path: "conferences",
          element: <Conferences />,
        },
        {
          path: "themes",
          element: <Themes />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "seller-detail",
          element: <SellerDetail />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "profile-overview-1",
          element: <Profile />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/",
      element:
        <GuestGuard>
          <Auth />
        </GuestGuard>,
      children: [
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },]
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
