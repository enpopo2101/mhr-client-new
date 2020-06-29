<template>
  <card class="card" title="Chỉnh sửa hồ sơ">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input
              type="text"
              label="Tên đăng nhập"
              placeholder="Tên đăng nhập"
              v-model="user.username"
            >
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="email"
              label="Email"
              placeholder="Email"
              v-model="user.email"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Họ và tên"
              placeholder="Họ và tên"
              v-model="user.fullName"
            >
            </fg-input>
          </div>

          <div class="col-md-4">
            <fg-input
              type="text"
              label="SĐT"
              placeholder="SĐT"
              v-model="user.cellphone"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <!-- <div class="col-md-6">
            <fg-input
              type="text"
              label="Quê quán"
              placeholder="Quê quán"
              v-model="user.address"
            >
            </fg-input>
          </div> -->
          <div class="col-md-8">
            <fg-input
              type="text"
              label="Địa chỉ"
              placeholder="Địa chỉ"
              v-model="user.address"
            >
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Ngày sinh"
              placeholder="yyyy-mm-dd"
              v-model="user.birthday"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Trạng thái"
              placeholder="Trạng thái"
              v-model="user.status"
            >
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Chức vụ" placeholder="Chức vụ">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Mã phòng ban"
              placeholder="Mã phòng ban"
              v-model="user.postalCode"
            >
            </fg-input>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be your description"
                v-model="user.aboutMe"
              >
              </textarea>
            </div>
          </div>
          <drop-down></drop-down>
        </div> -->
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">
            Cập nhật hồ sơ
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import { assignIn } from "lodash";
export default {
  async mounted() {
    const id = localStorage.getItem("_id");
    const res = await this.$axios.get(`/users/${id}`);
    let data = res.data.data;
    data.status = data.status ? "Đang hoạt động" : "Đã xoá";
    this.user = assignIn(this.user, data);
    console.log(this.user);
  },
  data() {
    return {
      user: {
        company: "Admin",
        username: "michael23",
        email: "",
        firstName: "Chet",
        lastName: "Faker",
        address: "640 Đường Láng, Đống Đa, Hà Nội",
        city: "Melbourne",
        postalCode: "",
        cellphone: "0326528686",
        aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
      },
      data: {}
    };
  },
  // async mounted() {
  //   const res = await this.$axios.get("/users/login");
  //   const userData = res.data.data.map(data => {
  //     return {
  //       fullName: data.user.fullName,
  //       ...data
  //     };
  //   });
  //   this.data = userData;
  // },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
