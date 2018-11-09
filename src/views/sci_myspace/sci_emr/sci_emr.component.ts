import Vue from 'vue';
import Component from 'vue-class-component';

import {emr_service, v_columns, vm_info} from '../../../service/views/sci_emr/sci_emr_service';
import {space_service} from '@/service/views/sci_spaces/sci_spaces_service';
import {userinfo} from '@/service/components/sci_header/sci_header_service';
import {util} from '@/service/uitil/util';

@Component({})
export default class SciEmrComponent extends Vue {

    input_datasourcename:any=null;
    selected_enginetype:any=null;
    selected_dataset:any=null;

    show_webui:boolean=false;
    show_notebook:boolean=false;


    currentpage = 1;
    totalnum = 2;
    vmColumns = v_columns;
    vmInfos: any = [];

    mounted() {
        console.log('hello from app');
        (<any>window).sci_datasource_context=this;
        this.refreshtable();
    }

    changePage(pagenum: any) {
        this.currentpage = pagenum;
        this.refreshtable()
    }


    refreshtable(){
        space_service.getSpaceList(1).then((data)=>{
            console.log("///////////////////////////获取space列表")
            let spaces=(<any>data).body.results;
            for (let item of spaces){
                if(item.owner==userinfo.ownerurl){
                    util.dir_get(item.cluster).then((data)=>{
                        let cluster=(<any>data).body;
                        let temp=[];
                        for(let instan of cluster.instance_set){
                            temp.push({
                                url: instan
                            })
                        }
                        this.vmInfos=temp;

                        for(let inner_item of this.vmInfos){
                            util.dir_get(inner_item.url).then((data)=>{
                                let index=0;
                                for (let inner_item2 of this.vmInfos){
                                    if(inner_item2.url==(<any>data).body.url){
                                        Vue.set(this.vmInfos, index, (<any>data).body)
                                    }
                                    index++;
                                }

                            })
                        }
                    })
                }
            }
        })

    }

}

