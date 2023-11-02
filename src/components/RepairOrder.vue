<template>
<el-form :inline="true" ref="form" label-width="120px">
    <el-dialog :visible.sync="dialogTableVisible" width="90%" class="repairOrderModalClass" append-to-Body>
        <template slot="title">
            <span class="el-dialog__title">Repair Order</span>
        </template>
        <el-row>
            <el-row>
                <el-form-item label="RO/Estimate #">
                    <el-input :value="form.repairOrder" @input="form.repairOrder = $event.toUpperCase()" type="text">
                    </el-input>
                </el-form-item>
                <span>
                    <el-form-item label="Service Writer">
                        <el-input
                        v-model="form.technician.id"
                        @keydown.native.enter="showTechnicianLookupModalOnEnter"
                        >
                        </el-input>
                    </el-form-item>
                </span>
            </el-row>
            <el-row>
                <el-form-item label="Customer">
                    <el-input 
                    v-model="form.customerState" 
                    @keydown.native.enter="showCustomerLookupModalOnEnter"
                    >
                    </el-input>
                </el-form-item>
                <span>
                    <el-form-item label="Purchase Order #">
                        <el-input :value="form.purchaseOrder" @input="form.purchaseOrder = $event.toUpperCase()" type="text">
                        </el-input>
                    </el-form-item>
                </span>
            </el-row>
            <el-row>
                <el-form-item label="Unit">
                    <el-input
                    v-model="form.stockState"
                    @keydown.native.enter="showUnitLookupModalOnEnter"
                    >
                    </el-input>
                </el-form-item>
                <span style="padding-left:5%">by</span>
                <el-radio-group v-model="stockValue" class="unitGroupStyle">
                    <el-radio-button label="stknum">Stock</el-radio-button>
                    <el-radio-button label="vinnum">VIN/Serial</el-radio-button>
                    <el-radio-button label="fltnum">Fleet</el-radio-button>
                    <el-radio-button label="licnum">License</el-radio-button>
                </el-radio-group>
            </el-row>
            <!-- <el-row>
                <el-form-item label="Purchase Order #">
                    <el-input :value="form.repairOrder" @input="form.repairOrder = $event.toUpperCase()" type="text">
                    </el-input>
                </el-form-item>
            </el-row> -->
            <el-row>
                <hr />
            </el-row>
            <el-row>
                <el-form-item label="Include :">
                    <el-radio-group v-model="includeTypeValue">
                        <el-radio-button label="R">Repair Orders</el-radio-button>
                        <el-radio-button label="E">Estimates</el-radio-button>
                        <el-radio-button label="B">Both</el-radio-button>
                    </el-radio-group>
                    <span style="padding-left:25px">
                        <el-checkbox v-model="form.customerChecked">Customer</el-checkbox>
                        <el-checkbox v-model="form.warrantyChecked">Warranty</el-checkbox>
                        <el-checkbox v-model="form.internalChecked">Internal</el-checkbox>
                        <el-checkbox v-model="form.otherChecked">Other</el-checkbox>
                    </span>
                </el-form-item>
            </el-row>
            <el-row>
                <hr />
            </el-row>
            <el-row>
                <el-form-item>
                    <el-radio-group v-model="ROTypeValue" class="ROTypeStyle">
                        <el-radio-button label="R">RO date</el-radio-button>
                        <el-radio-button label="P">Promised date</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="Report Period"
                    class="smallerLineHeightLabel"
                    prop="reportPeriod"
                >
                    <DatePicker
                    :id="['dateRange1','dateRange2']"
                    v-model="form.dateRange"
                    rangeseparator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    format="MM/dd/yyyy"
                    class="hideCloseIcon"
                    type="daterange"
                    :clearable="false"
                    title="Enter the beginning and end dates for this report"
                    >
                    </DatePicker>
                </el-form-item>
            </el-row>
            <el-row>
                <hr />
            </el-row>
            <el-row class="searchButton">
                <el-form-item>
                    <el-button 
                    type="primary"
                    icon="el-icon-search"
                    @click="searchRepairOrder"
                    >Search
                </el-button>
                </el-form-item>
            </el-row>
                <el-table border height="25vh" fit style="width: 100%;" class="repairOrderTable">
                    <!-- <template>
                    <el-table-column width="180">
                        <template slot-scope="scope">
                            <span></span>
                        </template>
                    </el-table-column >
                    <el-table-column width="500">
                        <template slot-scope="scope">
                            <span></span>
                        </template>
                    </el-table-column >
                     <el-table-column >
                    </el-table-column > -->
                    <!-- </template> -->
                </el-table>
        </el-row>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary">Close</el-button>
        </span> -->
        <customer-lookup-modal ref="customerLookupModal"  v-on:customer-selected="onCustomerSelect" :tableHeader="customerTableHeader" />
        <unit-lookup-modal ref="unitLookupModal"  v-on:unit-selected="onUnitSelect" />
    <technician-look-up-modal
      ref="techLookupModal"
      v-on:tech-selected="onTechSelect"
      v-on:tech-closed="onTechClose"
      :tableHeader="techTableHeader"
    />
    </el-dialog>
