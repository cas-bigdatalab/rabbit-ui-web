import Vue from 'vue';
import Component from 'vue-class-component';
import {
    space_columns,
    space_infos,
    space_service,
    status_columns,
    status_infos
} from '../../../service/views/sci_spaces/sci_spaces_service';
import {
    datasource_columns,
    datasource_info,
    datasource_service
} from '../../../service/views/sci_datasource/sci_datasource_service';
import {
    dataset_columns,
    dataset_service,
} from '../../../service/views/sci_dataset/sci_dataset_service';
import {util} from '../../../service/uitil/util';

@Component({})
export default class SciSpacesComponent extends Vue {


    show_dataset: boolean = false;
    show_datasource: boolean = false;
    show_status: boolean = false;


    currentpage = 1;
    totalnum = 2;
    spaceColumns = space_columns;
    spaceInfos: any = [];

    currentpage_datasource = 1;
    totalnum_datasource = 2;
    datasourceColumns = datasource_columns;
    datasourceInfos: any = [];


    currentpage_dataset = 1;
    totalnum_dataset = 2;
    datasetceColumns = dataset_columns;
    datasetInfos: any = [];
    instanceInfos: any = [];


    currentpage_status = 1;
    totalnum_status = 2;
    statusColumns = status_columns;
    statusInfos: any = [];


    alldatasets: any = [];
    alldatasource: any = [];

    select_dataset: any = null;
    select_datasource: any = null;
    gen_schema: any = [];
    model: any = {engines:[{"value":"http://10.0.88.2:800/api/space/dataengines/2/","name":"HDFS"},{"value":"http://10.0.88.2:800/api/space/dataengines/1/","name":"Hive"}]};
    formOptions: any = {};

    mounted() {
        console.log('hello from app');
        (<any>window).sci_spaces_context = this;
        this.refreshtable();
        this.vfg();
    }

    vfg() {
        let url = '/space/spaces/';
        util.options(url).then((data)=>{
            let vfgData = util.vfg_data(data, this.model, url);
            //console.log('dataset.component:'+ JSON.stringify(vfgData.gen_schema));
            this.gen_schema = vfgData.gen_schema;
            this.formOptions = vfgData.formOptions;
        });
    }

    changePage(pagenum: any) {
        this.currentpage = pagenum;
        this.refreshtable();
    }

    changePage_Datasource(pagenum: any) {
        this.currentpage_datasource = pagenum;
        this.refreshtable_datasource(this.select_datasource);
    }

    changePage_Dataset(pagenum: any) {
        this.currentpage_dataset = pagenum;
        this.refreshtable_dataset(this.select_dataset);
    }

    changePage_Status(pagenum: any) {
        this.currentpage_status = pagenum;
        this.refreshtable_status();
    }


    refreshtable() {
        space_service.getSpaceList(this.currentpage).then(
            (data) => {
                this.spaceInfos = (<any>data).data.results;
                console.log('///////////////////////////////获取spacelist成功');

                //获取用户名
                for (let item of this.spaceInfos) {
                    console.log(item);
                    if (item.owner != null) {
                        util.dir_get(item.owner).then((owner) => {
                            console.log('///////////////////////////////获取用户名成功');
                            let index = 0;
                            for (let item2 of this.spaceInfos) {
                                if (item2.owner == (<any>owner).data.url) {
                                    item2.username = (<any>owner).data.username;
                                    Vue.set(this.spaceInfos, index, item2);
                                }
                                index++;
                            }
                        }, (reason) => {
                            console.log('/////////////////////////////////获取用户名失败');
                            console.log(reason);
                        });
                    }

                }


                datasource_service.getAllData('/space/datasets/').then((data) => {
                    this.alldatasets = (<any>data).body.results;
                    let index = 0;
                    for (let item of this.spaceInfos) {
                        let num = 0;
                        for (let item2 of this.alldatasets) {
                            if (item2.owner == item.owner) {
                                num++;
                            }
                        }
                        item.datasetsnum = num;
                        Vue.set(this.spaceInfos, index, item);
                        index++;
                    }
                });


                datasource_service.getAllData('/space/datainstances/').then((data) => {
                    this.alldatasource = (<any>data).body.results;
                    let index = 0;
                    for (let item of this.spaceInfos) {
                        let num = 0;
                        for (let item2 of this.alldatasource) {
                            if (item2.owner == item.owner) [
                                num++
                            ];
                        }
                        item.datasourcesnum = num;
                        Vue.set(this.spaceInfos, index, item);
                        index++;
                    }
                });
            },
            (reason) => {
                console.log('///////////////////////////////获取spacelist失败');
                console.log(reason);
                this.spaceInfos = space_service.mock_getSpaceList(this.currentpage);
                this.totalnum = space_infos.totalnum;
            });
    }

    refreshtable_datasource(row: any) {
        // console.log(JSON.stringify(row.engines)+'LLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
        this.datasourceInfos = row.engines;
    }

    refreshtable_dataset(row: any) {
        //dataset_service.getDatasetByPage(this.currentpage).then();
        let temp = [];
        for (let item of this.alldatasets) {
            if (item.owner == row.owner) {
                temp.push(item);
            }
        }
        this.datasetInfos = temp;
        this.totalnum_dataset = temp.length;
    }

    refreshtable_status() {
        space_service.getSapceStatus(1).then((data) => {
                this.statusInfos = data;
            },
            (reason) => {
               // this.statusInfos = space_service.mock_getSapceStatus(this.currentpage);
                this.totalnum_status = status_infos.totalnum;
            });
    }

    showDataset(row: any) {
        this.show_dataset = true;
        this.select_dataset = row;
        this.refreshtable_dataset(row);
    }

    showDataSource(row: any) {
        this.show_datasource = true;
        this.select_datasource = row.engines;
        this.refreshtable_datasource(row);
    }

    showStatus(id: any) {
        this.show_status = true;
        this.refreshtable_status();
    }
}

