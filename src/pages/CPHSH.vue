<template>
<el-form :model="form" ref="form" :rules="rules" label-position="top" style="padding-top: 20px;">
    <el-row>
        <el-col :sm="4" :md="3" :lg="2">&nbsp;</el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="14">
        <el-row>
            <el-col :xs="24" :sm="15" :md="11" :lg="7" >
            <a  class="textNon" href=""> </a>
            </el-col>
        </el-row>
        <el-row>
            <el-col :sm="21" :md="19" class="lightPaddingLeftAndRight">
                <el-form-item prop="selectedCustomerNumber" label="Enter Customer Number:" class="showAsteriskBeforeValidation"

                >
                    <el-input
                    :ref="'customerNumberInput'"
                    class="input-with-button"
                    maxlength="5"
                    v-model="form.customerState"
                    @input="capitalized"
                    @change.native="showCustomerLookupModalOnChange"
                    @keydown.native.enter="showCustomerLookupModalOnEnter"
                    value-key="text"
                    >
                        <el-button
                        icon="el-icon-search"
                        slot="append"
                        class="inputButton"
                        v-model="form.customerState"
                        @click="showCustomerLookupModal"
                        ></el-button>
                    </el-input>    
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :sm="21" :md="19">
                <el-form-item label="Part Number" :class="{ marginBottom: form.partNumberInclude === 'All' }">
                    <el-radio-group v-model="form.partNumberInclude" @change="selectedPartNumberChange" >
                        <el-radio-button label="All"></el-radio-button>
                        <el-radio-button label="Select"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
            <el-row v-if="form.partNumberInclude === 'Select'">
                <el-col :sm="21" :md="19" class="lightPaddingLeftAndRight">
                    <el-form-item prop="selectedPartNumber" label="Enter Part Number:">
                        <el-input
                        ref="nextPartNumberRef"
                        :maxlength="20"
                        v-model="form.partNumberState"
                        value-key="text"
                        :autofocus="true"
                        @blur="partnumberEntered"
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col  :sm="21" :md="19" class="lightPaddingLeftAndRight">
                    <el-form-item prop="selectedVendor" label="Enter Vendor:"
                        v-if="form.partNumberInclude === 'Select'"
                    >
                        <el-select
                        ref="nextVendorRef"
                        v-model="form.vendorState"
                        placeholder="Select Vendor Number/No Vendor"
                        filterable
                        remote
                        default-first-option
                        maxlength="25"
                        >
                            <el-option v-for="item in vendors" :key="item.value" :label="item.text" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="21" :md="19" class="lightPaddingLeftAndRight">
                    <el-form-item prop="selectedPartType" label="Part Type:"
                        v-if="form.partNumberInclude === 'Select'"
                    >
                        <el-select
                        ref="nextPartTypeRef"
                        v-model="form.partTypeState"
                        placeholder="Select Type"
                        filterable
                        remote
                        default-first-option
                        >
                            <el-option v-for="item in partType" :key="item.value" :label="item.text" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col  :sm="21" :md="19" class="lightPaddingLeftAndRight">
                    <el-form-item label="All Dates"
                    >
                        <el-switch
                        v-model="form.dateRangeToggle"
                        active-color="#13ce66"
                        inactive-color="#ffffff"
                        :active-text="form.dateRangeToggle == true ? 'Yes' : 'No'"
                        @change="toggleDate"
                        
                    />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="!form.dateRangeToggle">
                <el-col :sm="21" :md="19">
                    <el-form-item
                    label="Select Date Range"
                    class="smallerLineHeightLabel"
                    prop="dateRange"
                    >
                        <DatePicker
                            :id="['dateRange1', 'dateRange2']"
                            v-model="form.dateRange"
                            rangeseparator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                            :clearable="true"
                            format="MM/dd/yyyy"
                            class="hideCloseIcon"
                            type="daterange"
                            title="Enter the beginning and end dates for this report"
                            
                        >
                        </DatePicker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="21" :md="19">
                    <el-form-item label="Detail or Summary">
                        <el-radio-group v-model="form.selectedDetail" style="padding-top: 8px;">
                            <el-radio-button  label="D">Show Invoice Detail</el-radio-button>
                            <el-radio-button label="S">Show Parts Summary</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="21" :md="19">
                    <el-form-item label="Look at">
                        <el-select
                        ref="nextLookRef"
                        v-model="form.selectedLook"
                        default-first-option
                        filterable
                        >
                            <el-option
                            v-for="(item, index) in look"
                            :key="item.value + index"
                            :label="item.text"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="21" :md="19">
                    <el-form-item label="Page Break By Month">
                        <el-switch
                        v-model="form.selectedPage"
                        active-color="#13ce66"
                        inactive-color="#ffffff"
                        :active-text="form.selectedPage == false ? 'No' : 'Yes'"
                        
                    />

                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="21" :md="19">
                    <el-form-item label="Printer Name"
                        :rules="{
                            required: true,
                            message: 'Please enter Required field.',
                        }"
                    >
                        <el-select
                        v-model="form.selectedPrinter"
                        default-first-option
                        filterable
                        >
                            <el-option
                            v-for="(item, index) in printers"
                            :key="item.value + index"
                            :label="item.text"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xs="24" :sm="15" :md="11" :lg="7" class="smallPaddingTop requiredInstructions">
                    * Required
                </el-col>
            </el-row> 
            <el-row>
                <el-col :xs="24" :sm="15" :md="11" :lg="7">
                    <el-form-item class="smallPaddingTop">
                    <el-button
                        type="primary"
                        @click="submitForm"
                        title="Print Report"
                        >Print Report</el-button>
                    </el-form-item>
                </el-col>
            </el-row> 
        </el-col>
    </el-row>
    <notifications group="messages" position="top right" />
    <customer-lookup-modal ref="customerLookupModal" v-on:customer-selected="onCustomerSelect" v-on:customer-closed="onCustomerClose" :tableHeader="customerTableHeader"  />
