import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import CreateUniversityList from './CreateUniversityList';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSingle from './DeleteSingle';
import StatusChip from './SatusChip';
import DateFilter from './DateFilter';
import API from "../api/api";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";
import DownloadExcelButton from "./DownloadExcelButton";




const stickyLeftHeader = {
  position: 'sticky',
  left: 0,
  zIndex: 5,
  backgroundColor: '#f9fafb',
  borderRight: '1px solid #e0e0e0',
};

const stickyLeftCell = {
  position: 'sticky',
  left: 0,
  zIndex: 3,
  backgroundColor: '#fff',
  borderRight: '1px solid #e0e0e0',
};

const stickyRightHeader = {
  position: 'sticky',
  right: 0,
  zIndex: 5,
  backgroundColor: '#f9fafb',
  borderLeft: '1px solid #e0e0e0',
};

const stickyRightCell = {
  position: 'sticky',
  right: 0,
  zIndex: 3,
  backgroundColor: '#fff',
  borderLeft: '1px solid #e0e0e0',
};

const stickyCheckbox = {
  position: 'sticky',
  left: 0,
  zIndex: 4,
  backgroundColor: '#fff',
};

const stickyUniversity = {
  position: 'sticky',
  left: 56,
  zIndex: 3,
  backgroundColor: '#fff',
};

const headerStyle = {
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

console.log("UniversityList mounted");

const UniversityList = () => {
  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [mode, setMode] = useState("create");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [deleteId, setDeleteId] = useState(null);




  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Fetching programs with token:", localStorage.getItem("token"));

      const response = await API.get("/programs");
      console.log("API response:", response.data);

      const rows = response.data?.data || response.data || [];
      setData(rows);
    } catch (error) {
      console.error(
        "Failed to fetch programs:",
        error.response?.status,
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchData();
  }, []);

  const handleCreate = () => {
    setMode("create");
    setSelectedRow(null);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setMode("edit");
    setSelectedRow(row);
    setOpenForm(true);
  };


  const handleOpenDelete = (row) => {
    setDeleteId(row._id);
    setOpenDelete(true);
  };

  const handleMultiDelete = () => {
    setDeleteId(selected[0]);
    setOpenDelete(true);
  };


  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRow(null);
  };

  const isSelected = (id) => selected.includes(id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const fetchPrograms = async (filters = {}) => {
    try {
      setLoading(true);

      let response;
      if (!filters.dateFilter || filters.dateFilter === "all") {
        response = await API.get("/programs");
      }
      else {
        response = await API.get("/programs", {
          params: filters
        });
      }

      const rows = response.data?.data || response.data || [];
      setData(rows);

    } catch (error) {
      console.error("Filter fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >

          <Box display="flex" gap={2}>

          </Box>

          <Box display="flex" gap={2} alignItems="center">
            <DateFilter onFilterChange={fetchPrograms} />
            <DownloadExcelButton data={data} />


            {selected.length > 1 && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={handleMultiDelete}
                sx={{
                  height: 40,
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Delete ({selected.length})
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                height: 40,
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Add Program
            </Button>
          </Box>

        </Box>


        <CreateUniversityList
          open={openForm}
          handleClose={() => setOpenForm(false)}
          onSuccess={fetchData}
          mode={mode}
          initialData={selectedRow}
        />
      </Grid>

      <Grid size={12}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 520, overflowX: 'auto' }}
        >
          <Table stickyHeader sx={{ minWidth: 1600, tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={stickyLeftHeader} padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={stickyLeftHeader}>University Name</TableCell>
                <TableCell sx={headerStyle}>Program(s)</TableCell>
                <TableCell sx={headerStyle}>Batch</TableCell>
                <TableCell sx={headerStyle}>Issues / Challenges</TableCell>
                <TableCell sx={headerStyle}>Proposed Action</TableCell>
                <TableCell sx={headerStyle}>Responsible Person</TableCell>
                <TableCell sx={headerStyle}>Timeline / Deadline</TableCell>
                <TableCell sx={headerStyle}>Key Update</TableCell>
                <TableCell sx={headerStyle}>Status</TableCell>
                <TableCell sx={stickyRightHeader}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) => {
                const checked = isSelected(row._id);

                return (
                  <TableRow
                    key={row._id}
                    hover
                    selected={checked}
                  >

                    <TableCell padding="checkbox" sx={stickyLeftCell}>
                      <Checkbox
                        checked={checked}
                        onChange={() => handleRowSelect(row._id)}
                      />
                    </TableCell>


                    <TableCell sx={stickyLeftCell}>
                      {row.university}
                    </TableCell>

                    <TableCell>{row.programs}</TableCell>
                    <TableCell>{row.batch}</TableCell>

                    <TableCell>{row.issues}</TableCell>
                    <TableCell>{row.proposedAction}</TableCell>
                    <TableCell>{row.responsiblePerson}</TableCell>
                    <TableCell>
                      {row.deadline
                        ? new Date(row.deadline).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell>{row.keyUpdates}</TableCell>
                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>

                    <TableCell sx={stickyRightCell}>
                      <IconButton size="small" onClick={() => handleEdit(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleOpenDelete(row)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

          </Table>
        </TableContainer>
      </Grid>
      <DeleteSingle
        open={openDelete}
        id={deleteId}
        onClose={() => {
          setOpenDelete(false);
          setDeleteId(null);
        }}
        onSuccess={() => {
          fetchData();
          setSelected([]);
        }}
      />

    </Grid>
  );
};

export default UniversityList;
