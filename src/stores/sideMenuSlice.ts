import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      title: "Dashboard",
      pathname: "/",
    },
    {
      icon: "Users",
      title: "Users",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/seller-list",
          title: "Attendees",
        },
        {
          icon: "Activity",
          pathname: "/users-layout-1",
          title: "Speakers",
        },
        {
          icon: "Activity",
          pathname: "/seller-list",
          title: "Vendors",
        },
      ],
    },

    {
      icon: "Calendar",
      title: "Events",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/categories",
          title: "Conferences",
        },
        {
          icon: "Activity",
          pathname: "/product-list",
          title: "Themes",
        },
        {
          icon: "Activity",
          pathname: "/categories",
          title: "Events",
        }
      ],
    },

    {
      icon: "CreditCard",
      title: "Payments",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/wallets",
          title: "Wallets",
        },
        {
          icon: "Activity",
          pathname: "/transaction-list",
          title: "Transactions",
        }
      ],
    },
    {
      icon: "PhoneCall",
      pathname: "/simcards",
      title: "Simcard Booking"
    },
    "divider",
    {
      icon: "Shield",
      title: "Security",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/roles-permissions",
          title: "Roles & Permissions",
        },
        {
          icon: "Activity",
          pathname: "/system-users",
          title: "System Users",
        },
        {
          icon: "Activity",
          pathname: "/access-logs",
          title: "Access Logs",
        },
        {
          icon: "Activity",
          pathname: "/change-password",
          title: "Change Password",
        },
      ],
    },

    {
      icon: "User",
      pathname: "/update-profile",
      title: "Profile",
    },
    {
      icon: "Power",
      pathname: "/signout",
      title: "Sign Out",
    }
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
