<template>
  <div class="container">
    <div class="flex-container">
      <div class="name">
        <label>Ho ten</label>
        <input type="text" />
      </div>
      <button type="submit">Tim kiem</button>
      <div class="name">
        <label>Ho ten</label>
        <input type="text" />
      </div>
    </div>
    <vuetable ref="vuetable" :api-mode="false" :fields="fields" :data="data">
      <div slot="checkbox-slot" slot-scope="props">
        <input
          type="checkbox"
          v-on:change="handleCheckbox(props.rowData.index)"
        /></div
    ></vuetable>
  </div>
</template>
<script>
import Vuetable from "vuetable-2";

export default {
  components: { Vuetable },
  data() {
    return {
      fields: [
        { name: "$_index", title: "STT" },
        { name: "checkbox-slot", title: "Select" },
        { name: "action", title: "Tác vụ" },
        { name: "fullName", title: "Họ và tên" },
        { name: "type", title: "Loại" }
      ],
      data: []
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },
  async mounted() {
    const res = await this.$axios.get("/award-penalties");
    const processData = res.data.data.map((data, index) => {
      return {
        index: index + 1,
        fullName: data.user.fullName,
        ...data
      };
    });
    this.data = processData;
  },

  methods: {
    handleCheckbox(index) {}
  }
};
</script>
