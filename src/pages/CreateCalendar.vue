<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary" @click="comeback">
          Quay lại
        </button>
      </div>
      <div class="col-sm-9">
        <h4>Thêm mới lịch làm việc</h4>
      </div>
    </div>
    <div class="row">
      <form
        class="form-horizontal col-md-12"
        style="margin-top: 20px !important"
        @submit="submit"
      >
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Mã lịch làm việc</label>
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
          <label class="col-sm-2 col-form-label">Tiêu đề *</label>
          <div class="col-sm-9">
            <input class="form-control" v-model="selected.title" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Phòng làm việc</label>
          <div class="col-sm-9">
            <input class="form-control" v-model="selected.room" />
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-md-2 col-form-label">Ngày</label>
          <div class="controls col-md-9">
            <date-picker
              input-class="form-control"
              v-model="selected.date"
            ></date-picker>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Thời gian bắt đầu *</label>
          <div class="col-sm-9">
            <input
              type="time"
              class="form-control"
              v-model="selected.startDate"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Thời gian kết thúc *</label>
          <div class="col-sm-9">
            <input
              type="time"
              class="form-control"
              v-model="selected.endDate"
            />
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
import * as moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      user: null,
      selected: {
        startDate: "",
        endDate: "",
        title: "",
        fullName: "",
        room: "",
        date: ""
      }
    };
  },
  methods: {
    getUserValue(user) {
      this.user = user;
    },
    async submit(e) {
      try {
        const startDateSplit = this.selected.startDate.split(":");
        const endDateSplit = this.selected.endDate.split(":");
        this.selected.startDate = moment(this.selected.date)
          .set("hour", startDateSplit[0])
          .set("minute", startDateSplit[1])
          .toDate();
        this.selected.endDate = moment(this.selected.date)
          .set("hour", endDateSplit[0])
          .set("minute", endDateSplit[1])
          .toDate();
        console.log(this.selected, "selected");
        const body = {
          ...this.selected,
          newStartDate: this.selected.startDate,
          newEndDate: this.selected.endDate,
          room: "239A3",
          user: this.user._id
        };
        console.log(body);
        const res = await this.$axios.post("/work-calendars", {
          ...body
        });
        e.preventDefault();
        this.$router.push("/calendar");
        this.$notify({
          title: "Tạo mới thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        // console.log(this.selected);
      } catch (error) {
        console.log(error);
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
