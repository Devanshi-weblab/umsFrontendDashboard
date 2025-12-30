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
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRow(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <DateFilter />

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              height: 40,
              textTransform: "uppercase",
              fontWeight: 500
            }}
          >
            Add Program
          </Button>
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
                <TableCell sx={stickyLeftHeader}>University Name</TableCell>
                <TableCell sx={headerStyle}>Program(s)</TableCell>
                <TableCell sx={headerStyle}>Current Status</TableCell>
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
              {data.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell sx={stickyLeftCell}>
                    {row.university}
                  </TableCell>

                  <TableCell>{row.programs}</TableCell>
                  <TableCell>{row.currentStatus}</TableCell>
                  <TableCell>{row.issues}</TableCell>
                  <TableCell>{row.proposedAction}</TableCell>
                  <TableCell>{row.responsiblePerson}</TableCell>
                  <TableCell>
                    {row.deadline
                      ? new Date(row.deadline).toLocaleDateString()
                      : ''}
                  </TableCell>
                  <TableCell>{row.keyUpdates}</TableCell>
                  <TableCell>
                    <StatusChip status={row.status} />
                  </TableCell>


                  <TableCell sx={stickyRightCell}>

                    <IconButton
                      size="small"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      disableRipple
                      onClick={() => handleOpenDelete(row)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <DeleteSingle
                      open={openDelete}
                      data={selectedRow}
                      onClose={handleCloseDelete}
                      onSuccess={fetchData}
                    />



                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default UniversityList;
