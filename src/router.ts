import Vue from 'vue';
import Router from 'vue-router';
import DashboardComponent from '@/views/sci_myspace/sci_dashboard/sci_dashboard.component';
import SciDatasetComponent from '@/views/sci_myspace/sci_dataset/sci_dataset.component';
import SciDatasourceComponent from '@/views/sci_myspace/sci_datasource/sci_datasource.component';
import SciPiflowComponent from '@/views/sci_myspace/sci_piflow/sci_piflow.component';
import SciNotebookComponent from '@/views/sci_myspace/sci_notebook/sci_notebook.component';
import SciEmrComponent from '@/views/sci_myspace/sci_emr/sci_emr.component';
import SciAmbariComponent from '@/views/sci_myspace/sci_ambari/sci_ambari.component';
import SciSpacesComponent from '@/views/sci_myspace/sci_spaces/sci_spaces.component';
import SciMyspaceComponent from '@/views/sci_myspace/sci_myspace.component';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/myspace/dataset'},
        {
            path: '/myspace',
            name: 'myspace',
            component: SciMyspaceComponent,
            children: [
                {path: '/myspace/dashboard', component: DashboardComponent},
                {path: '/myspace/datasource', component: SciDatasourceComponent},
                {path: '/myspace/piflow', component: SciPiflowComponent},
                {path: '/myspace/notebook', component: SciNotebookComponent},
                {path: '/myspace/emr', component: SciEmrComponent},
                {path: '/myspace/ambari', component: SciAmbariComponent},
                {path: '/myspace/datasource', component: SciDatasourceComponent},
                {path: '/myspace/dataset', component: SciDatasetComponent},
                {path: '/myspace/spaces', component: SciSpacesComponent}
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        // {
        //     path: '/sci_spaces',
        //     name: 'sci_spaces',
        //     component: SciSpacesComponent,
        // },
    ],
});
