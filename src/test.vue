<template>
    <el-form :model="form" ref="form" :rules="rules" style="padding-top: 20px;" label-position="top" class="forceUpperCase">
        <el-row>
            <el-col class="hidden-xs-only" :sm="1" :md="2">&nbsp;</el-col>
            <el-col :sm="20" :md="15" :lg="13">
                <div>
                    <el-form-item
                        label="Report Period"
                        class="smallerLineHeightLabel"
                        prop="reportPeriod"
                    >
                        <DatePicker
                        :id="['dateRange1','dateRange2']"
                        v-model="form.reportPeriod"
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
                </div>

                <el-row>
                    <el-form-item label="Unit Stock Numbers">
                        <el-radio-group v-model="unitStockNumbersRadioValue">
                            <el-radio-button label="all">All</el-radio-button>
                            <el-radio-button label="range">Range</el-radio-button>
                            <el-radio-button label="select">Select</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row v-if="unitStockNumbersRadioValue === 'range'">
                    <el-col :sm="12">
                        <el-form-item
                        label="Start"
                        prop="unitStockNumbersRangeStart"
                        style="padding-right: 10px"
                    >
                            <el-input
                                v-model="form.unitStockNumbersRangeStart"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12">
                        <el-form-item
                        label="End"
                        prop="unitStockNumbersRangeEnd"
                        style="padding-left: 10px"
                        >
                            <el-input
                                v-model="form.unitStockNumbersRangeEnd"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="unitStockNumbersRadioValue === 'select'">
                    <el-col :sm="12" class="multiSelectBox_nextValue">
                        <el-form-item
                        ref="nextUnitNumberSelectValueFormItem"
                        label="Enter Unit value"
                        prop="nextunitNumberSelectValue"
                        class="multiSelectBox_formItem"
                        >
                            <el-input
                            ref="nextUnitNumberSelectValue"
                            :disabled="form.selectedUnitStockNumbers.length >= 6"
                            v-model="form.nextUnitNumberSelectValue"
                            @change="addValueToMultiSelectBox(
                            $event,
                            form.selectedUnitStockNumbers,
                            allowedCharactersPattern,
                            20,
                            'nextUnitNumberSelectValue',
                            'nextUnitNumberSelectValue')"
                            class="multiSelectBox_textbox"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12" class="multiSelectBox_selected">
                        <div class="labelHeader">Selected unit numbers: ({{ 6 - form.selectedUnitStockNumbers.length }} remaining)</div>
                        <div class="multiSelectBox el-select__tags marginBottom5px" :class="{ disableSelected: form.selectedUnitStockNumbers.length === 0 }">
                            <span v-for="unitNumber in form.selectedUnitStockNumbers" class="el-tag el-tag--info el-tag--small">
                            <span class="el-select__tags-text">{{ unitNumber }}</span
                            ><i class="el-tag__close el-icon-close" @click="removeValueFromArray(unitNumber, form.selectedUnitStockNumbers)"></i>
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <hr />
                </el-row>

                <el-row class="">
                    <el-form-item label="Locations">
                        <el-radio-group v-model="locationRadioValue">
                            <el-radio-button label="all">All</el-radio-button>
                            <el-radio-button label="range">Range</el-radio-button>
                            <el-radio-button label="select">Select</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row v-if="locationRadioValue === 'range'">
                    <el-col :sm="12">
                        <el-form-item
                        label="Starting Loc"
                        prop="locationRangeStart"
                        style="padding-right: 10px"
                        >
                            <el-input
                                v-model="form.locationRangeStart"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12">
                        <el-form-item
                        label="Ending Loc"
                        prop="locationRangeEnd"
                        style="padding-left: 10px"
                        >
                            <el-input
                                v-model="form.locationRangeEnd"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="locationRadioValue === 'select'">
                    <el-col :sm="12" class="multiSelectBox_nextValue">
                        <el-form-item
                        ref="nextLocationSelectValueFormItem"
                        label="Enter Location"
                        prop="nextLocationSelectValue"
                        class="multiSelectBox_formItem"
                        >
                            <el-input
                                ref="nextLocationSelectValue"
                                :disabled="form.selectedLocation.length >= 6"
                                v-model="form.nextLocationSelectValue"
                                @change="addValueToMultiSelectBox(
                                $event,
                                form.selectedLocation,
                                allowedCharactersPattern2,
                                8,
                                'nextLocationSelectValue',
                                'nextLocationSelectValue')"
                                class="multiSelectBox_textbox"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12" class="multiSelectBox_selected">
                        <div class="labelHeader">Selected Location: ({{ 6 - form.selectedLocation.length }} remaining)</div>
                        <div class="multiSelectBox el-select__tags marginBottom5px" :class="{ disableSelected: form.selectedLocation.length === 0 }">
                            <span v-for="location in form.selectedLocation" class="el-tag el-tag--info el-tag--small">
                                <span class="el-select__tags-text">{{ location }}</span
                                ><i class="el-tag__close el-icon-close" @click="removeValueFromArray(location, form.selectedLocation)"></i>
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <hr />
                </el-row>

                <el-row class="">
                    <el-form-item label="User IDs">
                        <el-radio-group v-model="userIDRadioValue">
                            <el-radio-button label="all">All</el-radio-button>
                            <el-radio-button label="range">Range</el-radio-button>
                            <el-radio-button label="select">Select</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row v-if="userIDRadioValue === 'range'">
                    <el-col :sm="12">
                        <el-form-item
                        label="Start"
                        prop="userIDRangeStart"
                        style="padding-right: 10px"
                        >
                            <el-input
                                v-model="form.userIDRangeStart"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12">
                        <el-form-item
                        label="End"
                        prop="userIDRangeEnd"
                        style="padding-left: 10px"
                        >
                            <el-input
                                v-model="form.userIDRangeEnd"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="userIDRadioValue === 'select'">
                    <el-col :sm="12" class="multiSelectBox_nextValue">
                        <el-form-item
                        ref="nextUserIDSelectValueFormItem"
                        label="Enter User ID"
                        prop="nextUserIDSelectValue"
                        class="multiSelectBox_formItem"
                        >
                            <el-input
                                ref="nextUserIDSelectValue"
                                :disabled="form.selectedUserID.length >= 6"
                                v-model="form.nextUserIDSelectValue"
                                @change="addValueToMultiSelectBox(
                                $event,
                                form.selectedUserID,
                                allowedCharactersPattern,
                                8,
                                'nextUserIDSelectValue',
                                'nextUserIDSelectValue')"
                                class="multiSelectBox_textbox"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12" class="multiSelectBox_selected">
                        <div class="labelHeader">Selected User ID: ({{ 6 - form.selectedUserID.length }} remaining)</div>
                        <div class="multiSelectBox el-select__tags marginBottom5px" :class="{ disableSelected: form.selectedUserID.length === 0 }">
                            <span v-for="userID in form.selectedUserID" class="el-tag el-tag--info el-tag--small">
                                <span class="el-select__tags-text">{{ userID }}</span
                                ><i class="el-tag__close el-icon-close" @click="removeValueFromArray(userID, form.selectedUserID)"></i>
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <hr />
                </el-row>

                <el-row class="">
                    <el-form-item label="Mobile IDs">
                        <el-radio-group v-model="mobileIDRadioValue">
                            <el-radio-button label="all">All</el-radio-button>
                            <el-radio-button label="range">Range</el-radio-button>
                            <el-radio-button label="select">Select</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row v-if="mobileIDRadioValue === 'range'">
                    <el-col :sm="12">
                        <el-form-item
                        label="Start"
                        prop="mobileIDRangeStart"
                        style="padding-right: 10px"
                        >
                            <el-input
                                v-model="form.mobileIDRangeStart"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12">
                        <el-form-item
                        label="End"
                        prop="mobileIDRangeEnd"
                        style="padding-left: 10px"
                        >
                            <el-input
                                v-model="form.mobileIDRangeEnd"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="mobileIDRadioValue === 'select'">
                    <el-col :sm="12" class="multiSelectBox_nextValue">
                        <el-form-item
                        ref="nextMobileIDSelectValueFormItem"
                        label="Enter Mobile ID"
                        prop="nextMobileIDSelectValue"
                        class="multiSelectBox_formItem"
                        >
                            <el-input
                                ref="nextMobileIDSelectValue"
                                :disabled="form.selectedMobileID.length >= 6"
                                v-model="form.nextMobileIDSelectValue"
                                @change="addValueToMultiSelectBox(
                                $event,
                                form.selectedMobileID,
                                allowedCharactersPattern,
                                8,
                                'nextMobileIDSelectValue',
                                'nextMobileIDSelectValue')"
                                class="multiSelectBox_textbox"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12" class="multiSelectBox_selected">
                        <div class="labelHeader">Selected Mobile ID: ({{ 6 - form.selectedMobileID.length }} remaining)</div>
                        <div class="multiSelectBox el-select__tags marginBottom5px" :class="{ disableSelected: form.selectedMobileID.length === 0 }">
                            <span v-for="mobileID in form.selectedMobileID" class="el-tag el-tag--info el-tag--small">
                                <span class="el-select__tags-text">{{ mobileID }}</span
                                ><i class="el-tag__close el-icon-close" @click="removeValueFromArray(mobileID, form.selectedMobileID)"></i>
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <hr />
                </el-row>

                <el-row style="padding-top: 5px;">
                    <el-form-item label="Sort by" class="noPaddingBottomForLabel">
                        <el-radio v-model="sortBy" label="stkno">Unit Stock Number</el-radio>
                        <el-radio v-model="sortBy" label="location">Location</el-radio>
                        <el-radio v-model="sortBy" label="date">Date</el-radio>
                        <el-radio v-model="sortBy" label="user">User ID </el-radio>
                        <el-radio v-model="sortBy" label="mobile">Mobile ID </el-radio>
                    </el-form-item>
                </el-row>

                <el-checkbox v-model="checked">Include unscanned units</el-checkbox>

                <el-row>
                    <el-form-item label="Select printer:" prop="selectedPrinter">
                        <el-select v-model="form.selectedPrinter" placeholder="Select Printer">
                            <el-option v-for="(item, index) in printers" :key="item.value + index" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>

                <el-row>
                <el-col :xs="24" :sm="15" :md="11" :lg="7">
                    <el-form-item class="smallPaddingTop">
                    <el-button
                        type="primary"
                        @click="submitForm('form')"
                        title="Print Report"
                        >Print Report</el-button
                    >
                    </el-form-item>
                </el-col>
                </el-row>

            </el-col>
        </el-row>
        </el-row>
        <notifications group="messages" position="top right" />
    </el-form>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import DatePicker from '../../../../../common/shared-vue/common/DatePicker.vue';
