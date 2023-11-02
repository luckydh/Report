<template>
<div>  
    <el-dialog :visible.sync="dialogTableVisible" class="techLookupModalClass">
    <template slot="title">
      <span class="el-dialog__title">Select Service System Technician</span>
    </template>
    <div style="padding-bottom: 20px;">
        <el-radio v-model="option" label="Technician">Technician</el-radio>
        <el-radio v-model="option" label="Other">Other</el-radio>
    </div>
    <div v-if="this.dataLoading">
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
    </div>
    <el-table v-if ="option === `Technician`" :data="techList" @row-click="techSelected" border height="250" style="width: 100%" class= "techTable">
        <template v-for="header in tableHeader">
        <el-table-column :prop="header.prop" :label="header.label" :key="header.label">
        </el-table-column>
        </template>
    </el-table>
    <el-table v-if ="option === `Other`" :data="otherList" @row-click="techSelected" border height="250" style="width: 100%" class= "techTable">
        <template v-for="header in tableHeader">
        <el-table-column :prop="header.prop" :label="header.label" :key="header.label">
        </el-table-column>
        </template>
    </el-table>
    </el-dialog>
</div>
</template>

<script>
// import axios from 'axios';
// import moment from 'moment';

export default {
    name: "TechnicianLookupModal",
    props: [ 'tableHeader'],
    data() {
        return {
            searchTechNum: '',
            techList: [],
            otherList: [],
            filterVal:'',
            option: "Technician",
            dialogTableVisible: false,
            dataLoading: false,
            fixTechList: [],
            isIE: false,
        };
    },
    mounted() {
        this.isIE = !!document.documentMode;
    },
    computed: {

    },
    watch: {

    },
    methods: {
        showModal(value) {
            this.searchTechNum = value;
            this.searchTechNumber();  
        },

        closeModal(){
            this.dialogTableVisible = false; 
        },

        searchTechNumber(){
            this.dataLoading = true;
            // let curloc = 'curloc';
            // let userid = 'usr';
            let tempList1 = [];
            let tempList2 = [];
            let otherList1 = [];
            let otherList2 = [];
            // let valueFound = false;
            // let csrchdata = '';
            // let noReturn = '';
            // let twoline = 'Y';
            // let dwidth = '';
            // let err = '0';
            // let errmsg = '';     
            // axios.get(`/netview/ss/ROseltech?${curloc}+${userid}+`
            // )
            // .then(response => {  
                //Retreiving not so simple data from the response
                //If left as is, will successfully retrieve data and do as required
                let response = {
                    data:`<html><head>
<title>Service System Technician Search - Version 8.4 03/05/15 &nbsp; Copyright &copy; 2015 HBS. All rights reserved.</title>
<link REL="stylesheet" TYPE="text/css" HREF="../resources/default.css">
<style type = "text/css">
.oline
{
height: 20px;
width: 556px;
font: 9pt arial;
color: black;
background: #CCDDEE;
}
.eline
{
height: 20px;
width: 556px;
font: 9pt arial;
color: black;
background: #EEEEEE;
}
.hdr3
{
font: bold 9pt verdana;
color: #224468;
}
.hdr2
{
font: bold 9pt verdana;
color: black;
}
.hdr1
{
font: bold 11pt verdana;
color: black;
}
.dtl
{
font: bold 9pt verdana;
color: #224468;
}
.btn
{
font: bold 9pt verdana;
background: #C0C0C0;
color: black;
cursor: hand;
width: 80px;
}
</style>
<script type = "text/jscript" src = "../lib/common.js">
<script>
<script type = "text/jscript">
eCurloc = 'loc1'; 
function doOnLoad()
{
if( !window.dialogArguments )
{
alert( "Access denied!" );
eval( 'location = '+' "../libx/Login"' );
return;
}
if ( err.value != 0 )
{
alert( errmsg.value );
}
}
function selLine(ln)
{
var otherobj = document.getElementById( "otherList" );
if( otherobj.style.display == "none" ) {
if ( rTechnumT[ln].innerText == '' )
{
return;
}
var rtnVal = new Object();
rtnVal.techID = rTechnumT[ln].innerText;
rtnVal.techName = rNameT[ln].innerText;
rtnVal.techUserid = rTechnumT[ln].xuserid;
window.returnValue = rtnVal;
window.close();
}
else {
if ( rTechnumO[ln].innerText == '' )
{
return;
}
var rtnVal = new Object();
rtnVal.techID = rTechnumO[ln].innerText;
rtnVal.techName = rNameO[ln].innerText;
rtnVal.techUserid = rTechnumO[ln].xuserid;
window.returnValue = rtnVal;
window.close();
}
}
function showTech() {
var techobj = document.getElementById( "techList" );
var otherobj = document.getElementById( "otherList" );
techobj.style.display = "block";
otherobj.style.display = "none";
}
function showOther() {
var techobj = document.getElementById( "techList" );
var otherobj = document.getElementById( "otherList" );
techobj.style.display = "none";
otherobj.style.display = "block";
}
<script>
</head>
<body onload = "doOnLoad();">
<center>
<br>
<span class = hdr1>
Select Service System Technician
</span>
<br>
<br>
<table>
<tr>
<td>
<input type="radio" id="seltech" name="emptype"
value="tech"
style="background:transparent;"
onclick="showTech();"
checked>&nbsp;Technician
</td>
<td>
<input class="lbl" type="radio" id="selother" name="emptype"
value="other"
onclick="showOther();"
style="background:transparent;">&nbsp;Other
</td>
</tr>
</table>
<br/>
<table>
<tr>
<td>
<span class = hdr3 style = "width: 130px; text-align: left;">
Number
</span>
<span class = hdr3 style = "width: 200px; text-align: left;">
Technician Name
</span>
<span class = hdr3 style = "width: 140px; text-align: center; display: none;">
Skill Level
</span>
</td>
</tr>
</table>
<span style = "height: 242px; width: 576px;
overflow: auto;
border-left: 1px THREEDDARKSHADOW inset;
border-right: 1px THREEDDARKSHADOW inset;
border-bottom: 4px THREEDHIGHLIGHT inset;
border-top: 4px THREEDDARKSHADOW inset;
background: #DDDDDD;">
<span id="techlist">
<span class = eline onclick = selLine('0'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='jbreazeale0001N' style = 'text-align: left; width: 130px;'>000100</span><span id = rNameT style = 'text-align: left; width: 200px;'>JIMMY BREAZEALE</span></span><br><span class = oline onclick = selLine('1'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='jmullet' style = 'text-align: left; width: 130px;'>000400</span><span id = rNameT style = 'text-align: left; width: 200px;'>JONATHAN MULLINAX</span></span><br><span class = eline onclick = selLine('2'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='wcobb' style = 'text-align: left; width: 130px;'>000402</span><span id = rNameT style = 'text-align: left; width: 200px;'>WALTER COBB</span></span><br><span class = oline onclick = selLine('3'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='jdunnam' style = 'text-align: left; width: 130px;'>000403</span><span id = rNameT style = 'text-align: left; width: 200px;'>JUSTIN DUNNAM</span></span><br><span class = eline onclick = selLine('4'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='achavis' style = 'text-align: left; width: 130px;'>000408</span><span id = rNameT style = 'text-align: left; width: 200px;'>AUSTIN CHAVIS</span></span><br><span class = oline onclick = selLine('5'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='chrisr' style = 'text-align: left; width: 130px;'>000409</span><span id = rNameT style = 'text-align: left; width: 200px;'>CHRIS ROSSINGNOLL</span></span><br><span class = eline onclick = selLine('6'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='bknowles' style = 'text-align: left; width: 130px;'>000411</span><span id = rNameT style = 'text-align: left; width: 200px;'>BRAD KNOWLES</span></span><br><span class = oline onclick = selLine('7'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumT' xuserid='' style = 'text-align: left; width: 130px;'>000412</span><span id = rNameT style = 'text-align: left; width: 200px;'>GARRETT CORLEY</span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumT style = 'width: 130px;'></span><span id = rNameT style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumT style = 'width: 130px;'></span><span id = rNameT style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumT style = 'width: 130px;'></span><span id = rNameT style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumT style = 'width: 130px;'></span><span id = rNameT style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumT style = 'width: 130px;'></span><span id = rNameT style = 'width: 200px;'></span></span><br></span>
<span id="otherlist" style="display:none;">
<span class = eline onclick = selLine('0'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumO' xuserid='alindsey' style = 'text-align: left; width: 130px;'>000500</span><span id = rNameO style = 'text-align: left; width: 200px;'>ANTONIO LINDSEY</span></span><br><span class = oline onclick = selLine('1'); style = 'cursor: hand;'><span style = 'width: 36px;'> &nbsp; </span><span id='rTechnumO' xuserid='sprior' style = 'text-align: left; width: 130px;'>000903</span><span id = rNameO style = 'text-align: left; width: 200px;'>SHEA PRIOR</span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = oline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br><span class = eline><span style = 'width: 20px;'> &nbsp; &nbsp; </span><span id = rTechnumO style = 'width: 130px;'></span><span id = rNameO style = 'width: 200px;'></span></span><br></span>
</span>
<br>
<br>
<button class = btn style = "width: 100px;"
name = xit id = xit
title = "Exit program"
accesskey = "x"
onfocus     = "this.style.color = 'maroon'"
onblur      = "this.style.color = 'black'"
onmouseout  = "this.style.color = 'black'"
onmousedown = "this.style.color = 'maroon'"
onmouseup   = "this.style.color = 'black'"
onmouseover = "this.style.color = 'maroon'"
onclick     = "window.close();">
E<u>x</u>it
</button>
</center>
<span style = "display: none;">
<input type = text name = err id = err value = '0'><input type = text name = errmsg id = errmsg value = ''><input type='text' name='counttech' id='counttech' value='8'><input type='text' name='countother' id='countother' value='2'></span>
</body>
</html>`,
                } 
                this.dataLoading = false;
                this.valueFound = false;
                this.techList = [];
                this.otherList = [];
                var other1 = [];
                var other2 = [];
                //Gets techlist data
                var tech1 = response.data.match(/span id="techlist">\n.*<\/span><br><\/span>/)[0];
                var tech2 = response.data.match(/span id="techlist">\n.*<\/span><br><\/span>/)[0];
                //If otherlist exist, retrieve data
                if (/<span id="otherlist" style="display:none;">/.test(response.data) == false) {
                    other1 = response.data.match(/span id="otherlist">\n.*<\/span><br><\/span>/)[0];
                    other2 = response.data.match(/span id="otherlist">\n.*<\/span><br><\/span>/)[0]; 
                }
                //Gets tech names
                tech1.replace(/200px;'>(.*?)<\/span>/g, function (string, match) {
                  tempList1.push(match);
                });
                //Gets tech numbers
                tech2.replace(/130px;'>(.*?)<\/span>/g, function (string, match) {
                  tempList2.push(match);
                });
                //One last check or otherlist, if true it retrieves otherlist names and numbers
                if (/<span id="otherlist" style="display:none;">/.test(response.data) == false) {
                    other1.replace(/200px;'>(.*?)<\/span>/g, function (string, match) {
                        otherList1.push(match);
                    });
                    other2.replace(/130px;'>(.*?)<\/span>/g, function (string, match) {
                        otherList2.push(match);
                    });
                }
                //Correctly formats the tech data as needed
                for (var x = 0; x < tempList1.length; x++) {
                  this.techList.push({"tech_num" : tempList2[x], "tech_name": tempList1[x]});
                }
                //Correctly formats other data as needed
                if (/<span id="otherlist" style="display:none;">/.test(response.data) == false) {
                    for(let x = 0; x < otherList1.length; x++) {
                        this.otherList.push({"tech_num" : otherList2[x], "tech_name": otherList1[x]});
                    }
                }
                //If a search value was used(technician doesn't filter input), searches through data for a match
                if (this.searchTechNum != "") {
                    //If input is 4 characters, 2 zeroes added to match autoselection.
                    if (this.searchTechNum.length == 4) {
                        this.searchTechNum = `00${this.searchTechNum}`;
                    } else if (this.searchTechNum.length == 5) {
                        this.searchTechNum = `0${this.searchTechNum}`;
                    }
                    //Searches through techlist for value
                    for (let x = 0; x < this.techList.length; x++) {
                        if (this.techList[x]['tech_num'] == this.searchTechNum) {
                            this.valueFound = true;
                            this.$emit('tech-selected', this.techList[x]);
                            break;
                        }
                    }
                    //Searches through otherlist for value
                    for (let x = 0; x < this.otherList.length && !this.valueFound; x++) {
                        if (this.otherList[x]['tech_num'] == this.searchTechNum) {
                            this.valueFound = true;
                            this.$emit('tech-selected', this.otherList[x]);
                            break;
                        }
                    }
                } else {
                    //If value was not inputted for search
                    if (this.techList.length == 1) {
                        this.valueFound = true;
                        this.$emit('tech-selected', {tech: this.techList[0]});
                    } else {
                        this.dialogTableVisible = true;
                        this.fixTechList = this.techList;
                    }
                }
                //If value was not found in search, returns false for handling in onTechSelect function
                if (this.valueFound == false) {
                    this.$emit('tech-selected', false);
                }
            // }).catch(error => {  
                // console.error('Error in call to ROseltech:', error);
            // });
        },

        //When technician is selected through dialogue box
        techSelected(tech){
            this.$emit('tech-selected', tech);
            this.closeModal();
            this.$emit('focus-tech');
        },

        closeBtnClicked(){
            this.$emit('tech-closed');
            this.closeModal();
        },

        filterRecords(){
            let techListTemp = this.fixTechList.slice(0); 
            if(this.filterVal === ''){
                let val = this.filterVal.toUpperCase();            
                techListTemp = techListTemp.filter( (item) => {                                        
                    return ( item.tech_num.toUpperCase().indexOf(val) > -1);
                });
            }
            this.techList = techListTemp; 
        },

    }

}
</script>

<style >
.el-dialog__headerbtn {
    top: 10px;
}
.filterInput{
    float: right;
    width: 20%;
    bottom: 10px;
}
.techLookupModalClass > .el-dialog > .el-dialog__header > .el-dialog__title{
  color: white;
}
.techTable .el-table__body-wrapper tr {
 cursor: pointer;
}
button.el-dialog__headerbtn .el-dialog__close{
  color: white;
  font-weight: bold;
}



</style>