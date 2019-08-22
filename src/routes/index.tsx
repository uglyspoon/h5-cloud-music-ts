import React from 'react';
import { Redirect } from "react-router-dom";
import Login from '../containers/login';
import BlankLayout from 'layouts/BlankLayout';
import HomeLayout from 'layouts/HomeLayout';

import Recommend from 'containers/Recommend';
import Album from 'containers/Ablum';

const routes = [
  {
    component: BlankLayout,
    routes: [
      {
        path: '/',
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            render: ()=> (
              <Redirect to={"/recommend"}/>
            )
          },
          {
            path: '/recommend',
            key: 'recommend',
            exact: true,
            component: Recommend,
            routes:[{
              path: '/recommend/:id',
              component: Album,
            }]
          }
        ]
      },
      {
        path: "/user",
        component: Login,//userLoadyout
      }
    ]
  }
];

export default routes
