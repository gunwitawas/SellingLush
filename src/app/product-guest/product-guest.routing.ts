import { ProductGuestComponent } from './product-guest.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductGuestComponent,
    data: {
      meta: {
        title: 'back-http.title',
        description: 'back-http.text',
      },
    },
  },
];

export const ProductGuestRoutes = RouterModule.forChild(routes);
