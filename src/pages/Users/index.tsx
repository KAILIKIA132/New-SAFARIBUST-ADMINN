import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import * as ApiService from "../../services/auth";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total: 1, total_pages: 1, per_page: 1 });
  const [page, setPage] = useState(1);
  const [next_page, setNextPage] = useState(1);
  const [previous_page, setPreviousPage] = useState(1);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await ApiService.getUsers({ page: 1 });
    setUsers(res.users);
    setNextPage((page < res.total_pages) ? page + 1 : res.total_pages);
    setPreviousPage((page > 1) ? page - 1 : 1);
    setPagination({ current_page: res.current_page, total: res.total, total_pages: res.total_pages, per_page: res.per_page });
  };


  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">System Users</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md">
            New User
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Showing {pagination.current_page + " to " + pagination.total_pages + " of " + pagination.total} entries
          </div>
          <div className="flex items-center w-full mt-3 xl:w-auto xl:mt-0">
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
            <FormSelect className="w-56 ml-2 xl:w-auto !box">
              <option>Status</option>
              <option>Verified</option>
              <option>Not Verified</option>
            </FormSelect>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  <FormCheck.Input type="checkbox" />
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  USER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  EMAIL
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  PHONE
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  GENDER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  COUNTRY
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.map((user, key) => (
                <Table.Tr key={key} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <FormCheck.Input type="checkbox" />
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md !py-3.5 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center">
                      <div className="w-9 h-9 image-fit zoom-in">
                        <Tippy
                          as="img"
                          alt="Midone - HTML Admin Template"
                          className="border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          src={user.profileImage}
                          content={user.firstName + " " + user.lastName}
                        />
                      </div>
                      <div className="ml-4">
                        <a href="" className="font-medium whitespace-nowrap">
                          {user.firstName + " " + user.lastName}
                        </a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {user.role.role}
                        </div>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md capitalize bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {user.email}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md capitalize bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {user.phoneNumber}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md capitalize bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {user.gender}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md capitalize bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {user.country}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center",
                        { "text-success": user.verified },
                        { "text-danger": !user.verified },
                      ])}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {user.verified ? "Verified" : "Not Verified"}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <Menu>
                        <Menu.Button as={Button} className="px-2 !box">
                          <span className="flex items-center justify-center w-5 h-5">
                            <Lucide icon="MoreVertical" className="w-4 h-4" />
                          </span>
                        </Menu.Button>
                        <Menu.Items className="w-40">
                          <Menu.Item>
                            <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Edit
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="View" className="w-4 h-4 mr-2" /> Profile
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="UserCheck" className="w-4 h-4 mr-2" /> Activate
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Email Credentials
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link onClick={() => (setPage(previous_page), getUsers())} >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            {_.times(pagination.total_pages).map((page, key) => (
              page + 1 == pagination.current_page ? <Pagination.Link onClick={() => (setPage(page + 1), getUsers())} active key={key}>{page + 1}</Pagination.Link> : <Pagination.Link onClick={() => (setPage(page + 1), getUsers())} key={key}>{page + 1}</Pagination.Link>
            ))}
            <Pagination.Link onClick={() => (setPage(next_page), getUsers())} >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
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
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
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
    </>
  );
}

export default Main;
