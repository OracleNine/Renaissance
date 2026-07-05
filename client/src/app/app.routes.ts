import { Routes } from '@angular/router';
import { Activity } from './core/page/activity/activity';
import { Wikis } from './core/page/wikis/wikis';
import { Settings } from './core/page/settings/settings';
import { App } from './app';
import { SidenavigationComponent } from './core/components/sidenavigation/sidenavigation.component';

export const routes: Routes = [
    {
        path: "",
        component: SidenavigationComponent,
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
