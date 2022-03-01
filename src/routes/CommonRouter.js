
import React from 'react';
import PrivateRoute from 'routes/PrivateRoute';
import routes from "routes/routes";
import { v4 as uuidv4 } from 'uuid';

const CommonRouter = () => {
    return (
        <>
            {routes.map((route) => {
                return route.component ? (
                    <PrivateRoute
                        key={uuidv4()}
                        path={route.path}
                        exact={true}
                        component={route.component}
                    />
                ) : null;
            })}
        </>
    );
}

export default CommonRouter