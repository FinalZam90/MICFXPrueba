import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: ':CVE/dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    
    {
        path: 'application',
        loadChildren: () => import('../../application/application.module').then(m => m.ApplicationModule)

    },
    {
        path: ':CVE/fgr',
        loadChildren: () => import('../../fgr/fgr.module').then(m => m.FgrModule)

    },
    /*{
        path: 'Formulario/:CVE_DEPTO',
        loadChildren: () => import('../../fgr/fgr-depto-man/fgr-depto-man.module').then(m => m.FgrDeptoManModule)

    },
    {
        path: ':CVE/auditoria',
        loadChildren: () => import('../../fad/fad-con-audit/fad-con-audit.module').then(m => m.FadConAuditModule)

    },*/
    {
        path: ':CVE/fad',
        loadChildren: () => import('../../fad/fad.module').then(m => m.FadModule)

    },
    {
        path: ':CVE/fad/usuarios',
        loadChildren: () => import('../../fad/fad-con-usuar/fadusuar.module').then(m => m.FadModule)

      },
    {
        path: 'widgets',
        loadChildren: () => import('../../widgets/widgets.module').then(m => m.WidgetsModule)

    },
    {
        path: 'ecommerce',
        loadChildren: () => import('../../ecommerce/ecommerce.module').then(m => m.EcommerceModule)

    },
    {
        path: 'components',
        loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
    },
    {
        path: 'ng-components',
        loadChildren: () => import('../../ng-components/ng-components.module').then(m => m.NgComponentsModule)
    },
    {
        path: 'content',
        loadChildren: () => import('../../content/content.module').then(m => m.ContentModule)
    },
    {
        path: 'icons',
        loadChildren: () => import('../../icons/icons.module').then(m => m.IconsModule)
    },
    {
        path: 'form',
        loadChildren: () => import('../../form/form.module').then(m => m.FormModule)
    },
    {
        path: 'table',
        loadChildren: () => import('../../table/table.module').then(m => m.TableModule)

    },
    {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule)

    },
    {
        path: 'faq',
        loadChildren: () => import('../../faq/faq.module').then(m => m.FaqModule)
    },
    {
        path: 'pricing',
        loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule)
    },
    {
        path: 'earnings',
        loadChildren: () => import('../../earnings/earnings.module').then(m => m.EarningsModule)
    },
    {
        path: 'downloads',
        loadChildren: () => import('../../downloads/downloads.module').then(m => m.DownloadsModule)
    },
    {
        path: 'timeline',
        loadChildren: () => import('../../timeline/timeline.module').then(m => m.TimelineModule)
    },
    {
        path: 'charts',
        loadChildren: () => import('../../charts/chart.module').then(m => m.ChartModule)
    },
    // {
    //     path: 'maps',
    //     loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)

    // },
    // {
    //     path: 'error',
    //     loadChildren: () => import('./../../error/error.module').then(m => m.ErrorModule)
    // },
];