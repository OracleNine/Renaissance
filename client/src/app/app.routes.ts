import { Routes } from '@angular/router';
import { SideNavigation } from './core/navigation/side-navigation/side-navigation';
import { Activity } from './core/dashboard/activity/activity';
import { Wikis } from './core/dashboard/wikis/wikis';
import { Login } from './core/authentication/login/login';
import { Home } from './core/dashboard/home/home';
import { sidenavResolver } from './core/navigation/side-navigation/sidenav-resolver';
import { wikisResolver } from './core/dashboard/wikis/wikis-resolver';
import { Logout } from './core/authentication/logout/logout';
import { CreateWiki } from './core/dashboard/create-wiki/create-wiki';
import { Page } from './wiki/page/page/page';
import { pageResolver } from './wiki/page/page-resolver';
import { Edit } from './wiki/page/edit/edit';
import { Register } from './core/authentication/register/register';

export const routes: Routes = [
    {
        path: "",
        component: SideNavigation,
        resolve: {
            user: sidenavResolver
        },
        children: [
            {
                path: "",
                component: Home,
            },
            {
                path: "dashboard",
                component: Activity,
            },
            {
                path: "dashboard/wikis",
                component: Wikis,
                resolve: {
                    wikis: wikisResolver
                },
            },
            {
                path: "dashboard/create-wiki",
                component: CreateWiki,
            },
        ]
    },
    {
        path: "login",
        component: Login,
    },
    {
        path: "logout",
        component: Logout,
    },
    {
        path: "register",
        component: Register,
    },
    {
        path: "wiki/:wSubdomain/:pSlug",
        component: Page,
        resolve: {
            page: pageResolver
        },
    },
    {
        path: "wiki/:wSubdomain/:pSlug/edit",
        component: Edit,
        resolve: {
            page: pageResolver
        },
    },
];