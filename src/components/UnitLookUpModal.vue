<template>
  <el-form :model="form" ref="form" :rules="rules">
    <el-dialog
      :visible.sync="dialogVisible"
      width="90%"
      class="unitLookupModalClass"
    >
      <template slot="title">
        <span class="el-dialog__title">Unit Search</span>
      </template>
      <el-row class="lightGrayBox">
        <el-row>
          <el-col :sm="14" :md="12" :lg="10" style="padding-right: 5px">
            <el-form-item>
              <el-input
                :value="form.stockNumber"
                @input="form.stockNumber = $event.toUpperCase()"
                type="text"
                class="inputBoxWithShadedPrefix inputBoxWithShadedPrefixInnerInput"
                maxlength="10"
              >
                <span slot="prefix"> Stock Number </span>
                <el-button
                  icon="el-icon-search"
                  slot="append"
                  class="inputButton"
                  @click="search()"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <span
            style="display: inline-block; vertical-align: top"
            class="buttonHeight38 buttonMinWidth161"
          >
            <template v-if="form.statusCodes.length > 0">
              <el-button type="primary" @click="clearCheckboxes" size="mini"
                ><i
                  class="el-input__icon el-range__icon el-icon-checked normalLineHeight"
                ></i
                >Clear Status Codes</el-button
              >
            </template>
            <template v-if="form.statusCodes.length === 0">
              <el-button @click="clickAllCheckboxes" size="mini"
                ><i
                  class="el-input__icon el-range__icon el-icon-unchecked normalLineHeight"
                ></i
                >All Status Codes</el-button
              >
            </template>
          </span>
          <span class="rowMiniCheckboxButtons">
            <el-form-item
              prop="searchOptions"
              class="normalLineHeightForFormItem"
            >
              <el-checkbox-group v-model="form.statusCodes" size="mini">
                <el-checkbox-button label="N"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('N'),
                      'el-icon-unchecked': !form.statusCodes.includes('N'),
                    }"
                  ></i
                  >New</el-checkbox-button
                >
                <el-checkbox-button label="U"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('U'),
                      'el-icon-unchecked': !form.statusCodes.includes('U'),
                    }"
                  ></i
                  >Used</el-checkbox-button
                >
                <el-checkbox-button label="R"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('R'),
                      'el-icon-unchecked': !form.statusCodes.includes('R'),
                    }"
                  ></i
                  >Rental</el-checkbox-button
                >
                <el-checkbox-button label="O"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('O'),
                      'el-icon-unchecked': !form.statusCodes.includes('O'),
                    }"
                  ></i
                  >Order</el-checkbox-button
                >
                <el-checkbox-button label="S"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('S'),
                      'el-icon-unchecked': !form.statusCodes.includes('S'),
                    }"
                  ></i
                  >Sold</el-checkbox-button
                >
                <el-checkbox-button label="H"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('H'),
                      'el-icon-unchecked': !form.statusCodes.includes('H'),
                    }"
                  ></i
                  >Historical</el-checkbox-button
                >
                <el-checkbox-button label="T"
                  ><i
                    :class="{
                      'el-input__icon': true,
                      'el-range__icon': true,
                      'el-icon-checked': form.statusCodes.includes('T'),
                      'el-icon-unchecked': !form.statusCodes.includes('T'),
                    }"
                  ></i
                  >Transferred</el-checkbox-button
                >
              </el-checkbox-group>
            </el-form-item>
          </span>
        </el-row>
        <el-row class="singleLineTextboxes">
          <span>
            <div class="singleLineTextboxesHeader">Make</div>
            <el-input
              maxlength="3"
              :value="form.make"
              @input="form.make = $event.toUpperCase()"
            /> </span
          ><span>
            <div class="singleLineTextboxesHeader">Model</div>
            <el-input
              maxlength="20"
              :value="form.model"
              @input="form.model = $event.toUpperCase()"
            /> </span
          ><span>
            <div class="singleLineTextboxesHeader">Type</div>
            <el-input
              maxlength="10"
              :value="form.type"
              @input="form.type = $event.toUpperCase()"
            /> </span
          ><span>
            <div class="singleLineTextboxesHeader">Year</div>
            <el-input
              maxlength="4"
              :value="form.year"
              @input="form.year = $event.toUpperCase().replace(/[^\d]/gi, '')"
              @change="form.year = $event.toUpperCase().replace(/[^\d]/gi, '')"
            /> </span
          ><span>
            <div class="singleLineTextboxesHeader">Serial number</div>
            <el-input
              maxlength="18"
              :value="form.serialNumber"
              @input="form.serialNumber = $event.toUpperCase()"
            /> </span
          ><span>
            <div class="singleLineTextboxesHeader">Customer</div>
            <el-input
              maxlength="5"
              :value="form.customer"
              @input="form.customer = $event.toUpperCase()"
              class="input-with-button"
              value-key="text"
              type="text"
              style="vertical-align: top"
            >
              <el-button
                icon="el-icon-search"
                slot="append"
                class="inputButton"
                @click="showCustomerLookupModal"
                width="10"
              ></el-button>
            </el-input> </span
          ><span>
            <div class="singleLineTextboxesHeader">Location</div>
            <el-input
              maxlength="10"
              :value="form.location"
              @input="form.location = $event.toUpperCase()"
            />
          </span>
        </el-row>
        <el-row class="mainButtons">
          <el-button type="primary" @click="search()">Search</el-button>
          <el-button @click="clearTextboxes">Clear</el-button>
        </el-row>
      </el-row>
      <el-row v-if="this.unitDataLoading">
        <div v-if="this.isIE">Loading...</div>
        <div
          v-if="!this.isIE"
          tabindex="0"
          aria-label="Loading"
          class="is-active inPageLoadingIcon"
          style=""
          aria-busy="true"
        >
          <div class="vld-background"></div>
          <div class="vld-icon">
            <svg
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              stroke="#000"
            >
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                  <circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.8s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </el-row>
      <el-row v-if="!this.unitDataLoading" style="padding-top: 15px">
        <el-table
          :data="stockList[unitListPageNumber - 1]"
          @row-click="unitSelected"
          border
          height="250"
          style="width: 100%"
          class="unitTable"
        >
          <el-table-column label="Stock Number">
            <template slot-scope="scope">
              <a
                href="#"
                @click.stop="openUnitInquiryWindow($event, scope.row.stock_num)"
                ><!--
              -->{{ scope.row.stock_num
                }}<!--
              --><i
                  class="fa fa-external-link-square"
                  aria-hidden="true"
                  style="padding-left: 5px"
                ></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="make" label="Make" width="70">
          </el-table-column>
          <el-table-column prop="model" label="Model"> </el-table-column>
          <el-table-column prop="type" label="Type"> </el-table-column>
          <el-table-column prop="year" label="Year" width="70">
          </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column prop="serial_num" label="Serial Number" width="200">
          </el-table-column>
          <el-table-column prop="customer_num" label="Customer">
          </el-table-column>
          <el-table-column prop="location" label="Location"> </el-table-column>
          <el-table-column prop="list_price" label="List" width="75">
          </el-table-column>
          <el-table-column prop="open_repair_order" label="RO" width="70">
          </el-table-column>
          <el-table-column prop="open_rent" label="Rental" width="70">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="!this.unitDataLoading">
        <el-pagination
          background
          @current-change="unitListPaginationChange"
          :current-page.sync="unitListPageNumber"
          :page-size="unitListPageSize"
          layout="prev, pager, next"
          :total="stockListSize"
        >
        </el-pagination>
      </el-row>
      <customer-lookup-modal
        ref="customerLookupModal"
        v-on:customer-selected="onCustomerSelect"
        v-on:customer-closed="onCustomerClose"
        :tableHeader="customerTableHeader"
        :appendToBody="true"
      />
    </el-dialog>
  </el-form>
