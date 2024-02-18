import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export default function TabPanelIml(props: PropsWithChildren) {
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>{props.children}</Box>
  );
}
