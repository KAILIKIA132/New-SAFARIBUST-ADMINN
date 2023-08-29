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
import Notification, { NotificationElement } from "../../base-components/Notification";
import { useForm } from "react-hook-form";
import LoadingIcon from "../../base-components/LoadingIcon";
import TomSelect from "../../base-components/TomSelect";

function Role() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteButtonRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [groups] = useState(["Dashboard", "Feeds", "Resources", "Users", "Attendees", "Speakers", "Vendors", "Exhibitors", "Places", "Conferences", "Themes", "Tags", "Events", "Wallets", "Transactions", "Payments", "SIM Cards", "Mobility", "Wallets", "Roles & Permissions", "System Users", "Access Logs", "Change Password", "Security", "Privacy Policy"]);
  const [permissions] = useState(['create-feed', 'read-feed', 'update-feed', 'delete-feed', 'create-resource', 'read-resource', 'update-resource', 'delete-resource', 'create-user', 'read-user', 'update-user', 'delete-user', 'create-vendor', 'read-vendor', 'update-vendor', 'delete-vendor', 'create-speaker', 'read-speaker', 'update-speaker', 'delete-speaker', 'create-exhibitor', 'read-exhibitor', 'update-exhibitor', 'delete-exhibitor',  'create-place', 'read-place', 'update-place', 'delete-place', 'create-conference', 'read-conference', 'update-conference', 'delete-conference', 'create-theme', 'read-theme', 'update-theme', 'delete-theme', 'create-tag', 'read-tag', 'update-tag', 'delete-tag', 'create-event', 'read-event', 'update-event', 'delete-event', 'create-booking', 'read-booking', 'update-booking', 'cancel-booking', 'create-bus-schedule', 'read-bus-schedule', 'update-bus-schedule', 'delete-bus-schedule', 'manage-security-settings', 'update-policy']);
  const [selectGroup, setGroup] = useState([""]);
  const [selectPermission, setPermission] = useState([""]);
  const [recordId, setRecordId] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [loading, isLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");

  // Success notification
  const notify = useRef<NotificationElement>();
  const schema = yup
    .object({
      role: yup.string().required("Role is required")
    }).required();

  const {
    register,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    let res = await ApiService.getRoles();
    setRoles(res);
  };

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    if (result && !loading) {
      isLoading(true);
      try {
        const data = await getValues();
        data.permissions = selectPermission;
        data.groups = selectGroup;
        let res = await ApiService.createRole(data);
        getRoles();
        await reset();
        isLoading(false);
        setDialog(false);
        setSuccess(true);
        setMessage(res.message);
        notify.current?.showToast();
      } catch (error: any) {
        isLoading(false);
        setSuccess(false);
        setMessage(error.message);
        notify.current?.showToast();
      }
    }
  };

  const deleteRecord = async () => {
    isLoading(true);
    try {
      let res = await ApiService.deleteRole(recordId);
      getRoles();
      isLoading(false);
      setConfirmDelete(false);
      setSuccess(true);
      setMessage(res.message);
      notify.current?.showToast();
    } catch (error: any) {
      isLoading(false);
      setSuccess(false);
      setMessage(error.message);
      notify.current?.showToast();
    }
  };

  const editRecord = (record: any) => {
    setGroup(record.groups);
    setPermission(record.permissions);
    reset(record);
    setDialog(true);
  }

  const cancel = (record: any) => {
    setGroup([""]);
    setPermission([""]);
    reset(record);
    setDialog(false);
  }

  return (
    <>
      {dialog ? (
        <>
          <div className="flex items-center mt-8 intro-y">
            <a onClick={(event: React.MouseEvent) => { event.preventDefault(); reset({ name: "" }); setDialog(false); }} href="#">
              <Lucide icon="ArrowLeft" className="text-slate-400 mr-3" />
            </a>
            <h2 className="mr-auto text-lg font-medium">New Role</h2>
          </div>
          <br />
          <form className="mt-5 p-5 intro-y box validate-form" onSubmit={onSubmit}>
            <div>

              <a onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                setDialog(false);
              }}
                className="absolute top-0 right-0 mt-3 mr-3"
                href="#"
              >

              </a>
            </div>
            <div className="grid grid-cols-12 gap-4 gap-y-3">
              <div className="col-span-12 sm:col-span-12">
                <FormLabel>
                  Name
                </FormLabel>
                <FormInput
                  {...register("role")}
                  type="text"
                  name="role"
                  className={errors.name ? "border-danger" : ''}
                  placeholder="Admin"
                />
                {errors.role && (
                  <div className="mt-2 text-danger">
                    {typeof errors.role.message === "string" &&
                      errors.role.message}
                  </div>
                )}
              </div>
              <div className="col-span-12 sm:col-span-12">
                <FormLabel htmlFor="modal-form-6">
                  Groups
                </FormLabel>
                <TomSelect value={selectGroup} onChange={setGroup} options={{
                  placeholder: "Select groups",
                }} className="w-full" multiple>
                  {groups.map((group: any, index: any) => (
                    <option key={index} value={group}>{group}</option>
                  ))}
                </TomSelect>
              </div>
              <div className="col-span-12 sm:col-span-12">
                <FormLabel htmlFor="modal-form-6">
                  Permissions
                </FormLabel>
                <TomSelect value={selectPermission} onChange={setPermission} options={{
                  placeholder: "Select permissions",
                }} className="w-full" multiple>
                  {permissions.map((permission: any, index: any) => (
                    <option key={index} value={permission}>{permission}</option>
                  ))}
                </TomSelect>
              </div>
            </div>
            <div>
              <br />
              <Button type="button" variant="outline-secondary" onClick={() => cancel({ name: "" })}
                className="w-20 mr-1"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="w-20">
                Save
                {
                  loading && <LoadingIcon
                    icon="spinning-circles"
                    color="white"
                    className="w-4 h-4 ml-2"
                  />
                }
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="mt-10 text-lg font-medium intro-y">Roles</h2>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
              <Button
                variant="primary"
                className="mr-2 shadow-md"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  setDialog(true);
                }}
              >
                New Role
              </Button>

              <div className="hidden mx-auto md:block text-slate-500">

              </div>
            </div>
            {/* BEGIN: Data List */}
            <div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
              <Table className="border-spacing-y-[10px] border-separate -mt-2">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      ROLE
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      MODULES
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      PERMISSIONS
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      ACTIONS
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {roles.map((role: any, key) => (
                    <Table.Tr key={key} className="intro-x">
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <span className="font-medium whitespace-nowrap">
                          {role.role}
                        </span>
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {role.groups.map((group: any, key: any) => (
                          <Button key={key} size="sm" variant="outline-primary" className="mr-1 inline-block mt-1">
                            {group}
                          </Button>
                        ))}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {role.permissions.map((permission: any, key: any) => (
                          <Button key={key} size="sm" variant="outline-primary" className="mr-1 inline-block mt-1">
                            {permission}
                          </Button>
                        ))}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                        <div className="flex items-center justify-center">
                          {(role.role != "Admin" && role.role != "Speaker" && role.role != "Vendor" && role.role != "Attendee") &&
                            <Menu>
                              <Menu.Button as={Button} className="px-2 !box">
                                <span className="flex items-center justify-center w-5 h-5">
                                  <Lucide icon="MoreVertical" className="w-4 h-4" />
                                </span>
                              </Menu.Button>
                              <Menu.Items>
                                <Menu.Item onClick={() => editRecord(role)}>
                                  <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Edit
                                </Menu.Item>
                                <Menu.Item onClick={() => {
                                  setRecordId(role._id),
                                    setConfirmDelete(true);
                                }}>
                                  <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
                                </Menu.Item>
                              </Menu.Items>
                            </Menu>
                          }
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
            {/* END: Data List */}
          </div>
          <Dialog staticBackdrop size="lg" open={dialog} onClose={() => {
            setDialog(false);
          }}
          >
            <Dialog.Panel>

            </Dialog.Panel>
          </Dialog>
          {/* BEGIN: Delete Confirmation Modal */}
          <Dialog
            open={confirmDelete}
            onClose={() => {
              setConfirmDelete(false);
            }}
            initialFocus={deleteButtonRef}
          >
            <Dialog.Panel>
              <div className="p-5 text-center">
                <Lucide
                  icon="XCircle"
                  className="w-16 h-16 mx-auto mt-3 text-danger"
                />
                <div className="mt-5 text-3xl">Are you sure?</div>
                <div className="mt-2 text-slate-500">
                  Do you really want to delete this record? <br />
                  This process cannot be undone.
                </div>
              </div>
              <div className="px-5 pb-8 text-center">
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => {
                    setConfirmDelete(false);
                  }}
                  className="w-24 mr-1"
                >
                  Cancel
                </Button>
                <Button onClick={() => deleteRecord()}
                  variant="danger"
                  type="button"
                  className="w-24"
                  ref={deleteButtonRef}
                >
                  Delete
                </Button>
              </div>
            </Dialog.Panel>
          </Dialog>
          {/* END: Delete Confirmation Modal */}
          <Notification options={{ duration: 3000 }} getRef={(el) => { notify.current = el; }} className="flex">
            <Lucide icon={success ? "CheckCircle" : "XCircle"} className={success ? "text-success" : "text-danger"} />
            <div className="ml-4 mr-4">
              <div className="font-medium">{success ? "Success" : "Failed"}</div>
              <div className="mt-1 text-slate-500">
                {message}
              </div>
            </div>
          </Notification>
        </>
      )}
    </>
  );
}

export default Role;
