import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { FormikHelpers } from 'formik';

import { QUERY_KEYS } from 'config/globalConstants';
import { setFilter } from 'store/slices/notes.slice';

import FilterNotes from './FilterNotes';
import { IFilterProps, IFilterValues } from './types';
import { FILTER_FIELD, FILTER_TYPES, INITIAL_FILTER } from './constants';

const FilterNotesContainer: FC<IFilterProps> = ({ filterByName }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const filterHandler = (
    values: IFilterValues,
    { resetForm }: FormikHelpers<IFilterValues>,
  ) => {
    window.localStorage.setItem(
      FILTER_FIELD,
      JSON.stringify({
        ...(filterByName
          ? { type: FILTER_TYPES.TITLE, value: values.title }
          : {
              type: FILTER_TYPES.DATE,
              value: new Date(values.dateCreation).toISOString(),
            }),
      }),
    );

    dispatch(
      setFilter({
        ...(filterByName
          ? { type: FILTER_TYPES.TITLE, value: values.title }
          : {
              type: FILTER_TYPES.DATE,
              value: new Date(values.dateCreation).toISOString(),
            }),
      }),
    );

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.NOTES],
    });
    resetForm();
  };

  const handleRefresh = () => {
    dispatch(setFilter(INITIAL_FILTER));
    window.localStorage.removeItem(FILTER_FIELD);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
  };

  return (
    <FilterNotes
      submit={filterHandler}
      handleRefresh={handleRefresh}
      filterByName={filterByName}
    />
  );
};

export default FilterNotesContainer;
