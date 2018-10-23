import {util} from '../../uitil/util';

export class DatasetService {

    getDatasetByPage(page: any) {
        let url = '/dataset/mydataset';
        let data = {
            page: page
        };
        return util.get(url, data);
    }

    getOpenSourceDataList() {
        let url = '/dataset/opendatasetlist';
        return util.get(url);
    }

    importDataSetToMySpace(name: any, content: any, type: any, description: any) {
        let url = '/dataset/importdatabasetomyspace';
        let data = {
            type: type,
            description: description,
            content: content
        };
        return util.get(url, data);
    }

    deleteDataSet(id: any) {
        let url = '/dataset/deletedataset';
        let data = {
            id: id
        };
        return util.get(url, data);
    }
    mock_deleteDataSet(id:any){

        for(let index in dataset_info.dataset){
            if(dataset_info.dataset[index].id==id){
                dataset_info.dataset.splice(parseInt(index),1);
                dataset_info.totalnum=dataset_info.totalnum-1;
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
            id:dataset_info.dataset.length+1,
            name:name,
            description:description,
            owner:'王华进',
            size:'1.3G',
            operation:1

        });
        dataset_info.totalnum=dataset_info.totalnum+1;
    }

    loadDataSet(from: any, to: any) {
        let url = '/dataset/loaddataset';
        let data = {
            from: from,
            to: to
        };
        return util.get(url, data);
    }


}

export let dataset_service = new DatasetService();
export let dataset_columns = [
    {
        title: '编号',
        key: 'id',
        width: 70,
    },
    {
        title: '名称',
        key: 'name'
    },
    {
        title: '归属',
        key: 'owner',
        tooltip: true
    },
    {
        title: '大小',
        key: 'size',
        width: 100,
    },
    {
        title: '描述',
        key: 'description',
        tooltip: true
    },
    {
        title: '操作',
        key: 'operation',
        width: 170,
        render: (h: any, params: any) => {
            if (params.row.operation == 1) {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            ghost: true
                        },
                        style: {
                            'margin-right': '10px'

                        },
                        on: {
                            click: () => {
                                (<any>window).sci_dataset_context.show_import_dialog = true;
                                (<any>window).sci_dataset_context.selected_dataset = params.row;
                            },
                        }
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
                        }
                    }, '移除')
                ]);
            } else {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            ghost: true
                        },
                        style: {
                            'margin-right': '5px'

                        },
                        on: {
                            click: (abc: any) => {
                                (<any>window).sci_dataset_context.show_import_dialog = true;
                                (<any>window).sci_dataset_context.selected_dataset = params.row;
                            },
                        }
                    }, '载入'),
                    h('Button', {
                        props: {
                            type: 'success',
                            size: 'small',
                            ghost: true
                        },
                        style: {
                            'margin-right': '5px'

                        }
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
                        }
                    }, '移除')
                ]);
            }

        }
    }
];
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
