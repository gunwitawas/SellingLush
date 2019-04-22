import { LoginRegisPageComponent } from './login-regis-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginRegisPageComponent,
    data: {
      meta: {
        title: 'home.title',
        description: 'home.text',
        override: true,
      },
    },
  },
];

export const LoginRegisPageRoutes = RouterModule.forChild(routes);
