<template>
  <div class="container">
    <div class="filter-panel">
      <div class="row">
        <div class="col-md d-flex justify-content-center align-items-baseline">
          <label>Họ và tên</label>
          <input type="text" class="input" />
        </div>
        <div class="col-md d-flex justify-content-center align-items-baseline">
          <label>Chức vụ</label>
          <input type="text" class="input" />
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <button type="button" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
    <div class="row mid-section">
      <div class="col-md">
        <select class="custom-select" style="width: 50%">
          <option selected>Số lượng hiển thị</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="70">70</option>
        </select>
      </div>
      <div class="col-md">
        <h5><b>Danh sách nhân viên khen thưởng kỉ luật</b></h5>
      </div>
      <div class="col-md d-flex justify-content-end">
        <button class="btn btn-primary" v-on:click="showModalCreateAP">
          <i class="ti-plus" style="margin-right:4px"></i> Thêm mới
        </button>
      </div>
    </div>

    <vuetable
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :data="data"
      :css="css"
    >
      <div slot="checkbox-slot" slot-scope="props">
        <input
          type="checkbox"
          v-on:change="handleCheckbox(props.rowData.index)"
        />
      </div>
      <div slot="action-slot" slot-scope="props">
        <button
          class="btn btn-primary"
          v-on:click="handleCheckbox(props.rowData.index)"
        >
          Chi tiết
        </button>
        <button
          class="btn btn-success"
          v-on:click="handleCheckbox(props.rowData.index)"
        >
          Sửa
        </button>
        <button
          class="btn btn-danger"
          v-on:click="handleCheckbox(props.rowData.index)"
        >
          Xoá
        </button>
      </div>
    </vuetable>
    <modal
      name="createNewAP"
      :clickToClose="true"
      :min-width="320"
      :max-width="740"
      width="50%"
    >
      <div class="container">
        <div class="row d-flex justify-content-between align-items-baseline">
          <p style="margin-left: 10px; font-size: 20px">
            <b>Thêm mới nhân viên kỉ luật khen thưởng</b>
          </p>
          <button class="btn btn-default" v-on:click="hideModalCreateAP">
            <i class="ti-close"></i>
          </button>
        </div>
        <div>
          <user></user>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Vuetable from "vuetable-2";

export default {
  components: { Vuetable },
  data() {
    return {
      css: {
        tableClass: "table table-bordered table-hover",
        tableBodyClass: "font-size: 20px"
      },
      fields: [
        { name: "index", title: "STT" },
        { name: "checkbox-slot", title: "Select" },
        { name: "action-slot", title: "Tác vụ" },
        { name: "fullName", title: "Họ và tên" },
        { name: "type", title: "Loại" },
        { name: "title", title: "Tiêu đề" }
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
    showModalCreateAP() {
      this.$modal.show("createNewAP", {
        width: "800px",
        height: "auto",
        maxWidth: "1000px"
      });
    },
    hideModalCreateAP() {
      this.$modal.hide("createNewAP");
    }
  }
};
</script>
<style>
.filter-panel {
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 5%;
  padding: 20px;
}
.input {
  margin-left: 30px;
}
.mid-section {
  margin-bottom: 2%;
}
.btn {
  margin: 1%;
}
</style>
