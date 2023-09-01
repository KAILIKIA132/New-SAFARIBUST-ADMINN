// utils/export.js
import * as ExcelJS from "exceljs";
import jsPDF from "jspdf";
import 'jspdf-autotable';

export const exportToExcel = (data: any, filename: any) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet");
console.log(data);
  // Extract headers from the first data item
  const headers = Object.keys(data[0]);
  // Add headers
  worksheet.addRow(headers);
  // Add data
  data.forEach((item: any) => {
    const row = headers.map((header) => item[header]);
    worksheet.addRow(row);
  });
  // Generate and save the Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${filename}.xlsx`;
    link.click();
  });
}

export const exportToPDF = (data: any[], filename: string) => {
  const doc = new jsPDF('landscape');
  // Setting font style for table content
  doc.setFont('helvetica', 'normal').setFontSize(12);
  // Extract headers from the data item
  const headers = Object.keys(data[0]);
  const headerRow = headers.map((header) => ({ content: header }));
  // Create data rows
  const tableData = data.map((item: any) =>
    headers.map((header) => ({ content: `${item[header]}` }))
  );
  const columnStyles: Record<string, { cellWidth: number }> = {};
  headers.forEach((header, index) => {
    const headerLength = header.length;
    columnStyles[index] = { cellWidth: Math.max(30, headerLength * 1) };
  });
  // Add content to PDF as a table
  (doc as any).autoTable({
    head: [headerRow],
    body: tableData,
    startY: 20,
    theme: 'grid',
    columnStyles: columnStyles,
    margin: { top: 10 },
  });
  doc.save(`${filename}.pdf`);
};