</template>

<script>
// import axios from "axios";
import CustomerLookupModal from "./CustomerLookUp.vue";
import Vue from 'vue';

window.onerror = function (message, source, lineno, colno, error) {
  console.error(message, source, lineno, colno, error);
};

export default {
  name: "UnitLookupModal",
  components: {
    "customer-lookup-modal": CustomerLookupModal,
  },
  data() {
    return {
      form: {
        statusCodes: ["N", "U", "R", "O", "S", "T"],
        stockNumber: "",
        make: "",
        model: "",
        type: "",
        year: "",
        serialNumber: "",
        customer: "",
        location: "",
        selectedPrinter: "pdf",
      },
      dialogVisible: false,
      unitDataLoading: false,
      stockList: [],
      unitListPageNumber: 1,
      unitListPageSize: 7,
      stockListSize: 0,
      customerTableHeader: [
        { prop: "customer_num", label: "Account#" },
        { prop: "name", label: "Name" },
        { prop: "address", label: "Address" },
        { prop: "telephone", label: "Telephone#" },
        { prop: "city", label: "City" },
        { prop: "state", label: "Prov" },
        { prop: "zip", label: "PC" },
        { prop: "new_cod_flag", label: "Avg Cr" },
      ],
      printers: [],
      isIE: false,
    };
  },
  computed: {
    rules() {
      return {
        searchOptions: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (this.form.statusCodes.length === 0) {
                callback(new Error("Please select at least one status"));
              } else {
                callback();
              }
            },
          },
        ],
      };
    },
  },
  methods: {
    showModal(parameterObject) {
      this.form.statusCodes = ["N", "U", "R", "O", "S", "T"];
      this.form.stockNumber = parameterObject.stock || "";
      this.form.make = parameterObject.make || "";
      this.form.model = parameterObject.model || "";
      this.form.type = parameterObject.type || "";
      this.form.year = parameterObject.year || "";
      this.form.serialNumber = parameterObject.serial || "";
      this.form.customer = parameterObject.customer || "";
      this.form.location = parameterObject.location || "";
      this.dialogVisible = true;
      this.search();
    },
    getUnitSearchParams() {
      let params = {
        // curloc,
        action: "search",
        end: 999999,
        filter_status: this.form.statusCodes.reduce((o, v) => o + v),
      };
      if (this.form.stockNumber) {
        params.stock_num = this.form.stockNumber;
      }
      if (this.form.make) {
        params.filter_make = this.form.make;
      }
      if (this.form.model) {
        params.filter_model = this.form.model;
      }
      if (this.form.type) {
        params.filter_type = this.form.type;
      }
      if (this.form.year) {
        params.filter_year = this.form.year;
      }
      if (this.form.serialNumber) {
        params.filter_serial_number = this.form.serialNumber;
      }
      if (this.form.customer) {
        params.filter_customer = this.form.customer;
      }
      if (this.form.location) {
        params.filter_location = this.form.location;
      }

      return params;
    },
    clearCheckboxes() {
      this.form.statusCodes = [];
    },
    clickAllCheckboxes() {
      this.form.statusCodes = ["N", "U", "R", "O", "S", "H", "T"];
    },
    clearTextboxes() {
      this.form.stockNumber = "";
      this.form.make = "";
      this.form.model = "";
      this.form.type = "";
      this.form.year = "";
      this.form.serialNumber = "";
      this.form.customer = "";
      this.form.location = "";
    },
    search() {
      let me = this;
    //   me.unitDataLoading = true;

    //   let params = me.getUnitSearchParams();
    //   axios
        // .get("/netview/wg/UnitSearchsvc", { params })
        // .then((response) => {
          me.setStockList([{"stock_num":"035701","source":"OTR","new_used":"R","previous_new_used":"U","type":"EXCAVATOR","make":"LIU","model":"CLG9035E","year":"2017","serial_num":"LGC9035ETHE208728","entry_date":"20190514","open_rent":"Y","open_repair_order":"N","customer_num":"","customer_name":"","list_price":0,"updated_time":1600781267,"location":"","hour_meter":0,"category":"","invoice_date":"20190409","order_num":"","days_since_invoice":682,"current_special_id":""},{"stock_num":"035901","source":"LUI","new_used":"R","previous_new_used":"R","type":"MINI EX","make":"LUI","model":"9035E","year":"2019","serial_num":"LGC9035EKJC225713","entry_date":"20190403","open_rent":"Y","open_repair_order":"N","customer_num":"","customer_name":"","list_price":0,"updated_time":1600434798,"location":"","hour_meter":0,"category":"","invoice_date":"20190327","order_num":"","days_since_invoice":695,"current_special_id":""},{"stock_num":"035902","source":"LUI","new_used":"R","previous_new_used":"N","type":"MINI EX","make":"LUI","model":"9035E","year":"2019","serial_num":"LGC9035EKJC225719","entry_date":"20190403","open_rent":"N","open_repair_order":"Y","customer_num":"","customer_name":"","list_price":0,"updated_time":1601492862,"location":"","hour_meter":450,"category":"","invoice_date":"20190327","order_num":"","days_since_invoice":695,"current_special_id":""},{"stock_num":"035903","source":"LUI","new_used":"R","previous_new_used":"N","type":"MINI EX","make":"LIU","model":"CLG9035E","year":"2019","serial_num":"LGC9035EKKC237538","entry_date":"20200820","open_rent":"Y","open_repair_order":"N","customer_num":"","customer_name":"","list_price":0,"updated_time":1601387501,"location":"","hour_meter":5,"category":"","invoice_date":"20200731","order_num":"","days_since_invoice":203,"current_special_id":""},{"stock_num":"035904","source":"LUI","new_used":"R","previous_new_used":"N","type":"MINI EX","make":"LIU","model":"CLG9035E","year":"2019","serial_num":"LGC9035EJKC237539","entry_date":"20200820","open_rent":"Y","open_repair_order":"N","customer_num":"","customer_name":"","list_price":0,"updated_time":1602085613,"location":"","hour_meter":5,"category":"","invoice_date":"20200731","order_num":"","days_since_invoice":203,"current_special_id":""},{"stock_num":"080401","source":"OTR","new_used":"S","previous_new_used":"U","type":"WACKER","make":"WAC","model":"8003","year":"2014","serial_num":"WNCE0605CPAL00630","entry_date":"20150930","open_rent":"N","open_repair_order":"N","customer_num":"00011","customer_name":"CASH SALE - THANK YO","list_price":28500,"updated_time":1571332006,"location":"R8","hour_meter":2753,"category":"","invoice_date":"20140731","order_num":"","days_since_invoice":0,"current_special_id":""},{"stock_num":"100010","source":"CCE","new_used":"R","previous_new_used":"N","type":"EXCAVATOR","make":"CAS","model":"CX75","year":"2016","serial_num":"NGS6A1232","entry_date":"20181231","open_rent":"Y","open_repair_order":"N","customer_num":"","customer_name":"","list_price":0,"updated_time":1601934676,"location":"","hour_meter":182,"category":"","invoice_date":"20181218","order_num":"","days_since_invoice":794,"current_special_id":""},{"stock_num":"100037","source":"OTR","new_used":"S","previous_new_used":"N","type":"TRAILER","make":"ECO","model":"LP0820TE","year":"2019","serial_num":"42ETPEZ26K1000356","entry_date":"20190219","open_rent":"N","open_repair_order":"","customer_num":"08052","customer_name":"SPIRE","list_price":10318,"updated_time":0,"location":"","hour_meter":0,"category":"","invoice_date":"20190215","order_num":"","days_since_invoice":0,"current_special_id":""},{"stock_num":"100038","source":"OTR","new_used":"S","previous_new_used":"N","type":"TRAILER","make":"ECO","model":"0LP0820TE","year":"2019","serial_num":"42ETPEZ24K1000355","entry_date":"20190219","open_rent":"N","open_repair_order":"N","customer_num":"08052","customer_name":"SPIRE","list_price":10318,"updated_time":0,"location":"","hour_meter":1,"category":"","invoice_date":"20190215","order_num":"","days_since_invoice":0,"current_special_id":""},{"stock_num":"100045","source":"CCE","new_used":"S","previous_new_used":"U","type":"FORKLIFT","make":"CAS","model":"586H","year":"2014","serial_num":"NEC715335","entry_date":"20190226","open_rent":"N","open_repair_order":"Y","customer_num":"01000","customer_name":"THE NEWARK GROUP","list_price":14565.100000,"updated_time":0,"location":"","hour_meter":2300,"category":"","invoice_date":"20190221","order_num":"","days_since_invoice":0,"current_special_id":""},{"stock_num":"100284","source":"AME","new_used":"N","previous_new_used":"","type":"AIRBURNER","make":"ATL","model":"1054","year":"2021","serial_num":"123","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603477747,"location":"","hour_meter":0,"category":"","invoice_date":"20200918","order_num":"","days_since_invoice":154,"current_special_id":""},{"stock_num":"100286","source":"AME","new_used":"N","previous_new_used":"","type":"AIRBURNER","make":"ATL","model":"1054","year":"2021","serial_num":"123","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603477759,"location":"","hour_meter":0,"category":"","invoice_date":"20200918","order_num":"","days_since_invoice":154,"current_special_id":""},{"stock_num":"100287","source":"AME","new_used":"N","previous_new_used":"","type":"AIRBURNER","make":"ATL","model":"1054","year":"2021","serial_num":"3123","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603477759,"location":"","hour_meter":0,"category":"","invoice_date":"20200918","order_num":"","days_since_invoice":154,"current_special_id":""},{"stock_num":"100288","source":"AME","new_used":"N","previous_new_used":"","type":"AIRBURNER","make":"ATL","model":"1054","year":"2021","serial_num":"123123","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603477759,"location":"","hour_meter":0,"category":"","invoice_date":"20200918","order_num":"","days_since_invoice":154,"current_special_id":""},{"stock_num":"100289","source":"AME","new_used":"N","previous_new_used":"","type":"AIRBURNER","make":"ATL","model":"1054","year":"2021","serial_num":"123123","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603477759,"location":"","hour_meter":0,"category":"","invoice_date":"20200918","order_num":"","days_since_invoice":154,"current_special_id":""},{"stock_num":"100290","source":"CCE","new_used":"N","previous_new_used":"","type":"AIR HOSE","make":"BLU","model":"1021F","year":"2019","serial_num":"12345","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603478072,"location":"","hour_meter":0,"category":"","invoice_date":"20201023","order_num":"","days_since_invoice":119,"current_special_id":""},{"stock_num":"100291","source":"CCE","new_used":"N","previous_new_used":"","type":"AIR HOSE","make":"BLU","model":"1021F","year":"2019","serial_num":"1234","entry_date":"20201023","open_rent":"","open_repair_order":"","customer_num":"","customer_name":"","list_price":0,"updated_time":1603478072,"location":"","hour_meter":0,"category":"","invoice_date":"20201023","order_num":"","days_since_invoice":119,"current_special_id":""}]);
        // })
        // .catch((error) => {
        //   me.unitDataLoading = true;
        //   me.$notify({
        //     group: "messages",
        //     type: "error",
        //     title: "Error",
        //     text: "There was an error loading the form:" + error,
        //   });
        // });
    },
    setStockList(list) {
      this.stockList = [];
      this.unitDataLoading = false;
      this.stockListSize = list.length;
      for (let i = 0; i < list.length; i += this.unitListPageSize) {
        let stockListInPage = [];
        for (let j = 0; j < this.unitListPageSize && i + j < list.length; j++) {
          stockListInPage.push(list[i + j]);
        }
        this.stockList.push(stockListInPage);
      }
      this.unitListPageNumber = 1;
    },
    unitSelected(unit) {
      this.$emit("unit-selected", unit);
      this.closeModal();
    },
    unitListPaginationChange(v) {
      this.unitListPageNumber = v;
    },
    showCustomerLookupModal() {
      this.$refs.customerLookupModal.showModal(this.form.customer);
    },
    openUnitInquiryWindow(e, stockNumber) {
      e.preventDefault();
      window.open(
        `/netview/wg/WI?curloc=ss&stock_num=${stockNumber}&`,
        "_blank"
      );
    },
    onCustomerSelect(response) {
      this.form.customer = response.customer.customer_num;
    },
    onCustomerClose() {},
    closeModal() {
      this.dialogVisible = false;
    },
    submitForm() {
      let me = this;
      Vue.nextTick(function () {
        if (this.stockList.length > 0) {
            console.log(me);
        }
      });
    },
  },
  beforeMount() {
    this.isIE = !!document.documentMode;
  },
};
</script>

