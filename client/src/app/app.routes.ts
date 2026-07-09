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
];