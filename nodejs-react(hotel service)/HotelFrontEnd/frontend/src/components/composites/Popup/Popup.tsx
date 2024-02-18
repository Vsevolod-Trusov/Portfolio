import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled, { StyledProps } from 'styled-components';
import {
  setSelectMealAction,
  setSelectMealsAction,
} from '../../../redux/reducers/meal.reducer';
import { AnyAction, Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StyleProps } from '../../../styles/style.type';

type PopupProps = {
  isOpen: boolean;
  onClose?: () => void;
} & StyleProps;

const PopupContainer = styled('div')<PopupProps>((props: any) => ({
  position: 'fixed',
  fontFamily: 'Montserrat',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: props.isOpen ? 'flex' : 'none',
  justifyContent: 'center',
  alignItems: 'center',
  '> div': {
    margin: props.margin,
  },
  zIndex: props.zIndex,
}));

const PopupContent = styled('div')<StyleProps>((props: any) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  padding: '16px',
}));

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Popup = (props: PropsWithChildren<PopupProps>) => {
  return (
    <PopupContainer
      isOpen={props.isOpen}
      margin={props.margin}
      zIndex={props.zIndex}
    >
      <PopupContent>
        <CloseButton onClick={props.onClose}>X</CloseButton>
        {props.children}
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;
