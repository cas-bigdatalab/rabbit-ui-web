import {util} from '../../uitil/util';

export class SpaceService {
    getInstanceByPage(page: any) {
        let url = '/emr/instances/?page=' + page;
        let data = {
            page: page
        };
        return util.get(url, data);
    }
    getSpaceList(page: any) {
        let url = '/space/spaces/';
        let data = {
            page: page
        };
        return util.get(url, data);
    }

    mock_getSpaceList(page: any) {
        let from = (page - 1) * 5;
        let to = page * 5;
        return space_infos.spaces.slice(from, to);
    }

    getSapceStatus(id: any) {
        let url = '/space/spacelist';
        let data = {
            page: id
        };
        return util.get(url, data);
    }

    mock_getSapceStatus(page: any) {
        let from = (page - 1) * 10;
        let to = page * 10;
        return status_infos.status.slice(from, to);
    }
}

export let space_service = new SpaceService();
export let space_columns = [
    {
        title: '工作空间',
        key: 'name',
    },
    {
        title: '用户',
        key: 'username'
    },
    {
        title: '数据集',
        tooltip: true,
        render: (h: any, params: any) => {
            return h('a', {
                on: {
                    click: () => {
                        (<any>window).sci_spaces_context.showDataset(params.row);
                    },
                }
            }, '共' + params.row.datasetsnum + '个');
        }
    },
    {
        title: '数据库',
        render: (h: any, params: any) => {
            return h('a', {
                on: {
                    click: () => {
                        (<any>window).sci_spaces_context.showDataSource(params.row);
                    },
                }
            }, '共' + params.row.datasourcesnum + '个');
        }
    },
    {
        title: '流水线',
        tooltip: true,
        render: (h: any, params: any) => {
            return h('span', '正常');
        }
    },
    {
        title: '工作簿',
        tooltip: true,
        render: (h: any, params: any) => {
            return h('span', '正常');
        }
    },
    {
        title: '状态',
        tooltip: true,
        render: (h: any, params: any) => {
            return h('a', {
                on: {
                    click: () => {
                        (<any>window).sci_spaces_context.showStatus(params);
                    },
                }
            }, '查看详情');
        }
    },

];

export let space_infos = {
    totalnum: 6,
    spaces: [
        {
            name: 'whua1_space',
            username: '王华静1',
            datasets: 4,
            datasources: 5,
            piflow: 1,
            notebook: 1,
            status: 1,
            userid: 6
        },
        {
            name: 'whua1_space',
            username: '王华静2',
            datasets: 4,
            datasources: 5,
            piflow: 1,
            notebook: 1,
            status: 1,
            userid: 5
        },
        {
            name: 'whua1_space',
            username: '王华静3',
            datasets: 4,
            datasources: 5,
            piflow: 1,
            notebook: 1,
            status: 1,
            userid: 4
        },
        {
            name: 'whua1_space',
            username: '王华静4',
            datasets: 4,
            datasources: 5,
            piflow: 1,
            notebook: 1,
            status: 1,
            userid: 3
        },
        {
            name: 'whua1_space',
            username: '王华静5',
            datasets: 4,
            datasources: 5,
            piflow: 1,
            notebook: 1,
            status: 1,
            userid: 2
        },
        {
            name: 'whua1_space',
            username: '王华静6',
            datasets: 4,
            datasources: 5,
            piflow: 1,
            notebook: 1,
            status: 1,
            userid: 1
        },
    ]
};


export let status_columns = [
    {
        title: 'space指标',
        key: 'name',
    },
    {
        title: '指标状态',
        key: 'value',
    }
];

export let status_infos = {
    totalnum: 8,
    status: [
        {
            name: 'gstore三元组',
            value: '10亿'
        }
        ,
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
        {
            name: 'gstore三元组',
            value: '10亿'
        },
    ]
};