const dateFormat = require('dateformat');
const decimal = require('ascii-decimal');
let parseString = require("xml2js").parseString;
export default {
    name: 'muir',
    components: {
        DatePicker: DatePicker
    },
    data (){
        return {
            form:{
                reportPeriod: [new Date(), new Date()],
                unitStockNumbersRangeStart: '',
                unitStockNumbersRangeEnd: '',
                locationRangeStart: '',
                locationRangeEnd: '',
                userIDRangeStart: '',
                userIDRangeEnd: '',
                mobileIDRangeStart: '',
                mobileIDRangeEnd: '',
                nextUnitNumberSelectValue: '',
                nextLocationSelectValue: '',
                nextUserIDSelectValue: '',
                nextMobileIDSelectValue: '',
                selectedUnitStockNumbers: [],
                selectedLocation: [],
                selectedUserID: [],
                selectedMobileID: [],
                selectedPrinter: 'pdf',

            },
            allowedCharactersPattern: /^[a-z0-9 "'#\/\.+:;-]*$/ig,
            allowedCharactersPattern2: /^[^\s]*$/ig,
            unitStockNumbersRadioValue: 'all',
            checked: false,
            locationRadioValue: 'all',
            userIDRadioValue: 'all',
            mobileIDRadioValue: 'all',
            sortBy: 'stkno',
            printers: [],
            printerButtonClicked: false,


        };
    },

    computed: {
        unitStockNumbersRulesArray() {
            return [{
                required: this.printerButtonClicked,
                message: 'Please enter required field',
            },{
                required: false,
                pattern: this.allowedCharactersPattern,
                message: 'Please enter letters, numbers, and punctuation'
            },{
                required: false,
                max: 20,
                message: 'Only 20 characters allowed'
            }];
        },
        locationRulesArray() {
            return [{
                required: this.printerButtonClicked,
                message: 'Please enter required field',
            },
            {
                required: false,
                pattern: this.allowedCharactersPattern2,
                message: 'No spaces allowed'
            },{
                required: false,
                max: 8,
                message: 'Only 8 characters allowed'
            }];
        },
        userIDRulesArray() {
            return [{
                required: this.printerButtonClicked,
                message: 'Please enter required field',
            },
            {
                required: false,
                pattern: this.allowedCharactersPattern2,
                message: 'No spaces allowed'
            },{
                required: false,
                max: 20,
                message: 'Only 20 characters allowed'
            }];
        },
        mobileIDRulesArray() {
            return [{
                required: this.printerButtonClicked,
                message: 'Please enter required field',
            },{
                required: false,
                pattern: this.allowedCharactersPattern2,
                message: 'Please enter letters, numbers, and punctuation'
            },{
                required: false,
                max: 4,
                message: 'Only 4 characters allowed'
            }];
        },

        rules() {
            return {
                reportPeriod: [{
                required: this.printerButtonClicked,
                message: 'Please enter required field'
                }],
                unitStockNumbersRangeStart: this.unitStockNumbersRulesArray,
                unitStockNumbersRangeEnd: this.unitStockNumbersRulesArray,
                nextUnitNumberSelectValue: [{
                required: this.printerButtonClicked && this.form.selectedUnitStockNumbers.length <= 0,
                message: 'Please enter required field',
                },{
                required: false,
                pattern: this.allowedCharactersPattern,
                message: 'Please enter letters, numbers, and punctuation'
                },{
                required: false,
                max: 20,
                message: 'Only 20 characters allowed'
                }],
                locationRangeStart: this.locationRulesArray,
                locationRangeEnd: this.locationRulesArray,
                nextLocationSelectValue: [{
                required: this.printerButtonClicked && this.form.selectedLocation.length <= 0,
                message: 'Please enter required field',
                },
                {
                required: false,
                pattern: this.allowedCharactersPattern2,
                message: 'No spaces allowed'
                },{
                required: false,
                max: 8,
                message: 'Only 8 characters allowed'
                }],
                userIDRangeStart: this.userIDRulesArray,
                userIDRangeEnd: this.userIDRulesArray,
                nextUserIDSelectValue: [{
                required: this.printerButtonClicked && this.form.selectedUserID.length <= 0,
                message: 'Please enter required field',
                },
                {
                required: false,
                pattern: this.allowedCharactersPattern,
                message: 'No spaces allowed'
                },{
                required: false,
                max: 20,
                message: 'Only 20 characters allowed'
                }],
                mobileIDRangeStart: this.mobileIDRulesArray,
                mobileIDRangeEnd: this.mobileIDRulesArray,
                nextMobileIDSelectValue: [{
                required: this.printerButtonClicked && this.form.selectedMobileID.length <= 0,
                message: 'Please enter required field',
                },{
                required: false,
                pattern: this.allowedCharactersPattern,
                message: 'Please enter letters, numbers, and punctuation'
                },{
                required: false,
                max: 4,
                message: 'Only 4 characters allowed'
                }]
            };
        }
    },

    beforeMount(){
        this.showLoader();
    },

    mounted() {
        this.printerServiceCall()
    },

    methods: {
        printerServiceCall() {
            let params = {
                curloc,
                userid,
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
            }).catch(error => {
            this.hideLoader();
            this.$notify({
                group: 'messages',
                type: 'error',
                title: 'Error',
                text: 'There was an error loading the form:' + error
            });
            });;
        },

        removeValueFromArray(value, arr) {
            if(value) {
                let index = arr.indexOf(value);
                if(index > -1) {
                    arr.splice(index, 1);
                }
            }
        },

        addValueToMultiSelectBox(value, array, pattern, maxValueLength, nextValueVariableName, referenceName) {
            if(value && value.match(pattern) && value.length <= maxValueLength && array.length < 6 &&
                !array.includes(value.toUpperCase())) {
                array.push(value.toUpperCase());
                this.form[nextValueVariableName] = '';
            }
        },
        
        getXmlBody() {
            if(!this.form.reportPeriod) {
                return false;
            }
            let startDate = this.$moment(this.form.reportPeriod[0]).format("YYYYMMDD");
            it = this.form.unitStockNumbersRangeEnd;
            let startLoc = this.form.locationRangeStart;
            let endLoc = this.form.locationRangeEnd;
            let startUser = this.form.userIDRangeStart;
            let endUser = this.form.userIDRangeEnd;
            let startMobile = this.form.mobileIDRangeStart;
            let endMobile = this.form.mobileIDRangeEnd;
            let sortBy = this.sortBy;
            let allinv = this.checked ? 'Y' : 'N';

            let xml = `<curloc>${curloc}</curloc>`;
            xml += `<startDate>${startDate}</startDate><stopDate>${stopDate}</stopDate>`;

            xml += `<unitsel>${this.unitStockNumbersRadioValue}</unitsel>`;
            if(this.unitStockNumbersRadioValue === 'range' && startUnit && endUnit) {
                xml += `<startUnit>${startUnit.toUpperCase()}</startUnit><endUnit>${endUnit.toUpperCase()}</endUnit>`;
            } else {
                xml += `<startUnit></startUnit><endUnit></endUnit>`;
            }
            for(let ctr=0; ctr<6; ctr++) {
                let stockNumber = ctr < this.form.selectedUnitStockNumbers.length ? this.form.selectedUnitStockNumbers[ctr] : '';
                xml += `<Unit${ctr+1}>${stockNumber}</Unit${ctr+1}>`;
            }

            xml += `<locsel>${this.locationRadioValue}</locsel>`;
            if(this.locationRadioValue === 'range' && startLoc && endLoc) {
                xml += `<startLoc>${startLoc.toUpperCase()}</startLoc><endLoc>${endLoc.toUpperCase()}</endLoc>`;
            } else {
                xml += `<startLoc></startLoc><endLoc></endLoc>`;
            }
            for(let ctr=0; ctr<6; ctr++) {
                let location = ctr < this.form.selectedLocation.length ? this.form.selectedLocation[ctr] : '';
                xml += `<Loc${ctr+1}>${location}</Loc${ctr+1}>`;
            }

            xml += `<usersel>${this.userIDRadioValue}</usersel>`;
            if(this.userIDRadioValue === 'range' && startUser && endUser) {
                xml += `<startUser>${startUser.toUpperCase()}</startUser><endUser>${endUser.toUpperCase()}</endUser>`;
            } else {
                xml += `<startUser></startUser><endUser></endUser>`;
            }
            for(let ctr=0; ctr<6; ctr++) {
                let user = ctr < this.form.selectedUserID.length ? this.form.selectedUserID[ctr] : '';
                xml += `<User${ctr+1}>${user}</User${ctr+1}>`;
            }

            xml += `<mobilesel>${this.mobileIDRadioValue}</mobilesel>`;
            if(this.mobileIDRadioValue === 'range' && startMobile && endMobile) {
                xml += `<startMobile>${startMobile.toUpperCase()}</startMobile><endMobile>${endMobile.toUpperCase()}</endMobile>`;
            } else {
                xml += `<startMobile></startMobile><endMobile></endMobile>`;
            }
            for(let ctr=0; ctr<6; ctr++) {
                let mobile = ctr < this.form.selectedMobileID.length ? this.form.selectedMobileID[ctr] : '';
                xml += `<Mobile${ctr+1}>${mobile}</Mobile${ctr+1}>`;
            }

            xml += `<sortBy>${sortBy}</sortBy>`;
            xml += `<allinv>${allinv}</allinv>`;

            return xml;
        },

        submitForm(formName) {
            let me = this;
            this.printerButtonClicked = true;
            Vue.nextTick(function() {
                me.$refs[formName].validate(valid => {
                if(valid) {
                    let xml = me.getXmlBody();
                    if(!xml) {
                    return;
                    }
                    me.showLoader();
                    let url = '';
                    var config = {
                    headers: { "Content-Type": "text/xml" },
                    };
                    axios
                    .post('/netview/wg/MUIRdata', xml, config)
                    .then((response) => {
                        me.hideLoader();
                        parseString(response.data, (err, result) => {
                            if (result.xml.Error && result.xml.Error.length === 1 && result.xml.Error[0] === "OK") {
                                let fileName = result.xml.reportName[0];
                                this.print(this.form.selectedPrinter, curloc, fileName);
                            } else {
                            me.$notify({
                            group: "messages",
                            type: "error",
                            title: "Error",
                            text: "There was an error printing the form",
                            duration: -1,
                            });
                            }
                        });
                    })
                    .catch((error) => {
                        me.hideLoader();
                        me.$notify({
                        group: "messages",
                        type: "error",
                        title: "Error",
                        text: "There was an error printing the form:" + error,
                        duration: -1,
                        });
                    });
                }
                });
            });
        }
    }

}
</script>