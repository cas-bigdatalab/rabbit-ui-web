import Vue from 'vue';
import Component from 'vue-class-component';
import {
    dataset_columns,
    dataset_service,
} from '../../../service/views/sci_dataset/sci_dataset_service';
import {util} from '@/service/uitil/util';

@Component({})
export default class SciDatasetComponent extends Vue {

    cluster_schema: any = null;
    packone_schema: any = null;
    space_schema: any = null;
    cluster_model: any = {};
    packone_model: any = {};
    space_model: any = {};
    cluster_formOptions: any = {};
    packone_formOptions: any = {};
    space_formOptions: any = {};

    mounted() {
        (<any> window).sci_dataset_context = this;
        this.vfg();
    }

    vfg() {
        // for leturl in ['','','/space/spaces/']
        let url = '/space/spaces/';
        util.options(url).then((data) => {
            let vfgData = util.vfg_data(data, this.space_model, url);
            this.space_schema = vfgData.gen_schema;
            this.space_formOptions = vfgData.formOptions;
            // console.log('dataset.component:'+ JSON.stringify(this.formOptions));
        });
        url = '/packone/packones/';
        util.options(url).then((data) => {
            let vfgData = util.vfg_data(data, this.packone_model, url);
            this.packone_schema = vfgData.gen_schema;
            this.packone_formOptions = vfgData.formOptions;
            // console.log('dataset.component:'+ JSON.stringify(this.formOptions));
        });
        url = '/cloud_adaptor/clusters/';
        util.options(url).then((data) => {
            let vfgData = util.vfg_data(data, this.cluster_model, url);
            this.cluster_schema = vfgData.gen_schema;
            this.cluster_formOptions = vfgData.formOptions;
            // console.log('dataset.component:'+ JSON.stringify(this.formOptions));
        });
    }
}