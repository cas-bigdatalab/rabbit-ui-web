<template>
    <Layout id="app" class="layout-app">
        <Header>
            <sci-header-component v-model="header_selected"></sci-header-component>
        </Header>
        <Layout>
            <router-view/>
        </Layout>
    </Layout>
</template>

<style lang="less" scoped>
    .layout-app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
    .ivu-menu-horizontal {
        height: 50px;
        line-height: 50px;
    }

    .ivu-layout-header {
        background: #515a6e;
        padding: 0 0px;
        height: 50px;
        line-height: 50px;
    }

</style>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HelloWorld from "@/components/HelloWorld.vue";
    import SciMenuComponent from "./components/sci_menu/sci_menu.component";
    import SciHeaderComponent from "./components/sci_header/sci_header.component";

    @Component({
        components: {
            HelloWorld,
            SciMenuComponent,
            SciHeaderComponent
        },
    })
    export default class App extends Vue {
        header_selected:number=-1;
    }
</script>
