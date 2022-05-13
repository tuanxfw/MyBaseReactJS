import { lazy } from 'react';

const Sapmle = lazy(() => import('views/sample/sample'));

const Home = lazy(() => import('views/home/home'));

const routes = [
    { path: "/", component: Home },

    { path: '/sample', component: Sapmle },
];

export default routes;
