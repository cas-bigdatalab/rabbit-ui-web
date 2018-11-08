import Vue from 'vue';
import Component from 'vue-class-component';
import {
    datasource_columns,
    datasource_info,
    datasource_service,
} from '../../../service/views/sci_datasource/sci_datasource_service';
import {util} from '@/service/uitil/util';

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
    datasourceInfos: any = [];

    mounted() {
        console.log('hello from app');
        (<any>window).sci_datasource_context = this;
        this.refreshDataEngnie();
        this.refreshtable();
    }

    changePage(pagenum: any) {
        this.currentpage = pagenum;
    }

    refreshDataEngnie() {
        datasource_service.getDataEngine().then((data) => {
                console.log('///////////////////////////////////////////dataengines');
                console.log(data);
                this.dataengines = (<any>data).body.results;
            },
            (reason) => {

            });
    }

    start_DataSource(id: any) {
        datasource_service.startDataSource(id).then();
        datasource_service.mock_startDataSource(id);
        this.refreshtable();
    }

    stop_DataSource(id: any) {
        datasource_service.stopDataSource(id).then();
        datasource_service.mock_stopDataSource(id);
        this.refreshtable();
    }

    delete_DataSource(id: any) {
        datasource_service.deleteDataSource(id).then();
        datasource_service.mock_deleteDataSource(id);
        this.refreshtable();
    }

    load_DataSource() {
        datasource_service.loadDataSource(this.input_datasourcename, this.selected_enginetype, this.selected_dataset).then((data) => {
            console.log("//////////////////////////////////创建数据源")
            console.log(data)
            if(data.ok==true){
                    this.$Notice.open({
                        title: '通知',
                        desc: '数据源  <span style="font-weight: bold">' + this.input_datasourcename + '  </span>创建成功'
                    });
                    this.refreshtable();
                }
            },
            (reason) => {
                console.log("//////////////////////////////////创建数据源错误")
                console.log(reason)
            });
    }

    show_WebUI() {
        this.show_webui = true;
    }

    show_SimbaUI() {
        this.show_notebook = true;
    }

    refreshtable() {
        datasource_service.getDataSourceByPage(this.currentpage).then(
            (data) => {
                console.log('//////////////////////////////////////////');
                console.log(data);
                this.datasourceInfos = (<any>data).body.results;
                for (let item of this.datasourceInfos) {
                    item['enginetype'] = 't';
                    item.size = '4';
                }
                for (let item of this.datasourceInfos) {
                    util.dir_get(item.engine).then((data) => {
                            let index = 0;
                            for (let item_iner of this.datasourceInfos) {
                                if (item_iner.engine == (<any>data).body.url) {
                                    item_iner.enginetype = (<any>data).body.name;
                                    Vue.set(this.datasourceInfos, index, item_iner);
                                }
                                index++;
                            }
                        },
                        (reason) => {
                            console.log('get dataenginename error');
                        });

                    util.dir_get(item.dataset).then((data) => {
                            let index = 0;
                            for (let item_iner of this.datasourceInfos) {
                                if (item_iner.dataset == (<any>data).body.url) {
                                    item_iner.datasetname = (<any>data).body.name;
                                    item_iner.size = (<any>data).body.size;
                                    Vue.set(this.datasourceInfos, index, item_iner);
                                }
                                index++;
                            }
                        },
                        (reason) => {
                            console.log('get dataenginename error');
                        });
                }
            },
            (reason) => {
                this.datasourceInfos = datasource_service.mock_getDataSourceByPage(this.currentpage);
                this.totalnum = datasource_info.totalnum;
            });

        datasource_service.getMyAllDataSet().then(
            (data) => {
                this.mydataset = (<any>data).body.results;
            },
            (reason) => {
                console.log('///////////////////////////////////////getmyalldataseterro');
            });
    }
}

