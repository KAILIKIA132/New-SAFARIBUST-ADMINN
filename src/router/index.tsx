import { useRoutes } from "react-router-dom";
import Layout from "../layouts";
import DashboardOverview4 from "../pages/DashboardOverview4";
import Categories from "../pages/Categories";
import ProductList from "../pages/ProductList";
import TransactionList from "../pages/TransactionList";
import TransactionDetail from "../pages/TransactionDetail";
import SellerList from "../pages/SellerList";
import SellerDetail from "../pages/SellerDetail";
import UsersLayout1 from "../pages/UsersLayout1";
import ProfileOverview1 from "../pages/ProfileOverview1";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <DashboardOverview4 />,
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
          element: <UsersLayout1 />,
        },
        {
          path: "profile-overview-1",
          element: <ProfileOverview1 />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
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
