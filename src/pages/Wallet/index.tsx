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
import * as paymentService from "../../services/paymentService";


function Main() {
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] =
    useState(false);
  const [walletsData, setWalletsData] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = createRef();
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const initialFocusRef = React.useRef<HTMLElement | null>(null);
  const [wallets, setWallets] = useState([]);
  const [loading, isLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const [pagination, setPagination] = useState({ current_page: 1, total: 1, total_pages: 1, per_page: 1 });
  const [page, setPage] = useState(1);
  const [next_page, setNextPage] = useState(1);
  const [previous_page, setPreviousPage] = useState(1);
  useEffect(() => {
    getWallets();
  }, []);

  const getWallets = async () => {
    isLoading(true);
    try {
      let res = await paymentService.getWallets({ page: 1 });
      setWallets(res.wallets);
      isLoading(false);
      setNextPage((page < res.total_pages) ? page + 1 : res.total_pages);
      setPreviousPage((page > 1) ? page - 1 : 1);
      setPagination({ current_page: res.current_page, total: res.total, total_pages: res.total_pages, per_page: res.per_page });
    } catch (error) {
      isLoading(false);
      console.log("Error fetching bookings");
    }
  };

  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

  const handleDelete = (walletId: string) => {
    setSelectedWalletId(walletId);
    setDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmation = async () => {
    if (selectedWalletId) {
      try {
        await paymentService.deleteWallet(selectedWalletId);
        setWalletsData((prevWalletsData) =>
          prevWalletsData.filter((wallet) => wallet._id !== selectedWalletId)
        );

        setDeleteConfirmationModal(false);
        setSelectedWalletId(null);
      } catch (error) {
        console.log("Error deleting wallet:", error);
      }
    }
  };

  const handleWalletNameClick = async (id: string) => {
    setLoadingTransactions(true);
    try {
      const walletTransactions = await paymentService.getTransactionsByWalletId(id);
      setTransactions(walletTransactions.transactions);
      setLoadingTransactions(false);
    } catch (error) {
      setLoadingTransactions(false);
      console.log("Error fetching transactions for wallet:", error);
    }
  };
  const [selectedWallet, setSelectedTransaction] = useState(null);

  const renderAmountColumn = (transaction: any) => {
    if (transaction.vendorId === null && transaction.type === "Credit") {
      return (
        <>
          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-green-600">
            {transaction.amount}
          </Table.Td>
          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
            {'---'}
          </Table.Td>
        </>
      );
    } else if (transaction.vendorId != null &&  transaction.type === "Debit") {
      return (
        <>
          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
          {'---'}
          </Table.Td>
          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-red-600">
            {transaction.amount}
          </Table.Td>
        </>
      );
    }
    return null; // If transaction type is neither "credit" nor "debit", return null
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Wallets</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
         
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
                WALLET
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap text-center">
                BALANCE
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap text-center">
                ACTIONS
              </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            {wallets.map((wallet: any, key) => (
              <Table.Tr key={key} className="intro-x">
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  <FormCheck.Input type="checkbox" value={wallet._id} />
                </Table.Td>
                <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  <a
                    href=""
                    className="font-medium whitespace-nowrap"
                    onClick={(event) => {
                      event.preventDefault();
                      handleWalletNameClick(wallet._id);
                    }}
                  >
                    {wallet.userId.firstName + " " + wallet.userId.lastName}
                  </a>
                </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    <span className="flex items-center justify-center">{wallet.balance}</span>
                    </div>
                  </Table.Td>
                
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
              <div className="flex items-center justify-center">
                <a
                  className="flex items-center mr-3"
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedWalletId(wallet); 
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
                    handleDelete(wallet._id); 
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
            <Pagination.Link onClick={() => (setPage(previous_page), getWallets())} >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            {_.times(pagination.total_pages).map((page, key) => (
              page + 1 == pagination.current_page ? <Pagination.Link onClick={() => (setPage(page + 1), getWallets())} active key={key}>{page + 1}</Pagination.Link> : <Pagination.Link onClick={() => (setPage(page + 1), getWallets())} key={key}>{page + 1}</Pagination.Link>
            ))}
            <Pagination.Link onClick={() => (setPage(next_page), getWallets())} >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Transactions Table */}
      {transactions.length > 0 && (
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
          <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  <FormCheck.Input type="checkbox" />
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                 Reference
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Description
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Credit
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Debit
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Balance
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Status
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  Date
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {transactions.map((transaction: any, key) => (
                <Table.Tr key={key} className="intro-x">
                 <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                   <FormCheck.Input type="checkbox" value={transaction._id} />
                 </Table.Td>
                 <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                     {transaction.referenceCode}
                   </Table.Td>
                   <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                     {transaction.description}
                   </Table.Td>
                   {/* Credit Column */}
                   {renderAmountColumn(transaction)}
                   <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                     {transaction.balance}
                   </Table.Td>
                   {/* <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                   {transaction.vendorId.firstName + " " + transaction.vendorId.lastName}
                   </Table.Td> */}
                   <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                   {transaction.status}
                 </Table.Td>
                   <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                   {dayjs(transaction.createdAt).format('DD-MM-YYYY')}
                   </Table.Td>
                 </Table.Tr>
               ))}
             </Table.Tbody>
           </Table>
        </div>
      )}
      {/* END: Transactions Table */}
      
     {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
          setSelectedWalletId(null); 
        }}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
                setSelectedWalletId(null);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              onClick={handleDeleteConfirmation}>
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
