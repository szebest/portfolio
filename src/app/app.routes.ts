import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('./modules/main/main.routes').then((r) => r.MAIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
