<template>
  <div class="form-container">
    <!--    <h1 class="form-title">{{ title }}</h1>-->
    <el-form :model="formData" ref="form" label-width="auto" :rules="rules">
      <el-row gutter="40">
        <el-col v-for="field in fields" :key="field.prop" :span="field.span" >
            <el-form-item :prop="field.prop" :label="field.label"
                        :class="{ 'hidden': field.hide === true }">
<!--              <el-time-select-->
<!--                v-if="field.type === 'time'"-->
<!--                v-model="formData[field.prop]"-->
<!--                :placeholder="field.label"-->
<!--                :format="field.format"-->
<!--              >-->
<!--              </el-time-select>-->
            <!--日期-->
            <el-date-picker clearable v-if="field.type === 'date'" style="width: 100%"
                            :disabled = "field.disabled"
                            v-model="formData[field.prop]"
                            align="right"
                            type="date"
                            :placeholder="field.label"
                            :picker-options="pickerOptions">
            </el-date-picker>
            <!--下拉框-->
            <el-select :placeholder="field.label" :filterable="field.search" style="width: 100%"
                       :disabled = "field.disabled"
                       clearable v-else-if="field.type === 'select'" v-model="formData[field.prop]"
            >
              <el-option v-for="option in field.options" :key="option[field.value]" :label="option[field.lableName]"
                         :value="option[field.value]" ></el-option>
            </el-select>
            <!--正常文本 clearable 可删除-->
            <el-input clearable :placeholder="field.label" v-else v-model="formData[field.prop]" style="width: 100%"
                      :disabled = "field.disabled"
                      :type="field.type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-actions" v-if="isSaveButton">
      <el-button @click="saveForm"  class="form-btn form-btn-save" type="primary">保存</el-button>
      <el-button @click="cancelForm"  class="form-btn form-btn-cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import {isCancel} from "axios";

export default {
  name: 'FormComponent',

  props: {
    isSaveButton:{
      type: Boolean,
      default: () => true
    },
    title: {
      type: String,
      default: ''
    },
    fields: {
      type: Array,
      default: () => []
    },
    hiddenFields: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Map,
      default: () => {}
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    isCancel,
    saveForm() {
      // 调用父组件的保存方法，将表单数据传递给父组件
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('save', this.formData);
        }
      });
    },
    cancelForm() {
      // 调用父组件的取消方法
      this.$emit('cancel');
    }
  },

  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
}
</script>

<style scoped>

.hidden {
  display: none;
}

.form-actions {
  text-align: center;
margin-top: 30px;
}
</style>
