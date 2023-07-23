import _ from "lodash";
import React, { useState, useEffect, createRef } from 'react';
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import dayjs from "dayjs";
import "jspdf-autotable";
import * as simcardService from "../../services/simcardService";


interface SimCard {
  id: string;
  name: string;
  providerId: string;
  collectionPoint: string;
  userId: string;
  issueStatus: string;
  createdAt: string;
}

function Main() {
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] =
    useState(false);
  const [simCardsData, setSimCardsData] = useState<SimCard[]>([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = createRef();
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const initialFocusRef = React.useRef<HTMLElement | null>(null);


  const [pagination, setPagination] = useState({ current_page: 1, total: 1, total_pages: 1, per_page: 1 });
  const [page, setPage] = useState(1);
  const [next_page, setNextPage] = useState(1);
  const [previous_page, setPreviousPage] = useState(1);
  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    let res = await simcardService.getBookings({ page: 1 });
    setSimCardsData(res.bookings);
    setNextPage((page < res.total_pages) ? page + 1 : res.total_pages);
    setPreviousPage((page > 1) ? page - 1 : 1);
    setPagination({ current_page: res.current_page, total: res.total, total_pages: res.total_pages, per_page: res.per_page });
  };

  const [selectedSimCard, setSelectedSimCard] = useState<SimCard | null>(null);

  const handleViewDetails = (simCard: SimCard) => {
    setSelectedSimCard(simCard);
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Simcard Bookings</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md" onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            setSuperlargeModalSizePreview(true);
          }}>
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
            Showing {pagination.current_page + " to " + pagination.total_pages + " of " + pagination.total} entries
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
                  Name
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Simcard Provider
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Collection Point
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Issue Status
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Travel Date
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {simCardsData.map((simCard) => (
                <Table.Tr key={simCard.id} className="intro-y">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <FormCheck.Input type="checkbox" value={simCard.id} />
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
                    {dayjs(simCard.travelDate).format('DD-MM-YYYY')}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <a className="flex items-center mr-3" href="">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
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
            <Pagination.Link onClick={() => (setPage(previous_page), getBookings())} >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            {_.times(pagination.total_pages).map((page, key) => (
              page + 1 == pagination.current_page ? <Pagination.Link onClick={() => (setPage(page + 1), getBookings())} active key={key}>{page + 1}</Pagination.Link> : <Pagination.Link onClick={() => (setPage(page + 1), getBookings())} key={key}>{page + 1}</Pagination.Link>
            ))}
            <Pagination.Link onClick={() => (setPage(next_page), getBookings())} >
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
      {/* BEGIN: View Details Dialog */}
      <Dialog
        open={!!selectedSimCard}
        onClose={() => setSelectedSimCard(null)}
        initialFocus={initialFocusRef}
      >
        <Dialog.Panel>
          <div className="p-5">
            <h2 className="text-lg font-medium">User Details</h2>
            {selectedSimCard && (
              <div>
                <p>Name: {selectedSimCard.userId.firstName + " " + selectedSimCard.userId.lastName}</p>
                <p>Provider: {selectedSimCard.providerId.name}</p>
                <p>Collection Point: {selectedSimCard.collectionPoint}</p>
                <p>Issue Status: {selectedSimCard.issueStatus}</p>
                <p>Date Requested: {dayjs(selectedSimCard.createdAt).format("DD-MM-YYYY")}</p>
                {/* You can display more user details here as needed */}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: View Details Dialog */}

      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
      // initialFocus={deleteButtonRef}
      // initialFocus={initialFocusRef}
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
            // ref={deleteButtonRef}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
      <Dialog staticBackdrop size="lg" open={superlargeModalSizePreview} onClose={() => {
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
