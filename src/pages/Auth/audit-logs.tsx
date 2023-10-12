import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import * as ApiService from "../../services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Notification, {
  NotificationElement,
} from "../../base-components/Notification";
import { useForm } from "react-hook-form";
import LoadingIcon from "../../base-components/LoadingIcon";

function Log() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteButtonRef = useRef(null);

  const [accessLogs, setAccessLogs] = useState([]);
  const [loading, isLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");

  // Success notification
  const notify = useRef<NotificationElement>();

  useEffect(() => {
    getAccessLogs();
  }, []);

  const getAccessLogs = async () => {
    const response = await ApiService.getAccessLogs();
    console.log(response);
    setAccessLogs(response);

    // let res = await ApiService.getAccessLogs();
    // setAccessLogs(res);//put here to fetch
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Access Logs</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div className="hidden mx-auto md:block text-slate-500"></div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  USER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">IP</Table.Th>
                {/* <Table.Th className="border-b-0 whitespace-nowrap">
                PLATFORM
              </Table.Th> */}
                <Table.Th className="border-b-0 whitespace-nowrap">
                  PHONE
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  DESCRIPTION
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  TIME
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {accessLogs.map((accessLog: any) => (
                <Table.Tr key={accessLog._id} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 mt-0.5">
                      {accessLog.user?.username}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 mt-0.5">{accessLog.ip}</div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 mt-0.5">
                      {accessLog.user?.phone}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 mt-0.5">
                      {accessLog.description}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 mt-0.5">
                      {accessLog.createdAt}
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
      </div>
    </>
  );
}

export default Log;
