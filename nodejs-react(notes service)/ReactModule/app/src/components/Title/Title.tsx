import { FC, PropsWithChildren } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Title: FC<PropsWithChildren<TypographyProps>> = ({
  variant,
  children,
}) => <Typography variant={variant}>{children}</Typography>;

export default Title;
