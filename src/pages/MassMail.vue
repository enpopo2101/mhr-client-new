<template>
  <div class="container">
    <div class="row">
      <div id="example-4" style="margin-right: 30px">
        <input
          type="radio"
          id="khen-thuong"
          value="Khen thưởng"
          v-model="picked"
        />
        <label for="com-chien-toi">Khen thưởng</label>
        <input type="radio" id="ki-luat" value="Kỉ luật" v-model="picked" />
        <label for="dot-bi-xao-toi">Kỉ luật</label>
        <input
          type="radio"
          id="chuyen-cong-tac"
          value="Chuyển công tác"
          v-model="picked"
        />
        <label for="canh-rau-rung">Chuyển công tác</label>
        <input
          type="radio"
          id="lich-lam-viec"
          value="Lịch làm việc"
          v-model="picked"
        />
        <label for="canh-rau-rung">Lịch làm việc</label><br />
        <!-- <span>Chủ đề: {{ picked  }}</span> -->
      </div>
    </div>

    <div class="column">
      <div>
        <select v-model="selected" multiple>
          <option disabled value="">Chọn bộ phận</option>
          <option>58TH1</option>
          <option>58TH2</option>
          <option>58TH3</option>
          <option>58TH4</option>
          <br />
          <!-- <span>Selected: {{ selected }}</span> -->
        </select>
      </div>

      <div class="filter-panel" style="margin-top: 20px">
        <div style="background-color: #c0c0c0">
          <a style="font-size: 30px">New mail</a>
        </div>

        <div class="column">
          <div style="margin-top: 25px">
            <a>Đến</a>
          </div>

          <div class="column">
            <div>
              <input type="text" class="form-control" />
              <!-- <input type="button" value="radio"> -->
            </div>
          </div>
        </div>

        <div class="column">
          <div style="margin-top: 25px">
            <a>Chủ đề</a>
          </div>

          <div>
            <input type="text" class="form-control" />
          </div>
        </div>

        <div class="column">
          <div style="margin-top: 25px">
            <a>Nội dung</a>
          </div>

          <div>
            <input type="text" class="form-control" />
            <!-- <textarea v-model="message" placeholder="Nhập văn bản có nhiều dòng"></textarea> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
