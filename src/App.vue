<template>
  <div style="margin-left: 10%; margin-right: 10%">
    <el-card :body-style="{ marginLeft: '10%' }">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        style="padding-top: 20px"
        label-position="top"
        class="forceUpperCase"
      >
        <el-row>
          <el-col class="hidden-xs-only" :sm="1" :md="2">&nbsp;</el-col>
          <el-col :sm="20" :md="15" :lg="13">
            <el-row>
              <el-form-item label="Report Type">
                <el-radio-group v-model="reportTypeValue">
                  <el-radio-button label="tech">Technician</el-radio-button>
                  <el-radio-button label="ro">Repair order</el-radio-button>
                  <el-radio-button label="ps">Proof Sheet</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row
              v-if="reportTypeValue === 'tech' || reportTypeValue === 'ps'"
            >
              <el-col :sm="12">
                <el-form-item label="Sorted By">
                  <el-radio-group v-model="sortedByValue">
                    <el-radio-button label="alpha">Name</el-radio-button>
                    <el-radio-button label="number">Number</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :sm="14">
                    <el-form-item prop="technicianFormItem" label="Technician" style="padding-right: 10px;">
                        <el-input
                        ref="technicianIDInput"
                        class="input-with-button forceUpperCase"
                        maxlength="10"
                        v-model="form.technician.id"
                        @change="showTechnicianLookupModalOnChange"
                        value-key="text"
                        >
                        <el-button
                            icon="el-icon-search"
                            slot="append"
                            class="inputButton"
                            @click="showTechnicianLookupModalOnClick"
                        ></el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="10">
                    <div style="padding-top: 40px;">
                    {{ form.technician.name }}
                    </div>
                </el-col>
            </el-row>
            <el-row>
              <el-form-item prop="selectedRepairOrder" label="Repair Order">
                <el-input
                  ref="repairOrderInput"
                  class="input-with-button forceUpperCase"
                  maxlength="10"
                  v-model="form.repairOrderState"
                  @change="showRepairOrderLookupModalOnChange"
                  value-key="text"
                >
                  <el-button
                    icon="el-icon-search"
                    slot="append"
                    class="inputButton"
                    @click="showRepairOrderLookupModalOnClick"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-form-item label="Include All Time Slips">
                  <el-switch
                    v-model="form.selectedAllSlips"
                    active-color="#13ce66"
                    inactive-color="red"
                    :active-text="form.selectedAllSlips == false ? 'No' : 'Yes'"
                    @change="allSlipSelected"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-form-item label="Include Direct Time Slips">
                  <el-switch
                    v-model="form.selectedDirectSlips"
                    active-color="#13ce66"
                    inactive-color="red"
                    :active-text="
                      form.selectedDirectSlips == false ? 'No' : 'Yes'
                    "
                    :disabled="form.selectedAllSlips"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-form-item
                  label="Include Indirect Time Slips (Technician Report Only)"
                >
                  <el-switch
                    v-model="form.selectedIndirectSlips"
                    active-color="#13ce66"
                    inactive-color="red"
                    :active-text="
                      form.selectedIndirectSlips == false ? 'No' : 'Yes'
                    "
                    :disabled="form.selectedAllSlips"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-form-item label="Include Customer and Unit Info">
                  <el-switch
                    v-model="form.selectedCustomerUnitInfo"
                    active-color="#13ce66"
                    inactive-color="red"
                    :active-text="
                      form.selectedCustomerUnitInfo == false ? 'No' : 'Yes'
                    "
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.selectedIndirectSlips">
              <el-row>
                <el-col :sm="21" :md="19">
                  <el-form-item label="Indirect Paid">
                    <el-switch
                      v-model="form.selectedIndirectPaid"
                      active-color="#13ce66"
                      inactive-color="red"
                      :active-text="
                        form.selectedIndirectPaid == false ? 'No' : 'Yes'
                      "
                      @change="selectPaidTypes"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="21" :md="19">
                  <el-form-item label="Indirect Nonpaid">
                    <el-switch
                      v-model="form.selectedIndirectNonPaid"
                      active-color="#13ce66"
                      inactive-color="red"
                      :active-text="
                        form.selectedIndirectNonPaid == false ? 'No' : 'Yes'
                      "
                      @change="selectNonPaidTypes"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="24">
                  <span>Select Indirect Types</span>
                </el-col>
                <el-checkbox-group v-model="checkedInDirectTypes">
                  <el-col
                    :sm="6"
                    v-for="type in inDirectTimeSlipTypes"
                    :key="type.id"
                  >
                    <el-checkbox :label="type">{{ type.desc }}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-row>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19" class="conditionTypes">
                <span>Include Condition Types</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-checkbox v-model="form.customerChecked"
                  >Customer</el-checkbox
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-checkbox v-model="form.warrantyChecked"
                  >Warranty</el-checkbox
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-checkbox v-model="form.internalChecked"
                  >Internal</el-checkbox
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="21" :md="19">
                <el-checkbox v-model="form.otherChecked">Other</el-checkbox>
              </el-col>
            </el-row>
            <div>
              <el-form-item
                label="Include Time Slips Dated From"
                class="smallerLineHeightLabel"
                prop="reportPeriod"
              >
                <DatePicker
                  :id="['dateRange1', 'dateRange2']"
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
              <el-form-item
                label="Select printer:"
                prop="selectedPrinter"
                :rules="{
                  required: true,
                  message: 'Please enter Required field.',
                }"
              >
                <el-select
                  v-model="form.selectedPrinter"
                  placeholder="Select Printer"
                >
                  <el-option
                    v-for="(item, index) in printers"
                    :key="item.value + index"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col
                :xs="24"
                :sm="15"
                :md="11"
                :lg="7"
                class="smallPaddingTop requiredInstructions"
              >
                * Required
              </el-col>
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
      </el-form>
    </el-card>
    <repair-order ref="repairOrderLookupModal" />
    <technician-lookup-modal
      ref="techLookupModal"
      v-on:tech-selected="onTechSelect"
      v-on:tech-closed="onTechClose"
      :tableHeader="techTableHeader"
    />
  </div>
