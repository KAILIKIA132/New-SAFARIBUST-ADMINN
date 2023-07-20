import { useRoutes } from "react-router-dom";
import Layout from "../layouts";
import Dashboard from "../pages/Dashboard";
import SimcardBooking from "../pages/SimcardBooking";
import Categories from "../pages/Categories";
import ProductList from "../pages/ProductList";
import TransactionList from "../pages/TransactionList";
import Wallets from "../pages/Wallet";
import TransactionDetail from "../pages/TransactionDetail";
import SellerList from "../pages/SellerList";
import SellerDetail from "../pages/SellerDetail";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
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
          path: "seller-list",
          element: <SellerList />,
        },
        {
          path: "seller-detail",
          element: <SellerDetail />,
        },
        {
          path: "users-layout-1",
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
      path: "/login",
      element:
        <GuestGuard>
          <Login />
        </GuestGuard>,
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
