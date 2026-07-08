import { Routes } from '@angular/router';
import { authResolver, SideNavigation } from './core/navigation/side-navigation/side-navigation';
import { Activity } from './core/dashboard/activity/activity';
import { Wikis } from './core/dashboard/wikis/wikis';
import { Login } from './core/authentication/login/login';
import { Home } from './core/dashboard/home/home';

export const routes: Routes = [
    {
        path: "",
        component: SideNavigation,
        resolve: {
            user: authResolver,
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