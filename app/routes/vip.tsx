import { AppBar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Grid, IconButton, List, ListItemButton, ListItemText, Pagination, Stack, Toolbar, Typography } from '@mui/material';
import type { MetaFunction } from "@remix-run/node";
import React, { useEffect, useState } from 'react';
import Seller from "../component/seller";
import Header from "../component/header";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const meta: MetaFunction = () => {
  return [
    { title: "VIP" },
    { name: "description", content: "vip" },
  ];
};

type selljsonType = {
  no: string
  img_url: string
  vid_url: string
  dl_url: string
  exp?: string
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Vip() {

  const [jsonSellData, setJsonSellData] = React.useState<selljsonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const sellData = await fetch('https://raw.githubusercontent.com/lazyCloudw/nnnn/develop/src/json/sellData.json').then((response) => response.json())
    setJsonSellData(sellData);
    setIsLoading(false);
  }

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = jsonSellData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const pageChange = (event: any, value: React.SetStateAction<number>) => {
    setPage(value);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const isSmallScreen = window.matchMedia('(max-width: 610px)').matches;

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            bgcolor: 'background.default',
            zIndex: 2000,
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ m: 0 }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
          <Header />
        </Box>
        <Grid container spacing={1} sx={{ mb: 4, mt: 8 }}>
          {
            paginatedData.map((data: selljsonType) => {
              return (
                <Grid size={12} key={data.no}>
                  <Seller title={data.no} img={data.img_url} vid={data.vid_url} dl={data.dl_url} exp={data.exp} />
                </Grid>
              );
            })
          }
        </Grid>
        <Pagination
          count={Math.ceil(jsonSellData.length / itemsPerPage)}
          page={page}
          onChange={pageChange}
          color="secondary"
          sx={{
            pt: 10,
            pb: 4,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </Box>
    </ThemeProvider>
  );
}