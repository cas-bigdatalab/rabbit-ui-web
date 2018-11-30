import Vue from 'vue';
import Component from 'vue-class-component';
import {header_service} from '@/service/components/sci_header/sci_header_service';

@Component({})
export default class SciHeaderComponent extends Vue {

    isActive = false;

    user = {
        id: 1,
        name: '王华进'
    };

    mounted() {
        // header_service.getUserInfo(1).then(
        //     (data: any) => {
        //         this.user = data;
        //     },
        //     (reason) => {
        //         console.log(reason)
        //     });
    }
    // changePage(page: any) {
    //     this.currentpage = page;
    //     this.refreshtable();
    // }

    showUserMenu() {
        this.isActive = true;
    }

    dismissUserMenu() {
        this.isActive = false;
    }
}

