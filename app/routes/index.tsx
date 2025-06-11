import { AppBar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Grid, IconButton, List, ListItemButton, ListItemText, Pagination, Stack, Toolbar, Typography } from '@mui/material';
import type { MetaFunction } from "@remix-run/node";
import React, { useEffect, useState } from 'react';
import Contents from "../component/contents";
import Header from "../component/header";

export const meta: MetaFunction = () => {
  return [
    { title: "Number" },
    { name: "description", content: "number" },
  ];
};

type jsonType = {
  no: string
  img_url: string
  dl_url: string
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [jsonData, setJsonData] = React.useState<jsonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch('https://raw.githubusercontent.com/lazyCloudw/nnnn/develop/src/json/data.json').then((response) => response.json())
    setJsonData(data);
    setIsLoading(false);
  }

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = jsonData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
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
    );
  }

  return (
    <Box sx={{ mt: 0 }}>
      <a href="https://info.flagcounter.com/Bawc">
        <img src="https://s11.flagcounter.com/count2/Bawc/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/" alt="Flag Counter" style={{ display: "none" }} />
      </a>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
        <Header />
      </Box>
      <Grid container spacing={1} sx={{ mb: 4, mt: 8 }}>
        {
          paginatedData.map((data: jsonType) => {
            return (
              <Grid size={isSmallScreen ? 12 : 6} key={data.no}>
                <Contents title={data.no} img={data.img_url} dl={data.dl_url} />
              </Grid>
            );
          })
        }
      </Grid>
      <Pagination
        count={Math.ceil(jsonData.length / itemsPerPage)}
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
  );
}
