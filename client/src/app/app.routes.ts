import { Routes } from '@angular/router';
import { Activity } from './core/page/activity/activity';
import { Wikis } from './core/page/wikis/wikis';
import { Settings } from './core/page/settings/settings';

export const routes: Routes = [
    {
        path: "",
        component: Activity
    },
    {
        path: "wikis",
        component: Wikis
    },
    {
        path: "settings",
        component: Settings
    },
];
