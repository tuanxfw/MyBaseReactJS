import { lazy } from 'react';

const Sapmle = lazy(() => import('views/sample/sample'));

const Home = lazy(() => import('views/home/home'));

const routes = [
    { path: "/", name: 'Home', component: Home },

    { path: '/sample', name: 'Sample', component: Sapmle },
];

export default routes;
