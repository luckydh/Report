// Requires jQuery as $, and DatePicker imported from element ui
// Example call
// <date-picker type="date" :clearable="false" id="test" :value="date" @input="(newDate) => {date = newDate}" :format="format"></date-picker>
<template>
  <div class="flex-datepicker-container">
    <el-date-picker
      ref="datePickerRef"
      :id="id"
      :value="value"
      @input="childInputTriggered"
      :format="format"
      :clearable="clearable"
      :range-separator="rangeseparator"
      :type="type"
    ></el-date-picker>
  </div>
</template>

<script>
// import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";

export default {
  name: "NewDatePicker",
  inheritAttrs: false,
  props: ["type", "date", "clearable", "id", "value", "format", "rangeseparator", "autoselect"],
  data() {
    return {};
  },
  mounted() {
    console.error('this.value', this.value);
    var vm = this;
    if (vm.type === "daterange") {
      $("#" + vm.id[0]).on("blur", function (e) {
        let rawInput = e.target.value;
        let returnValue;
        if (rawInput.length === 8) {
          if (rawInput.includes("/") || rawInput.includes("-")) {
            var adjustedDate = "20" + rawInput.slice(6) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(3, 5);
            returnValue = moment(adjustedDate).format("MM/DD/YYYY");
          } else {
            var adjustedDate = rawInput.slice(4) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(2, 4);
            returnValue = moment(adjustedDate).format("MM/DD/YYYY");
          }
        } else if (rawInput.length == 6) {
          var adjustedDate = "20" + rawInput.slice(4) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(2, 4);
          returnValue = moment(adjustedDate).format("MM/DD/YYYY");
        } else {
          returnValue = moment(rawInput).format("MM/DD/YYYY");
        }
        window.setTimeout(() => {
          $("#" + vm.id[0]).val(returnValue);
          vm.$refs["datePickerRef"]._data.userInput = null;
        }, 1);
        if (vm.value !== null) {
          vm.$emit("input", [returnValue, vm.value[1]]);
        } else {
          vm.$emit("input", [returnValue, null]);
        }
      });

      $("#" + vm.id[1]).on("blur", function (e) {
        let rawInput = e.target.value;
        let returnValue;
        if (rawInput.length === 8) {
          if (rawInput.includes("/") || rawInput.includes("-")) {
            var adjustedDate = "20" + rawInput.slice(6) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(3, 5);
            returnValue = moment(adjustedDate).format("MM/DD/YYYY");
          } else {
            var adjustedDate = rawInput.slice(4) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(2, 4);
            returnValue = moment(adjustedDate).format("MM/DD/YYYY");
          }
        } else if (rawInput.length == 6) {
          var adjustedDate = "20" + rawInput.slice(4) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(2, 4);
          returnValue = moment(adjustedDate).format("MM/DD/YYYY");
        } else {
          returnValue = moment(rawInput).format("MM/DD/YYYY");
        }
        window.setTimeout(() => {
          $("#" + vm.id[1]).val(returnValue);
        }, 1);
        if (vm.value !== null) {
          vm.$emit("input", [vm.value[0], returnValue]);
        } else {
          vm.$emit("input", [null, returnValue]);
        }
      });
      if(this.autoselect) {
        $("#" + vm.id[0]).select();
      }
    } else {
      $("#" + vm.id).on("blur", function () {
        var rawInput = $("#" + vm.id).val();
        let returnValue;
        if (rawInput.includes("/") || rawInput.includes("-")) {
          if (rawInput.length == 8) {
            var adjustedDate = "20" + rawInput.slice(6) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(3, 5);
            returnValue = moment(adjustedDate).toDate();
          }
        } else if (rawInput.length == 6) {
          var adjustedDate = "20" + rawInput.slice(4) + "-" + rawInput.slice(0, 2) + "-" + rawInput.slice(2, 4);
          returnValue = moment(adjustedDate).toDate();
        }
        vm.$emit("input", returnValue);
      });
    }
  },
  computed: {},
  methods: {
    childInputTriggered(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-datepicker-container {
  display: flex;
  min-height: 32px;
  min-width: 200px;

  input {
    font-size: 1rem;
    padding: 0;
    padding-left: 7px;
    border: 1px solid #ccc;
    border-left: 0;
    color: #2c2c2c;
    border-radius: 0 4px 4px 0;
    font-weight: 900px;
    width: 100%;
    flex: 1 1 300px;
    &::placeholder {
      color: #7c7c7c;
    }
    &:focus {
      outline: 0;
    }
    &.error {
      border-color: #ff0000;
    }
  }
}

.flex-datepicker-container input:focus {
  border: 3px solid #3096fd !important;
}
</style>