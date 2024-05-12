<template>
  <div class="addEdit-block">
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
	  :style="{backgroundColor:addEditForm.addEditBoxColor}"
    >
      <el-row >
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="电影名称" prop="dianyingmingcheng">
          <el-input v-model="ruleForm.dianyingmingcheng" 
              placeholder="电影名称" clearable  :readonly="ro.dianyingmingcheng"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="电影名称" prop="dianyingmingcheng">
              <el-input v-model="ruleForm.dianyingmingcheng" 
                placeholder="电影名称" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="select" v-if="type!='info'"  label="电影分类" prop="dianyingfenlei">
          <el-select :disabled="ro.dianyingfenlei" v-model="ruleForm.dianyingfenlei" placeholder="请选择电影分类">
            <el-option
                v-for="(item,index) in dianyingfenleiOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="电影分类" prop="dianyingfenlei">
	      <el-input v-model="ruleForm.dianyingfenlei"
                placeholder="电影分类" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">  
        <el-form-item class="upload" v-if="type!='info' && !ro.dianyinghaibao" label="电影海报" prop="dianyinghaibao">
          <file-upload
          tip="点击上传电影海报"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.dianyinghaibao?ruleForm.dianyinghaibao:''"
          @change="dianyinghaibaoUploadChange"
          ></file-upload>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.dianyinghaibao" label="电影海报" prop="dianyinghaibao">
            <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.dianyinghaibao.split(',')" :src="$base.url+item" width="100" height="100">
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">  
        <el-form-item class="upload" v-if="type!='info'&& !ro.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
          <file-upload
          tip="点击上传电影片段"
          action="file/upload"
          :limit="1"
          :multiple="true"
          :fileUrls="ruleForm.dianyingpianduan?ruleForm.dianyingpianduan:''"
          @change="dianyingpianduanUploadChange"
          ></file-upload>
        </el-form-item> 
        <div v-else>
          <el-form-item v-if="ruleForm.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
            <el-button type="text" size="small" @click="download($base.url+ruleForm.dianyingpianduan)">预览</el-button>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="导演" prop="daoyan">
          <el-input v-model="ruleForm.daoyan" 
              placeholder="导演" clearable  :readonly="ro.daoyan"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="导演" prop="daoyan">
              <el-input v-model="ruleForm.daoyan" 
                placeholder="导演" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="演员" prop="yanyuan">
          <el-input v-model="ruleForm.yanyuan" 
              placeholder="演员" clearable  :readonly="ro.yanyuan"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="演员" prop="yanyuan">
              <el-input v-model="ruleForm.yanyuan" 
                placeholder="演员" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="date" v-if="type!='info'" label="上映日期" prop="shangyingriqi">
            <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.shangyingriqi" 
                type="date"
                :readonly="ro.shangyingriqi"
                placeholder="上映日期">
            </el-date-picker> 
        </el-form-item>
        <div v-else>
          <el-form-item class="input" v-if="ruleForm.shangyingriqi" label="上映日期" prop="shangyingriqi">
              <el-input v-model="ruleForm.shangyingriqi" 
                placeholder="上映日期" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="放映场次" prop="fangyingchangci">
          <el-input v-model="ruleForm.fangyingchangci" 
              placeholder="放映场次" clearable  :readonly="ro.fangyingchangci"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="放映场次" prop="fangyingchangci">
              <el-input v-model="ruleForm.fangyingchangci" 
                placeholder="放映场次" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="放映时间" prop="fangyingshijian">
          <el-input v-model="ruleForm.fangyingshijian" 
              placeholder="放映时间" clearable  :readonly="ro.fangyingshijian"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="放映时间" prop="fangyingshijian">
              <el-input v-model="ruleForm.fangyingshijian" 
                placeholder="放映时间" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="select" v-if="type!='info'"  label="放映厅" prop="fangyingting">
          <el-select :disabled="ro.fangyingting" v-model="ruleForm.fangyingting" placeholder="请选择放映厅">
            <el-option
                v-for="(item,index) in fangyingtingOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="放映厅" prop="fangyingting">
	      <el-input v-model="ruleForm.fangyingting"
                placeholder="放映厅" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="影院名称" prop="yingyuanmingcheng">
          <el-input v-model="ruleForm.yingyuanmingcheng" 
              placeholder="影院名称" clearable  :readonly="ro.yingyuanmingcheng"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="影院名称" prop="yingyuanmingcheng">
              <el-input v-model="ruleForm.yingyuanmingcheng" 
                placeholder="影院名称" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="影院地址" prop="yingyuandizhi">
          <el-input v-model="ruleForm.yingyuandizhi" 
              placeholder="影院地址" clearable  :readonly="ro.yingyuandizhi"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="影院地址" prop="yingyuandizhi">
              <el-input v-model="ruleForm.yingyuandizhi" 
                placeholder="影院地址" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="价格" prop="price">
          <el-input v-model="ruleForm.price" 
              placeholder="价格" clearable  :readonly="ro.price"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="价格" prop="price">
              <el-input v-model="ruleForm.price" 
                placeholder="价格" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="座位总数" prop="number">
          <el-input v-model="ruleForm.number" 
              placeholder="座位总数" clearable  :readonly="ro.number"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="座位总数" prop="number">
              <el-input v-model="ruleForm.number" 
                placeholder="座位总数" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="textarea" v-if="type!='info'" label="已选座位[用,号隔开]" prop="selected">
                <el-input
                  style="min-width: 200px; max-width: 600px;"
                  type="textarea"
                  :rows="8"
                  placeholder="已选座位[用,号隔开]"
                  v-model="ruleForm.selected" >
                </el-input>
              </el-form-item>
              <div v-else>
                <el-form-item v-if="ruleForm.selected" label="已选座位[用,号隔开]" prop="selected">
                    <span>{{ruleForm.selected}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item v-if="type!='info'"  label="电影介绍" prop="dianyingjieshao">
                <editor 
                    style="min-width: 200px; max-width: 600px;"
                    v-model="ruleForm.dianyingjieshao" 
                    class="editor" 
                    action="file/upload">
                </editor>
              </el-form-item>
              <div v-else>
                <el-form-item v-if="ruleForm.dianyingjieshao" label="电影介绍" prop="dianyingjieshao">
                    <span v-html="ruleForm.dianyingjieshao"></span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
      <el-form-item class="btn">
        <el-button  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
        <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
        <el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
  data() {
    let self = this
    var validateIdCard = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!checkIdCard(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    var validateUrl = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isURL(value)) {
        callback(new Error("请输入正确的URL地址"));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isMobile(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isPhone(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isNumber(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    var validateIntNumber = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isIntNumer(value)) {
        callback(new Error("请输入整数"));
      } else {
        callback();
      }
    };
    return {
	  addEditForm: {"btnSaveFontColor":"rgba(165,42,42, 1)","selectFontSize":"14px","btnCancelBorderColor":"#DCDFE6","inputBorderRadius":"4px","inputFontSize":"14px","textareaBgColor":"#fff","btnSaveFontSize":"14px","textareaBorderRadius":"4px","uploadBgColor":"#fff","textareaBorderStyle":"solid","btnCancelWidth":"88px","textareaHeight":"120px","dateBgColor":"#fff","btnSaveBorderRadius":"40px","uploadLableFontSize":"14px","textareaBorderWidth":"1px","inputLableColor":"#606266","addEditBoxColor":"rgba(255, 255, 255, 0)","dateIconFontSize":"14px","btnSaveBgColor":"rgba(255, 255, 255, 1)","uploadIconFontColor":"#8c939d","textareaBorderColor":"#DCDFE6","btnCancelBgColor":"rgba(255, 255, 255, 1)","selectLableColor":"#606266","btnSaveBorderStyle":"solid","dateBorderWidth":"1px","dateLableFontSize":"14px","dateBorderRadius":"4px","btnCancelBorderStyle":"solid","selectLableFontSize":"14px","selectBorderStyle":"solid","selectIconFontColor":"#C0C4CC","btnCancelHeight":"44px","inputHeight":"40px","btnCancelFontColor":"#606266","dateBorderColor":"#DCDFE6","dateIconFontColor":"#C0C4CC","uploadBorderStyle":"solid","dateBorderStyle":"solid","dateLableColor":"#606266","dateFontSize":"14px","inputBorderWidth":"1px","uploadIconFontSize":"28px","selectHeight":"40px","inputFontColor":"#606266","uploadHeight":"148px","textareaLableColor":"#606266","textareaLableFontSize":"14px","btnCancelFontSize":"14px","inputBorderStyle":"solid","btnCancelBorderRadius":"40px","inputBgColor":"#fff","inputLableFontSize":"14px","uploadLableColor":"#606266","uploadBorderRadius":"4px","btnSaveHeight":"44px","selectBgColor":"#fff","btnSaveWidth":"88px","selectIconFontSize":"14px","dateHeight":"40px","selectBorderColor":"#DCDFE6","inputBorderColor":"#DCDFE6","uploadBorderColor":"#DCDFE6","textareaFontColor":"#606266","selectBorderWidth":"1px","dateFontColor":"#606266","btnCancelBorderWidth":"3px","uploadBorderWidth":"1px","textareaFontSize":"14px","selectBorderRadius":"4px","selectFontColor":"#606266","btnSaveBorderColor":"rgba(165,42,42, 1)","btnSaveBorderWidth":"3px"},
      id: '',
      type: '',
      ro:{
	dianyingmingcheng : false,
	dianyingfenlei : false,
	dianyinghaibao : false,
	dianyingpianduan : false,
	daoyan : false,
	yanyuan : false,
	shangyingriqi : false,
	fangyingchangci : false,
	fangyingshijian : false,
	fangyingting : false,
	yingyuanmingcheng : false,
	yingyuandizhi : false,
	dianyingjieshao : false,
	clicktime : false,
	clicknum : false,
	price : false,
	number : false,
	selected : false,
      },
      ruleForm: {
        dianyingmingcheng: '',
        dianyingfenlei: '',
        dianyinghaibao: '',
        dianyingpianduan: '',
        daoyan: '',
        yanyuan: '',
        shangyingriqi: '',
        fangyingchangci: '',
        fangyingshijian: '',
        fangyingting: '',
        yingyuanmingcheng: '',
        yingyuandizhi: '',
        dianyingjieshao: '',
        clicktime: '',
        price: '',
        number: '',
        selected: '',
      },
          dianyingfenleiOptions: [],
          fangyingtingOptions: [],
      rules: {
          dianyingmingcheng: [
                { required: true, message: '电影名称不能为空', trigger: 'blur' },
          ],
          dianyingfenlei: [
          ],
          dianyinghaibao: [
          ],
          dianyingpianduan: [
          ],
          daoyan: [
          ],
          yanyuan: [
          ],
          shangyingriqi: [
          ],
          fangyingchangci: [
          ],
          fangyingshijian: [
          ],
          fangyingting: [
          ],
          yingyuanmingcheng: [
          ],
          yingyuandizhi: [
          ],
          dianyingjieshao: [
          ],
          clicktime: [
          ],
          clicknum: [
                { validator: validateIntNumber, trigger: 'blur' },
          ],
          price: [
                { validator: validateNumber, trigger: 'blur' },
          ],
          number: [
                { validator: validateIntNumber, trigger: 'blur' },
          ],
          selected: [
          ],
      }
    };
  },
  props: ["parent"],
  computed: {



  },
  created() {
	this.ruleForm.shangyingriqi = this.getCurDate()
	this.addEditStyleChange()
	this.addEditUploadStyleChange()
  },
  methods: {
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 初始化
    init(id,type) {
      if (id) {
        this.id = id;
        this.type = type;
      }
      if(this.type=='info'||this.type=='else'){
        this.info(id);
      }else if(this.type=='logistics'){
        this.logistics=false;
        this.info(id);
      }else if(this.type=='cross'){
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj){
          if(o=='dianyingmingcheng'){
            this.ruleForm.dianyingmingcheng = obj[o];
	    this.ro.dianyingmingcheng = true;
            continue;
          }
          if(o=='dianyingfenlei'){
            this.ruleForm.dianyingfenlei = obj[o];
	    this.ro.dianyingfenlei = true;
            continue;
          }
          if(o=='dianyinghaibao'){
            this.ruleForm.dianyinghaibao = obj[o];
	    this.ro.dianyinghaibao = true;
            continue;
          }
          if(o=='dianyingpianduan'){
            this.ruleForm.dianyingpianduan = obj[o];
	    this.ro.dianyingpianduan = true;
            continue;
          }
          if(o=='daoyan'){
            this.ruleForm.daoyan = obj[o];
	    this.ro.daoyan = true;
            continue;
          }
          if(o=='yanyuan'){
            this.ruleForm.yanyuan = obj[o];
	    this.ro.yanyuan = true;
            continue;
          }
          if(o=='shangyingriqi'){
            this.ruleForm.shangyingriqi = obj[o];
	    this.ro.shangyingriqi = true;
            continue;
          }
          if(o=='fangyingchangci'){
            this.ruleForm.fangyingchangci = obj[o];
	    this.ro.fangyingchangci = true;
            continue;
          }
          if(o=='fangyingshijian'){
            this.ruleForm.fangyingshijian = obj[o];
	    this.ro.fangyingshijian = true;
            continue;
          }
          if(o=='fangyingting'){
            this.ruleForm.fangyingting = obj[o];
	    this.ro.fangyingting = true;
            continue;
          }
          if(o=='yingyuanmingcheng'){
            this.ruleForm.yingyuanmingcheng = obj[o];
	    this.ro.yingyuanmingcheng = true;
            continue;
          }
          if(o=='yingyuandizhi'){
            this.ruleForm.yingyuandizhi = obj[o];
	    this.ro.yingyuandizhi = true;
            continue;
          }
          if(o=='dianyingjieshao'){
            this.ruleForm.dianyingjieshao = obj[o];
	    this.ro.dianyingjieshao = true;
            continue;
          }
          if(o=='clicktime'){
            this.ruleForm.clicktime = obj[o];
	    this.ro.clicktime = true;
            continue;
          }
          if(o=='clicknum'){
            this.ruleForm.clicknum = obj[o];
	    this.ro.clicknum = true;
            continue;
          }
          if(o=='price'){
            this.ruleForm.price = obj[o];
	    this.ro.price = true;
            continue;
          }
          if(o=='number'){
            this.ruleForm.number = obj[o];
	    this.ro.number = true;
            continue;
          }
          if(o=='selected'){
            this.ruleForm.selected = obj[o];
	    this.ro.selected = true;
            continue;
          }
        }
      }
      // 获取用户信息
      this.$http({
        url: `${this.$storage.get('sessionTable')}/session`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          var json = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
            this.$http({
              url: `option/dianyingfenlei/dianyingfenlei`,
              method: "get"
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.dianyingfenleiOptions = data.data;
              } else {
                this.$message.error(data.msg);
              }
            });
         
            this.fangyingtingOptions = "1号厅,2号厅,3号厅,4号厅,5号厅,6号厅,情侣厅,巨幕厅".split(',')
    },
    // 多级联动参数
    info(id) {
      this.$http({
        url: `dianyingxinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
	//解决前台上传图片后台不显示的问题
	let reg=new RegExp('../../../upload','g')//g代表全部
	this.ruleForm.dianyingjieshao = this.ruleForm.dianyingjieshao.replace(reg,'../../../ssm3v709/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {






	if(this.ruleForm.dianyinghaibao!=null) {
		this.ruleForm.dianyinghaibao = this.ruleForm.dianyinghaibao.replace(new RegExp(this.$base.url,"g"),"");
	}


	if(this.ruleForm.dianyingpianduan!=null) {
		this.ruleForm.dianyingpianduan = this.ruleForm.dianyingpianduan.replace(new RegExp(this.$base.url,"g"),"");
	}





























var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(!statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "dianyingxinxi/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `dianyingxinxi/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `dianyingxinxi/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
			   }
			 });
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    dianyinghaibaoUploadChange(fileUrls) {
	this.ruleForm.dianyinghaibao = fileUrls;
	this.addEditUploadStyleChange()
    },
    dianyingpianduanUploadChange(fileUrls) {
	this.ruleForm.dianyingpianduan = fileUrls;
	this.addEditUploadStyleChange()
    },
	addEditStyleChange() {
	  this.$nextTick(()=>{
	    // input
	    document.querySelectorAll('.addEdit-block .input .el-input__inner').forEach(el=>{
	      el.style.height = this.addEditForm.inputHeight
	      el.style.color = this.addEditForm.inputFontColor
	      el.style.fontSize = this.addEditForm.inputFontSize
	      el.style.borderWidth = this.addEditForm.inputBorderWidth
	      el.style.borderStyle = this.addEditForm.inputBorderStyle
	      el.style.borderColor = this.addEditForm.inputBorderColor
	      el.style.borderRadius = this.addEditForm.inputBorderRadius
	      el.style.backgroundColor = this.addEditForm.inputBgColor
	    })
	    document.querySelectorAll('.addEdit-block .input .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = this.addEditForm.inputHeight
	      el.style.color = this.addEditForm.inputLableColor
	      el.style.fontSize = this.addEditForm.inputLableFontSize
	    })
	    // select
	    document.querySelectorAll('.addEdit-block .select .el-input__inner').forEach(el=>{
	      el.style.height = this.addEditForm.selectHeight
	      el.style.color = this.addEditForm.selectFontColor
	      el.style.fontSize = this.addEditForm.selectFontSize
	      el.style.borderWidth = this.addEditForm.selectBorderWidth
	      el.style.borderStyle = this.addEditForm.selectBorderStyle
	      el.style.borderColor = this.addEditForm.selectBorderColor
	      el.style.borderRadius = this.addEditForm.selectBorderRadius
	      el.style.backgroundColor = this.addEditForm.selectBgColor
	    })
	    document.querySelectorAll('.addEdit-block .select .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = this.addEditForm.selectHeight
	      el.style.color = this.addEditForm.selectLableColor
	      el.style.fontSize = this.addEditForm.selectLableFontSize
	    })
	    document.querySelectorAll('.addEdit-block .select .el-select__caret').forEach(el=>{
	      el.style.color = this.addEditForm.selectIconFontColor
	      el.style.fontSize = this.addEditForm.selectIconFontSize
	    })
	    // date
	    document.querySelectorAll('.addEdit-block .date .el-input__inner').forEach(el=>{
	      el.style.height = this.addEditForm.dateHeight
	      el.style.color = this.addEditForm.dateFontColor
	      el.style.fontSize = this.addEditForm.dateFontSize
	      el.style.borderWidth = this.addEditForm.dateBorderWidth
	      el.style.borderStyle = this.addEditForm.dateBorderStyle
	      el.style.borderColor = this.addEditForm.dateBorderColor
	      el.style.borderRadius = this.addEditForm.dateBorderRadius
	      el.style.backgroundColor = this.addEditForm.dateBgColor
	    })
	    document.querySelectorAll('.addEdit-block .date .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = this.addEditForm.dateHeight
	      el.style.color = this.addEditForm.dateLableColor
	      el.style.fontSize = this.addEditForm.dateLableFontSize
	    })
	    document.querySelectorAll('.addEdit-block .date .el-input__icon').forEach(el=>{
	      el.style.color = this.addEditForm.dateIconFontColor
	      el.style.fontSize = this.addEditForm.dateIconFontSize
	      el.style.lineHeight = this.addEditForm.dateHeight
	    })
	    // upload
	    let iconLineHeight = parseInt(this.addEditForm.uploadHeight) - parseInt(this.addEditForm.uploadBorderWidth) * 2 + 'px'
	    document.querySelectorAll('.addEdit-block .upload .el-upload--picture-card').forEach(el=>{
	      el.style.width = this.addEditForm.uploadHeight
	      el.style.height = this.addEditForm.uploadHeight
	      el.style.borderWidth = this.addEditForm.uploadBorderWidth
	      el.style.borderStyle = this.addEditForm.uploadBorderStyle
	      el.style.borderColor = this.addEditForm.uploadBorderColor
	      el.style.borderRadius = this.addEditForm.uploadBorderRadius
	      el.style.backgroundColor = this.addEditForm.uploadBgColor
	    })
	    document.querySelectorAll('.addEdit-block .upload .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = this.addEditForm.uploadHeight
	      el.style.color = this.addEditForm.uploadLableColor
	      el.style.fontSize = this.addEditForm.uploadLableFontSize
	    })
	    document.querySelectorAll('.addEdit-block .upload .el-icon-plus').forEach(el=>{
	      el.style.color = this.addEditForm.uploadIconFontColor
	      el.style.fontSize = this.addEditForm.uploadIconFontSize
	      el.style.lineHeight = iconLineHeight
	      el.style.display = 'block'
	    })
	    // 多文本输入框
	    document.querySelectorAll('.addEdit-block .textarea .el-textarea__inner').forEach(el=>{
	      el.style.height = this.addEditForm.textareaHeight
	      el.style.color = this.addEditForm.textareaFontColor
	      el.style.fontSize = this.addEditForm.textareaFontSize
	      el.style.borderWidth = this.addEditForm.textareaBorderWidth
	      el.style.borderStyle = this.addEditForm.textareaBorderStyle
	      el.style.borderColor = this.addEditForm.textareaBorderColor
	      el.style.borderRadius = this.addEditForm.textareaBorderRadius
	      el.style.backgroundColor = this.addEditForm.textareaBgColor
	    })
	    document.querySelectorAll('.addEdit-block .textarea .el-form-item__label').forEach(el=>{
	      // el.style.lineHeight = this.addEditForm.textareaHeight
	      el.style.color = this.addEditForm.textareaLableColor
	      el.style.fontSize = this.addEditForm.textareaLableFontSize
	    })
	    // 保存
	    document.querySelectorAll('.addEdit-block .btn .btn-success').forEach(el=>{
	      el.style.width = this.addEditForm.btnSaveWidth
	      el.style.height = this.addEditForm.btnSaveHeight
	      el.style.color = this.addEditForm.btnSaveFontColor
	      el.style.fontSize = this.addEditForm.btnSaveFontSize
	      el.style.borderWidth = this.addEditForm.btnSaveBorderWidth
	      el.style.borderStyle = this.addEditForm.btnSaveBorderStyle
	      el.style.borderColor = this.addEditForm.btnSaveBorderColor
	      el.style.borderRadius = this.addEditForm.btnSaveBorderRadius
	      el.style.backgroundColor = this.addEditForm.btnSaveBgColor
	    })
	    // 返回
	    document.querySelectorAll('.addEdit-block .btn .btn-close').forEach(el=>{
	      el.style.width = this.addEditForm.btnCancelWidth
	      el.style.height = this.addEditForm.btnCancelHeight
	      el.style.color = this.addEditForm.btnCancelFontColor
	      el.style.fontSize = this.addEditForm.btnCancelFontSize
	      el.style.borderWidth = this.addEditForm.btnCancelBorderWidth
	      el.style.borderStyle = this.addEditForm.btnCancelBorderStyle
	      el.style.borderColor = this.addEditForm.btnCancelBorderColor
	      el.style.borderRadius = this.addEditForm.btnCancelBorderRadius
	      el.style.backgroundColor = this.addEditForm.btnCancelBgColor
	    })
	  })
	},
	addEditUploadStyleChange() {
		this.$nextTick(()=>{
		  document.querySelectorAll('.addEdit-block .upload .el-upload-list--picture-card .el-upload-list__item').forEach(el=>{
			el.style.width = this.addEditForm.uploadHeight
			el.style.height = this.addEditForm.uploadHeight
			el.style.borderWidth = this.addEditForm.uploadBorderWidth
			el.style.borderStyle = this.addEditForm.uploadBorderStyle
			el.style.borderColor = this.addEditForm.uploadBorderColor
			el.style.borderRadius = this.addEditForm.uploadBorderRadius
			el.style.backgroundColor = this.addEditForm.uploadBgColor
		  })
	  })
	},
  }
};
</script>
<style lang="scss">
.editor{
  height: 500px;
  
  & /deep/ .ql-container {
	  height: 310px;
  }
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}
.search-box {
  position: absolute;
}
.addEdit-block {
	margin: -10px;
}
.detail-form-content {
	padding: 12px;
	background-color: transparent;
}
.btn .el-button {
  padding: 0;
}
</style>
