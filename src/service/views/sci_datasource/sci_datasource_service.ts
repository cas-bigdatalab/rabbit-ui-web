import {util} from '../../uitil/util';

export class DataSourceService {

    getAllData(url: any) {
        return util.get(url);
    }

    /**
     * 获取options请求返回的数据  用来实现动态分页
     */
    getOpDatasource() {
        let url = '/space/datainstances/';
        return util.options(url);
    }

    getMyAllData(url: any) {
        return util.get(url);
    }

    getDataByPage(url: any, page: any) {
        url = url + page;
        let data = {
            page: page,
        };
        return util.get(url, data);
    }

    getDataEngine(url: any) {
        return util.get(url);
    }

    getOpenSourceDataList(url: any) {
        return util.get(url);
    }

    shareDataset(dataset_url: any) {
        let data = {
            'url': dataset_url,
            'public': true,
        };
        return util.patch_url(dataset_url, data).then(function (data) {
            // this.dataset = (<any>data).body.results
            //console.log('///////////////////////////////////////////sharedataset');
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    }

    deleteDataset(url: any) {
        return util.delete_url(url).then(function (data) {
            // this.dataset = (<any>data).body.results
            //console.log('///////////////////////////////////////////deletedataset');
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    }

    operateDataSource(url: any, id: any) {
        let data = {
            id: id
        };
        return util.get(url, data);
    }

    // startDataSource(url:any,id: any) {
    //     let data = {
    //         id: id
    //     };
    //     return util.get(url, data);
    // }
    //
    // stopDataSource(url:any,id: any) {
    //     let data = {
    //         id: id
    //     };
    //     return util.get(url, data);
    // }

    loadData(url: any, model: any) {
        //console.log('--------------------------------------------------');
        //console.log('Model:' + JSON.stringify(model) + 'url:' + url);
        let data;
        if (url === '/space/datasets/') {
            data = {
                type: model.type,
                description: model.description,
                name: model.name,
                uri: model.uri,
                remark: model.remark,
                size: model.size,
                enabled: model.enabled,
                remedy_script: model.remedy_script,
                public: model.public,
                source: model.source,
            };
        } else if (url === '/space/datainstances/') {
            data = {
                name: model.name,
                engine: model.engine,
                dataset: model.dataset,
                space: model.space,
                remedy_script: model.remedy_script,
                uri_suffix: model.uri_suffix,
                enabled: model.enabled,
                remark: model.remark,
                status: model.status,
                monitoring: model.monitoring,

            };
        } else if (url === '/space/spaces/') {
            data = {
                packone: model.packone,
                engines: model.engines,
                name: model.name,
                remedy_script: model.remedy_script,
                enabled: model.enabled,
                remark: model.remark,

            };
        } else if (url === '/cloud_adaptor/instances/') {
            data = {
                image: model.image,
                cluster: model.cluster,
                hostname: model.hostname,
                remedy_script_todo: model.remedy_script_todo,
                monitoring: model.monitoring,
                enabled: model.enabled,
                remark: model.remark,
                status: model.status,
                location: model.location,
                template: model.template,
            };
        } else {
            data=model;
        }
        return util.post(url, data);
    }

    /**
     * Load-----创建数据源
     * @param url
     * @param name
     * @param enginetype
     * @param dataset
     */
    datasetloadDataSource(url: any, name: any, enginetype: any, dataset: any) {
        let data = {
            name: name,
            engine: enginetype,
            dataset: dataset,
            space: 'http://10.0.88.2:800/api/space/spaces/29/',
        };
        return util.post(url, data);
    }

    deleteDataSource(url: any) {
        return util.delete_url(url).then(function (data) {
            // this.datasource = (<any>data).body.results
           // console.log('///////////////////////////////////////////deletedatasource');
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    }
}

export let datasource_columns = [
    /*{
        title: '编号',
        key: 'uuid',
        width: 70,
        tooltip: true
    },*/
    {
        title: 'name',
        key: 'name',
        tooltip: true,
    },
    {
        title: 'Dataset',
        key: 'dataset',
        tooltip: true,
        render: (h: any, params: any) => {
            // let a = this;
            // let texts ;
            // if (params.row.size >= 1024) {
            //     texts = (params.row.size / 1024).toPrecision(4) + 'G';
            // } else if (1 <= params.row.size < 1024) {
            //     texts = params.row.size.toPrecision(4) + 'M';
            // } else if (0 < params.row.size < 1) {
            //     texts = (params.row.size * 1024) + 'KB';
            // }
            return h('div', {
                props: {},
            }, params.row.dataset.name);
        },
    },
    {
        title: 'Engine',
        key: 'engine',
        tooltip: true,
        render: (h: any, params: any) => {
            return h('div', {
                props: {},
            }, params.row.engine.name);
        },
    },
    {
        title: 'Size',
        key: 'size',
        tooltip: true,
        // render: (h, params) => {
        //     // let a = this;
        //     let texts;
        //     if (params.row.size >= 1024) {
        //         texts = (params.row.size / 1024).toPrecision(4) + 'G';
        //     } else if (1 <= params.row.size < 1024) {
        //         texts = params.row.size.toPrecision(4) + 'M';
        //     } else if (0 < params.row.size < 1) {
        //         texts = (params.row.size * 1024) + 'KB';
        //     }
        //     return h('div', {
        //         props: {},
        //     }, texts);
        // },
    },
    {
        title: 'Status',
        key: 'status',
        tooltip: true,
        render: (h: any, params: any) => {
            const states = ['No Status', 'Running', 'Blocking', 'Hanging', 'stopped', 'In The Collapse', 'Suspended', 'Loss Of Association',];
            return h('span', states[params.row.status]);
        },
    },
    {
        title: 'Operate',
        key: 'operation',
        width: 180,
        render: (h: any, params: any) => {
            let statebutton = 'Stop';
            if (params.row.state === 0) {
                statebutton = 'Start Up';
            } else {
                statebutton = 'Stop';
            }

            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small',
                        ghost: true,
                    },
                    style: {
                        'margin-top': '5px',
                        'margin-bottom': '5px',
                        'margin-right': '5px',
                    },
                    on: {
                        click: () => {
                            if (params.row.state === 0) {
                                (<any> window).sci_datasource_context.start_DataSource(params.row.id);
                            } else {
                                (<any> window).sci_datasource_context.stop_DataSource(params.row.id);
                            }
                        },
                    },
                }, statebutton),
                h('Button', {
                    props: {
                        type: 'success',
                        size: 'small',
                        ghost: true,
                    },
                    style: {
                        'margin-top': '5px',
                        'margin-bottom': '5px',
                    },
                    on: {
                        click: () => {
                            (<any> window).sci_datasource_context.show_WebUI();
                            (<any> window).sci_datasource_context.dialog_title = '数据引擎WebUI（' + params.row.enginetype + ')';
                            (<any> window).sci_datasource_context.selected_datasource = params.row;
                        },
                    },
                }, 'WebUI'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small',
                    },
                    style: {
                        'margin-top': '5px',
                        'margin-bottom': '5px',
                        'margin-right': '5px',
                    },
                    on: {
                        click: () => {
                            (<any> window).sci_datasource_context.delete_DataSource(params.row);
                        },
                    },
                }, 'Delete'),
                h('Button', {
                    props: {
                        type: 'info',
                        size: 'small',
                    },
                    style: {
                        'margin-top': '5px',
                        'margin-bottom': '5px',
                    },
                    on: {
                        click: () => {
                            (<any> window).sci_datasource_context.show_SimbaUI();
                            (<any> window).sci_datasource_context.dialog_title = 'Simba Analysis（' + params.row.name + ')';
                            (<any> window).sci_datasource_context.selected_datasource = params.row;
                        },
                    },
                }, 'Simba Query'),
            ]);

        },
    },
];
export let datasource_info = {
    datasource: [
        {
            id: 1,
            name: '对撞事例数据源',
            dataset: '共有数据集',
            enginetype: 'eventdb',
            size: '1.1G',
            state: 1,
            operation: 1,
        }
        ,
        {
            id: 2,
            name: '测试数据源',
            dataset: 'TP-CH数据源',
            enginetype: 'hive',
            size: '1G',
            state: 0,
            operation: 1,
        },
    ],
    totalnum: 2,
};

export let my_all_dataset = [
    {
        id: 1,
        name: '2012年10月对撞事例数据',
        owner: '共有数据集',
        size: '1.1G',
        description: '2012年10月对撞事例数据',
        operation: 1,
    },
    {
        id: 2,
        name: 'Lubm模拟数据',
        owner: '王华进',
        size: '0.75G',
        description: '对LUBM数据进行扩展生成的数据',
        operation: 1,
    },
    {
        id: 3,
        name: 'TP-CH模拟数据',
        owner: '王华进',
        size: '1G',
        description: '使用TP-CH生成工具生成的数据',
        operation: 2,
    },
    {
        id: 4,
        name: '搜狗语料——新闻',
        owner: '共有数据集',
        size: '1.39G',
        description: '搜狗公司提供的开源语料库，包括20个类别，10000个新闻',
        operation: 2,
    },
];
export let datasource_service = new DataSourceService();
