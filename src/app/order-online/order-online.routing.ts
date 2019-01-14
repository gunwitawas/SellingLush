import { OrderOnlineComponent } from './order-online.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OrderOnlineComponent,
    data: {
      meta: {
        title: 'back-http.title',
        description: 'back-http.text',
      },
    },
  },
];

export const OrderOnlineRoutes = RouterModule.forChild(routes);
