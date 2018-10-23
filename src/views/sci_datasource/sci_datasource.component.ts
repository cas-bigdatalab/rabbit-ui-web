import Vue from 'vue';
import Component from 'vue-class-component';
import {
    datasource_columns,
    datasource_info,
    datasource_service,
    my_all_dataset
} from '@/service/views/sci_datasource/sci_datasource_service';

@Component({})
export default class SciDatasourceComponent extends Vue {

    input_datasourcename:any=null;
    selected_enginetype:any=null;
    selected_dataset:any=null;

    show_webui:boolean=false;
    show_notebook:boolean=false;

    dialog_title:any="";
    selected_datasource:any ={};
    currentpage = 1;
    totalnum = 2;
    mydataset: any = [];
    datasourceColumns = datasource_columns;
    datasourceInfos: any = [];

    mounted() {
        console.log('hello from app');
        (<any>window).sci_datasource_context=this;
        this.refreshtable();
    }

    changePage(pagenum: any) {
        this.currentpage = pagenum;
    }
    start_DataSource(id:any){
        datasource_service.startDataSource(id).then();
        datasource_service.mock_startDataSource(id);
        this.refreshtable();
    }

    stop_DataSource(id:any){
        datasource_service.stopDataSource(id).then();
        datasource_service.mock_stopDataSource(id);
        this.refreshtable();
    }

    delete_DataSource(id:any){
        datasource_service.deleteDataSource(id).then();
        datasource_service.mock_deleteDataSource(id);
        this.refreshtable();
    }

    load_DataSource(){
        datasource_service.loadDataSource(this.input_datasourcename,this.selected_enginetype,this.selected_dataset);
        datasource_service.mock_loadDataSource(this.input_datasourcename,this.selected_enginetype,this.selected_dataset);
        this.refreshtable();
    }

    show_WebUI(){
        this.show_webui=true;
    }

    show_SimbaUI(){
        this.show_notebook=true;
    }

    refreshtable(){
        datasource_service.getDataSourceByPage(this.currentpage).then(
            (data) => {
                this.datasourceInfos = data;
            },
            (reason) => {
                this.datasourceInfos = datasource_service.mock_getDataSourceByPage(this.currentpage);
                this.totalnum = datasource_info.totalnum;
            });

        datasource_service.getMyAllDataSet().then(
            (data) => {
                this.mydataset = data;
            },
            (reason) => {
                this.mydataset = my_all_dataset;
            });
    }
}

