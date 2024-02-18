import React, { PropsWithChildren } from 'react';
import Container from '../../primitives/wrapper/Container';

const DataTableImpl = (props: PropsWithChildren) => {
  return (
    <Container padding={'0'} fontFamily={'Montserrat'}>
      {props.children}
    </Container>
  );
};

export default DataTableImpl;
