<template>
  <div class="container">
    <div class="filter-panel">
      <div class="row">
        <div class="col-md d-flex align-items-center">
          <label style="width: 100px !important">Họ và tên</label>
          <input type="text" class="form-control" />
        </div>
        <div class="col-md d-flex align-items-center">
          <label style="width: 100px !important">Địa điểm</label>
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
        <h5><b>Danh sách lịch làm việc</b></h5>
      </div>
      <div class="d-flex justify-content-start align-items-center">
        <button class="btn btn-danger" style="width: 100px !important">
          <i class="fas fa-minus" style="margin-right:4px"></i>
          Xóa
        </button>
        <button
          class="btn btn-primary"
          v-on:click="createNewWorkCalendar"
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
          v-on:click="detailCalendar(props.rowData.index - 1)"
        >
          <i class="far fa-eye"></i>
        </button>
        <button
          class="btn btn-success"
          v-on:click="updateCalendar(props.rowData.index - 1)"
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
    <v-dialog
      name="confirmDelete"
      :clickToClose="true"
      :pivotY="0.5"
      :povotX="0.5"
      width="20%"
      height="22%"
    />
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
        { name: "action-slot", title: "Tác vụ", width: "20%" },
        { name: "index", title: "STT", width: "5%" },
        { name: "checkbox-slot", title: "Select", width: "5%" },
        { name: "fullName", title: "Họ và tên", width: "15%" },
        { name: "room", title: "Địa điểm", width: "15%" },
        { name: "title", title: "Tiêu đề", width: "30%" }
      ],
      body: {},
      data: [],
      user: null,
      selected: {
        _id: "",
        startDate: "",
        endDate: "",
        title: "",
        fullName: "",
        room: ""
      }
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },
  async mounted() {
    const res = await this.$axios.get("/work-calendars");
    const processData = res.data.data.map((data, index) => {
      console.log(data);
      return {
        ...data,
        index: index + 1,
        startDate: moment(data.startDate, "YYYY-MM-DD HH:mm").format(
          "DD-MM-YYYY HH:mm"
        ),
        startDate: moment(data.endDate, "YYYY-MM-DD HH:mm").format(
          "DD-MM-YYYY HH:mm"
        ),
        fullName: _.get(data, "user.fullName", "Bùi Minh Chiến"),
        room: data.room.code
      };
    });
    this.data = processData;
    console.log(processData);
  },

  methods: {
    getUserValue(user) {
      this.user = user;
    },
    showModalConfirmDelete(index) {
      this.selected = this.data[index];
      console.log(this.selected._id);
      this.$modal.show("dialog", {
        text:
          "Hệ thống sẽ xóa hoàn toàn lịch làm việc của người dùng. Bạn có chắc chắn xóa?",
        buttons: [
          {
            title: "Đồng ý",
            handler: () => {
              try {
                console.log(this.selected._id);
                const res = this.$axios.delete(
                  `/work-calendars/${this.selected._id}`
                );
                // this.$router.push("/calendar");
                this.$refs.vuetable.refresh();
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
    createNewWorkCalendar() {
      this.$router.push("/create-calendar");
    },
    detailCalendar(index) {
      this.selected = this.data[index];
      this.$router.push({ path: `/detail-calendar/${this.selected._id}` });
    },
    updateCalendar(index) {
      this.selected = this.data[index];
      this.$router.push({ path: `/detail-calendar/${this.selected._id}` });
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
