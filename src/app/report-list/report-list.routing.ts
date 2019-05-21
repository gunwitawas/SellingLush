import { ReportListComponent } from './report-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportListComponent,
    data: {
      meta: {
        title: 'back-http.title',
        description: 'back-http.text',
      },
    },
  },
];

export const  OrderListRoutes = RouterModule.forChild(routes);
