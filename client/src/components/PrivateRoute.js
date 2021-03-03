import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const PrivateRoute = ({ children, ...rest }) => {


  const { customerLoggedIn } = useSelector(state => state.customer);
  
   

    return (
        <Route
      {...rest}
      render={({ location }) =>
      customerLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/customerLogin",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;
