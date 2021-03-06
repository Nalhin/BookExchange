import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import styled from '@emotion/styled';
import Navigation from './Navigation/NavigationContainer';
import Store from './Store/StoreContainer';
import Login from './Login/LoginContainer';
import Add from './Add/AddContainer';
import Basket from './Basket/BasketContainer';
import Register from './Register/RegisterContainer';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Overview from './Overview/OverviewContainer';
import BasketOverlay from './Overlay/OverlayContainer';
import 'react-toastify/dist/ReactToastify.css';
import { NAVBAR_OFFSET, SCREEN_SIZES } from '../styles/globalVariables';
import { isSell } from '../utils/phaseToBool';

const StyledContainer = styled.div`
  padding-top: ${NAVBAR_OFFSET};
`;

const StyledToast = styled(ToastContainer)`
  @media only screen and (max-width: ${SCREEN_SIZES.MOBILE}) {
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const MainView = ({ token, stateToken, setUserToken, phase }) => {
  React.useEffect(() => {
    if (!stateToken) {
      const windowToken = window.localStorage.getItem('token');
      setUserToken(windowToken);
    }
  });

  return (
    <StyledContainer>
      {token && <Navigation token={token} phase={phase} />}
      {token && <BasketOverlay />}
      <PrivateRoute path="/" token={token} exact component={Store} />
      {isSell(phase) && (
        <PrivateRoute path="/add" token={token} component={Add} />
      )}
      <PrivateRoute path="/basket" token={token} component={Basket} />
      <PrivateRoute path="/overview" token={token} component={Overview} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <StyledToast position={toast.POSITION.BOTTOM_CENTER} transition={Zoom} />
    </StyledContainer>
  );
};

MainView.defaultProps = {
  token: '',
  stateToken: '',
};

MainView.propTypes = {
  token: PropTypes.string,
  setUserToken: PropTypes.func.isRequired,
  stateToken: PropTypes.string,
  phase: PropTypes.number,
};

export default MainView;
