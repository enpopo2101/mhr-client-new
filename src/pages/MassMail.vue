<template>
  <div class="container">
    <!-- <div class="form-group">
    <div class="input-group">
      <input type="text" class="form-control" :maxlength="max" v-model="text" />
      <div class="input-group-addon" v-text="(text.length) +'/' + max"></div>
    </div>
  </div> -->

    <div class="radio-button col-md-12 p-0">
      <div class=" row" id="example-4">
        <div class="col-md-3">
          <input
            type="radio"
            id="khen-thuong"
            value="Khen thưởng"
            v-model="picked"
          />
          <label for="com-chien-toi"> Khen thưởng</label>
        </div>
        <div class="col-md-3">
          <input type="radio" id="ki-luat" value="Kỉ luật" v-model="picked" />
          <label for="dot-bi-xao-toi"> Kỉ luật</label>
        </div>
        <div class="col-md-3">
          <input
            type="radio"
            id="chuyen-cong-tac"
            value="Chuyển công tác"
            v-model="picked"
          />
          <label for="canh-rau-rung"> Chuyển công tác</label>
        </div>
        <div class="col-md-3">
          <input
            type="radio"
            id="lich-lam-viec"
            value="Lịch làm việc"
            v-model="picked"
          />
          <label for="canh-rau-rung"> Lịch làm việc</label><br />
        </div>
      </div>
    </div>

    <div class="column">
      <!-- <div>
            <select v-model="selected" multiple>
                <option disabled value="">Chọn bộ phận</option>
                <option>58TH1</option>
                <option>58TH2</option>
                <option>58TH3</option>
                <option>58TH4</option>
                <br>
            </select>
        </div> -->

      <div
        class="filter-panel"
        style="margin-top: 20px; padding: 0; border-radius: 0"
      >
        <div style="background-color: #c0c0c0; margin: 0.5px">
          <a style="font-size: 30px;" class="ml-3">Thư mới</a>
        </div>

        <div class="column mt-3" style="padding: 0 20px">
          <span>Đến</span>
          <input type="text" v-model="toMail" class="form-control" />
        </div>

        <div class="column mt-3" style="padding: 0 20px">
          <span>Bcc</span>
          <input type="text" v-model="bccMail" class="form-control" />
        </div>

        <div class="column mt-3" style="padding: 0 20px">
          <a>Chủ đề</a>
          <input
            type="text"
            class="form-control"
            :maxlength="max"
            v-model="text"
          />
          <p style="float: right" class="input-group-addon" v-text="(text.length) +'/' + max"></p>
        </div>

        <div class="column mt-3" style="padding: 0 20px; margin-bottom: 20px">
          <a>Nội dung</a>
          <!-- <input type="text" class="form-control" /> -->
          <div id="app">
            <ckeditor style="height:500px;"
            id="abc"
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button v-on:click="sendMail" type="button" class="btn btn-primary">
            Gửi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      max: 50,
      text: "",
      toMail:"",
      bccMail:"",
      selected: "",
      picked: "",
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {

      }
    };
  },
  methods: {
    sendMail() {
        var content = this.editorData
        var toMail = this.toMail
        var bccMail = this.bccMail
        var subject = this.text
        console.log(content + toMail + bccMail + subject)
    }
  }
};
</script>
