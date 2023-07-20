import _ from "lodash";
import clsx from "clsx";
import {
  FormEvent,
  useState,
  useEffect,
  createRef,
  useRef, // Add this import
} from "react";
import axios from "axios";
import Button from "../../base-components/Button";
import Pagination from "../../components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { renderToStaticMarkup } from "react-dom/server";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import * from 'jspdf';


interface Wallet {
    id: string;
  name: string;
  balance: string;
  
}

const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
    },
  });

function Main() {
    const [walletsData, setWalletsData] = useState<Wallet[]>([]);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const deleteButtonRef = createRef();
    let [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    useEffect(() => {
      axios.get("http://localhost:8082/wallets").then(
        (response) => {
          setWalletsData(response.data);
          console.log(response.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }, []);

    const handleExportExcel = () => {
        axios.get("http://localhost:8082/wallets").then((response) => {
          const data = response.data;
    
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
          const fileName = "wallets.xlsx";
    
          const excelBuffer = XLSX.write(workbook, { type: "array" });
          const excelBlob = new Blob([excelBuffer], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(excelBlob, fileName);
        });
      };

      const exportToPDF = () => {
        // const doc = new jsPDF();
        const doc = new jsPDF() as any;
        doc.autoTable({
          head: [["Wallet ID", "Name", "Balance"]],
          body: walletsData.map((wallet) => [
            wallet.id,
            wallet.name,
            wallet.balance,
          ]),
        });
        doc.save("wallets.pdf");
      };

    const totalPages = Math.ceil(walletsData.length / itemsPerPage);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = walletsData.slice(indexOfFirstItem, indexOfLastItem);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

    const handleViewDetails = (wallet: Wallet) => {
      setSelectedWallet(wallet);
    };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Wallets</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
          <div className="flex w-full sm:w-auto">
            <div className="relative w-48 text-slate-500">
              <FormInput
                type="text"
                className="w-48 pr-10 !box"
                placeholder="Search by name..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
          <div className="hidden mx-auto xl:block text-slate-500">
          {`Showing ${indexOfFirstItem + 1} to ${
          indexOfLastItem > walletsData.length
            ? walletsData.length
            : indexOfLastItem
        } of ${walletsData.length} entries`}
          </div>
          <div className="flex items-center w-full mt-3 xl:w-auto xl:mt-0">
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
                Wallet Balance
              </Table.Th>
              <Table.Th className="text-center border-b-0 whitespace-nowrap">
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {currentItems.map((wallet) => (
                <Table.Tr key={wallet.id} className="intro-y">
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <FormCheck.Input type="checkbox" value={wallet.id} />
                </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 !py-4 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {wallet.name}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {wallet.balance}
                  </Table.Td>
                  
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 text-right bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  <div className="pr-16">
                    <Button
                      variant="primary"
                      onClick={() => handleViewDetails(wallet)}
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
        open={!!selectedWallet}
        onClose={() => setSelectedWallet(null)}
        initialFocus={null}
      >
        <Dialog.Panel>
          <div className="p-5">
            <h2 className="text-lg font-medium">Wallet Details</h2>
            {selectedWallet && (
              <div>
                <p>ID: {selectedWallet.id}</p>
                <p>Name: {selectedWallet.name}</p>
                <p>Balance: {selectedWallet.balance}</p>
                {/* You can display more wallet details here as needed */}
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
