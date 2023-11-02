<template>
<div>
    <b-modal size="lg" ref="vendorLookupModal" class="vendor-lookup-modal" no-fade no-close-on-esc no-close-on-backdrop no-enforce-focus>    
        <template slot="modal-header">
            <div class="netview-ipo-brand">
                <span>Netview</span>
                <span class="ipo-keyword">IPO</span>
                <span class="modalLabel">
                    Vendor Search
                </span>
            </div> 
            <div> 
                <span class="fa fa-close close-modal" v-on:click="closeModal"></span>
            </div>
        </template> 
    
        <grid class="vendorSearchGrid" :data="vendorList" :columns="gridColumns" 
        :keyProps="['vendor_num']" :sortable="true" :pageSize="gridPageSize" @rowClick="vendorSelected">            
            <!-- <template slot="cell_phone" slot-scope="{item}">
                <div>{{formatPhoneDisplay(item.phone)}}</div>
            </template> -->
            <!-- <template slot="cell_address" slot-scope="{item}">
                <div>{{(item.address)}}</div>
            </template> -->
            <template slot="no-content">
                <div class="noGridContent">
                    No Vendors Found
                </div>
            </template>
        </grid>
           
        <template slot="modal-footer">
            <button class="btn btn-primary" v-on:click="closeModal">Close</button> 
        </template>    
    </b-modal>  
</div>           
</template>

<script>
import Grid from '../components/Grid';
import axios from 'axios';
// import moment from 'moment';

export default {
    name: "VendorLookupModal",
    data() {
        return {
            searchVendStr: '',
            vendorList:[],
            gridPageSize: 100,
            gridColumns:[
                { label: 'Vendor', klass: 'vendSrchGrid-vendNum', field: 'vendor_num' },
                { label: 'Name', klass: 'vendSrchGrid-name', field: 'name' },
                // { label: 'Phone', klass: 'vendSrchGrid-phone', field: 'phone' },
                { label: 'Address', klass: 'vendSrchGrid-address', field: 'address' }
            ]
        }
    }, 
    props: {
    },
    components: {
        'grid': Grid
    },
    mounted(){
    },
    computed:{
    },
    watch:{
    },
    methods: {
        showModal(searchVendStr){
            this.searchVendStr = searchVendStr;     
            // this.vendorList = [];                  
            // this.searchVendors();     
            this.vendorList = [
        {
        "vendor_num":"00457",
        "name":"*DUMMY VENDOR*",
        "address":"275 WEST CAMPBELL RD",
        },
        {
        "vendor_num":"00505",
        "name":"A & D",
        "address":"275 WEST CAMPBELL RD",
        "city":"RICHARDSON",
        },
        {
        "vendor_num":"00213",
        "name":"A & I PRODUCTS",
        "address":"275 WEST CAMPBELL RD",
        },
        {
        "vendor_num":"20099",
        "name":"AARON R LANE",
        "address":"275 WEST CAMPBELL RD",
        },{
        "vendor_num":"01250",
        "name":"ADALBERTO D LISI",
        "address":"275 WEST CAMPBELL RD",
        },
        {
        "vendor_num":"01861",
        "name":"ADAM A JACQUES",
        "address":"275 WEST CAMPBELL RD",
        }];  
        
            this.$refs.vendorLookupModal.show();           
        },
        closeModal(){
            this.$refs.vendorLookupModal.hide();
        },
        searchVendors(){   
            // this.showLoader();
            axios.get(
                '/netview/ap/VendorSearchsvc',
                { 
                    params: { 
                        action: "VS", 
                        curloc: 'curloc', 
                        userid: 'userid',
                        filter_inactive: 'Y',
                        vendor_search: this.searchVendStr                        
                    } 
                }
            ).then( (response) => {                
                if( response.data.vendor_list ) {        
                    this.vendorList = response.data.vendor_list;
                }                
                // this.hideLoader();
            }).catch( () => {  
                // this.hideLoader();
            });  
        },
        vendorSelected(vendor){
            this.$emit('vendor-selected', { vendor: vendor });
            this.closeModal();
        },
        formatPhoneDisplay(phone) {
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

<style lang="scss">
.vendor-lookup-modal{

    .modal-body{//Set grid height: auto-scrollable body with scrolling header
        height: calc(100% - 118px);
    }
    .grid-view{//OverRides common css: fixed header/scrollbar
        display: block;                
        tbody{
            height: calc(100% - 31px);
            overflow-y: scroll;
            overflow-x: hidden;                    
        }
        thead tr th:last-child{
            margin-right: 17px;
        }        
    }
    //border styles for fixed header/scrollbar
    .vendorSearchGrid{
        border: 1px solid #ddd;        
        .grid-view tr th{
            border: none;
        }
        .grid-view thead tr{
            border-right: none;
        }        
        .grid-view tr td:first-child{
            border-left: none;
        }
    }    
    
    .grid-view tr {
        cursor: pointer;
    }
    .grid-view tr.item:hover {
        background: #f6f6f6;
    }
    .grid-view thead {
        color: inherit;
        background: #f6f6f6;          
    }
    .vendSrchGrid-vendNum{
        max-width: 115px;
    }
    .vendSrchGrid-phone{
        max-width: 140px;
    }
}
</style>