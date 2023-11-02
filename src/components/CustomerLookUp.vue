<template>
<div>
    <el-dialog title="Customer Look Up" :visible.sync="dialogTableVisible" width="80%" @close="onCloseDialogClick" append-to-body>
    <el-input
    size="mini"
    placeholder="Search Customer"
    v-model="filterVal"
    class="filterInput"
    @input="filterRecords"
    >
    </el-input>
    <el-row v-if="this.customerDataLoading">
    <div v-if="this.isIE">Loading...</div>
    <div v-if="!this.isIE" tabindex="0" aria-label="Loading" class="is-active inPageLoadingIcon" style="" aria-busy="true">
        <div class="vld-background"></div>
        <div class="vld-icon">
            <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" width="64" height="64" stroke="#000">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"></animateTransform>
                        </path>
                    </g>
                </g>
            </svg>
        </div>
    </div>
    </el-row>
    <el-table :data="customerList" @row-click="customerSelected" border height="55vh" fit style="width: 100%;" class="cursor" v-if="!this.customerDataLoading">
        <template v-for="header in tableHeader">
        <el-table-column :prop="header.prop" :label="header.label" :key="header.label" v-if="header.label === 'Telephone#'" width="180">
            <template slot-scope="scope">
                <span>{{phoneFormat(scope.row.telephone)}}</span>
            </template>
        </el-table-column >
        <el-table-column :prop="header.prop" :label="header.label" :key="header.label" v-else-if="header.label === 'Address'" width="500">
            <template slot-scope="scope">
                <span>{{scope.row.address}} {{scope.row.city}} {{scope.row.state}} {{scope.row.zip}}</span>
            </template>
        </el-table-column >
        <el-table-column :prop="header.prop" :label="header.label" :key="header.label" v-else>
        </el-table-column >
        </template>
    </el-table>

    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onCloseButtonClick">Close</el-button>
    </span>

    </el-dialog>
</div>
</template>

<script>
// import axios from 'axios';
// import moment from 'moment';

