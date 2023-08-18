import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";
import { Car } from 'lucide-react';


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
      pathname: "/accounts",
      title: "Accounts",
    },
    
    
    {
        icon: "Users",
        title: "Policy",
        subMenu: [
          {
            icon: "Activity",
            pathname: "/policy",
            title: "New Policy",
          },
        
          {
            icon: "Activity",
            pathname: "/extension",
            title: "Policy Extensions",
          },
          // {
          //   icon: "Activity",
          //   pathname: "/financiers",
          //   title: "Financiers",
          // },
          
          
          
        ]},


        {
          icon: "Activity",
          pathname: "/quotes",
          title: "Quotes",
        },
    // {
    //   icon: "Users",
    //   title: "Users",
    //   subMenu: [
    //     {
    //       icon: "Activity",
    //       pathname: "/attendees",
    //       title: "Attendees",
    //     },
       
    //     {
    //       icon: "Activity",
    //       pathname: "/speakers",
    //       title: "Speakers",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/vendors",
    //       title: "Vendors",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/exhibitors",
    //       title: "Exhibitors",
    //     },
    //   ],
    // },

    // {
    //   icon: "Calendar",
    //   title: "Events",
    //   subMenu: [
    //     {
    //       icon: "Activity",
    //       pathname: "/conferences",
    //       title: "Conferences",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/themes",
    //       title: "Themes",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/events",
    //       title: "Events",
    //     }
    //   ],
    // },
    {
      icon: "Users",
      title: "Vehicle",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/Vehicle",
          title: "Vehicle",
        },
        {
          icon: "Activity",
          pathname: "/documents",
          title: "Documents",
        },
        {
          icon: "Activity",
          pathname: "/securityFeature",
          title: "Security Feature",
        },
        {
          icon: "Activity",
          pathname: "/financiers",
          title: "Financiers",
        },
        
        
        
      ]},
    // {
    //   icon: "CreditCard",
    //   title: "Payments",
    //   subMenu: [
    //     {
    //       icon: "Activity",
    //       pathname: "/wallets",
    //       title: "Wallets",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/transaction-list",
    //       title: "Transactions",
    //     }
    //   ],
    // },
    // 
    // {
    //   icon: "PhoneCall",
    //   pathname: "/simcards",
    //   title: "Simcard Booking"
    // },
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
          pathname: "/users",
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
