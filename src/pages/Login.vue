<template>
  <div class="login-box">
    <h1>Đăng nhập</h1>
    <form>
      <div class="textbox">
        <i class="fas fa-user"></i>
        <input
          v-model="username"
          type="text"
          name=""
          value=""
          placeholder="Tên người dùng"
          v-on:keyup.enter="login"
        />
      </div>
      <div class="textbox">
        <i class="fas fa-lock"></i>
        <input
          v-model="password"
          type="password"
          name=""
          value=""
          placeholder="Mật khẩu"
          v-on:keyup.enter="login"
        />
      </div>
    </form>
    <div class="flex-row">
      <div class="check-remember">
        <input type="checkbox">
        <label>Remember me</label>
      </div>
      <a href="#">Quên mật khẩu ?</a>
    </div>
    <button v-on:click="login">Đăng nhập</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    async login() {
      try {
        const res = await this.$axios.post("/users/login", {
          username: this.username,
          password: this.password
        });
        this.$notify({
          title: "Login Success",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        localStorage.setItem("token", res.data.token);
        this.$router.push("/dashboard");
      } catch (error) {
        this.$notify({
          title: "Login failed",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    }
  }
};
</script>
<style>
@import "https://use.fontawesome.com/releases/v5.5.0/css/all.css";

.login-box {
  width: 280px;
  position: absolute;
  padding: 5px;
  top: 20%;
  left: 40%;
  right: 40%;
  font: arial, sans-serif, helvetica;
  text-align: center;
}

.login-box h1 {
  font-size: 40px;
  padding: 13px 0;
  text-align: center;
  color: #177DFF;
}

.login-box .textbox {
  width: 100%;
  margin: 8px 0;
  padding: 8px 0;
  border-bottom: 1px solid #177DFF;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

.textbox input {
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 5px;
}

.textbox i {
  width: 15px;
  height: 15px;
  margin: 5px;
  padding: 5px 0;
  color: #177DFF;;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}

.check-remember input {
  margin: 5px;
}

.login-box button {
  width: 120px;
  height: 40px;
  border: none;
  background-color: #177DFF;
  border-radius: 20px;
}
</style>
