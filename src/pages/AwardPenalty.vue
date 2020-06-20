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
          v-on:click="showModalCreateAP"
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
          v-on:click="showModalViewDetailAP(props.rowData.index - 1)"
        >
          <i class="far fa-eye"></i>
        </button>
        <button
          class="btn btn-success"
          v-on:click="showModalUpdateAP(props.rowData.index - 1)"
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

    <!-- modal create -->
    <modal
      name="createNewAP"
      :clickToClose="true"
      :min-width="320"
      :max-width="740"
      :pivotY="0.2"
      width="60%"
      height="80%"
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
        <div class="row container">
          <form class="form-horizontal col-md-12" @submit="submit">
            <user-picker
              v-on:get-user-value="getUserValue"
              label="Họ và tên"
            ></user-picker>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Tiêu đề</label>
              <div class="controls col-md-8">
                <input class="form-control" required v-model="body.title" />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Loại</label>
              <div class="controls col-md-8">
                <select class="custom-select" v-model="body.type">
                  <option value="award">Khen thưởng</option>
                  <option value="penalty">Kỉ luật</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Ngày ra quyết định</label
              >
              <div class="controls col-md-8">
                <date-picker
                  v-model="body.decisionDate"
                  input-class="form-control"
                ></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Nội dung</label
              >
              <div class="controls col-md-8">
                <textarea v-model="body.content" class="form-control" />
              </div>
            </div>
          </form>
        </div>
        <div class="row col-md d-flex justify-content-center">
          <div style="width: 200px !important">
            <button
              style="width: 6em"
              type="submit"
              @submit="submit"
              class="btn btn-success"
              @click="submit"
            >
              Tạo
            </button>
            <button
              style="width: 6em"
              class="btn btn-danger"
              @click="hideModalCreateAP"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </modal>
    <!-- modal create end -->

    <!-- modal update -->
    <modal
      name="updateAP"
      :clickToClose="true"
      :min-width="320"
      :max-width="740"
      :pivotY="0.2"
      width="60%"
      height="80%"
    >
      <div class="container">
        <div class="row d-flex justify-content-between align-items-baseline">
          <p style="margin-left: 10px; font-size: 20px">
            <b>Sửa kỉ luật khen thưởng</b>
          </p>
          <button class="btn btn-default" v-on:click="hideModalUpdateAP">
            <i class="ti-close"></i>
          </button>
        </div>
        <div class="row container">
          <form class="form-horizontal col-md-12" @submit="submit">
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Họ và tên</label
              >
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  v-model="selected.fullName"
                />
              </div>
            </div>
            <!-- <user-picker
              v-on:get-user-value="getUserValue"
              label="Họ và tên"
              v-model="se"
            ></user-picker> -->
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Tiêu đề</label>
              <div class="controls col-md-8">
                <input class="form-control" required v-model="selected.title" />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Loại</label>
              <div class="controls col-md-8">
                <select class="custom-select" v-model="selected.type">
                  <option value="award">Khen thưởng</option>
                  <option value="penalty">Kỉ luật</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Ngày ra quyết định</label
              >
              <div class="controls col-md-8">
                <date-picker
                  v-model="selected.decisionDate"
                  input-class="form-control"
                ></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Nội dung</label
              >
              <div class="controls col-md-8">
                <textarea v-model="selected.content" class="form-control" />
              </div>
            </div>
          </form>
        </div>
        <div class="row col-md d-flex justify-content-center">
          <div style="width: 200px !important">
            <button
              style="width: 6em"
              type="submit"
              @submit="update"
              class="btn btn-success"
              @click="update"
            >
              Sửa
            </button>
            <button
              style="width: 6em"
              class="btn btn-danger"
              @click="hideModalUpdateAP"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </modal>
    <!-- modal update end -->

    <!-- modal view detail AP -->
    <modal
      name="viewDetailAP"
      :clickToClose="true"
      :min-width="320"
      :max-width="740"
      :pivotY="0.2"
      width="60%"
      height="80%"
    >
      <div class="container">
        <div class="row d-flex justify-content-between align-items-baseline">
          <p style="margin-left: 10px; font-size: 20px">
            <b>Chi tiết kỉ luật khen thưởng</b>
          </p>
          <button class="btn btn-default" v-on:click="hideModalViewDetailAP">
            <i class="ti-close"></i>
          </button>
        </div>
        <div class="row container">
          <form class="form-horizontal col-md-12">
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Họ và tên</label
              >
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  disabled
                  v-model="selected.fullName"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Tiêu đề</label>
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  disabled
                  v-model="selected.title"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Loại</label>
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  disabled
                  v-model="selected.type"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Ngày ra quyết định</label
              >
              <div class="controls col-md-8">
                <date-picker
                  v-model="selected.decisionDate"
                  input-class="form-control"
                  disabled
                ></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Nội dung</label
              >
              <div class="controls col-md-8">
                <textarea
                  disabled
                  v-model="selected.content"
                  class="form-control"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </modal>
    <!-- modal view detail AP end -->

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
    showModalCreateAP() {
      this.$modal.show("createNewAP", {
        width: "500px",
        maxWidth: "1000px",
        minWidth: "300px"
      });
    },
    showModalUpdateAP(index) {
      this.selected = this.data[index];
      this.$modal.show("updateAP", {
        width: "500px",
        maxWidth: "1000px",
        minWidth: "300px",
        props: ["selected"]
      });
    },
    showModalViewDetailAP(index) {
      this.selected = this.data[index];
      this.$modal.show("viewDetailAP", {
        width: "500px",
        maxWidth: "1000px",
        minWidth: "300px",
        props: ["selected"]
      });
    },
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
    getUserValue(user) {
      this.user = user;
    },
    async submit(e) {
      try {
        const res = await this.$axios.post("/award-penalties", {
          ...this.body,
          user: this.user._id
        });
        e.preventDefault();
        // this.$refs.vuetable.refresh();
        this.$notify({
          title: "Tạo mới thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        this.$router.go();
        this.$modal.hide("createNewAP");
      } catch (error) {
        this.$notify({
          title: "Tạo mới thất bại",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    },
    async update(e) {
      try {
        const res = await this.$axios.put(
          `/award-penalties/${this.selected._id}`,
          {
            ...this.selected
          }
        );
        e.preventDefault();
        // this.$refs.vuetable.refresh();
        this.$router.go();
        this.$notify({
          title: "Sửa thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        this.$modal.hide("updateAP");
      } catch (error) {
        this.$notify({
          title: "Sửa thất bại",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    },
    hideModalCreateAP() {
      this.$modal.hide("createNewAP");
    },
    hideModalUpdateAP() {
      this.$modal.hide("updateAP");
    },
    hideModalViewDetailAP() {
      this.$modal.hide("viewDetailAP");
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
