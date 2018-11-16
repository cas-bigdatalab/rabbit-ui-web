import {util} from '../../uitil/util';

export class DatasetService {

    getAllDataset() {
        let url = '/space/datasets/';
        return util.get(url);
    }

    getDatasetByPage(page: any) {
        let url = '/space/datasets/?page=' + page;
        let data = {
            page: page
        };
        return util.get(url, data);
    }

    getOpenSourceDataList() {
        let url = '/space/datasets/?public=true';
        return util.get(url);
    }

    importDataSetToMySpace(name: any, content: any, type: any, description: any, datamodel: any, remark: any) {
        let url = '/space/datasets/';
        let data = {
            type: datamodel,
            description: description,
            remark: content,
            name: name,
            uri: name,
            remark: remark,
            owner: "http://10.0.88.2:800/api/emr/users/1/",
        };
        return util.post(url, data);
    }

    shareDataset(dataset_url: any) {
        let data = {
            "url": dataset_url,
            "public": true,
        }
        return util.patch_url(dataset_url,data).then(function (data) {
            // this.dataset = (<any>data).body.results
            console.log('///////////////////////////////////////////sharedataset');
        }).catch(err=>{
            console.log(err);
            alert(err);
        });
    }

    deleteDataset(url: any) {
        return util.delete_url(url).then(function (data) {
            // this.dataset = (<any>data).body.results
            console.log('///////////////////////////////////////////deletedataset');
        }).catch(err=>{
            console.log(err);
            alert(err);
        });
    }

    mock_deleteDataSet(id: any) {

        for (let index in dataset_info.dataset) {
            if (dataset_info.dataset[index].id == id) {
                dataset_info.dataset.splice(parseInt(index), 1);
                dataset_info.totalnum = dataset_info.totalnum - 1;
            }
        }
    }

    mock_getDatasetByPage(page: any) {
        let from = (page - 1) * 5;
        let to = page * 5;
        return dataset_info.dataset.slice(from, to);
    }

    mock_importDataSetToMySpace(name: any, content: any, type: any, description: any) {
        dataset_info.dataset.push({
            id: dataset_info.dataset.length + 1,
            name: name,
            description: description,
            owner: '王华进',
            size: '1.3G',
            operation: 1,

        });
        dataset_info.totalnum = dataset_info.totalnum + 1;
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
        render: (h, params) => {
            // let a = this;
            let texts ;
            if (params.row.size >= 1024) {
                texts = (params.row.size / 1024).toPrecision(4) + 'G';
            } else if (1 <= params.row.size < 1024) {
                texts = params.row.size.toPrecision(4) + 'M';
            } else if (0 < params.row.size < 1) {
                texts = (params.row.size * 1024) + 'KB';
            }
            return h('div', {
                props: {},
            }, texts)
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

/**
 * 数据集假数据
 * @type {[{id: number; name: string} , {id: number; name: string} , {id: number; name: string}]}
 */
export let dataset_info = {
        dataset: [
            {
                id: 1,
                name: '2012年10月对撞事例数据',
                owner: '共有数据集',
                size: '1.1G',
                description: '2012年10月对撞事例数据',
                operation: 1,
            }
            ,
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
            }
        ],
        totalnum: 4
    }
;

export let open_dataset = [
    {
        id: 1,
        name: '搜狗语料——新闻'
    },
    {
        id: 2,
        name: '2012天文星表'
    },
    {
        id: 3,
        name: '2018全球大气观测'
    }
];