</el-form>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import DatePicker from '../../../../../common/shared-vue/common/DatePicker.vue';
import CustomerLookupModal from '../../../../../common/shared-vue/modals/CustomerLookupModal.vue';

const decimal = require("ascii-decimal");
export default {
    name: 'cpsh',
    components: {
        DatePicker: DatePicker,
        'customer-lookup-modal': CustomerLookupModal
    },
    props: ['params'],
    data (){
        return {
            form: {
                dateRange: [],
                dateRangeToggle: true,
                selectedCustomer:'',
                selectedVendor:'',
                selectedPartType:[],
                selectedPartNumber:'',
                selectedDetail:'D',
                selectedLook:'A',
                selectedPage:false,
                selectedPrinter: 'pdf',
                customerState:'',
                customerName:'',
                customerNumber:'',
                vendorState: '',
                partTypeState:'',
                partNumberState:'',
                partNumberInclude: 'All',
            },
            vendors:[
                {
                    text: "Select Vendor Number/No Vendor",
                    value: "",
                }
            ],
            customer:'',
            customerTableHeader:[
                {prop: 'customer_num', label: 'Account#'},
                {prop: 'name', label: 'Name'},
                {prop: 'address', label: 'Address'},
                {prop: 'telephone', label: 'Telephone#'},
                {prop: 'new_cod_flag', label: 'Avg Cr'}
            ],
            partType: [
                {value:'', text: 'Select Type'},
                {value: 'N  ', text: 'NEW'},
                {value: 'R  ', text: 'REMAN'},
                {value: 'C  ', text: 'CORE'},
                {value: 'U  ', text: 'USED'},
                {value: 'M  ', text: 'MEMO'}
            ],
            detail: [
                {value: 'I', text: 'Show Invoice Detail'},
                {value: 'P', text: 'Show Parts Summary'}
            ],
            look: [
                {value: 'A', text: 'POS, SMS, and SS Invoices'},
                {value: 'P', text: 'POS Invoices Only'},
                {value: 'S', text: 'SMS Invoices Only'},
                {value: 'N', text: 'SS Invoices Only'}
            ],
            page: [
                {value: 'Y', text: 'Yes'},
                {value: 'N', text: 'No'}
            ],
            printers:[],
            vendorListLoading: true,
            printerListLoading: true,
            reportButtonClicked: false,
            xmlData:'',
            dialogShowing: false,
            customerSelectValue: false,
            customerSearchEnter: false,
        }
    },
    computed: {
        rules() {
            return {
                selectedCustomerNumber:[
                    {
                        required: this.form.customerState === '' && this.reportButtonClicked,
                        message: "Customer Number is Required",
                    },
                    { 
                        required: this.form.customerState.length < 3 && this.form.customerState.length >= 0 && this.customerSearchEnter,
                        message: "Customer Length shoud be at least 3 characters ",
                    }

                ],
                // selectedVendor:[
                //     {
                //         required: this.form.vendorState === '' && this.reportButtonClicked,
                //         message: "Vendor is required.",
                //     }
                // ],
                selectedPartNumber:[
                    {
                        required: this.form.partNumberState === '' && this.reportButtonClicked,
                        message: "Part Number is required",
                        trigger: "blur"
                    },{
                        required: this.testPartNumberPattern(),
                        message: 'Allowed characters only'
                    }
                ],
                // selectedPartType:[
                //     {
                //         required: this.form.partTypeState === '' && this.reportButtonClicked,
                //         message: "Part Type is required"
                //     }
                // ]
            }
        }
    },
    beforeMount(){
        this.showLoader();
    },
    mounted(){
        this.vendorServiceCall(),
        this.printerServiceCall(),
    },

    methods: {
        testPartNumberPattern() {
            return !this.form.partNumberState.match(this.partNumberAllowedCharacters);
        },
        vendorServiceCall() {
            var xmlBodyStr = `<xml><curloc>${curloc}</curloc><userid>${userid}</userid><sortby>A</sortby></xml>`;

            var config = {
            headers: { "Content-Type": "text/xml" },
            };

            var parseString = require("xml2js").parseString;
    
            axios.post("/netview/in/VMMselxml", xmlBodyStr, config).then(response => {
            this.vendorListLoading = false;
            if(!this.printerListLoading) {
                this.hideLoader();
            }
            parseString(response.data, (err, result) => {
                this.xmlData = result.xml;
                let xml = result.xml;
                let keys = Object.keys(xml);
                keys.forEach((key) => {
                if (key.startsWith("R")) {
                    let valueAndText = xml[key][0];
                    let index = valueAndText.indexOf(' ');
                    let value = valueAndText.substring(0, index);
                    let text = valueAndText.substring(index + 1);
                    this.vendors.push({
                    text: value + ' - ' + text,
                    value,
                    });
                    this.vendors = this.vendors.sort((a,b) => a.value - b.value);
                }
                });
            });
            }).catch(error => {
            this.hideLoader();
            this.$notify({
                group: 'messages',
                type: 'error',
                title: 'Error',
                text: 'There was an error loading the form:' + error
            });
            });

        },

        printerServiceCall() {
            let params = {
                curloc: this.curloc,
                userid: this.user,
                replymode: "json",
                dilldownlevel: 0,
                see: "Y",
                seeoptions: "YYN",//pdf, rtf, csv
                spr: "Y",
                doc: "N",
            };
            axios.get("/netview/libx/svcsplsel", { params }).then((response) => {
            this.printerListLoading = false;
            if(!this.vendorListLoading) {
                this.hideLoader();
            }
            let printerList = response.data.data.list;
            printerList.forEach((element) => {
                if (element.spooler != "see") {
                this.printers.push({
                    text: `${element.spooler} - ${element.description}`,
                    value: element.spooler,
                });
                }
            });
            this.$refs.customerNumberInput.focus();
            }).catch(error => {
            this.hideLoader();
            this.$refs.customerNumberInput.focus();
            this.$notify({
                group: 'messages',
                type: 'error',
                title: 'Error',
                text: 'There was an error loading the form:' + error
            });
            });;
        },

        showCustomerLookupModal(e){ 
            this.customerSearchEnter = true;
            setTimeout(() => {
                this.$refs.form.validateField('selectedCustomerNumber');
            }, 100);
            if(!this.dialogShowing && this.form.customerState.length >= 3){
                this.dialogShowing = true;
                e.stopPropagation();
                this.$refs.customerLookupModal.showModal(this.form.customerState);  
            }
        },

        showCustomerLookupModalOnChange(e){
            this.customerSearchEnter = true;
            setTimeout(() => {
                this.$refs.form.validateField('selectedCustomerNumber');
            }, 100); 
            if(!this.dialogShowing && this.form.customerState.length >= 3){
                this.dialogShowing = true;
                e.stopPropagation();
                this.showLoader();
                this.$refs.customerLookupModal.showModal(this.form.customerState);  
            }
        },

        showCustomerLookupModalOnEnter(event){
            this.customerSearchEnter = true;
            setTimeout(() => {
                this.$refs.form.validateField('selectedCustomerNumber');
            }, 100);
            if(!this.dialogShowing && this.form.customerState.length >= 3){
                this.dialogShowing = true;
                event.stopPropagation();
                this.$refs.customerLookupModal.showModal(this.form.customerState); 
            }
        },

        capitalized(){
	        this.form.customerState = this.form.customerState.toUpperCase();
            this.customerSearchEnter = false;
        },

        onCustomerSelect(customer){
            this.hideLoader();
            this.dialogShowing = false;
            this.customerSelectValue = true;
            this.hideLoader();
            window.testVariable = this;
            let customerData = customer.customer;
            this.form.customerState = customerData.customer_num+' - '+ customerData.name;
            this.form.customerNumber = customerData.customer_num;
            this.form.customerName = customerData.name;
        },

        onCustomerClose(){
            this.hideLoader();
            this.dialogShowing = false;
            if(!this.customerSelectValue){
                this.form.customerState = '';
                this.form.customerNumber = '';
                this.form.customerName = '';
            }
            this.customerSelectValue = false;
        },

        selectedPartNumberChange() {
            this.form.partNumberState = '';
            this.form.vendorState = '';
            this.form.partTypeState = '';
            this.$nextTick(() => {
            if (this.form.partNumberInclude === 'Select' && this.$refs.nextPartNumberRef) 
                this.$refs.nextPartNumberRef.focus();
            });
            
        },

        convertStringToPaddedDecimal(input) {
            if (typeof input !== "string" || input.trim() === "") {
                return input;
            }
            let trimmedInput = input.trim();
            var output = "";
            for (var i = 0; i < input.length; i++) {
                let decimalValue = decimal(input.charAt(i));
                if (decimalValue < 10) {
                output += "00" + decimalValue;
                } else if (decimalValue < 100) {
                output += "0" + decimalValue;
                } else {
                output += decimalValue;
                }
            }
            return output;
        },

        getFormattedDecimal(arr) {
            let data = "";
            for (let i = 0; i < arr.length; i++) {
                data += this.convertStringToPaddedDecimal(arr[i].value);
            }
            return data;

        },

        toggleDate() {
            this.form.dateRange = (!this.form.dateRange||this.form.dateRange.length == 0)?[]:[];
        },

        submitForm() {
            this.reportButtonClicked = true;
            let me = this;
            Vue.nextTick( ()=> {
                me.$refs['form'].validate(valid => {
                    if (valid) {
                        me.showLoader();
                        let customerNumber = me.form.customerNumber;
                        let customerName = me.convertStringToPaddedDecimal(me.form.customerName);
                        let partNumber  = me.convertStringToPaddedDecimal(me.form.partNumberState);
                        let vendorNumber = me.form.vendorState;
                        if(vendorNumber){
                            vendorNumber = vendorNumber.split('-')[0].trim();
                        }
                        let partType = me.form.partTypeState.substr(0,1);
                        let detailSummary = me.form.selectedDetail;
                        let transType = me.form.selectedLook;
                        let begdate = me.form.dateRange && me.form.dateRange.length > 0 ? me.$moment(this.form.dateRange[0]).format("MMDDYYYY") : '';
                        let enddate = me.form.dateRange && me.form.dateRange.length > 0 ? me.$moment(this.form.dateRange[1]).format("MMDDYYYY") : '';
                        let pageByMonth = me.form.selectedPage ? 'Y' : 'N';
                        let printer = me.form.selectedPrinter == null ? '' : me.form.selectedPrinter;
                        let curloc = 'loc1';
                        var requestBody = `cust_num=${customerNumber}&part_num=${partNumber}&vndr_num=${vendorNumber}&part_type=${partType}&detl_summ=${detailSummary}&tran_type=${transType}&beg_date=${begdate}&end_date=${enddate}&page_by_mnth=${pageByMonth}&cust_name=${customerName}&curloc=${curloc}&printer=${printer}&verPar=067080083072032045032086101114115105111110032055046050051032049050047048057047049053`
                        var config = {
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        };
                        axios.post('/netview/in/CPSHdata', requestBody, config)
                        .then(response => {
                            me.hideLoader();
                            let data = response.data;
                            let fileName = data.replace(/^(.|[\r\n])*rptPath *value *= *"(.*out)(.|[\r\n])*$/ig, '$2');
                            if(fileName.length<30) {
                                me.print(me.form.selectedPrinter, curloc, fileName);
                            } else {
                                me.$notify({
                                    group: 'messages',
                                    type: 'error',
                                    title: 'Error',
                                    text: 'No records found',
                                    duration: -1
                                });
                            }
                        }).catch(error => {
                            me.hideLoader();
                            me.$notify({
                            group: 'messages',
                            type: 'error',
                            title: 'Error',
                            text: 'There was an error printing the form:' + error,
                                duration: -1
                            });
                        });
                    } 
                    else {
                        return false;
                    }
                });
            });
        },

        partnumberEntered() {
            let params = {
                curloc:loc1,
                partno:this.convertStringToPaddedDecimal(this.form.partNumberState),
                gotBarCode:'N',
                parent:''
            };
            axios.post('getparnum',params).then((res) => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
}
</script>

<style>
.inputButton {
    border: 1px solid red;
}
div.el-date-editor {
    border-color: #afafaf;
}
.input-width {
    width: 100%;
}
</style>