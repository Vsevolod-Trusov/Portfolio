import React from 'react';
import Flex from '../../primitives/flex/Flex';
import Container from '../../primitives/wrapper/Container';
import Submit from '../../primitives/submit/Submit';
import DataTableImpl from '../DataTable/DataTable';
import DataTable from 'react-data-table-component';
import { IEntityInfoPanel } from './interfaces';

const EntityInfoPanel = ({
  buttonFunction,
  buttonText,
  isLoading,
  data,
  columns,
  onRowClickedHandler,
}: IEntityInfoPanel) => {
  return (
    <Container padding={'0'}>
      {buttonFunction && buttonText && (
        <Flex justifyContent={'end'}>
          <Container>
            <Submit onClick={() => buttonFunction && buttonFunction()}>
              {buttonText && buttonText}
            </Submit>
          </Container>
        </Flex>
      )}
      <DataTableImpl>
        {isLoading ? (
          'Loading'
        ) : (
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            paginationRowsPerPageOptions={[5, 10, 15]}
            onRowClicked={(row, event) => {
              onRowClickedHandler(row);
            }}
          />
        )}
      </DataTableImpl>
    </Container>
  );
};

export default EntityInfoPanel;
