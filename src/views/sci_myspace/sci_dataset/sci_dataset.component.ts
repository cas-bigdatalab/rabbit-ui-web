import Vue from 'vue';
import Component from 'vue-class-component';
import {
    dataset_columns,
    dataset_info,
    dataset_service,
    open_dataset
} from '../../../service/views/sci_dataset/sci_dataset_service';
import {datasource_info, datasource_service} from '../../../service/views/sci_datasource/sci_datasource_service';
import VueFormGenerator from "vue-form-generator";

class NewDataSet{
    datasetModel: string;
    constructor(message: string) {
        this.datasetModel = message;
    }
    currentpage = 1;
    datasetInfos: any = [];
    totalnum = 2;
    opendataset :any = [];
    mounted() {
        console.log('hello from app');
        (<any>window).sci_dataset_context = this;
        this.newDataset();
    }

    newDataset() {
        // console.log(this.datasetModel);
        dataset_service.importDataSetToMySpace(this.datasetModel).then((data) => {
                 console.log('//////////////////////////////////创建数据源成功');
                 console.log(data);
                if (data.status == 201) {
                    // this.$Notice.open({
                    //     title: '通知',
                    //     desc: '数据源  <span style="font-weight: bold">' + '  </span>创建成功'
                    // });
                    dataset_service.getDatasetByPage(this.currentpage).then(
                        (data) => {
                            console.log('//////////////////////////////////////////');
                            console.log(data);
                            this.datasetInfos = (<any>data).data.results;
                            this.totalnum = (<any>data).data.count;
                            console.log('////////////////////////' + this.totalnum);
                        });
                    alert('数据集创建成功');
                }else{
                    alert('数据集创建失败');
                }
            },
            (reason) => {
                console.log('//////////////////////////////////创建数据源错误');
                console.log(reason);
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
}

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
    totalnum :any=null;
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
    schema:any = [];
    gen_schema: any = [];
    model: any = {};
    formOptions: any = {};

    mounted() {
        (<any>window).sci_dataset_context = this;
        this.refreshtable();
        this.refreshDataEngnie();
    }

    // changePage(page: any) {
    //     this.currentpage = page;
    //     this.refreshtable();
    // }

    refreshDataEngnie() {
        datasource_service.getDataEngine().then((data) => {
                console.log('/////////////////////////////dataengines' + '///////////////////dataset');
                console.log(data);
                this.dataengines = (<any>data).data.results;
            },
            (reason) => {

            });
    }

    // importDataToSpace() {
    //     let content = null;
    //     let remark = null;
    //     if (this.selected_datatype == 1) {
    //         content = this.input_filepath;
    //     } else {
    //         content = this.selected_opensourcedata;
    //     }
    //     dataset_service.importDataSetToMySpace(this.input_datasetname, content, this.selected_datatype, this.input_datadescription, this.selected_datatmodel, remark).then((data) => {
    //             if (data.status == 201) {
    //                 this.$Notice.open({
    //                     title: '通知',
    //                     desc: '数据:  <span style="font-weight: bold">' + this.input_datasetname + '  </span>导入成功'
    //                 });
    //                 this.refreshtable();
    //             }
    //             console.log(data);
    //         },
    //         (reason) => {
    //             console.log(reason);
    //             this.$Notice.open({
    //                 title: '通知',
    //                 desc: '数据:  <span style="font-weight: bold; color: red">' + this.input_datasetname + '  </span>导入失败'
    //             });
    //         });
    // }

    refreshtable() {
        dataset_service.getDatasetByPage(this.currentpage).then((data) => {
                this.datasetInfos = (<any>data).data.results;
                this.totalnum = (<any>data).data.count;
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' + this.totalnum);
            },
            (reason) => {
                console.log(this.datasetInfos, "bbbbbbbbbbbbbbbb");
                this.$Notice.open({
                    title: '通知',
                    desc: '数据访问失败'
                });
            });

        dataset_service.getOpDataset().then((data:any)=>{
            this.schema = (<any>data).data.actions.POST;
            // console.log(JSON.stringify(this.schema));
            this.formOptions = {
                validateAfterLoad: true,
                validateAfterChanged: true,
            };
            for (let elem in this.schema) {
                let value = this.schema[elem];
                if (value.read_only) continue;
                let gen_field = <any>{};
                switch (value.type) {
                    case 'boolean':
                        gen_field.type = 'checkbox';
                        break;
                    case 'integer':
                        gen_field.type = 'input';
                        gen_field.inputType = 'number';
                        gen_field.validator = VueFormGenerator.validators.number;
                    case 'string':
                        gen_field.type = 'input';
                        gen_field.inputType = 'text';
                        gen_field.validator = VueFormGenerator.validators.string;
                        VueFormGenerator.component;
                        break;
                    case 'field':
                        if ('choices' in value) {
                            gen_field.type = 'select';
                            gen_field.values = [];
                            for (let c of value.choices) {
                                gen_field.values.push({'id': c.value, 'name': c.display_name});
                            }
                        }
                        break;
                    case 'datetime':
                        gen_field.type = 'dateTimePicker';
                        gen_field.dateTimePickerOptions = {'format': 'HH:mm:ss'};
                        break;
                    case 'choice':
                        gen_field.type = 'select';
                        gen_field.values = [];
                        for (let c of value.choices) {
                            gen_field.values.push({'id': c.value, 'name': c.display_name});
                        }
                        break;
                    default:
                        break;
                }

                if ('default' in value) {
                    gen_field.default = value.default;
                }
                if ('help_text' in value) {
                    gen_field.hint = value.help_text;
                }
                gen_field.model = elem;
                gen_field.label = value.label;
                gen_field.required = value.required;
                gen_field.readonly = value.read_only;
                if (value.required) {
                    gen_field.validator = VueFormGenerator.validators.string;
                }
                // console.log(gen_field);
                this.gen_schema.push(gen_field);
                // break;
            }
            //console.log(JSON.stringify(this.gen_schema));
            let aa = new NewDataSet(this.model);
            let jd = {
                'type': 'submit',
                'buttonText': 'Submit',
                'validateBeforeSubmit': true,
                'onSubmit': function () {
                    aa.newDataset();
                },
            };

            this.gen_schema.push(jd);
            this.gen_schema = {'fields': this.gen_schema};
        })

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
        //dataset_service.mock_deleteDataSet(row.id);
        this.refreshtable();
    }

    /**
     * 载入-创建数据源
     */
    // loadDataSetToDataSource() {
    //     datasource_service.loadDataSource(this.input_datasourcename, this.selected_enginetype, this.selected_dataset.url).then((data) => {
    //         console.log("/////////////////////////测试数据源导入")
    //         console.log(data)
    //         if (data.status == 201) {
    //             this.$Notice.open({
    //                 title: '通知',
    //                 desc: '数据源: <span style="font-weight: bold">' + this.input_datasourcename + '  </span> 创建成功'
    //             });
    //             this.show_import_dialog = false;
    //         }
    //     }, (reason) => {
    //         console.log("/////////////////////////测试数据源导入失败")
    //         console.log(reason)
    //     });
    //
    // }

}

