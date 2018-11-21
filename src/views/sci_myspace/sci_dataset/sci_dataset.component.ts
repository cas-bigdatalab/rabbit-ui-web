import Vue from 'vue';
import Component from 'vue-class-component';
import {
    dataset_columns,
    dataset_info,
    dataset_service,
    open_dataset
} from '../../../service/views/sci_dataset/sci_dataset_service';
import {datasource_info, datasource_service} from '../../../service/views/sci_datasource/sci_datasource_service';

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
    totalnum = 10;
    opendataset: any = [];
    datasetColumns = dataset_columns;
    datasetInfos: any = [];

    dataengines: any = [];

    drawer_style = {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
    };

    mounted() {
        (<any>window).sci_dataset_context = this;
        this.refreshtable();
        this.refreshDataEngnie();
    }

    changePage(page: any) {
        this.currentpage = page;
        this.refreshtable();
    }

    refreshDataEngnie() {
        datasource_service.getDataEngine().then((data) => {
                console.log('/////////////////////////////dataengines' + '///////////////////dataset');
                console.log(data);
                this.dataengines = (<any>data).data.results;
            },
            (reason) => {

            });
    }

    importDataToSpace() {
        let content = null;
        let remark = null;
        if (this.selected_datatype == 1) {
            content = this.input_filepath;
        } else {
            content = this.selected_opensourcedata;
        }
        dataset_service.importDataSetToMySpace(this.input_datasetname, content, this.selected_datatype, this.input_datadescription, this.selected_datatmodel, remark).then((data) => {
                if (data.status == 201) {
                    this.$Notice.open({
                        title: '通知',
                        desc: '数据:  <span style="font-weight: bold">' + this.input_datasetname + '  </span>导入成功'
                    });
                    this.refreshtable();
                }
                console.log(data);
            },
            (reason) => {
                console.log(reason);
                this.$Notice.open({
                    title: '通知',
                    desc: '数据:  <span style="font-weight: bold; color: red">' + this.input_datasetname + '  </span>导入失败'
                });

            });


    }

    refreshtable() {
        dataset_service.getDatasetByPage(this.currentpage).then((data) => {
                this.datasetInfos = (<any>data).data.results;
                this.totalnum = (<any>data).data.count;
            },
            (reason) => {
                console.log(this.datasetInfos, "bbbbbbbbbbbbbbbb");
                this.$Notice.open({
                    title: '通知',
                    desc: '数据访问失败'
                });
            });

        dataset_service.getOpenSourceDataList().then((data) => {
                if (data.status == 201) {
                    this.opendataset = (<any>data).data.results;
                }
                console.log(data);
            },
            (reason) => {

            });

    }

    shareDataSet(row: any) {
        console.log(row)
        dataset_service.shareDataset(row.url);
        this.refreshtable();
    }


    deletDataSet(row: any) {
        dataset_service.deleteDataset(row.url);
        dataset_service.mock_deleteDataSet(row.id);
        this.refreshtable();
    }

    loadDataSetToDataSource() {
        datasource_service.loadDataSource(this.input_datasourcename, this.selected_enginetype, this.selected_dataset.url).then((data) => {
            console.log("/////////////////////////测试数据源导入")
            console.log(data)
            if (data.status == 201) {
                this.$Notice.open({
                    title: '通知',
                    desc: '数据源: <span style="font-weight: bold">' + this.input_datasourcename + '  </span> 创建成功'
                });
                this.show_import_dialog = false;
            }
        }, (reason) => {
            console.log("/////////////////////////测试数据源导入失败")
            console.log(reason)
        });

    }

}

