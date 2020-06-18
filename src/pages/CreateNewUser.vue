<template>
  <div>
    <div class="row container">
      <form class="form-horizontal col-md-12" @submit="submit">
        <div class="form-group row" style="margin-bottom: 0px !important;">
          <label for="title" class="col-md-3 col-form-label"
            >Mã nhân viên *</label
          >
          <div class="controls col-md-8">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="body.code"
                disabled
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  style="margin: 0 !important"
                  @click="getUserCode"
                  id="button-addon2"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Họ và tên *</label>
          <div class="controls col-md-8">
            <input class="form-control" v-model="body.fullName" />
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label"
            >Tên đăng nhập *</label
          >
          <div class="controls col-md-8">
            <input class="form-control" v-model="body.username" />
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Mật khẩu *</label>
          <div class="controls col-md-8">
            <input
              type="password"
              class="form-control"
              v-model="body.password"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Email *</label>
          <div class="controls col-md-8">
            <input class="form-control" v-model="body.email" />
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label"
            >Số điện thoại</label
          >
          <div class="controls col-md-8">
            <input class="form-control" v-model="body.cellphone" />
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Ngày sinh</label>
          <div class="controls col-md-8">
            <date-picker
              input-class="form-control"
              v-model="body.birthday"
            ></date-picker>
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Giới tính</label>
          <div class="controls col-md-8">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="male"
                v-model="body.sex"
              />
              <label class="form-check-label" for="inlineRadio1">Nam</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="female"
                v-model="body.sex"
              />
              <label class="form-check-label" for="inlineRadio2">Nữ</label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Phòng ban</label>
          <div class="controls col-md-8">
            <select class="custom-select" id="inputGroupSelect01">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Chức vụ</label>
          <div class="controls col-md-8">
            <select class="custom-select" id="inputGroupSelect01">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-3 col-form-label">Quyền *</label>
          <div class="controls col-md-8">
            <div
              class="form-check form-check-inline"
              v-for="role in roles"
              :key="role.role"
            >
              <input
                v-on:change="addRole"
                class="form-check-input"
                type="checkbox"
                v-bind:value="role.role"
                v-bind:checked="role.checked"
              />
              <label class="form-check-label" for="inlineCheckbox1">{{
                role.name
              }}</label>
            </div>
          </div>
        </div>
        <div style="text-align:center">
          <button
            type="submit"
            @submit="submit"
            class="btn btn-success"
            v-bind:disabled="disabled"
          >
            Tạo mới
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as moment from "moment";
import { roles } from "../common/common";
import { map } from "lodash";
export default {
  data() {
    return {
      disabled: false,
      selectedRoles: [],
      roles: {},
      body: {
        code: "",
        fullName: "",
        sex: "",
        email: "",
        password: "",
        cellphone: "",
        birthday: "",
        roles: []
      }
    };
  },
  mounted() {
    this.roles = map(roles, (name, key) => {
      let newRoles = { checked: false };

      if (key === "user") {
        newRoles["checked"] = true;
      }
      newRoles["role"] = key;
      newRoles["name"] = name;

      return newRoles;
    });
  },
  methods: {
    async submit(e) {
      try {
        const body = this.body;
        if (!body.username) {
          return this.$notify({
            title: "Vui lòng điền tên đăng nhập",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
          return;
        }
        if (!body.fullName) {
          return this.$notify({
            title: "Vui lòng điền họ và tên",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
          return;
        }
        if (!body.password) {
          this.$notify({
            title: "Vui lòng kiểm tra lại mật khẩu",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
          return;
        }
        e.preventDefault();
        this.body.roles = this.selectedRoles;
        this.body.birthday = moment(this.body.birthday).format("DD/MM/YYYY");
        this.disabled = true;
        await this.$axios.post("/users/register", { ...this.body });
        this.disabled = false;
        this.$notify({
          title: "Tạo tài khoản thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        this.$route.go();
      } catch (error) {
        this.$notify({
          title: "Tạo tài khoản thất bại",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    },
    addRole(e) {
      if (this.selectedRoles.indexOf(e.target.value) !== -1) {
        this.selectedRoles = this.selectedRoles.filter(
          selectedRole => selectedRole !== e.target.value
        );
        return;
      }
      this.selectedRoles = [...this.selectedRoles, e.target.value];
    },
    async getUserCode() {
      try {
        const res = await this.$axios.get("/users/get-user-code");
        this.body.code = res.data.code;
      } catch (error) {
        this.$notify({
          title: "Tạo mã thất bại",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    }
  }
};
</script>
