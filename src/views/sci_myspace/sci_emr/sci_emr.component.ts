import Vue from 'vue';
import Component from 'vue-class-component';

import {emr_service, instance_columns} from '../../../service/views/sci_emr/sci_emr_service';
import {space_service} from '@/service/views/sci_spaces/sci_spaces_service';
import {userinfo} from '@/service/components/sci_header/sci_header_service';
import {util} from '@/service/uitil/util';

@Component({})
export default class SciEmrComponent extends Vue {

    input_datasourcename: any = null;
    selected_enginetype: any = null;
    selected_dataset: any = null;

    show_webui: boolean = false;
    show_notebook: boolean = false;


    currentpage = 1;
    totalnum = 2;
    instanceColumns = instance_columns;
    instanceInfos: any = [];

    mounted() {
        console.log('hello from app');
        (<any>window).sci_datasource_context = this;
        this.refreshtable();
    }

    changePage(pagenum: any) {
        this.currentpage = pagenum;
        this.refreshtable()
    }

    refreshtable() {
        space_service.getInstanceByPage(this.currentpage).then((data) => {
                this.instanceInfos = (<any>data).data.results;
                this.totalnum = (<any>data).data.count;

            },
            (reason) => {
                console.log(this.instanceInfos, "bbbbbbbbbbbbbbbb");
                this.$Notice.open({
                    title: '通知',
                    desc: '数据访问失败'
                });
            });
    }
}

