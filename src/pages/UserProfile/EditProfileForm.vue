<template>
  <card class="card" title="Chỉnh sửa hồ sơ">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-5">
            <fg-input
              type="text"
              label="Quyền"
              disabled
              placeholder="Admin"
              v-model="user.company"
            >
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input
              type="text"
              label="Tên người dùng"
              placeholder="Tên người dùng"
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
              v-model="user.firstName"
            >
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="select" label="Giới tính" placeholder="Giới tính">
            </fg-input>
            <!-- <select class="custom-select" label="Giới tính">
                  <option value="award">Khen thưởng</option>
                  <option value="penalty">Kỉ luật</option>
            </select> -->
          </div>
          <div class="col-md-4">
            <fg-input
              type="text"
              label="SĐT"
              placeholder="SĐT"
              v-model="user.city"
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
            <fg-input type="text" label="Quê quán" placeholder="Quê quán">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Ngày sinh" placeholder="yyyy-mm-dd">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Trạng thái"
              placeholder="Trạng thái"
              v-model="user.country"
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
export default {
  data() {
    return {
      user: {
        company: "Admin",
        username: "michael23",
        email: "",
        firstName: "Chet",
        lastName: "Faker",
        address: "Melbourne, Australia",
        city: "Melbourne",
        postalCode: "",
        aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
      }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
