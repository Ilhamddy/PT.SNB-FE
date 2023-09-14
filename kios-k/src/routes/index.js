import React from 'react';
import { Routes, Route } from "react-router-dom";

//routes
import { publicRoutes } from "./allRoutes";

import NonAuthLayout from "../Layouts/NonAuthLayout";

const Index = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default Index;