<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rules"
    label-position="top"
    style="padding-top: 20px"
  >
    <el-row>
      <el-col :sm="4" :md="3" :lg="2">&nbsp;</el-col>
      <el-col :sm="20" :md="21" :lg="22">
        <el-row>
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <div>On Order Report</div>
          </el-col>
        </el-row>
        <el-row style="padding-top: 20px">
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <el-form-item label="Vendor">
              <el-select
                v-model="form.selectedVendor"
                @change="toggleSelectOption('Vendor')"
                :multiple="form.selectedVendor !== 'ALL'"
                default-first-option
                filterable
              >
                <el-option
                  v-for="(item, index) in vendors"
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
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <el-form-item label="Source">
              <el-select
                v-model="form.selectedSource"
                @change="toggleSelectOption('Source')"
                :multiple="form.selectedSource !== 'ALL'"
                default-first-option
                filterable
              >
                <el-option
                  v-for="(item, index) in sources"
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
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <el-form-item label="Order Type">
              <el-select
                v-model="form.selectedOrderType"
                @change="toggleSelectOption('Order_Type')"
                :multiple="form.selectedOrderType !== 'ALL'"
                default-first-option
                filterable
              >
                <el-option
                  v-for="(item, index) in orderType"
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
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <el-form-item label="Order">
              <el-select
                v-model="form.selectedOrder"
                default-first-option
                filterable
              >
                <el-option
                  v-for="(item, index) in orderNumber"
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
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <el-form-item label="Report Sorting">
              <!-- <el-select
                    v-model="form.selectedReport"
                    default-first-option
                    filterable
                    >
                        <el-option
                        v-for="(item, index) in reportSorting"
                        :key="item.value + index"
                        :label="item.text"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select> -->
              <el-radio-group
                v-model="form.selectedReport"
                style="padding-top: 8px"
              >
                <el-radio-button label="Part Number"></el-radio-button>
                <el-radio-button label="Order Number"></el-radio-button>
                <!-- <el-radio-button
                        v-for="(item, index) in reportSorting"
                        :key="item.value + index"
                        :label="item.text"
                        :value="item.value"
                        >
                        </el-radio-button> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="15" :md="11" :lg="7">
            <el-form-item
              label="Printer Name"
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
              <el-button type="primary" @click="submitForm" title="Print Report"
                >Print Report</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from "axios";
