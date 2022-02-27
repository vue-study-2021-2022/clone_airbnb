<template>
  <div class="sample pd-x-40">
    <h1>sample</h1>
    <div class="sample-item">
      <label>input</label>
      <a-input v-model="input_value" />
    </div>
    <div class="sample-item">
      <label>input_tel</label>
      <a-input v-model="input_value_tel" type="tel" />
    </div>
    <div class="sample-item">
      <label>input_password</label>
      <a-input v-model="input_value_password" type="password" />
    </div>
    <div class="sample-item">
      <label>input_tel_password</label>
      <a-input v-model="input_value_tel_password" type="tel_password" />
    </div>
    <a-button @click="dialog.visible = !dialog.visible">팝업</a-button>
    <a-dialog :visible.sync="dialog.visible" width="80%">
      <div style="height: 300px">테스트</div>
    </a-dialog>
  </div>
</template>

<script>
export default {
  name: 'ViewsSample',
  data() {
    return {
      input_value: '',
      input_value_tel: '',
      input_value_password: '',
      input_value_tel_password: '',
      dialog: {
        visible: false,
      },
    }
  },
}
</script>

<style lang="scss">
.sample > .sample-item {
  padding: 10px;
  display: flex;

  & > label {
    margin-right: 8px;
    width: 130px;
    text-align: left;

    & + * {
      width: 300px;
    }
  }
}
</style>
