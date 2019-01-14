import { PreorderOnlineComponent } from './preorder-online.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PreorderOnlineComponent,
    data: {
      meta: {
        title: 'back-http.title',
        description: 'back-http.text',
      },
    },
  },
];

export const PreorderOnlineRoutes = RouterModule.forChild(routes);