export default {
    name: "CustomerLookupModal",
    props: [ 'tableHeader', 'title'],
    data() {
        return {
            searchCustNum: '',
            customerList: [],
            filterVal:'',
            dialogTableVisible: false,
            fixCustomerList: [],
            customerDataLoading: false,
            isIE: false,
        }
    },
    beforeMount(){
        this.isIE = !!document.documentMode;
    },
    mounted(){

    },
    computed:{

    },
    watch:{

    },
    methods: {
        showModal(value){
            this.searchCustNum = value;
            this.dialogTableVisible = true;
            this.searchCustomerNumber();
        },

        closeModal(){
            this.dialogTableVisible = false;
        },

        searchCustomerNumber(){
            this.customerDataLoading = true;
            if(!isNaN(this.searchCustNum) && this.searchCustNum !== ''){
                for ( var i = this.searchCustNum.length; i < 5; i++ ) {
                    this.searchCustNum = '0' + this.searchCustNum;
                }
            }
            // let csrchdata = '';
            // let noReturn = '';
            // let twoline = 'Y';
            // let dwidth = '';
            // let err = '0';
            // let errmsg = '';
            let params = {
                curloc: 'curloc',
                show_active: 'N'
            }
            if(this.searchCustNum !== ''){
               params.search_value = this.searchCustNum
            }
            // axios.get('/netview/ar/CustomerSearch', { params })
            // .then( response => {
                this.customerDataLoading = false;
                // if (response.data.customers) {
                    this.customerList = [{"customer_num":"02728","name":"ANTHONY SMITH","rental_rate_typeid":"","territory":"","new_cod_flag":"Y","active_flag":"Y","address":"2601 TONGUE OIL RD","address2":"","address_string":"2601 TONGUE OIL RD, LEAKSVILLE MS 39451","city":"LEAKSVILLE","state":"MS","zip":"39451","email_address":"","telephone_string":"601-394-2728","telephone":"6013942728","fax_num":"","cell_num":"","method_of_payment":"$","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"03","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":0.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"06896","name":"ANTHONY SMITH","rental_rate_typeid":"","territory":"","new_cod_flag":"Y","active_flag":"Y","address":"15320 HIGHWAY 64","address2":"","address_string":"15320 HIGHWAY 64, LOXLEY AL 36551","city":"LOXLEY","state":"AL","zip":"36551","email_address":"","telephone_string":"251-945-6896","telephone":"2519456896","fax_num":"","cell_num":"","method_of_payment":"$","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":0.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"02021","name":"AUDREY SMITH","rental_rate_typeid":"","territory":"","new_cod_flag":"Y","active_flag":"Y","address":"2611 SOL DEARMON RD","address2":"","address_string":"2611 SOL DEARMON RD, MILLRY AL 36558","city":"MILLRY","state":"AL","zip":"36558","email_address":"","telephone_string":"251-846-2021","telephone":"2518462021","fax_num":"","cell_num":"","method_of_payment":"$","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":0.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"02673","name":"SMITH BROTHERS TIMBER CO","rental_rate_typeid":"","territory":"","new_cod_flag":"Y","active_flag":"Y","address":"3313 COUNTY ROAD 3","address2":"PO BOX 55","address_string":"3313 COUNTY ROAD 3, PO BOX 55, MILLRY AL 36558","city":"MILLRY","state":"AL","zip":"36558","email_address":"","telephone_string":"","telephone":"","fax_num":"","cell_num":"","method_of_payment":"$","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":0.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"00045","name":"BRUCE WESLEY SMITH","rental_rate_typeid":"","territory":"","new_cod_flag":"N","active_flag":"Y","address":"12810 BROMLEY ROAD","address2":"","address_string":"12810 BROMLEY ROAD, STAPLETON AL 36578","city":"STAPLETON","state":"AL","zip":"36578","email_address":"","telephone_string":"","telephone":"","fax_num":"","cell_num":"","method_of_payment":"AR","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":5.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"06369","name":"CARLTON SMITH","rental_rate_typeid":"","territory":"","new_cod_flag":"Y","active_flag":"Y","address":"1458 TATE RD","address2":"","address_string":"1458 TATE RD, MILLRY AL 36558","city":"MILLRY","state":"AL","zip":"36558","email_address":"","telephone_string":"251-846-6369","telephone":"2518466369","fax_num":"","cell_num":"","method_of_payment":"$","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":0.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"00262","name":"CHRISTOPHER P SMITH","rental_rate_typeid":"","territory":"","new_cod_flag":"N","active_flag":"Y","address":"1775 COUNTY ROAD 12","address2":"","address_string":"1775 COUNTY ROAD 12, GALLION AL 36742","city":"GALLION","state":"AL","zip":"36742","email_address":"","telephone_string":"","telephone":"","fax_num":"","cell_num":"","method_of_payment":"AR","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":1.0,"current_balance":0.0,"comments":[],"document_count":0},{"customer_num":"00718","name":"SMITH CONSTRUCTION LLC","rental_rate_typeid":"","territory":"","new_cod_flag":"Y","active_flag":"Y","address":"522 WICKSBURG RD","address2":"","address_string":"522 WICKSBURG RD, NEWTON AL 36352","city":"NEWTON","state":"AL","zip":"36352","email_address":"","telephone_string":"","telephone":"","fax_num":"","cell_num":"","method_of_payment":"$","monthly_credit_rating":[" "," "," "," "," "," "," "," "," "," "," "," "," "],"sales_tax_class":"","tax_code":"01","parts_sales_code_front":"01","parts_sales_code_back":"03","retail_price_code":"2","print_emailed_statement":"","rental_sales_code":"01","memo_balance":0.0,"credit_limit":0.0,"current_balance":0.0,"comments":[],"document_count":0}];//OriginalCopy of Data kept intact for filtering
                    if(this.customerList.length === 1){
                        this.$emit('customer-selected', { customer: this.customerList[0] });
                        this.closeModal();
                    // } else {
                        // this.fixCustomerList = this.customerList;
                    // }
                }

            // }).catch(error => {
              console.log();
                this.customerDataLoading = false;
            // });
        },

        onCloseButtonClick(){
            this.dialogTableVisible = false;
            this.$emit('customer-closed');
        },

        onCloseDialogClick() {
            this.dialogTableVisible = false;
            this.$emit('customer-closed');
        },

        customerSelected(customer){
            this.closeModal();
            this.$emit('customer-selected', { customer: customer });
            this.$emit('focus-customer');
        },

        closeBtnClicked(){
            this.$emit('customer-closed');
            this.closeModal();
            this.$emit('focus-vendor');
        },

        filterRecords(){
            let customerListTemp = this.fixCustomerList.slice(0); //OrigIntactData to TempData
            if(this.filterVal !== ''){ //Filter tempdata for inputTextFilter
                let val = this.filterVal.toUpperCase();
                customerListTemp = customerListTemp.filter( (item) => {
                    return ( item.customer_num.toUpperCase().indexOf(val) > -1  || item.name.toUpperCase().indexOf(val) > -1
                            || (item.telephone).indexOf(val) > -1);
                });
            }
            this.customerList = customerListTemp;
        },

        phoneFormat(phone) {
            let phoneDisplay = '';
            if( phone !== '' && phone.length == 10 ){
                phoneDisplay = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
            }
            if( phone !== '' && phone.length < 10){
                phoneDisplay = phone;
            }
            return phoneDisplay;
        }

    }

}
</script>

<style>
.el-dialog__headerbtn {
    top: 10px;
}
.el-dialog {
    //height: 60vh;
}
.inPageLoadingIcon {
    margin-top: 30px;
}
.el-dialog__title {
    color: white;
}
.filterInput{
    float: right;
    width: 20%;
    bottom: 10px;
}
.cursor{
    cursor: pointer;
}
</style>