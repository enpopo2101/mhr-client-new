<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary" @click="comeback">
          Quay lại
        </button>
      </div>
      <div class="col-sm-9">
        <h4>Thêm mới nhân viên khen thưởng - kỉ luật</h4>
      </div>
    </div>
    <div class="row">
      <form
        class="form-horizontal col-md-12"
        style="margin-top: 20px !important"
        @submit="submit"
      >
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Mã thưởng phạt</label>
          <div class="col-sm-9">
            <input class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Mã người dùng *</label>
          <div class="col-sm-9">
            <input class="form-control" />
          </div>
        </div>
        <user-picker
          v-on:get-user-value="getUserValue"
          label="Họ và tên"
        ></user-picker>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Loại</label>
          <div class="col-sm-9">
            <select class="custom-select" v-model="body.type">
              <option value="award">Khen thưởng</option>
              <option value="penalty">Kỉ luật</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Chủ đề *</label>
          <div class="col-sm-9">
            <input class="form-control" v-model="body.title" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Ngày quyết định *</label>
          <div class="col-sm-9">
            <date-picker
              input-class="form-control"
              v-model="body.decisionDate"
            ></date-picker>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Nội dung *</label>
          <div class="col-sm-9">
            <textarea class="form-control" v-model="body.content" />
          </div>
        </div>
      </form>
    </div>
    <div style="text-align: center">
      <button
        type="button"
        class="btn btn-success"
        @submit="submit"
        @click="submit"
        v-bind:disabled="disabled"
      >
        Thêm mới
      </button>
      <button type="button" class="btn btn-danger" @click="comeback">
        Bỏ qua
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: false,
      user: null,
      body: {
        _id: "",
        fullName: "",
        type: "",
        content: "",
        decisionDate: "",
        title: ""
      }
    };
  },
  methods: {
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
        this.disabled = true;
        this.$notify({
          title: "Tạo mới thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        this.$router.go(-1);
        this.$modal.hide("createNewAP");
      } catch (error) {
        this.disabled = false;
        this.$notify({
          title: "Tạo mới thất bại",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    },
    comeback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style></style>
