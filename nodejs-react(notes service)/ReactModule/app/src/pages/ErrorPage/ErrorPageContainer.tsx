import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorPage } from './ErrorPage';
import { HISTORY_DELTA } from './constants';

const ErrorPageContainer: FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(HISTORY_DELTA);
  };

  return <ErrorPage handleBack={handleBack} />;
};

export default ErrorPageContainer;
