<template>
    <div class="position-body p-table-wrap mod-full-page">
        <div class="p-table-wrap-header f-pa-t">
            <div class="p-br-header">
                <el-row>
                    <el-col :span="6">
                        <button class="el-button btn-orange">新增</button>
                    </el-col>
                    <el-col :span="18" class="f-tar">
                        <div class="p-search-bar">
                            <!-- <div class="el-input el-input--medium">
                                {{vnum}}<v-number v-model="vnum" name="mynumber" :disabled="vdisabled" :max="1000" :min="10" @change="showchange(vnum)" @blur="showblur(vnum)"></v-number>
                            </div> -->
                            <el-input v-model="formInline.user" size="medium" placeholder="审批人"></el-input>
                            <el-select v-model="formInline.region" size="medium" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <el-input-number size="medium" v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" style="width:160px;"></el-input-number>
                            <button class="el-button search-btn" @click="onSubmit">查询</button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="p-table-wrap-body">
            <el-table :data="tableData" class="p-table-green p-thead-lg p-table-center" :stripe="true" border height="100%" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <ButtonDelete url="/delete" :params="{item:scope.row}"></ButtonDelete>
                        <button class="el-button el-button--mini btn-green" @click="handleDelete(scope.$index, scope.row)">删除</button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="p-table-wrap-footer f-pa-b f-tac">
            <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
									 :total="1000">
			</el-pagination>
        </div>
    </div>
</template>
<script>
import pageMixin from '../common/pageMixin'
import vNumber from '../common/MyNum.vue';
export default {
    components:{vNumber},
    mixins: [pageMixin],
    data: function () {
        return { 
            centerDialogVisible: false,
            visible: false,
            num1: 1,
            vnum: 1,
            vdisabled:false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            formInline: {
                user: '',
                region: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleEdit(){

        },
        handleDelete(){

        },
        handleChange(value) {
            console.log(value);
        },
        showchange(value){
            console.log('sc',value);
        },
        showblur(value){
            console.log('sb',value);
        }
    }
}
</script>
<style lang="css" scoped>
</style>
