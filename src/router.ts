import Vue from 'vue';
import Router from 'vue-router';
import SciDatasetComponent from '@/views/sci_dataset/sci_dataset.component';
import SciDatasourceComponent from '@/views/sci_datasource/sci_datasource.component';
import SciPiflowComponent from '@/views/sci_piflow/sci_piflow.component';
import SciNotebookComponent from '@/views/sci_notebook/sci_notebook.component';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dataset',
            component: SciDatasetComponent,
        },
        {
            path: '/datasource',
            name: 'datasource',
            component: SciDatasourceComponent,
        },
        {
            path: '/piflow',
            name: 'piflow',
            component: SciPiflowComponent,
        },
        {
            path: '/notebook',
            name: 'notebook',
            component: SciNotebookComponent,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
});
