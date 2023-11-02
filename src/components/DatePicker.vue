<template>
  <div class="flex-datepicker-container">
    <el-date-picker
      :id="id"
      v-model="date"
      :format="format"
      :clearable="clearable"
      :type="type"
      @change="$emit('input', date)"
    ></el-date-picker>
  </div>
</template>

<script>
// import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';

import $ from 'jquery';

export default {
  name: "DatePicker",
  inheritAttrs: false,
  props: ['type', 'clearable','id', 'value', 'format'],
  data() {
    return {
      date: new Date()
    };
  },
  mounted() {
      var vm = this;
      var adjustedDate = null;
      $("#" + vm.id).on("blur", function() {
          var rawInput = $("#" + vm.id).val();
          console.log(rawInput);
          if(rawInput.includes("/") || rawInput.includes("-")) {
              if(rawInput.length == 8) {
                 adjustedDate = "20" + rawInput.slice(6) + "-" + rawInput.slice(0,2) + "-" + rawInput.slice(3,5);
                 console.log(adjustedDate);
                vm.date = moment(adjustedDate).toDate();
              }
          } else if(rawInput.length == 6) {
             adjustedDate = "20" + rawInput.slice(4) + "-" + rawInput.slice(0,2) + "-" + rawInput.slice(2,4)
              vm.date = moment(adjustedDate).toDate();
          }
          vm.$emit('input', vm.date)
          console.log(vm.date)
      })
      if(this.value)
      vm.date = this.value;
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
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