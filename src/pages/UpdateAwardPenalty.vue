<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary" @click="comeback">
          Quay lại
        </button>
      </div>
      <div class="col-sm-9">
        <h4>Sửa thông tin nhân viên khen thưởng - kỉ luật</h4>
      </div>
    </div>
    <div class="row">
      <form
        class="form-horizontal col-md-12"
        style="margin-top: 20px !important"
        @submit="update"
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
            <input class="form-control" v-model="data.code" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Họ và tên</label>
          <div class="col-sm-9">
            <input class="form-control" v-model="data.fullName" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Loại</label>
          <div class="col-sm-9">
            <select class="custom-select" v-model="data.type">
              <option value="award">Khen thưởng</option>
              <option value="penalty">Kỉ luật</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Chủ đề *</label>
          <div class="col-sm-9">
            <input class="form-control" v-model="data.title" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Ngày quyết định *</label>
          <div class="col-sm-9">
            <date-picker
              input-class="form-control"
              v-model="data.decisionDate"
            ></date-picker>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Nội dung *</label>
          <div class="col-sm-9">
            <textarea class="form-control" v-model="data.content" />
          </div>
        </div>
      </form>
    </div>
    <div style="text-align: center">
      <button
        type="button"
        class="btn btn-success"
        @submit="update"
        @click="update"
      >
        Cập nhật
      </button>
      <button type="button" class="btn btn-danger" @click="cancel">Hủy</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  async mounted() {
    const res = await this.$axios.get(
      `/award-penalties/${this.$route.params.id}`
    );
    const awardPenalty = res.data.data;
    this.data = {
      fullName: awardPenalty.user.fullName,
      code: _.get(awardPenalty, "user.code", "TPxxxxxx"),
      position: _.get(awardPenalty, "user.position", "Professor"),
      room: _.get(awardPenalty, "user.room", "Inferno"),
      ...awardPenalty
    };
    // console.log(this.data);
  },
  methods: {
    async update(e) {
      try {
        const res = await this.$axios.put(
          `/award-penalties/${this.$route.params.id}`,
          {
            ...this.data
          }
        );
        // console.log(this.data);
        e.preventDefault();
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
    comeback() {
      this.$router.go(-1);
    },
    cancel() {
      this.$router.push("/detail-award-penalty");
    }
  }
};
</script>
<style></style>
