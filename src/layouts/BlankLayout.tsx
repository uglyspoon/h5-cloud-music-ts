import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

const Layout: React.FC = ({ route }: RouteConfig) => (
  <>{renderRoutes(route.routes)}</>
);

export default Layout;
