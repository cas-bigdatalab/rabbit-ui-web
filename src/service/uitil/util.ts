import Vue from 'vue';
import axios from 'axios';
import VueFormGenerator from 'vue-form-generator';
import {datasource_service} from '@/service/views/sci_datasource/sci_datasource_service';

class DataModel {
    model: string;
    url: string;

    constructor(message: string, url: string) {
        this.model = message;
        this.url = url;
    }

    currentpage = 1;
    dataInfos: any = [];
    totalnum = 2;

    mounted() {
        (<any>window).util_context = this;
        this.post();
    }

    post() {
        datasource_service.loadData(this.url, this.model).then((data) => {
                console.log('//////////////////////////////////创建数据源成功');
                console.log(data);
                if (data.status == 201) {
                    // this.$Notice.open({
                    //     title: '通知',
                    //     desc: '数据源  <span style="font-weight: bold">' + '  </span>创建成功'
                    // });
                    // alert('数据源创建成功');
                    // datasource_service.getDataByPage(this.url + '/?page=', this.currentpage).then(
                    //     (data) => {
                    //         //console.log('//////////////////////////////////////////');
                    //         //console.log(data);
                    //         this.dataInfos = (<any>data).data.results;
                    //         this.totalnum = (<any>data).data.count;
                    //         for (let item of this.dataInfos) {
                    //             item.size = '4';
                    //         }
                    //     });
                }
            },
            (reason) => {
                console.log('//////////////////////////////////创建数据源错误');
                console.log(reason);
            });


    }
}

export default class Util extends Vue {
    private HOST = 'http://10.0.88.2:800/api';
    private POST_HOST = 'http://10.0.88.2:800/api';

    public put_url(url: any, data: any, options: any = {}) {
        return axios.put(url, data, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    public patch_url(url: any, data: any, options: any = {}) {
        return axios.patch(url, data, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    /**
     * options 请求json数据  实现动态创建form表单
     * @param url
     * @param data
     * @param options
     */
    public options(url: any, data: any = {}, options: any = {}) {
        return axios({
            method: 'options',
            url: this.HOST + url,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
    }

    public post(url: any, data: any, options: any = {}) {
        return axios.post(this.POST_HOST + url, data, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
            // headers: {
            //     Authorization: 'Basic ' + Base64.encode('admin:admin'),
            //     'Access-Control-Allow-Origin': '*'
            // },
            // emulateHTTP: true,
            // emulateJSON: true
        });
    }

    public get_url(url: any, data: any = {}, options: any = {}) {
        return axios.get(url, data = {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    public get(url: any, data: any = {}, options: any = {}) {
        url = this.HOST + url;
        return this.get_url(url);
    }

    public dir_get(url: any, data: any = {}) {
        return axios.get(this.HOST + url, data = {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    public delete_url(url: any) {
        return axios.delete(url, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    /**
     * 自动生成表单
     * @param url
     */
    public vfg_data(data: any, model: any, url: any) {
        let schema = data.data.actions.POST;
        // console.log(this.schema);
        //console.log('options///////' + JSON.stringify(this.schema) + '///////options');
        let gen_schema: any = [];

        for (let elem in schema) {
            let value = schema[elem];
            if (value.read_only) continue;
            let gen_field = <any>{};
            switch (value.type) {
                case 'boolean':
                    gen_field.type = 'checkbox';
                    break;
                case 'string':
                    gen_field.type = 'input';
                    gen_field.inputType = 'text';
                    gen_field.validator = VueFormGenerator.validators.string;
                    break;
                case 'integer':
                    gen_field.type = 'input';
                    gen_field.inputType = 'number';
                    gen_field.validator = VueFormGenerator.validators.number;
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
            gen_schema.push(gen_field);
            // break;
        }
        //console.log(JSON.stringify(this.gen_schema));
        let dm = new DataModel(model, url);
        let submitButton = <any>{
            'type': 'submit',
            'buttonText': 'Submit',
            'validateBeforeSubmit': true,
            'onSubmit': function () {
                dm.post();
            },
        };
        gen_schema.push(submitButton);
        gen_schema = {'fields': gen_schema};
        //console.log('+++++++++++++++++++++++++++++++________________________________+++++++++++++++++++++++++' + JSON.stringify(gen_schema));
        let vfg_data = {
            'gen_schema': gen_schema,
            'formOptions': {
                validateAfterLoad: true,
                validateAfterChanged: true,
            }
        };
        //console.log('UTILS.vfg_data:returned' + JSON.stringify(vfg_data));
        return vfg_data;
    }
}
export let util = new Util();