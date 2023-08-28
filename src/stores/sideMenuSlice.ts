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
   

    // {
    //   icon: "Users",
    //   pathname: "/accounts",
    //   title: "Accounts",
    // },
    // {
    //   icon: "Users",
    //   pathname: "/accountDetails",
    //   title: "Account Details",
    // },
    
    
    {
        icon: "FileCheck",
        title: "Policy",
        subMenu: [
          {
            icon: "Activity",
            pathname: "/policy",
            title: "Active Policy",
          },
        
          {
            icon: "Activity",
            pathname: "/extension",
            title: "Inactive Policy",
          },
        
          
          
          
        ]},
        {
          icon: "BaggageClaim",
          title: "Claims",
          subMenu: [
            {
              icon: "Activity",
              pathname: "/active",
              title: "Active Claims",
            },
          
            {
              icon: "Activity",
              pathname: "/pendingClaim",
              title: "Paid Claims",
            },
            {
              icon: "Activity",
              pathname: "/rejectedClaim",
              title: "Rejected Claims",
            },
            
            
            
          ]},
  

       

        {
          icon: "Umbrella",
          title: "Quotes",
          subMenu: [
            {
              icon: "Activity",
              pathname: "/quotes",
              title: "Private Comprehensive Cover",
            },
            {
              icon: "Activity",
              pathname: "/Autocorrect",
              title: "Autocorrect Cover",
            },
            {
              icon: "Activity",
              pathname: "/Thirdparty",
              title: "Third Party Cover",
            },
            {
              icon: "Activity",
              pathname: "/Theft",
              title: "Third Party Fire and Theft",
            },


            
            
          ]},



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
     
      icon: "Info",
      title: "Contents",
      subMenu: [
     {
      icon: "Activity",
      pathname: "/Contents",
      title: "Product Offers",
    },
    {
      icon: "Activity",
      pathname: "/CoversFAQs",
      title: "Covers FAQs",
    },
    
  ]},
    {
      icon: "Car",
      title: "Vehicle",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/Vehicle",
          title: "Vehicle Make",
        },
        {
          icon: "Activity",
          pathname: "/model",
          title: "Vehicle Model",
        },
        {
          icon: "Activity",
          pathname: "/valuers",
          title: "Valuers",
        },
        
        // {
        //   icon: "Activity",
        //   pathname: "/documents",
        //   title: "Documents Types",
        // },
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
