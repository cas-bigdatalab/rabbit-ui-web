import Vue from 'vue';
import Component from 'vue-class-component';
import {
    dataset_columns,
    dataset_service,
} from '../../../service/views/sci_dataset/sci_dataset_service';
import {datasource_info, datasource_service} from '../../../service/views/sci_datasource/sci_datasource_service';
import VueFormGenerator from 'vue-form-generator';
import {util} from '@/service/uitil/util';

@Component({})
export default class SciDatasetComponent extends Vue {

    //输入数据——数据集
    selected_datatype = 1;
    input_filepath = null;
    selected_opensourcedata = null;
    input_datasetname: any = null;
    input_datadescription: any = null;
    show_import_dialog: boolean = false;
    selected_datatmodel = null;

    //输入数据——数据源
    input_datasourcename: any = null;
    selected_enginetype: any = null;
    selected_dataset: any = {};

    //绑定数据
    currentpage = 1;
    totalnum: any = null;
    opendataset: any = [];
    datasetColumns = dataset_columns;
    dataInfos: any = [];
    dataengines: any = [];

    drawer_style = {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
    };
    schema: any = [];
    cluster_schema: any = null;
    packone_schema: any = null;
    space_schema: any = null;
    model: any = {};
    formOptions: any = {};

    mounted() {
        (<any> window).sci_dataset_context = this;
        this.vfg();
        this.refreshtable();
        this.refreshDataEngnie();
    }

    vfg() {
        // for leturl in ['','','/space/spaces/']
        let url = '/cloud_adaptor/clusters/';
        util.options(url).then((data) => {
            let vfgData = util.vfg_data(data, this.model, url);
            this.cluster_schema = vfgData.gen_schema;
            this.formOptions = vfgData.formOptions;
            // console.log('dataset.component:'+ JSON.stringify(this.formOptions));
        });
        url = '/packone/packones/';
        util.options(url).then((data) => {
            let vfgData = util.vfg_data(data, this.model, url);
            this.packone_schema = vfgData.gen_schema;
            this.formOptions = vfgData.formOptions;
            // console.log('dataset.component:'+ JSON.stringify(this.formOptions));
        });
        url = '/cloud_adaptor/clusters/';
        util.options(url).then((data) => {
            let vfgData = util.vfg_data(data, this.model, url);
            this.space_schema = vfgData.gen_schema;
            this.formOptions = vfgData.formOptions;
            // console.log('dataset.component:'+ JSON.stringify(this.formOptions));
        });
        this.refreshtable();
    }

    changePage(page: any) {
        this.currentpage = page;
        this.refreshtable();
    }

    refreshDataEngnie() {
        datasource_service.getDataEngine('/space/dataengines/').then((data) => {
                //console.log('/////////////////////////////dataengines' + '///////////////////dataset');
               // console.log(data);
                this.dataengines = (<any> data).data.results;
            },
            (reason) => {

            });
    }

    refreshtable() {
        datasource_service.getDataByPage('/space/datasets/?page=', this.currentpage).then((data) => {
                this.dataInfos = (<any> data).data.results;
                this.totalnum = (<any> data).data.count;
                //console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' + this.totalnum);
            },
            (reason) => {
                //console.log(this.dataInfos, 'bbbbbbbbbbbbbbbb');
                this.$Notice.open({
                    title: '通知',
                    desc: '数据访问失败',
                });
            });

        datasource_service.getOpenSourceDataList('/space/datasets/?public=true').then((data) => {
                if (data.status == 201) {
                    this.opendataset = (<any> data).data.results;
                }
                //console.log(data);
            },
            (reason) => {

            });

    }

    shareDataSet(row: any) {
        //console.log(row);
        datasource_service.shareDataset(row.url);
        this.refreshtable();
    }

    deletDataSet(row: any) {
        datasource_service.deleteDataset(row.url);
        //dataset_service.mock_deleteDataSet(row.id);
        //console.log(row);
        this.refreshtable();
    }

    /**
     * Load----创建数据源
     */
    loadDataSetToDataSource() {
        datasource_service.datasetloadDataSource('/space/datainstances/', this.input_datasourcename, this.selected_enginetype, this.selected_dataset.url).then((data: any) => {
            //console.log('/////////////////////////测试数据源导入');
           // console.log(data);
            if (data.status == 201) {
                this.$Notice.open({
                    title: '通知',
                    desc: '数据源: <span style="font-weight: bold">' + this.input_datasourcename + '  </span> 创建成功'
                });
                this.show_import_dialog = false;
            }
        }, (reason) => {
            console.log('/////////////////////////测试数据源导入失败');
            console.log(reason);
        });

    }

}