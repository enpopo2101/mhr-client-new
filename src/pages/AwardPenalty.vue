<template>
  <div class="container">
    <div class="filter-panel">
      <div class="row">
        <div class="col-md d-flex align-items-center">
          <label style="width: 100px !important">Họ và tên</label>
          <input type="text" class="form-control" />
        </div>
        <div class="col-md d-flex align-items-center">
          <label style="width: 80px !important">Chức vụ</label>
          <input type="text" class="form-control" />
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <button type="button" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <select class="custom-select" style="width: 100%">
          <option selected>Số lượng hiển thị</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="70">70</option>
        </select>
      </div>
      <div>
        <h5><b>Danh sách nhân viên khen thưởng kỉ luật</b></h5>
      </div>
      <div class="d-flex justify-content-start align-items-center">
        <button class="btn btn-danger" style="width: 100px !important">
          <i class="fas fa-minus" style="margin-right:4px"></i>
          Xóa
        </button>
        <button
          class="btn btn-primary"
          v-on:click="createNewAP"
          style="width: 140px !important"
        >
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
          v-on:click="detailAP(props.rowData.index - 1)"
        >
          <i class="far fa-eye"></i>
        </button>
        <button
          class="btn btn-success"
          v-on:click="updateAP(props.rowData.index - 1)"
        >
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="btn btn-danger"
          v-on:click="showModalConfirmDelete(props.rowData.index - 1)"
        >
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </vuetable>

    <!-- modal confirm delete -->
    <v-dialog
      name="confirmDelete"
      :clickToClose="true"
      :pivotY="0.5"
      :povotX="0.5"
      width="20%"
      height="22%"
    />
    <!-- modal confirm delete end -->
  </div>
</template>
<script>
import Vuetable from "vuetable-2";
import * as moment from "moment";
import * as lang from "vuejs-datepicker/src/locale";
export default {
  components: { Vuetable },
  data() {
    return {
      css: {
        tableClass: "table table-bordered table-hover",
        tableBodyClass: "font-size: 20px"
      },
      languages: lang,
      decisionDate: moment().toDate(),
      fields: [
        { name: "index", title: "STT", width: "5%" },
        { name: "checkbox-slot", title: "Select", width: "5%" },
        { name: "action-slot", title: "Tác vụ", width: "15%" },
        { name: "fullName", title: "Họ và tên", width: "20%" },
        {
          name: "type",
          title: "Loại",
          width: "10%",
          formatter(value) {
            return value === "award" ? "Khen thưởng" : "Kỉ luật";
          }
        },
        { name: "title", title: "Tiêu đề", width: "30%" }
      ],
      body: {},
      data: [],
      user: null,
      selected: {
        _id: "",
        fullName: "",
        type: "",
        content: "",
        decisionDate: "",
        title: ""
      }
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
    showModalConfirmDelete(index) {
      this.selected = this.data[index];
      this.$modal.show("dialog", {
        title: "Thông báo",
        text:
          "Hệ thống sẽ xóa hoàn toàn thành tích, khen thưởng, kỷ luật của người dùng. Bạn có chắc chắn xóa?",
        buttons: [
          {
            title: "Đồng ý",
            handler: () => {
              try {
                const res = this.$axios.delete(
                  `/award-penalties/${this.selected._id}`
                );
                this.$notify({
                  title: "Xóa thành công",
                  titlntalAlign: "right",
                  verticalAlign: "top",
                  type: "success"
                });
                this.$router.go();
              } catch (error) {
                this.$notify({
                  title: "Xóa thất bại",
                  horizontalAlign: "right",
                  verticalAlign: "top",
                  type: "danger"
                });
              }
            }
          },
          {
            title: "Bỏ qua"
          }
        ]
      });
    },
    createNewAP() {
      this.$router.push("/create-award-penalty");
    },
    detailAP(index) {
      this.selected = this.data[index];
      this.$router.push({ path: `/detail-award-penalty/${this.selected._id}` });
    },
    updateAP(index) {
      this.selected = this.data[index];
      this.$router.push({ path: `/update-award-penalty/${this.selected._id}` });
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
