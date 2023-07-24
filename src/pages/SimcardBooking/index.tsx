import _ from "lodash";
import React, { useState, useEffect, createRef } from "react";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import {
  FormCheck,
  FormInput,
  FormLabel,
  FormSelect,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import dayjs from "dayjs";
import "jspdf-autotable";
import * as simcardService from "../../services/simcardService";
import { useForm } from "react-hook-form";
import LoadingIcon from "../../base-components/LoadingIcon";

function Main() {
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] =
    useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = createRef();
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const initialFocusRef = React.useRef<HTMLElement | null>(null);
  const [loading, isLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const { handleSubmit, register } = useForm();
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editedSimCard, setEditedSimCard] = useState(null);

  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 1,
    total_pages: 1,
    per_page: 1,
  });
  const [page, setPage] = useState(1);
  const [next_page, setNextPage] = useState(1);
  const [previous_page, setPreviousPage] = useState(1);
  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    isLoading(true);
    try {
      let res = await simcardService.getBookings({ page: 1 });
      setBookings(res.bookings);
      isLoading(false);
      setNextPage(page < res.total_pages ? page + 1 : res.total_pages);
      setPreviousPage(page > 1 ? page - 1 : 1);
      setPagination({
        current_page: res.current_page,
        total: res.total,
        total_pages: res.total_pages,
        per_page: res.per_page,
      });
    } catch (error) {
      isLoading(false);
      console.log("Error fetching bookings");
    }
  };

  const [selectedSimCardId, setSelectedSimCardId] = useState<string | null>(
    null
  );

  const handleDelete = (simCardId: string) => {
    setSelectedSimCardId(simCardId);
    setDeleteConfirmationModal(true);
  };

  const handleEdit = (simCard: any) => {
    setEditedSimCard(simCard);
    setEditDialogVisible(true);
  };
  const handleUpdateBooking = async (data: any) => {
    if (editedSimCard) {
      try {
        const updatedSimCard = { ...editedSimCard, ...data };
        await simcardService.updateBooking(editedSimCard._id, updatedSimCard);

        getBookings();

        setEditDialogVisible(false);
        setEditedSimCard(null);
      } catch (error) {
        console.log("Error updating sim card:", error);
      }
    }
  };

  const handleDeleteConfirmation = async () => {
    if (selectedSimCardId) {
      try {
        await simcardService.deleteBooking(selectedSimCardId);
        setBookings((prevBookings) =>
          prevBookings.filter((simCard) => simCard._id !== selectedSimCardId)
        );

        setDeleteConfirmationModal(false);
        setSelectedSimCardId(null);
      } catch (error) {
        console.log("Error deleting sim card:", error);
      }
    }
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Simcard Bookings</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              setSuperlargeModalSizePreview(true);
            }}
          >
            Update Booking
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
            Showing{" "}
            {pagination.current_page +
              " to " +
              pagination.total_pages +
              " of " +
              pagination.total}{" "}
            entries
          </div>
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
                  <FormCheck.Input type="checkbox" />
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  NAME
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  PROVIDER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  COLLECTION POINT
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  ISSUE STATUS
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  TRAVEL DATE
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {bookings.map((simCard: any, key) => (
                <Table.Tr key={key} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <FormCheck.Input type="checkbox" value={simCard._id} />
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 !py-4 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {simCard.userId.firstName + " " + simCard.userId.lastName}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {simCard.provider}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {simCard.collectionPoint}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 text-xs  mt-0.5">
                      {simCard.issueStatus}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {dayjs(simCard.travelDate).format("DD-MM-YYYY")}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <a
                        className="flex items-center mr-3"
                        href=""
                        onClick={(event) => {
                          event.preventDefault();
                          handleEdit(simCard);
                        }}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handleDelete(simCard._id);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
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
            <Pagination.Link
              onClick={() => (setPage(previous_page), getBookings())}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            {_.times(pagination.total_pages).map((page, key) =>
              page + 1 == pagination.current_page ? (
                <Pagination.Link
                  onClick={() => (setPage(page + 1), getBookings())}
                  active
                  key={key}
                >
                  {page + 1}
                </Pagination.Link>
              ) : (
                <Pagination.Link
                  onClick={() => (setPage(page + 1), getBookings())}
                  key={key}
                >
                  {page + 1}
                </Pagination.Link>
              )
            )}
            <Pagination.Link
              onClick={() => (setPage(next_page), getBookings())}
            >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
        </div>
        {/* END: Pagination */}
      </div>
      {/* Edit Dialog */}
      {editedSimCard && (
        <Dialog
          open={editDialogVisible}
          onClose={() => setEditDialogVisible(false)}
        >
          <Dialog.Panel>
            <form onSubmit={handleSubmit(handleUpdateBooking)}>
              <div className="p-5">
                {/* Form fields for editing simcard details*/}
                <FormLabel>First Name</FormLabel>
                <FormInput
                  type="text"
                  {...register("firstName", { required: true })}
                  defaultValue={editedSimCard.userId.firstName} // Example, replace with actual data
                />
                <FormLabel>Last Name</FormLabel>
                <FormInput
                  type="text"
                  {...register("lastName", { required: true })}
                  defaultValue={editedSimCard.userId.lastName} // Example, replace with actual data
                />
                <FormSelect
                  {...register("provider", { required: true })}
                  defaultValue={editedSimCard.provider}
                >
                  <option value="">Select</option>
                  <option value="Safaricom">Safaricom</option>
                  <option value="Telcom">Telcom</option>
                  <option value="Airtel">Airtel Ke</option>
                </FormSelect>
                <FormLabel>Collection Point</FormLabel>
                <FormInput
                  type="text"
                  {...register("collectionPoint", { required: true })}
                  defaultValue={editedSimCard.collectionPoint} // Example, replace with actual data
                />
                <FormLabel>Issue Status</FormLabel>
                <FormSelect
                  {...register("issueStatus", { required: true })}
                  defaultValue={editedSimCard.issueStatus}
                >
                  <option value="">Select</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Collected">Collected</option>
                </FormSelect>

                {/* Add other form fields here for other simcard details */}
              </div>
              <div className="px-5 pb-8 text-center">
                <Button type="submit" variant="primary" className="w-24">
                  Save
                </Button>
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => {
                    setEditDialogVisible(false);
                    setEditedSimCard(null);
                  }}
                  className="w-24 ml-2"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      )}

      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
          setSelectedSimCardId(null);
        }}
      >
        <Dialog.Panel>
          <div className="p-5 text-center"></div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
                setSelectedSimCardId(null);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              onClick={handleDeleteConfirmation}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
      <Dialog
        staticBackdrop
        size="lg"
        open={superlargeModalSizePreview}
        onClose={() => {
          setSuperlargeModalSizePreview(false);
        }}
      >
        <Dialog.Panel className="p-10 text-center">
          This is totally awesome superlarge modal!
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
