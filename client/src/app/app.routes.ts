import { Routes } from '@angular/router';
import { Activity } from './core/dashboard/activity/activity';
import { Wikis } from './core/dashboard/wikis/wikis';
import { Settings } from './core/dashboard/settings/settings';
import { App } from './app';
import { SideNavigation } from './core/navigation/side-navigation/side-navigation';

export const routes: Routes = [
    {
        path: "",
        component: SideNavigation,
        children: [
            {
                path: "",
                component: Activity,
            },
            {
                path: "dashboard/wikis",
                component: Wikis,
            }
        ]
    },
];
