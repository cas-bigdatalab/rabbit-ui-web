import Vue from 'vue';
import Component from 'vue-class-component';
import SciMenuComponent from '@/components/sci_menu/sci_menu.component';

@Component({
    components: {
        SciMenuComponent,
    },
})
export default class SciMyspaceComponent extends Vue {

    mounted() {
        console.log('hello from app');
    }

}

