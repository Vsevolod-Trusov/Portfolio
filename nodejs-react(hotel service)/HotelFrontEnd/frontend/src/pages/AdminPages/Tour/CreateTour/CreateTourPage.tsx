import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import CreateTourForm from './CreateTourForm';
import { IForm } from '../../interfaces';

const CreateTourPage = (props: PropsWithChildren<IForm>) => {
  return (
    <Container padding={'0'}>
      <CreateTourForm changeTab={props.changeTab} />
    </Container>
  );
};

export default CreateTourPage;