const decimal = require("ascii-decimal");
export default {
  name: "oor",
  data() {
    return {
      form: {
        selectedVendor: "ALL",
        selectedPrinter: "pdf",
        selectedSource: "ALL",
        selectedOrder: "ALL",
        selectedOrderType: "ALL",
        //selectedReport: 'P'
        selectedReport: "Part Number",
      },
      vendors: [
        {
          text: "All Vendors",
          value: "ALL",
        },
      ],
      sources: [
        {
          text: "All Sources",
          value: "ALL",
        },
      ],
      orderNumber: [
        {
          text: "All Orders",
          value: "ALL",
        },
      ],
      orderType: [
        { value: "ALL", text: "All Order Types" },
        { value: "N  ", text: "New Orders" },
        { value: "B  ", text: "Back Orders" },
        { value: "C  ", text: "Customer Orders" },
        { value: "E  ", text: "Emergency Orders" },
        { value: "T  ", text: "Transfer Orders" },
      ],
      // reportSorting: [
      //     {value: 'P', text: ' Part Number'},
      //     {value: 'O', text: 'By Order Number'}
      // ],
      rules: {},
      printers: [],
      printerListLoading: true,
      vendorListLoading: true,
      sourceListLoading: true,
      orderListLoading: true,
      xmlData: "",
      curloc: "loc1",
      user: "hbs",
    };
  },
  beforeMount() {
    // this.showLoader();
  },
  mounted() {
    this.vendorServiceCall(),
      this.sourcesServiceCall(),
      this.orderNumberServiceCall(),
      this.printerServiceCall();
  },

  methods: {
    vendorServiceCall() {
    //   var parseString = require("xml2js").parseString;
      let vendorData =( <xml>
          <rec_count>50</rec_count>
          <R0>838 AAA LOCKSMITH</R0>
          <R1>813 ALLEN ENGINEERING</R1>
          <R2>899 ALTERNATE PARTS</R2>
          <R3>816 ASA ELECTRIC</R3>
          <R4>808 ATTACHMENTS</R4>
          <R5>805 AUTOZONE</R5>
          <R6>812 BAY AREA</R6>
          <R7>834 BAYOUT FORKLIFT</R7>
          <R8>815 BIC</R8>
          <R9>000 BLANK VENDOR</R9>
          <R10>809 BOBCAT</R10>
          <R11>835 BRADCO</R11>
          <R12>198 CASE PARTS</R12>
          <R13>802 CATERPILLAR</R13>
          <R14>807 DAVISON OIL</R14>
          <R15>803 DIAMOND PROD</R15>
          <R16>814 DTA SUPPLY</R16>
          <R17>820 DUEITT</R17>
          <R18>810 FLECO</R18>
          <R19>990 FREIGHT</R19>
          <R20>806 HOIST PARTS</R20>
          <R21>839 JLG LIFT</R21>
          <R22>837 KOMATSU</R22>
          <R23>841 LEW HUDSON</R23>
          <R24>850 LIUGONG</R24>
          <R25>828 MACK TRUCK</R25>
          <R26>817 MADER BEARING</R26>
          <R27>842 MULTIQUIP</R27>
          <R28>811 NAPA</R28>
          <R29>832 NORTHERN TOOL</R29>
          <R30>826 NUDRAULIX</R30>
          <R31>831 OREILLY</R31>
          <R32>800 OTHER MISC</R32>
          <R33>829 PALADIN</R33>
          <R34>801 PARTS ASSOCIATES</R34>
          <R35>819 QST</R35>
          <R36>827 RED DOT</R36>
          <R37>920 RESTOCKING FEE</R37>
          <R38>830 SAMSUNG</R38>
          <R39>822 SENNBOGEN</R39>
          <R40>833 TAKEUCHI</R40>
          <R41>955 TRUCKING</R41>
          <R42>840 TVH</R42>
          <R43>836 UNITED GRP</R43>
          <R44>823 VALUE PART</R44>
          <R45>804 WACKER NEUSON</R45>
          <R46>821 WARD INTL</R46>
          <R47>818 WERK BRAU</R47>
          <R48>825 YAMAHA</R48>
          <R49>824 YANMAR</R49>
          <Error />
          <Exit>0</Exit>
        </xml> )
      ;
      vendorData.children.forEach((item) => {
          if(item.children) {
          let valueAndText = item.children[0].text;
            let index = valueAndText.indexOf(" ");
            let value = valueAndText.substring(0, index);
            let text = valueAndText.substring(index + 1);
            this.vendors.push({
              text: value + " - " + text,
              value,
            });
          }
            this.vendors = this.vendors.sort((a, b) => a.value - b.value);
      });

    //   parseString(vendorData, (err, result) => {
    //     this.xmlData = result.xml;
    //     let xml = result.xml;
    //     let keys = Object.keys(xml);
    //     keys.forEach((key) => {
    //       if (key.startsWith("R")) {
    //         let valueAndText = xml[key][0];
    //         let index = valueAndText.indexOf(" ");
    //         let value = valueAndText.substring(0, index);
    //         let text = valueAndText.substring(index + 1);
    //         this.vendors.push({
    //           text: value + " - " + text,
    //           value,
    //         });
    //         this.vendors = this.vendors.sort((a, b) => a.value - b.value);
    //       }
    //     });
    //   });
    },

    sourcesServiceCall() {
      let sourceData = (
        <xml>
          <rec_count>48</rec_count>
          <R0>838 AAA LOCKSMITH</R0>
          <R1>813 ALLEN ENGINEERING</R1>
          <R2>899 ALTERNATE PARTS</R2>
          <R3>816 ASA ELECTRIC</R3>
          <R4>808 ATTACHMENTS</R4>
          <R5>805 AUTOZONE</R5>
          <R6>812 BAY AREA</R6>
          <R7>834 BAYOUT FORKLIFT</R7>
          <R8>815 BIC</R8>
          <R9>809 BOBCAT</R9>
          <R10>835 BRADCO</R10>
          <R11>198 CASE PARTS</R11>
          <R12>802 CATERPILLAR</R12>
          <R13>807 DAVISON OIL</R13>
          <R14>803 DIAMOND PROD</R14>
          <R15>814 DTA</R15>
          <R16>820 DUEITT</R16>
          <R17>810 FLECO</R17>
          <R18>990 FREIGHT</R18>
          <R19>806 HOIST PARTS</R19>
          <R20>839 JLG LIFT</R20>
          <R21>837 KOMATSU</R21>
          <R22>841 LEW HUDSON</R22>
          <R23>850 LIUGONG</R23>
          <R24>828 MACK TRUCK</R24>
          <R25>817 MADER BEARING</R25>
          <R26>842 MULTIQUIP</R26>
          <R27>811 NAPA</R27>
          <R28>832 NORTHERN TOOL</R28>
          <R29>826 NUDRAULIX</R29>
          <R30>831 OREILLY</R30>
          <R31>800 OTHER MISC</R31>
          <R32>829 PALADIN</R32>
          <R33>801 PARTS ASSOCIATES</R33>
          <R34>819 QST</R34>
          <R35>827 RED DOT</R35>
          <R36>920 RESTOCKING FEE</R36>
          <R37>830 SAMSUNG</R37>
          <R38>822 SENNBOGEN</R38>
          <R39>833 TAKEUCHI</R39>
          <R40>955 TRUCKING</R40>
          <R41>836 UNITED GRP</R41>
          <R42>823 VALUEPART</R42>
          <R43>804 WACKER NEUSON</R43>
          <R44>821 WARD INTL</R44>
          <R45>818 WERK BRAU</R45>
          <R46>825 YAMAHA</R46>
          <R47>824 YANMAR</R47>
          <Error />
          <Exit>0</Exit>
        </xml>
      );
    //   var parseString = require("xml2js").parseString;

    //   parseString(sourceData, (err, result) => {
    //     this.xmlData = result.xml;
    //     let xml = result.xml;
    //     let keys = Object.keys(xml);
    //     keys.forEach((key) => {
    //       if (key.startsWith("R")) {
    //         let valueAndText = xml[key][0];
    //         let index = valueAndText.indexOf(" ");
    //         let value = valueAndText.substring(0, index);
    //         let text = valueAndText.substring(index + 1);
    //         this.sources.push({
    //           text: value + " - " + text,
    //           value,
    //         });
    //         this.sources = this.sources.sort((a, b) => a.value - b.value);
    //       }
    //     });
    //   });
      sourceData.children.forEach((item) => {
          if(item.children) {
          let valueAndText = item.children[0].text;
            let index = valueAndText.indexOf(" ");
            let value = valueAndText.substring(0, index);
            let text = valueAndText.substring(index + 1);
            this.sources.push({
              text: value + " - " + text,
              value,
            });
          }
            this.sources = this.sources.sort((a, b) => a.value - b.value);
      });
    },

    orderNumberServiceCall() {

          let orderNumberList = [
 {order_number: "00032123", part_number: "352798A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "00032240", part_number: "84356794", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "0005579M", part_number: "87519307", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "000TV380", part_number: "84390142", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "004/3/ST", part_number: "SF20P", vendor: "800", type: "1", manufacturer_id: "",},
 {order_number: "004/9/ST", part_number: "KHR16240", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "007/1/ST", part_number: "84269374", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "007/1/ST", part_number: "R30202", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "009/9/ST", part_number: "84217229", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "009/9/ST", part_number: "N14410", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "00GSI210", part_number: "KRR22020", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "010/6/ST", part_number: "51524372", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "01152020", part_number: "87639899", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "04/21/ST", part_number: "A21019", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "05/20/ST", part_number: "155199A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "06/19/ST", part_number: "339898A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07/13/ST", part_number: "47378993", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07/31/ST", part_number: "87721465", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07/31/ST", part_number: "90333048", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "321551A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "321552A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "391827A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "391841A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "391842A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "393202A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "393203A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "07082020", part_number: "86500683", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "08/26/ST", part_number: "47749442R", vendor: "198", type: "3", manufacturer_id: "",},
 {order_number: "08/31/ST", part_number: "84141920", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "09/17/ST", part_number: "323657A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "09/17/ST", part_number: "87483065", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "1/23/STK", part_number: "87388398", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "1/23/STK", part_number: "D25277", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "11116431", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "129796A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "1980181C2", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "379314A4", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "400588A2", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "406088A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "410561A1", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "47933802", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "504085003", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "70924921", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "84141923", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "84176443", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "84272812", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "84273168", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "86625000", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "86625266", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "86705580", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "87310096", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "87599605", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "87601345", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "88612", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "9512573", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "A12985", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "10/15/ST", part_number: "MMA80820", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "11222019", part_number: "100-2587", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "11222019", part_number: "120108", vendor: "198", type: "1", manufacturer_id: "",}, 
 {order_number: "11222019", part_number: "376523A2", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "11222019", part_number: "86500689", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "12182019", part_number: "51510935", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "2/21/STK", part_number: "L18548", vendor: "198", type: "1", manufacturer_id: "",},
 {order_number: "CX130DTL", part_number: "LR016020", vendor: "198", type: "1", manufacturer_id: "",},
];
          orderNumberList.forEach((element) => {
            this.orderNumber.push({
              text: `${element.order_number}  ${element.type}`,
              value: element.order_number,
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
        seeoptions: "YYN", //pdf, rtf, csv
        spr: "Y",
        doc: "N",
      };
      axios
        .get("/netview/libx/svcsplsel", { params })
        .then((response) => {
          this.printerListLoading = false;
          if (!this.vendorListLoading) {
            // this.hideLoader();
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
        })
        .catch((error) => {
        //   this.hideLoader();
          this.$notify({
            group: "messages",
            type: "error",
            title: "Error",
            text: "There was an error loading the form:" + error,
          });
        });
    },

    toggleSelectOption(type) {
      switch (type) {
        case "Vendor":
          this.form.selectedVendor = this.checkForMultipleOption(this.form.selectedVendor);
          break;
        case "Source":
          this.form.selectedSource = this.checkForMultipleOption(this.form.selectedSource);
          break;
        case "Order_Type":
          this.form.selectedOrderType = this.checkForMultipleOption(this.form.selectedOrderType);
          break;
      }
    },
    checkForMultipleOption(val) {
      let data = val;
      if (typeof data === "string" && this.data !== "ALL") {
        data = [data];
      } else {
        if (data[data.length - 1] === "ALL" || data.length === 0) {
          data = "ALL";
        }
      }
      return data;
    },
    convertStringToPaddedDecimal(input) {
      if (typeof input !== "string" || input.trim() === "") {
        return input;
      }
      // let trimmedInput = input.trim();
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
      if (typeof arr === 'string'&& arr === "ALL") {
        return "";
      }
      let data = "";
      for (let i = 0; i < arr.length; i++) {
        data += this.convertStringToPaddedDecimal(arr[i]);
      }
      return data;
    },

    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
        //   this.showLoader();
          let vendor = this.getFormattedDecimal(this.form.selectedVendor);
          let source = this.getFormattedDecimal(this.form.selectedSource);
          let orderType = this.getFormattedDecimal(this.form.selectedOrderType);
          let orderNumber = this.convertStringToPaddedDecimal(
            this.form.selectedOrder == "ALL" ? "" : this.form.selectedOrder
          );
          let report =
            this.form.selectedReport == null ? "" : this.form.selectedReport;
          let printer =
            this.form.selectedPrinter == null ? "" : this.form.selectedPrinter;
          let curloc = "loc1";
          let all_vndr = this.form.selectedVendor[0] === "ALL" ? "Y" : "N";
          let all_srcn = this.form.selectedSource[0] === "ALL" ? "Y" : "N";
          let all_types = this.form.selectedOrderType[0] === "ALL" ? "Y" : "N";

          var requestBody = `all_vndr=${all_vndr}&vndr_lst=${vendor}&all_srcn=${all_srcn}&srcn_lst=${source}&ordernum=${orderNumber}&all_types=${all_types}&types_lst=${orderType}&sequence=${report}&curloc=${curloc}&printer=${printer}&verPar=079079082032045032086101114115105111110032055046049054032048057047049053047049052`;
          var config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          };
          axios
            .post("/netview/in/OORdata", requestBody, config)
            .then((response) => {
            //   this.hideLoader();
              let data = response.data;
              let fileName = data.replace(
                /^(.|[\r\n])*rptPath *value *= *"(.*out)(.|[\r\n])*$/gi,
                "$2"
              );
              if (fileName.length < 30) {
                window.open(
                  `/netview/libx/Print?action=${this.form.selectedPrinter}&curloc=${curloc}&filename=${fileName}`
                );
              } else {
                this.$notify({
                  group: "messages",
                  type: "error",
                  title: "Error",
                  text: "No records found",
                  duration: -1,
                });
              }
            })
            .catch((error) => {
            //   this.hideLoader();
              this.$notify({
                group: "messages",
                type: "error",
                title: "Error",
                text: "There was an error printing the form:" + error,
                duration: -1,
              });
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>