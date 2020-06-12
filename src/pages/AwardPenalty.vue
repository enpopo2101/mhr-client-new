<template>
  <div class="container">
    <div class="filter-panel">
      <div class="row">
        <div class="col-md d-flex">
          <label>Họ và tên</label>
          <input type="text" class="form-control" />
        </div>
        <div class="col-md d-flex">
          <label>Chức vụ</label>
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
      <button class="btn btn-primary" v-on:click="showModalCreateAP">
        <i class="ti-plus" style="margin-right:4px"></i> Thêm mới
      </button>
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
        <button class="btn btn-primary" v-on:click="showModalViewDetailAP">
          Chi tiết
        </button>
        <button class="btn btn-success" v-on:click="showModalUpdateAP">
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
                <input
                  class="form-control"
                  required
                  v-model="body.title"
                  placeholder="Tiêu đề"
                />
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
            <button style="width: 6em" class="btn btn-danger">Huỷ</button>
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
            <user-picker
              v-on:get-user-value="getUserValue"
              label="Họ và tên"
            ></user-picker>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label">Tiêu đề</label>
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  v-model="body.title"
                  placeholder="Tiêu đề"
                />
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
            <button style="width: 6em" class="btn btn-danger">Huỷ</button>
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
      height="80% auto"
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
          <form class="form-horizontal col-md-12" @submit="submit">
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Họ và tên</label
              >
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  disabled
                  v-model="body.title"
                  placeholder="Họ và tên"
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
                  v-model="body.title"
                  placeholder="Tiêu đề"
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
                  v-model="body.title"
                  placeholder="Loại"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Ngày ra quyết định</label
              >
              <div class="controls col-md-8">
                <input
                  class="form-control"
                  required
                  disabled
                  v-model="body.title"
                  placeholder="yyyy-mm-dd"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="title" class="col-md-3 col-form-label"
                >Nội dung</label
              >
              <div class="controls col-md-8">
                <textarea
                  disabled
                  v-model="body.content"
                  class="form-control"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </modal>
    <!-- modal view detail AP end -->
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
        { name: "action-slot", title: "Tác vụ", width: "30%" },
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
      user: null
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
    showModalUpdateAP() {
      this.$modal.show("updateAP", {
        width: "500px",
        maxWidth: "1000px",
        minWidth: "300px"
      });
    },
    showModalViewDetailAP() {
      this.$modal.show("viewDetailAP", {
        width: "500px",
        maxWidth: "1000px",
        minWidth: "300px"
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
        this.$refs.vuetable.refresh();
        this.$notify({
          title: "Tạo mới thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: "Tạo mới thất bại",
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
