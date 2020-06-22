<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary" @click="comeback">
          Quay lại
        </button>
      </div>
      <div class="col-sm-6">
        <h4>Chi tiết nhân viên khen thưởng - kỉ luật</h4>
      </div>
      <div class="col-sm-3" style="text-align: end">
        <button type="button" class="btn btn-warning" @click="updateAP">
          Sửa
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="showModalConfirmDeleteAP"
        >
          Xóa
        </button>
      </div>
    </div>
    <div class="row">
      <form
        class="form-horizontal col-md-12"
        style="margin-top: 20px !important"
      >
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Mã nhân viên</label>
          <div class="col-sm-8">
            <input disabled class="form-control" v-model="this.data.code" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Họ và tên</label>
          <div class="col-sm-8">
            <input disabled class="form-control" v-model="this.data.fullName" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Chức vụ</label>
          <div class="col-sm-8">
            <input disabled class="form-control" v-model="this.data.position" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Phòng ban</label>
          <div class="col-sm-8">
            <input disabled class="form-control" v-model="this.data.room" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Loại</label>
          <div class="col-sm-8">
            <select class="custom-select" v-model="this.data.type" disabled>
              <option value="award">Khen thưởng</option>
              <option value="penalty">Kỉ luật</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Chủ đề</label>
          <div class="col-sm-8">
            <input disabled class="form-control" v-model="this.data.title" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Ngày ra quyết định</label>
          <div class="col-sm-8">
            <date-picker
              disabled
              input-class="form-control"
              v-model="this.data.decisionDate"
            ></date-picker>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Nội dung</label>
          <div class="col-sm-8">
            <textarea
              disabled
              class="form-control"
              v-model="this.data.content"
            />
          </div>
        </div>
      </form>
    </div>

    <v-dialog name="confirmDeleteAP" :clickToClose="true" />
  </div>
</template>
<script>
import * as moment from "moment";
import * as lang from "vuejs-datepicker/src/locale";
import _ from "lodash";
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
    console.log(this.data);
  },
  methods: {
    comeback() {
      this.$router.go(-1);
    },
    updateAP() {
      this.$router.push({
        path: `/update-award-penalty/${this.$route.params.id}`
      });
    },
    showModalConfirmDeleteAP() {
      this.$modal.show("dialog", {
        text:
          "Hệ thống sẽ xóa hoàn toàn thành tích, khen thưởng, kỷ luật của người dùng. Bạn có chắc chắn xóa?",
        buttons: [
          {
            title: "Đồng ý",
            handler: () => {
              try {
                const res = this.$axios.delete(
                  `/award-penalties/${this.$route.params.id}`
                );
                this.$notify({
                  title: "Xóa thành công",
                  titlntalAlign: "right",
                  verticalAlign: "top",
                  type: "success"
                });
                this.$router.go(-1);
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
    }
  }
};
</script>
<style></style>
