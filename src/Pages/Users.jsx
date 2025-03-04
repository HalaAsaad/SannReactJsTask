import react from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PageTitle from '../Components/PageTitle';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
function Users() {
  const data = [
    {
      id: 1,
      name: 'Hla Doe',
      email: 'Hla.doe@example.com',
      mobile: '+1234567890',
      team: 'Development',
      state: 'Delivered',
    },
    {
      id: 2,
      name: 'Anna Doe',
      email: 'info@example.com',
      mobile: '+1234567890',
      team: 'Sales',
      state: 'Pending',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'info@example.com',
      mobile: '+1234567890',
      team: 'Marketing',
      state: 'Delivering',
    },
    {
      id: 4,
      name: 'Hla Doe',
      email: 'Hla.doe@example.com',
      mobile: '+1234567890',
      team: 'Development',
      state: 'Delivered',
    },
    {
      id: 5,
      name: 'Anna Doe',
      email: 'info@example.com',
      mobile: '+1234567890',
      team: 'Sales',
      state: 'Pending',
    },
    {
      id: 6,
      name: 'John Doe',
      email: 'info@example.com',
      mobile: '+1234567890',
      team: 'Marketing',
      state: 'Delivering',
    },
  ];
  const colors = {
    Delivered: '#43ce85',
    Pending: '#d6573c',
    Delivering: '#ffcf86',
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      hideSortIcons: false,
      disableColumnMenu: true,
      sortable: true,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      hideSortIcons: false,
      disableColumnMenu: true,
      sortable: true,
      editable: true,
    },
    {
      field: 'mobile',
      headerName: 'Phone number',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      hideSortIcons: false,
      disableColumnMenu: true,
      sortable: true,
      editable: true,
    },
    {
      field: 'team',
      headerName: 'Team',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      hideSortIcons: false,
      disableColumnMenu: true,
      sortable: true,
      editable: true,
    },
    {
      field: 'state',
      headerName: 'Status',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      hideSortIcons: false,
      sortable: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <Stack
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            spacing={2}
            sx={{ height: '100%' }}
          >
            <Typography
              variant="caption"
              sx={{
                background: colors[params?.row?.state] + '33',
                color: colors[params?.row?.state],
                textTransform: 'capitalize',
                padding: '4px 6px',
                borderRadius: '3px',
              }}
            >
              {params?.row?.state}
            </Typography>
          </Stack>
        </>
      ),
    },

    {
      field: '',
      headerName: 'Actions',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableExport: true,
      sortable: false,
      display: false,
      renderCell: (params) => (
        <>
          <Stack
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            spacing={2}
            sx={{ height: '100%' }}
          >
            <MoreVertIcon />
          </Stack>
        </>
      ),
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageTitle title="Users" items={['Pages', 'Users']} />
      <DataGrid
        rows={data}
        columns={columns}
        style={{ overflow: 'auto' }}
        pagination
        checkboxSelection
        pageSizeOptions={[5, 10, 25]}
        rowHeight={38}
        sx={{
          borderColor: '#fff',
          color: '#201D23CC',
          lineHeight: '19.6px',
          fontSize: '14px',
          fontFamily: 'Poppins',
          '& .MuiDataGrid-row': {},
          '& .MuiDataGrid-cell': {
            // border: 'unset',
            fontFamily: 'Poppins',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#FAFAFA !important',
            // borderBottom: 'unset !important',
          },

          '& .MuiTablePagination-spacer': {
            flex: '0 !important',
          },
          '& .MuiInputBase-root': {
            marginRight: 'auto !important',
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default Users;
