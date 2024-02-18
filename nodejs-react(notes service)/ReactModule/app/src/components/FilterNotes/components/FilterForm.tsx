import { FC, FormHTMLAttributes, PropsWithChildren } from 'react';

import { StyledFilterForm } from './styled';

const FilterForm: FC<
  PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>
> = ({ onSubmit, children }) => (
  <StyledFilterForm onSubmit={onSubmit}>{children}</StyledFilterForm>
);

export default FilterForm;
