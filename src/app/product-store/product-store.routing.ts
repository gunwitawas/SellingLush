import { ProductStoreComponent } from './product-store.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductStoreComponent,
    data: {
      meta: {
        title: 'back-http.title',
        description: 'back-http.text',
      },
    },
  },
];

export const ProductStoreRoutes = RouterModule.forChild(routes);
