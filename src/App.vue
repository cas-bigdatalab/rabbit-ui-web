<template>
    <Layout id="app" class="layout-app">
        <Header>
            <sci-header-component></sci-header-component>
        </Header>
        <Layout>
            <Sider hide-trigger>
                <sci-menu-component></sci-menu-component>
            </Sider>
            <Layout class="layout-content">
                <router-view/>
            </Layout>
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

    .layout-content {
        padding: 0 24px 24px;
    }

    .ivu-layout-sider {
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        position: relative;
        background: rgb(234, 237, 241);
        min-width: 0;
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
    export default class Home extends Vue {
    }
</script>
