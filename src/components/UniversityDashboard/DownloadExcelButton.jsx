import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DownloadButton = ({ data, fileName = "University_Programs" }) => {
  const handleDownload = () => {
    if (!data || !data.length) return;

    const formattedData = data.map((row, index) => ({
      "S.No": index + 1,
      "University Name": row.university,
      "Program(s)": row.programs,
      "Batch": row.batch,
      "Issues / Challenges": row.issues,
      "Proposed Action": row.proposedAction,
      "Responsible Person": row.responsiblePerson,
      "Deadline": row.deadline
        ? new Date(row.deadline).toLocaleDateString()
        : "",
      "Key Update": row.keyUpdates,
      "Status": row.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Programs");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, `${fileName}_${Date.now()}.xlsx`);
  };

  return (
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      sx={{
        height: 40,
        minWidth: 120,
        textTransform: "none",
        fontWeight: 500,
        borderRadius: 2,
        backgroundColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
      }}
      disabled={!data || data.length === 0}
    >
      Download
    </Button>
  );
};

export default DownloadButton;
