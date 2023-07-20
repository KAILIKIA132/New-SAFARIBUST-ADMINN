// PDFTable.tsx
import React from "react";

interface PDFTableProps {
  data: {
    id: string;
    name: string;
    providerName: string;
    collectionPoint: string;
    issueStatus: string;
    createdAt: string;
  }[];
}

const PDFTable: React.FC<PDFTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Provider Name</th>
          <th>Collection Point</th>
          <th>Issue Status</th>
          <th>Date Requested</th>
        </tr>
      </thead>
      <tbody>
        {data.map((simCard) => (
          <tr key={simCard.id}>
            <td>{simCard.id}</td>
            <td>{simCard.name}</td>
            <td>{simCard.providerName}</td>
            <td>{simCard.collectionPoint}</td>
            <td>{simCard.issueStatus}</td>
            <td>{simCard.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PDFTable;
