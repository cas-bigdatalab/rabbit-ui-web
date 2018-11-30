import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import Component from 'vue-class-component';
import {
    datasource_columns,
    datasource_service,
} from '../../../service/views/sci_datasource/sci_datasource_service';
import {util} from '@/service/uitil/util';

class NewDataSource {
    datasourceModel: string;

    constructor(message: string) {
        this.datasourceModel = message;
    }

    currentpage = 1;
    dataInfos: any = [];
    totalnum = 2;

    mounted() {
        (<any>window).sci_datasource_context = this;
        this.newDatasource();
    }

    newDatasource() {
        datasource_service.loadData('/space/datainstances/', this.datasourceModel).then((data) => {
                console.log('//////////////////////////////////创建数据源成功');
                console.log(data);
                if (data.status == 201) {
                    // this.$Notice.open({
                    //     title: '通知',
                    //     desc: '数据源  <span style="font-weight: bold">' + '  </span>创建成功'
                    // });
                    alert('数据源创建成功');
                }
            },
            (reason) => {
                console.log('//////////////////////////////////创建数据源错误');
                console.log(reason);
            });

        datasource_service.getDataByPage('/space/datainstances/?page=', this.currentpage).then(
            (data) => {
                //console.log('//////////////////////////////////////////');
                //console.log(data);
                this.dataInfos = (<any>data).data.results;
                this.totalnum = (<any>data).data.count;
                for (let item of this.dataInfos) {
                    item.size = '4';
                }
            });
    }
}

@Component({})
export default class SciDatasourceComponent extends Vue {

    input_datasourcename: any = null;
    selected_enginetype: any = null;
    selected_dataset: any = null;

    show_webui: boolean = false;
    show_notebook: boolean = false;

    dataengines: any = [];

    dialog_title: any = '';
    selected_datasource: any = {};
    currentpage = 1;
    totalnum = 2;
    mydataset: any = [];
    datasourceColumns = datasource_columns;
    dataInfos: any = [];
    schema: any = [];
    gen_schema: any = [];
    gen_a_schema: any = null;
    model: any = {};
    formOptions: any = {};

    mounted() {
        console.log('hello from app');
        (<any>window).sci_datasource_context = this;
        this.vfg();
        this.refreshDataEngnie();
        this.refreshtable();
    }

    vfg() {
        let url = '/space/datainstances/';

        util.options(url).then((data) => {
            let vfg_data = util.vfg_data(data, this.model, url);
            //console.log(JSON.stringify(data) + 'VVVVVVVVVVVVVVVVVwwwwwwwwwwwwwwMMMMMMMMMMMMM');
            this.gen_schema = vfg_data.gen_schema;
            this.formOptions = vfg_data.formOptions;
            //console.log('datasource.component:'+ JSON.stringify(this.formOptions));
        });
    }

    changePage(page: any) {
        this.currentpage = page;
        this.refreshtable();
    }

    refreshDataEngnie() {
        datasource_service.getDataEngine('/space/dataengines/').then((data) => {
                //console.log('///////////////////////////////////////////datasources');
                //console.log(data);
                this.dataengines = (<any>data).data.results;
            },
            (reason) => {

            });
    }

    start_DataSource(id: any) {
        datasource_service.operateDataSource('/dataset/startdatasource', id).then();
        this.refreshtable();
    }

    stop_DataSource(id: any) {
        datasource_service.operateDataSource('/dataset/stopdatasource', id).then();
        this.refreshtable();
    }

    delete_DataSource(row: any) {
        datasource_service.deleteDataSource(row.url).then();
        //console.log('[[[[[[[[[[[ ]]]]]]]]]]]]]]]]]]' + row.url);
        //datasource_service.mock_deleteDataSource(id);
        this.refreshtable();
    }

    load_DataSource() {
        datasource_service.loadData('/space/datainstances/', this.model).then((data) => {
                console.log('//////////////////////////////////创建数据源成功');
                console.log(data);
                if (data.status == 201) {
                    this.$Notice.open({
                        title: '通知',
                        desc: '数据源  <span style="font-weight: bold">' + this.input_datasourcename + '  </span>创建成功',
                    });
                    this.refreshtable();
                }
            },
            (reason) => {
                console.log('//////////////////////////////////创建数据源错误');
                console.log(reason);
            });
    }

    show_WebUI() {
        this.show_webui = true;
    }

    // components!: {
    //     'vue-form-generator': VueFormGenerator.component;
    // };

    show_SimbaUI() {
        this.show_notebook = true;
    }

    refreshtable() {
        datasource_service.getDataByPage('/space/datainstances/?page=', this.currentpage).then(
            (data) => {
                //console.log('//////////////////////////////////////////');
                //console.log(data);
                this.dataInfos = (<any> data).data.results;
                this.totalnum = (<any> data).data.count;
                console.log(this.totalnum);
                for (let item of this.dataInfos) {
                    item.size = '4';
                }
            },
            (reason) => {
                console.log(this.dataInfos, 'bbbbbbbbbbbbbbbb');
                this.$Notice.open({
                    title: '通知',
                    desc: '数据访问失败',
                });
            });
        datasource_service.getMyAllData('/space/datasets/').then(
            (data) => {
                this.mydataset = (<any>data).data.results;
            },
            (reason) => {
                console.log('///////////////////////////////////////getmyalldataseterro');
            });
    }
}

