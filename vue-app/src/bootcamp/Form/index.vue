<template>
  <div class="form">
    <div class="title">
      <span class="label">form test</span>
    </div>
    <input type="text" ref='inputRef'>
    <a-form layout="horizontal" :form="form" @submit="handleSubmit">
      <a-form-item label="name" :labelCol="{span: 5}" :wrapperCol="{span: 12}">
        <a-input placeholder="userName" size="small" v-decorator="['username']"></a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{offset: 5, span: 12}" :style="{'textAlign': 'right'}">
        <a-button type="primary" htmlType="submit" :loading="loading">submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "FormTest",
  data() {
    return {
      form: this.$form.createForm(this, { name: "test" }),
      loading: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("values", values)
          window.setTimeout(() => {
              this.loading = false
          }, 2000)
        }
      })
    }
  },
  mounted() {
      this.$refs.inputRef.focus()
  }
})
</script>

<style lang='scss' scoped>
$h: 30px;
.form {
  width: 50vw;
  margin: 0 auto;
  .title {
      height: $h;
      line-height: $h;
      text-align: left;
      text-transform: capitalize;
      .label {
          font: {
              size: 14px;
              weight: bold;
          }
      }
  }
}
</style>