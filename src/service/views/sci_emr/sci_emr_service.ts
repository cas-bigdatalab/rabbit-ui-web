import {util} from '../../uitil/util';

export class EmrService {
    getVMList(page: any) {
        let url = '/dataset/mydataset';
        let data = {
            page: page,
        };
        return util.get(url, data);
    }
}

export let emr_service = new EmrService();

export let instance_columns = [
    /*{
        title: '编号',
        key: 'name',
        width: 70,
    },*/
    {
        title: 'Instance Name',
        key: 'hostname',
    },
    {
        title: 'Instance Status',
        key: 'status',
        tooltip: true,
        render: (h: any, params: any) => {
            if (params.row.status === 1) {
                return h('div', 'Running');
            }
            if (params.row.status === 11) {
                return h('div', '创建中...');
            }
        },
    },
    {
        title: 'Type',
        render: (h: any, params: any) => {
            if (params.row.hostname.indexOf('slave') > -1) {
                return h('div', 'Slave node');
            }
            if (params.row.hostname.indexOf('master') > -1) {
                return h('div', 'master node');
            }
        },
    },
    {
        title: 'Instance IP',
        key: 'ipv4',
        tooltip: true,
    }
];
export let results = {
    'count': 6,
    'next': null,
    'previous': null,
    'results': [
        {
            'url': 'http://127.0.0.1:8080/emr/instances/142/',
            'uuid': '64e20bf5-5bb2-4618-806e-c2a50f1e3f26',
            'name': '1',
            'hostname': 'master1.packone',
            'ipv4': '10.0.88.27',
            'ipv6': null,
            'enabled': true,
            'remedy_script_todo': null,
            'remedy_script_history': '###cluster hosts update###\necho \'10.0.88.27 master1 master1.packone\'>>/etc/hosts\necho \'10.0.88.51 master2 master2.packone\'>>/etc/hosts\necho \'10.0.88.52 slave0001 slave0001.packone\'>>/etc/hosts\nmkfs.xfs /dev/vdb;mv /data /data.old;mkdir -p /data;mount /dev/vdb /data;cp -rf /data.old/* /data;echo \'/dev/vdb /data xfs defaults 0 2\'>>/etc/fstab\nhostnamectl set-hostname master1.packone\n###cluster.blueprint remedy###\nkillall java; killall python; killall redis\r\nrsync -ax /hadoop /data; mv /hadoop /hadoop.old;\r\nln -sf /data/hadoop /hadoop\r\nsed 3d /etc/hosts|sed 3d|sed 3d>/etc/hosts\r\nreboot\n',
            'remark': null,
            'create_time': '2018-10-29T16:25:21',
            'status': 11,
            'monitoring': true,
            'template': 'http://127.0.0.1:8080/emr/instancetemplates/4/',
            'image': 'http://127.0.0.1:8080/emr/images/119/',
            'cluster': 'http://127.0.0.1:8080/emr/clusters/50/',
            'owner': null,
        },
        {
            'url': 'http://127.0.0.1:8080/emr/instances/143/',
            'uuid': '09c5948d-98b1-419d-a708-21f3f34a77d5',
            'name': '1',
            'hostname': 'master2.packone',
            'ipv4': '10.0.88.51',
            'ipv6': null,
            'enabled': true,
            'remedy_script_todo': null,
            'remedy_script_history': '###cluster hosts update###\necho \'10.0.88.27 master1 master1.packone\'>>/etc/hosts\necho \'10.0.88.51 master2 master2.packone\'>>/etc/hosts\necho \'10.0.88.52 slave0001 slave0001.packone\'>>/etc/hosts\nmkfs.xfs /dev/vdb;mv /data /data.old;mkdir -p /data;mount /dev/vdb /data;cp -rf /data.old/* /data;echo \'/dev/vdb /data xfs defaults 0 2\'>>/etc/fstab\nhostnamectl set-hostname master2.packone\n###cluster.blueprint remedy###\nkillall java; killall python; killall redis\r\nrsync -ax /hadoop /data; mv /hadoop /hadoop.old;\r\nln -sf /data/hadoop /hadoop\r\nsed 3d /etc/hosts|sed 3d|sed 3d>/etc/hosts\r\nreboot\n',
            'remark': null,
            'create_time': '2018-10-29T16:25:26',
            'status': 11,
            'monitoring': true,
            'template': 'http://127.0.0.1:8080/emr/instancetemplates/4/',
            'image': 'http://127.0.0.1:8080/emr/images/120/',
            'cluster': 'http://127.0.0.1:8080/emr/clusters/50/',
            'owner': null,
        },
        {
            'url': 'http://127.0.0.1:8080/emr/instances/144/',
            'uuid': '773780ef-cbf5-4586-932d-09c39fdd89fe',
            'name': '1',
            'hostname': 'slave0001.packone',
            'ipv4': '10.0.88.52',
            'ipv6': null,
            'enabled': true,
            'remedy_script_todo': null,
            'remedy_script_history': '###cluster hosts update###\necho \'10.0.88.27 master1 master1.packone\'>>/etc/hosts\necho \'10.0.88.51 master2 master2.packone\'>>/etc/hosts\necho \'10.0.88.52 slave0001 slave0001.packone\'>>/etc/hosts\nmkfs.xfs /dev/vdb;mv /data /data.old;mkdir -p /data;mount /dev/vdb /data;cp -rf /data.old/* /data;echo \'/dev/vdb /data xfs defaults 0 2\'>>/etc/fstab\nhostnamectl set-hostname slave0001.packone\n###instance.image.remedy_script###\necho \'test\'\n###cluster.blueprint remedy###\nkillall java; killall python; killall redis\r\nrsync -ax /hadoop /data; mv /hadoop /hadoop.old;\r\nln -sf /data/hadoop /hadoop\r\nsed 3d /etc/hosts|sed 3d|sed 3d>/etc/hosts\r\nreboot\n',
            'remark': null,
            'create_time': '2018-10-29T16:25:30',
            'status': 11,
            'monitoring': true,
            'template': 'http://127.0.0.1:8080/emr/instancetemplates/3/',
            'image': 'http://127.0.0.1:8080/emr/images/121/',
            'cluster': 'http://127.0.0.1:8080/emr/clusters/50/',
            'owner': null,
        },
        {
            'url': 'http://127.0.0.1:8080/emr/instances/145/',
            'uuid': 'c98d3417-5f86-47ae-821f-2ce5017c18ed',
            'name': '1',
            'hostname': 'master1.packone',
            'ipv4': '10.0.88.53',
            'ipv6': null,
            'enabled': true,
            'remedy_script_todo': null,
            'remedy_script_history': '###cluster hosts update###\necho \'10.0.88.53 master1 master1.packone\'>>/etc/hosts\necho \'10.0.88.54 master2 master2.packone\'>>/etc/hosts\necho \'10.0.88.60 slave0001 slave0001.packone\'>>/etc/hosts\nmkfs.xfs /dev/vdb;mv /data /data.old;mkdir -p /data;mount /dev/vdb /data;cp -rf /data.old/* /data;echo \'/dev/vdb /data xfs defaults 0 2\'>>/etc/fstab\nhostnamectl set-hostname master1.packone\n###cluster.blueprint remedy###\nkillall java; killall python; killall redis\r\nrsync -ax /hadoop /data; mv /hadoop /hadoop.old;\r\nln -sf /data/hadoop /hadoop\r\nsed 3d /etc/hosts|sed 3d|sed 3d>/etc/hosts\r\nreboot\n',
            'remark': null,
            'create_time': '2018-10-29T16:37:24',
            'status': 1,
            'monitoring': true,
            'template': 'http://127.0.0.1:8080/emr/instancetemplates/4/',
            'image': 'http://127.0.0.1:8080/emr/images/119/',
            'cluster': 'http://127.0.0.1:8080/emr/clusters/51/',
            'owner': null,
        },
        {
            'url': 'http://127.0.0.1:8080/emr/instances/146/',
            'uuid': '122a1677-a199-494f-8c4f-7195a8a5205e',
            'name': '1',
            'hostname': 'master2.packone',
            'ipv4': '10.0.88.54',
            'ipv6': null,
            'enabled': true,
            'remedy_script_todo': null,
            'remedy_script_history': '###cluster hosts update###\necho \'10.0.88.53 master1 master1.packone\'>>/etc/hosts\necho \'10.0.88.54 master2 master2.packone\'>>/etc/hosts\necho \'10.0.88.60 slave0001 slave0001.packone\'>>/etc/hosts\nmkfs.xfs /dev/vdb;mv /data /data.old;mkdir -p /data;mount /dev/vdb /data;cp -rf /data.old/* /data;echo \'/dev/vdb /data xfs defaults 0 2\'>>/etc/fstab\nhostnamectl set-hostname master2.packone\n###cluster.blueprint remedy###\nkillall java; killall python; killall redis\r\nrsync -ax /hadoop /data; mv /hadoop /hadoop.old;\r\nln -sf /data/hadoop /hadoop\r\nsed 3d /etc/hosts|sed 3d|sed 3d>/etc/hosts\r\nreboot\n',
            'remark': null,
            'create_time': '2018-10-29T16:37:28',
            'status': 1,
            'monitoring': true,
            'template': 'http://127.0.0.1:8080/emr/instancetemplates/4/',
            'image': 'http://127.0.0.1:8080/emr/images/120/',
            'cluster': 'http://127.0.0.1:8080/emr/clusters/51/',
            'owner': null,
        },
        {
            'url': 'http://127.0.0.1:8080/emr/instances/147/',
            'uuid': '49123b06-28ef-4e83-9e82-4b37a762b86a',
            'name': '1',
            'hostname': 'slave0001.packone',
            'ipv4': '10.0.88.60',
            'ipv6': null,
            'enabled': true,
            'remedy_script_todo': null,
            'remedy_script_history': '###cluster hosts update###\necho \'10.0.88.53 master1 master1.packone\'>>/etc/hosts\necho \'10.0.88.54 master2 master2.packone\'>>/etc/hosts\necho \'10.0.88.60 slave0001 slave0001.packone\'>>/etc/hosts\nmkfs.xfs /dev/vdb;mv /data /data.old;mkdir -p /data;mount /dev/vdb /data;cp -rf /data.old/* /data;echo \'/dev/vdb /data xfs defaults 0 2\'>>/etc/fstab\nhostnamectl set-hostname slave0001.packone\n###instance.image.remedy_script###\necho \'test\'\n###cluster.blueprint remedy###\nkillall java; killall python; killall redis\r\nrsync -ax /hadoop /data; mv /hadoop /hadoop.old;\r\nln -sf /data/hadoop /hadoop\r\nsed 3d /etc/hosts|sed 3d|sed 3d>/etc/hosts\r\nreboot\n',
            'remark': null,
            'create_time': '2018-10-29T16:37:32',
            'status': 1,
            'monitoring': true,
            'template': 'http://127.0.0.1:8080/emr/instancetemplates/3/',
            'image': 'http://127.0.0.1:8080/emr/images/121/',
            'cluster': 'http://127.0.0.1:8080/emr/clusters/51/',
            'owner': null,
        },
    ],
};
