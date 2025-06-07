import { Box, Button, Card, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type Props = {
  title: string,
  img: string,
  vid: string,
  dl: string,
  exp?: string,
};

export default function Seller({title, img, vid, dl, exp}: Props, {}) {
  return(
    <Paper sx={{width: 'auto', mb: -2}} elevation={2}>
      <Typography variant='h5' sx={{m: 2, pt: 1}} fontWeight={"bold"}>NVM{title}</Typography>
      <Box sx={{ width: '90%', height: '90%', m: 2}}>
        <img src={img} style={{width: '40%', height: '30%'}} loading="lazy" />  
      </Box>
      <Typography sx={{m: 0, mb: 2, ml: 4}} fontSize={"20px"}>{exp}</Typography>
      <Stack direction={"row"} sx={{ m: 2 }}>
        <Button variant='contained' sx={{ m: 2, borderRadius: 11, backgroundColor: "#2f4f4f" }} href={dl}>
          DL
        </Button>
        <Typography sx={{ mt: 2.5, ml: 2 }} fontSize={"16px"}>password: Qv8RZf7K</Typography>
        <Button variant='outlined' sx={{ m: 2, borderRadius: 11, ml: 7, visibility: vid ? "visible" : "hidden"}} href={vid}>
          <VideoLibraryIcon sx={{ ml: -0.5 }}/>
        </Button>
      </Stack>
    </Paper>
  );
}