</el-form>
</template>

<script>
// import axios from 'axios';
// import moment from 'moment';
import DatePicker from './DatePicker.vue';
import CustomerLookUpModal from './CustomerLookUp.vue';
import UnitLookUpModal from './UnitLookUpModal.vue';

import TechnicianLookUpModal from "./TechnicianLookUpModal";

export default {
    name: "RepairOrderLookupModal",
    components: {
        DatePicker: DatePicker,
        'customer-lookup-modal': CustomerLookUpModal,
        'unit-lookup-modal': UnitLookUpModal,
        TechnicianLookUpModal
    },
    data() {
        return {
            form:{
                repairOrder:'',
                technician: {
                    id: '',
                    name: ''
                },
                customerState:'',
                customerNumber:'',
                customerName:'',
                stockState:'',
                customerChecked: true,
                warrantyChecked: true,
                internalChecked: true,
                otherChecked: true,
                dateRange: [],
            },
            customerTableHeader:[
                {prop: 'customer_num', label: 'Account#'},
                {prop: 'name', label: 'Name'},
                {prop: 'address', label: 'Address'},
                {prop: 'telephone', label: 'Telephone#'},
                {prop: 'new_cod_flag', label: 'Avg Cr'}
            ],
            stockValue: 'stknum',
            customer: '',
            customerSelectValue: false,
            includeTypeValue: 'R',
            ROTypeValue: 'R',
            dialogTableVisible: false,
            stockNumberDeterminedInvalid: false,
      techTableHeader: [
        { prop: "tech_num", label: "Number" },
        { prop: "tech_name", label: "Technician Name" },
      ],
        }
    },
    methods: {
        showModal(value){
          console.log(value);
            this.dialogTableVisible = true;
        },

        searchRepairOrder(){

        },

        onCustomerSelect(customer){
            // this.hideLoader();
            this.customerSelectValue = true;
            // this.hideLoader();
            window.testVariable = this;
            let customerData = customer.customer;
            this.form.customerState = customerData.customer_num+' - '+ customerData.name;
            this.form.customerNumber = customerData.customer_num;
            this.form.customerName = customerData.name;
        },
        
        onUnitSelect(unit){
            if (unit.stock_num) {
                this.form.stockState = unit.stock_num;
                this.stockNumberDeterminedInvalid = false;
                //this.getWashoutIDs();
            } else {
                this.stockNumberDeterminedInvalid = true;
            }
        },

        showTechnicianLookupModalOnEnter(){
          this.$refs.techLookupModal.showModal(this.form.technician.id);
        },

        showUnitLookupModalOnEnter(){
            this.$refs.unitLookupModal.showModal({
                stock: this.form.stockState.toUpperCase()
             });
        },

        showCustomerLookupModalOnEnter(){
            this.$refs.customerLookupModal.showModal(this.form.customerState.toUpperCase())
        },

        closeModal(){
            this.dialogTableVisible = false;
        },
    onTechSelect(tech) {console.log(tech);
      if (tech && tech.tech_num) {
        this.technicianDeterminedInvalid = false;
        this.form.technician.id = tech.tech_num;
        this.form.technician.name = tech.tech_name;
      } else {
        this.technicianDeterminedInvalid = true;
        this.form.technician.id = '';
        this.form.technician.name = '';
      }
    },
    onTechClose() {

    },
    }
}
</script>

<style>
.repairOrderModalClass > .el-dialog {
    height: 95vh;
    margin-top: 4vh !important;
    min-height: 630 px;
}
div.el-dialog__header {
  text-align: center;
}
.el-dialog__headerbtn {
  top: 10px;
}
.repairOrderModalClass > .el-dialog > .el-dialog__header > .el-dialog__title{
  color: white;
}
.el-form--inline .el-form-item__label {
    //vertical-align: bottom;
    text-align: right;
    padding: 0 9px 0 0;
    vertical-align: middle;
    line-height: 40px;
}
.el-input {
    width: calc(100% + 60px);
}
.unitGroupStyle {
    padding-left: 25px;
}
.el-row > span {
    padding-left: 15vh;
}
.el-checkbox__input.is-checked + span.el-checkbox__label {
    vertical-align: middle;
}
.ROTypeStyle {
    padding-left: 120px;
}
.el-date-editor .el-range-separator {
    text-transform: none;
}
.searchButton {
    text-align: center;
}
.repairOrderTable {
    height: calc(90vh - 385px) !important;
    max-height: 385px;
}
.unitLookupModalClass {
    padding: 50px;
}
</style>