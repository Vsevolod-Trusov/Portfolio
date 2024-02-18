import { FormikHelpers } from 'formik';

export interface IFilterProps {
  isShared: boolean;
  filterByName?: boolean;
}

export interface IFilterNotes {
  submit: (
    values: IFilterValues,
    { resetForm }: FormikHelpers<IFilterValues>,
  ) => void;
  handleRefresh?: () => void;
  filterByName?: boolean;
}

export interface IFilterValues {
  title?: string;
  dateCreation?: Date | string;
}
