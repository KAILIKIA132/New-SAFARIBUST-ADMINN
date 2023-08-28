import _ from "lodash";
import { useEffect, useState } from "react";
import {
  FormInput,
  FormLabel,
  FormSwitch,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { useLocation } from "react-router-dom";
import * as ApiService from "../../services/auth";

function Profile() {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      let res = await ApiService.getUser(location.state.id);
      setUser(res);
    } catch (error) {
      console.log("Error fetching user");
    }
  };
  return (
    <div className="mt-5 intro-y box">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="mr-auto text-base font-medium">
          Personal Information
        </h2>
      </div>
      {user && <>
        <div className="px-5 pt-5 mt-5 flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
          <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
            <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
              <img
                alt=""
                className="rounded-full"
                src={user.profileImage}
              />
              <div className="absolute bottom-0 right-0 flex items-center justify-center p-2 mb-1 mr-1 rounded-full bg-primary">
                <Lucide icon="Camera" className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="ml-5">
              <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-slate-500">{user.position}</div>
              <div className="text-slate-500">{user.organization}</div>
            </div>
          </div>
          <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
            <div className="font-medium text-center lg:text-left lg:mt-3">
              Contact Details
            </div>
            <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
              <a href={user.linkedin} target="_blank" className="flex items-center truncate sm:whitespace-normal">
                <Lucide icon="Linkedin" className="w-4 h-4 mr-2" /> Linkedin
              </a>
              <a href={user.twitter} target="_blank" className="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Twitter" className="w-4 h-4 mr-2" /> Twitter
              </a>
              <a href={user.facebook} target="_blank" className="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Facebook" className="w-4 h-4 mr-2" /> Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-12 gap-x-5">
            <div className="col-span-12 xl:col-span-6">
              <div>
                <FormLabel htmlFor="update-profile-form-6">Email</FormLabel>
                <FormInput
                  id="update-profile-form-6"
                  type="text"
                  placeholder="Input text"
                  value={user.email}
                  disabled
                />
              </div>
              <div className="mt-3">
                <FormLabel htmlFor="update-profile-form-9">
                  Country
                </FormLabel>
                <FormInput
                  id="update-profile-form-9"
                  type="text"
                  placeholder=""
                  value={user.country}
                  disabled
                />
              </div>
            </div>
            <div className="col-span-12 xl:col-span-6">
              <div className="mt-3 xl:mt-0">
                <FormLabel htmlFor="update-profile-form-10">
                  Phone Number
                </FormLabel>
                <FormInput
                  id="update-profile-form-10"
                  type="text"
                  placeholder="Phone number"
                  value={user.phoneNumber}
                  disabled
                />
              </div>
              <div className="mt-3">
                <FormLabel htmlFor="update-profile-form-11">
                  City
                </FormLabel>
                <FormInput
                  id="update-profile-form-11"
                  type="text"
                  placeholder="City"
                  value={user.city}
                  disabled
                />
              </div>

            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center">
            <div className="pl-4 border-l-2 border-primary dark:border-primary">
              <a href="" className="font-medium">
                Verified
              </a>
              <div className="text-slate-500">Verified and approved</div>
            </div>
            <FormSwitch className="ml-auto">
              <FormSwitch.Input type="checkbox" checked={user.verified} />
            </FormSwitch>
          </div>
          <div className="flex items-center mt-5">
            <div className="pl-4 border-l-2 border-primary dark:border-primary">
              <a href="" className="font-medium">
                KYC Documents
              </a>
              <div className="text-slate-500">Provided KYC Documents</div>
            </div>
            <FormSwitch className="ml-auto">
              <FormSwitch.Input type="checkbox" checked={user.iskyc} />
            </FormSwitch>
          </div>
          <div className="flex items-center mt-5">
            <div className="pl-4 border-l-2 border-primary dark:border-primary">
              <a href="" className="font-medium">
                Changed Password
              </a>
              <div className="text-slate-500">Initial password has been changed</div>
            </div>
            <FormSwitch className="ml-auto">
              <FormSwitch.Input type="checkbox" checked={user.isPasswordChanged} />
            </FormSwitch>
          </div>
        </div>
        <div className="p-5">
          {user?.interests.map((interest: any, key: any) => (
            <span key={key} className="px-2 py-1 mr-1 text-xs border rounded border-primary text-primary dark:border-primary">
              {interest.name}
            </span>
          ))}
        </div>
      </>
      }
    </div>
  );
}

export default Profile;
