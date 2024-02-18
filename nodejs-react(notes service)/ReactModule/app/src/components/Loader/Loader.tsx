import { StyledIndicator, StyledCircle, StyledShadow } from './styled';

const Loader = () => (
  <StyledIndicator>
    <StyledCircle />
    <StyledCircle />
    <StyledCircle />
    <StyledShadow />
    <StyledShadow />
    <StyledShadow />
  </StyledIndicator>
);

export default Loader;
