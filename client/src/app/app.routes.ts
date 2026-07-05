import { Routes } from '@angular/router';
import { SideNavigation } from './core/navigation/side-navigation/side-navigation';
import { Activity } from './core/dashboard/activity/activity';
import { Wikis } from './core/dashboard/wikis/wikis';

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