<style>
.lightGrayBox {
  background-color: #f8f8f8;
  border: 1px solid #afafaf;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px 10px 0 10px;
}
</style>

<style>
.unitLookupModalClass > .el-dialog {
  height: 90vh;
  margin-top: 4vh !important;
  min-height: 630px;
}
.el-dialog__header {
  text-align: center;
  height: 36px;
}
.el-dialog__headerbtn {
  top: 10px;
}
.unitLookupModalClass > .el-dialog > .el-dialog__header > .el-dialog__title {
  color: white;
}

.el-icon-search {
  font-size: 17px;
  font-weight: 600;
}

.glyphicon-unchecked:before {
  content: "\e157";
}

.inputBoxWithShadedPrefixInnerInput .el-input__inner {
  padding-left: 102px !important;
}
.buttonHeight38 button {
  height: 38px;
}
.buttonMinWidth161 button {
  min-width: 161px;
}
.rowMiniCheckboxButtons {
  display: inline-block;
  vertical-align: top;
  .el-checkbox-button.is-checked {
    &:hover span {
      background-color: #01549b;
    }
    &.is-focus span {
      background-color: #01549b;
    }
  }
}
.singleLineTextboxes {
  min-height: 50px;
  padding-bottom: 5px;
  padding-top: 5px;
  .singleLineTextboxesHeader {
    padding-bottom: 3px;
  }
  div.el-input {
    display: inline-table;
    font-size: 12px;
    width: auto;
  }
  div.el-input input {
    line-height: 20px;
    height: auto;
    padding: 8px 5px;
  }
  .input-with-button button {
    padding-left: 10px;
    padding-right: 10px;
  }
}
.singleLineTextboxes > span {
  display: inline-block;
  padding-right: 5px;
  vertical-align: bottom;
  div.el-input .el-input__inner:focus {
    border-width: 1px;
  }
}
button.paddingForButton12px {
  padding: 12px;
}

div.el-checkbox-group span.el-checkbox-button__inner {
  height: 38px;
}

.mainButtons {
  padding-bottom: 15px;
  padding-top: 5px;
  button {
    padding: 10px 18px;
  }
}

.unitTable {
  height: calc(90vh - 385px) !important;
  max-height: 385px;
  a {
    color: #1c7cd5;
  }
  .el-table__body-wrapper tr {
    cursor: pointer;
  }
}
</style>