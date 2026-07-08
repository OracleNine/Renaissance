import { Routes } from '@angular/router';
import { SideNavigation } from './core/navigation/side-navigation/side-navigation';
import { Activity } from './core/dashboard/activity/activity';
import { Wikis } from './core/dashboard/wikis/wikis';
import { Login } from './core/authentication/login/login';
import { loginRequiredGuard } from './core/authentication/login-required-guard';
import { Home } from './core/dashboard/home/home';

export const routes: Routes = [
    {
        path: "",
        component: SideNavigation,
        children: [
            {
                path: "",
                component: Home,
            },
            {
                path: "dashboard",
                component: Activity,
                canActivate: [loginRequiredGuard],
            },
            {
                path: "dashboard/wikis",
                component: Wikis,
                canActivate: [loginRequiredGuard],
            },
            {
                path: "login",
                component: Login,
            },
        ]
    },
];