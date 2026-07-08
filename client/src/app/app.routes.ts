import { Routes } from '@angular/router';
import { SideNavigation } from './core/navigation/side-navigation/side-navigation';
import { Activity } from './core/dashboard/activity/activity';
import { Wikis } from './core/dashboard/wikis/wikis';
import { Login } from './core/authentication/login/login';
import { Home } from './core/dashboard/home/home';
import { sidenavResolverResolver } from './core/navigation/side-navigation/sidenav-resolver-resolver';

export const routes: Routes = [
    {
        path: "",
        component: SideNavigation,
        resolve: {
            user: sidenavResolverResolver
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
            },
            {
                path: "login",
                component: Login,
            },
        ]
    },
];