</template>

<script>
// import Vue from 'vue';
import axios from "axios";
import DatePicker from "./components/DatePicker";
import RepairOrder from "./components/RepairOrder";
import TechnicianLookUpModal from "./components/TechnicianLookUpModal";
// const dateFormat = require('dateformat');
// const decimal = require('ascii-decimal');
// let parseString = require("xml2js").parseString;
export default {
  name: "tsr",
  components: {
    DatePicker: DatePicker,
    RepairOrder,
    "technician-lookup-modal": TechnicianLookUpModal,
  },
  data() {
    return {
      form: {
        reportPeriod: [],
        techState: "",
        selectedAllSlips: false,
        selectedDirectSlips: true,
        selectedIndirectSlips: false,
        selectedCustomerUnitInfo: false,
        selectedIndirectPaid: false,
        selectedIndirectNonPaid: false,
        customerChecked: true,
        warrantyChecked: true,
        internalChecked: true,
        otherChecked: true,
        selectedPrinter: "pdf",
        technician: {
          id: '',
          name: ''
        },
      },
      reportTypeValue: "tech",
      sortedByValue: "alpha",
      value1: false,
      inDirectTimeSlipTypes: [],
      checkedInDirectTypes: [],
      techTableHeader: [
        { prop: "tech_num", label: "Number" },
        { prop: "tech_name", label: "Technician Name" },
      ],
      technicianDeterminedInvalid: false,
    };
  },
  methods: {
    showTechnicianLookupModalOnChange() {
      this.$refs.techLookupModal.showModal(this.form.technician.id);
      },

    showTechnicianLookupModalOnClick() {
      this.$refs.techLookupModal.showModal(this.form.technician.id);
      },

    showRepairOrderLookupModalOnChange() {
      this.$refs.repairOrderLookupModal.showModal(this.form.repairOrderState);
    },

    showRepairOrderLookupModalOnClick() {},

    // directTimeSlipsDisabled() {
    //     this.form.selectedDirectSlips = false;
    // }
    allSlipSelected() {
      this.form.selectedDirectSlips = false;
      this.form.selectedIndirectSlips = false;
    },
    toggleTimeSlip() {
      // if(this.form.selectedAllSlips) {
      this.form.selectedDirectSlips = false;
      this.form.selectedIndirectSlips = false;
      // }
    },
    selectPaidTypes() {
      if (this.form.selectedIndirectPaid) {
        let paid_types = this.inDirectTimeSlipTypes.filter((i) => {
          return i.paid === "Y";
        });
        this.checkedInDirectTypes = [
          ...this.checkedInDirectTypes,
          ...paid_types,
        ];
      } else {
        this.checkedInDirectTypes = this.checkedInDirectTypes.filter((i) => {
          return i.paid !== "Y";
        });
      }
    },
    selectNonPaidTypes() {
      if (this.form.selectedIndirectNonPaid) {
        let not_paid_types = this.inDirectTimeSlipTypes.filter((i) => {
          return i.paid === "N";
        });
        this.checkedInDirectTypes = [
          ...this.checkedInDirectTypes,
          ...not_paid_types,
        ];
      } else {
        this.checkedInDirectTypes = this.checkedInDirectTypes.filter((i) => {
          return i.paid !== "N";
        });
      }
    },
    onTechSelect(tech) {
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

        getXmlBody() {
            if(!this.form.reportPeriod) {
                return false;
            }
            let curloc = 'loc'; //not needed
            let tech_name = this.form.technician.name;
            let tech_id = this.form.technician.id;
            let startDate = this.$moment(this.form.reportPeriod[0]).format("YYYYMMDD");
            let endDate = this.form.unitStockNumbersRangeEnd;
            let startLoc = this.form.locationRangeStart;
            let endLoc = this.form.locationRangeEnd;
            let startUser = this.form.userIDRangeStart;
            let endUser = this.form.userIDRangeEnd;
            let startMobile = this.form.mobileIDRangeStart;
            let endMobile = this.form.mobileIDRangeEnd;
            let sortBy = this.sortBy;
            let allinv = this.checked ? 'Y' : 'N';

            let xml = `<curloc>${curloc}</curloc>`;
            xml += `<reportType>${tech_name}</reportType>`;
            xml += `<techSort>alpha</techSort>`;
            xml += `<techID>${tech_id}</techID>`;
            xml += `<ro>${tech_id}</ro>`;

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
  },
  mounted() {
    //method to call at first to set the checkbox values for indirecttimeSlipTypes

    axios
      .get("129.50.2.5/netview/ss/TSRsvc?action=get-reasons&curloc=loc1")
      .then((res) => {
        this.inDirectTimeSlipTypes = res.reasons;
      })
      .catch((e) => {
        console.log(e);
      });
    //this will set this
    this.inDirectTimeSlipTypes = [
      { id: "0006Break", desc: "Break", paid: "Y" },
      { id: "0014Demo Time", desc: "Demo Time", paid: "N" },
      { id: "0012Doctor", desc: "Doctor", paid: "N" },
      { id: "0010Holiday", desc: "Holiday", paid: "Y" },
      { id: "0011Jury Duty", desc: "Jury Duty", paid: "Y" },
      { id: "0005Lunch", desc: "Lunch", paid: "N" },
      { id: "0027Office", desc: "Office", paid: "Y" },
      { id: "0026Office Manager", desc: "Office Manager", paid: "N" },
      { id: "0025Parts", desc: "Parts", paid: "N" },
      { id: "0024Parts Manager", desc: "Parts Manager", paid: "N" },
      { id: "0009Personal", desc: "Personal", paid: "N" },
      { id: "0013Public Relations", desc: "Public Relations", paid: "N" },
      { id: "0021Rental", desc: "Rental", paid: "N" },
      { id: "0020Rental Manager", desc: "Rental Manager", paid: "N" },
      { id: "0028Sales", desc: "Sales", paid: "N" },
      { id: "0022Service Manager", desc: "Service Manager", paid: "N" },
      { id: "0023Service Writer", desc: "Service Writer", paid: "N" },
      { id: "0002Shop Time", desc: "Shop Time", paid: "Y" },
      { id: "0007Sick", desc: "Sick", paid: "Y" },
      { id: "0004Supervision", desc: "Supervision", paid: "Y" },
      { id: "0003Training", desc: "Training", paid: "Y" },
      { id: "0016Trucking", desc: "Trucking", paid: "Y" },
      { id: "0001Unapplied Time", desc: "Unapplied Time", paid: "Y" },
      { id: "0019Unused", desc: "Unused", paid: "N" },
      { id: "0018Unused", desc: "Unused", paid: "N" },
      { id: "0017Unused", desc: "Unused", paid: "N" },
      { id: "0008Vacation", desc: "Vacation", paid: "Y" },
      { id: "0015Waiting On RO", desc: "Waiting On RO", paid: "N" },
    ];
  },
  computed: {
    rules() {
      return {
        technicianFormItem: [{
          required: this.technicianDeterminedInvalid && this.form.technician.id !== '',
          message: 'Technician ID invalid'
        }]
      };
    }
    }
};
</script>

<style>
.conditionTypes {
  margin-bottom: 10px;
  font-size: 14px;
  color: #4a4a4a;
}
</style>
