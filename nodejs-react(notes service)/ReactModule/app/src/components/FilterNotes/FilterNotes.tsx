import { FC } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import { Refresh, FilterAlt } from '@mui/icons-material';

import {
  DATE_CREATION_FIELD,
  TITLE_FIELD,
  TITLE_PLACEHOLDER,
} from 'pages/NotesForm/constants';
import { filterSchema, filterByNameSchema } from 'validations';

import {
  FILTER_VALUES,
  FILTER_BY_NAME_VALUES,
  START_TIMEOUT,
} from './constants';
import { FilterForm } from './components';
import { StyledButton } from './styled';
import { StyledFilterInput } from './components/styled';
import { IFilterNotes } from './types';

const FilterNotes: FC<IFilterNotes> = ({
  submit: filterHandler,
  handleRefresh,
  filterByName,
}) => (
  <Formik
    initialValues={filterByName ? FILTER_BY_NAME_VALUES : FILTER_VALUES}
    validationSchema={filterByName ? filterByNameSchema : filterSchema}
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={filterHandler}
  >
    {({ handleSubmit, handleChange, resetForm, values, errors, touched }) => (
      <FilterForm onSubmit={handleSubmit}>
        {filterByName ? (
          <>
            <Box>
              <StyledFilterInput
                id={TITLE_FIELD}
                name={TITLE_FIELD}
                placeholder={TITLE_PLACEHOLDER}
                type={'text'}
                value={values.title}
                helperText={touched.title && errors?.title}
                error={touched.title && !!errors?.title}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <StyledButton type='submit' variant={'contained'}>
                <FilterAlt />
              </StyledButton>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <StyledFilterInput
                id={DATE_CREATION_FIELD}
                name={DATE_CREATION_FIELD}
                type={'date'}
                value={values.dateCreation}
                helperText={touched.dateCreation && errors?.dateCreation}
                error={touched.dateCreation && !!errors.dateCreation}
                onChange={(e) => {
                  handleChange(e);
                  setTimeout(() => {
                    handleSubmit();
                  }, START_TIMEOUT);
                }}
              />
            </Box>
            <Box>
              <StyledButton
                type='button'
                variant={'contained'}
                onClick={() => {
                  resetForm();
                  handleRefresh();
                }}
              >
                <Refresh />
              </StyledButton>
            </Box>
          </>
        )}
      </FilterForm>
    )}
  </Formik>
);

export default FilterNotes;
