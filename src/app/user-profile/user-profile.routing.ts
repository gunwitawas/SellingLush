import { UserProfileComponent } from './user-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: {
      meta: {
        title: 'back-http.title',
        description: 'back-http.text',
      },
    },
  },
];

export const TransferBackRoutes = RouterModule.forChild(routes);
