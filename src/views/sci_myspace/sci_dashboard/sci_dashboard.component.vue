<template>
    <Row>
        <Row class="info-header">
            <Col>
            <span></span>
            <Divider type="vertical"/>
            Create a SciSpace
            </Col>
        </Row>
        <Row class="dataset-content">
            <Tabs value="name1" class='tab'>
                <TabPane label="Step 1: Customize Cluster" name="name1">
                    <vue-form-generator :schema="cluster_schema" :model="model" :options="formOptions"></vue-form-generator>
                </TabPane>
                <TabPane label="Step 2: Customize Packone" name="name2">
                    <vue-form-generator :schema="packone_schema" :model="model" :options="formOptions"></vue-form-generator>
                </TabPane>
                <TabPane label="Step 3: Customize Space" name="name3">
                    <vue-form-generator :schema="space_schema" :model="model" :options="formOptions"></vue-form-generator>
                </TabPane>
            </Tabs>
        </Row>
    </Row>
</template>
<script lang="ts" src="./sci_dashboard.component.ts"></script>
<style scoped lang="less">
.tab{
    max-width: 700px;
}
.operation-area{
  border-left: solid 2px;
  height: 100%;
  padding-left: 10px;
}

.ivu-input-group-prepend{
  padding: 0;
}

.ivu-divider, .ivu-divider-vertical{
  margin: 0 3px;
  display: inline-block;
  height: 0.9em;
  width: 2px;
  vertical-align: middle;
  position: relative;
  top: -0.06em;
  background-color: #5b6270;
}

.dataset-header{
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 20px;
}

.dataset-content-left{
  height: 100%;
  padding-right: 20px;
}

.dataset-content{
  height: 100%;
}


.operation-header{
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
}

</style>
