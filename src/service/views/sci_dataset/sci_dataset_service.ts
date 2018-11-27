import {util} from '../../uitil/util';

export class DatasetService {

    getAllDataset() {
        let url = '/space/datasets/';
        return util.get(url);
    }

    getOpDataset() {
        let url = '/space/datasets/';
        return util.options(url);
    }

    getDatasetByPage(page: any) {
        let url = '/space/datasets/?page=' + page;
        let data = {
            page: page
        };
        return util.get(url, data);
    }

    getOpenSourceDataList(url: any) {
        return util.get(url);
    }

    importDataSetToMySpace(url: any, model: any) {
        let data;
        if (url == '/space/datasets/') {
            data = {
                type: model.type,
                description: model.description,
                name: model.name,
                uri: model.uri,
                remark: model.remark,
            }
        }else if(url == '/space/datainstances/'){
            data = {
                name: model.name,
                engine: model.engine,
                dataset: model.dataset,
                space: model.space,
            };
        }
        return util.post(url, data);
    }

    shareDataset(dataset_url: any) {
        let data = {
            'url': dataset_url,
            'public': true,
        };
        return util.patch_url(dataset_url, data).then(function (data) {
            // this.dataset = (<any>data).body.results
            console.log('///////////////////////////////////////////sharedataset');
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    }

    deleteDataset(url: any) {
        return util.delete_url(url).then(function (data) {
            // this.dataset = (<any>data).body.results
            console.log('///////////////////////////////////////////deletedataset');
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    }

    loadDataSet(from: any, to: any) {
        let url = '/dataset/loaddataset';
        let data = {
            from: from,
            to: to,
        };
        return util.get(url, data);
    }

}

export let dataset_service = new DatasetService();
export let dataset_columns = [
    /*{
        title: '编号',
        key: 'uuid',
        width: 70,
        tooltip: true,
    },*/
    {
        title: '名称',
        key: 'name',
    },
    {
        title: '归属',
        key: 'owner',
        tooltip: true,
    },
    {
        title: '大小',
        key: 'size',
        width: 100,
        render: (h: any, params: any) => {
            // let a = this;
            let texts;
            if (params.row.size >= 1024) {
                texts = (params.row.size / 1024).toPrecision(4) + 'G';
            } else if (params.row.size >= 1 && params.row.size < 1024) {
                texts = params.row.size.toPrecision(4) + 'M';
            } else if (params.row.size > 0 && params.row.size < 1) {
                texts = (params.row.size * 1024) + 'KB';
            }
            return h('div', {
                props: {},
            }, texts);
        },
    },
    {
        title: '描述',
        key: 'description',
        tooltip: true,
    },
    {
        title: '操作',
        key: 'operation',
        width: 170,
        render: (h: any, params: any) => {
            if (params.row.operation === 1) {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            ghost: true,
                        },
                        style: {
                            'margin-right': '10px',

                        },
                        on: {
                            click: () => {
                                (<any>window).show_import_dialog = true;
                                (<any>window).sci_dataset_context.selected_dataset = params.row;
                                console.log('-----------------' + params.row + '-----------');
                            },
                        },
                    }, '载入'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                (<any>window).sci_dataset_context.deletDataSet(params.row);
                            },
                        },
                    }, '移除'),
                ]);
            } else {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            ghost: true,
                        },
                        style: {
                            'margin-right': '5px ',

                        },
                        on: {
                            click: (abc: any) => {
                                (<any> window).sci_dataset_context.show_import_dialog = true;
                                (<any> window).sci_dataset_context.selected_dataset = params.row;
                            },
                        },
                    }, '载入'),
                    h('Button', {
                        props: {
                            type: 'success',
                            size: 'small',
                            ghost: true,
                        },
                        style: {
                            'margin-right': '5px',
                        },
                        on: {
                            click: () => {
                                (<any>window).sci_dataset_context.shareDataSet(params.row);
                            },
                        },
                    }, '分享'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                (<any>window).sci_dataset_context.deletDataSet(params.row);
                            },
                        },
                    }, '移除'),
                ]);
            }

        }
    }
];

