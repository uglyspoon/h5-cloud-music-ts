import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

export default ({route}:RouteConfig) => (
  <>
    <h1>home</h1>
    {renderRoutes(route.routes)}
  </>
)
