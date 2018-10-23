import Vue from 'vue';
import Component from 'vue-class-component';
import {
    dataset_columns,
    dataset_info,
    dataset_service,
    open_dataset
} from '@/service/views/sci_dataset/sci_dataset_service';
import {datasource_info, datasource_service} from '@/service/views/sci_datasource/sci_datasource_service';

@Component({})
export default class SciDatasetComponent extends Vue {

    //输入数据——数据集
    selected_datatype=1;
    input_filepath=null;
    selected_opensourcedata=null;
    input_datasetname:any=null;
    input_datadescription:any=null;
    show_import_dialog:boolean=false;

    //输入数据——数据源
    input_datasourcename:any=null;
    selected_enginetype:any=null;
    selected_dataset:any={};

    //绑定数据
    currentpage = 1;
    totalnum = 10;
    opendataset: any = [];
    datasetColumns =dataset_columns;
    datasetInfos: any = [];


    drawer_style={
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
    };

    mounted() {
        (<any>window).sci_dataset_context=this;
        this.refreshtable()
    }

    changePage(page: any) {
        this.currentpage = page;
        this.refreshtable();
    }

    importDataToSpace(){
        let content=null;
        if(this.selected_datatype==1){
            content=this.input_filepath;
        }else {
            content=this.selected_opensourcedata;
        }
        dataset_service.importDataSetToMySpace(this.input_datasetname,content,this.selected_datatype,this.input_datadescription).then();
        dataset_service.mock_importDataSetToMySpace(this.input_datasetname,content,this.selected_datatype,this.input_datadescription);
        this.refreshtable();
        this.$Notice.open({
            title: '通知',
            desc: '数据:  <span style="font-weight: bold">'+this.input_datasetname+'  </span>导入成功'
        });
    }

    refreshtable(){
        dataset_service.getDatasetByPage(this.currentpage).then();
        this.datasetInfos = dataset_service.mock_getDatasetByPage(this.currentpage);
        this.totalnum=dataset_info.totalnum;
        dataset_service.getOpenSourceDataList().then();
        this.opendataset = open_dataset;
    }

    deletDataSet(row:any){
        dataset_service.deleteDataSet(row.id).then();
        dataset_service.mock_deleteDataSet(row.id);
        this.refreshtable();
    }

    loadDataSetToDataSource(){
        datasource_service.loadDataSource(this.input_datasourcename,this.selected_enginetype,this.selected_dataset.id).then();
        datasource_service.mock_loadDataSource(this.input_datasourcename,this.selected_enginetype,this.selected_dataset.id);
        this.refreshtable();
        this.$Notice.open({
            title: '通知',
            desc: '数据源: <span style="font-weight: bold">'+this.input_datasourcename+'  </span> 创建成功'
        });
        this.show_import_dialog=false;
    }

}

