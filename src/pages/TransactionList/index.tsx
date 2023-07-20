import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import Button from "../../base-components/Button";
import Pagination from "../../components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Transaction {
  id: string;
  name: string;
  amount: string;
  type: string;
  referenceCode: string;
  status: string;
  createdAt: string;
}

function Main() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = createRef();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [referenceCodeFilter, setReferenceCodeFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8082/wallet-transactions").then(
      (response) => {
        setTransactionsData(response.data);
        console.log(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleExportExcel = () => {
    axios.get("http://localhost:8082/wallet-transactions").then((response) => {
      const data = response.data;

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const fileName = "transactions-list.xlsx";

      const excelBuffer = XLSX.write(workbook, { type: "array" });
      const excelBlob = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(excelBlob, fileName);
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF() as any;
    doc.autoTable({
      head: [
        ["Name", "Amount", "Type", "Reference Code", "Status", "Date"],
      ],
      body: transactionsData.map((Transaction) => [
        Transaction.name,
        Transaction.amount,
        Transaction.type,
        Transaction.referenceCode,
        Transaction.status,
        dayjs(Transaction.createdAt).format("DD-MM-YYYY"),
      ]),
    });
    doc.save("transactions-list.pdf");
  };

  const totalPages = Math.ceil(transactionsData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | null
  >(null);

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

 useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axios
      .get("http://localhost:8082/wallet-transactions", {
        params: {
          name: nameFilter,
          status: statusFilter,
          type: typeFilter,
          referenceCode: referenceCodeFilter,
        },
      })
      .then((response) => {
        setTransactionsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    fetchTransactions();
  };

  const handleClearSearch = () => {
    setNameFilter("");
    setStatusFilter("");
    setTypeFilter("");
    setReferenceCodeFilter("");
    fetchTransactions();
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Transactions List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
          <div className="flex w-full sm:w-auto">
            <div className="relative w-48 text-slate-500">
              <FormInput
                type="text"
                className="w-48 pr-10 !box"
                placeholder="Search by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
            <FormSelect
              className="ml-2 !box"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
              <option value="Failed">Failed</option>
            </FormSelect>
          </div>
          <div className="hidden mx-auto xl:block text-slate-500">
            {`Showing ${indexOfFirstItem + 1} to ${
              indexOfLastItem > transactionsData.length
                ? transactionsData.length
                : indexOfLastItem
            } of ${transactionsData.length} entries`}
          </div>
          <div className="flex items-center w-full mt-3 xl:w-auto xl:mt-0">
            <Button
              variant="primary"
              className="mr-2 shadow-md"
              onClick={handleSearch}
            >
              <Lucide icon="Filter" className="w-4 h-4 mr-1" />
              Search
            </Button>
            <Button
              variant="outline-secondary"
              className="shadow-md"
              onClick={handleClearSearch}
            >
              <Lucide icon="XCircle" className="w-4 h-4 mr-1" />
              Clear
            </Button>
          {/* <div className="flex items-center w-full mt-3 xl:w-auto xl:mt-0"> */}
            {/* Export to Excel Button */}
            <Button variant="primary" className="mr-2 shadow-md" onClick={handleExportExcel}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to Excel
            </Button>
            {/* Export to PDF Button */}
            <Button variant="primary" className="mr-2 shadow-md" onClick={exportToPDF}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to PDF
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
                Name
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap">
                Amount
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap">
                Type
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap">
                Reference Code
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap">
                Status
              </Table.Th>
              <Table.Th className="border-b-0 whitespace-nowrap">
                Date 
              </Table.Th>
              <Table.Th className="text-center border-b-0 whitespace-nowrap">
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {currentItems.map((transaction) => (
                <Table.Tr key={transaction.id} className="intro-y">
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <FormCheck.Input type="checkbox" value={transaction.id} />
                </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 !py-4 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {transaction.name}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {transaction.amount}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {transaction.type}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {transaction.referenceCode}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {transaction.status}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    { dayjs(transaction.createdAt).format('DD-MM-YYYY')}  
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 text-right bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  <div className="pr-16">
                    <Button
                      variant="primary"
                      onClick={() => handleViewDetails(transaction)}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="col-span-12 mt-5">
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </div>
        {/* END: Pagination */}
      </div>
        {/* BEGIN: View Details Dialog */}
        <Dialog
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        initialFocus={null}
      >
        <Dialog.Panel>
          <div className="p-5">
            <h2 className="text-lg font-medium">Transaction Details</h2>
            {selectedTransaction && (
              <div>
                <p>Name: {selectedTransaction.name}</p>
                <p>Amount: {selectedTransaction.amount}</p>
                <p>Type: {selectedTransaction.type}</p>
                <p>Reference Code: {selectedTransaction.referenceCode}</p>
                <p>Status: {selectedTransaction.status}</p>
                <p>Date: {dayjs(selectedTransaction.createdAt).format("DD-MM-YYYY")}</p>
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
