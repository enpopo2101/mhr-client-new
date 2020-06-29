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
          placeholder="Tên đăng nhập"
          v-on:keyup.enter="login"
          maxlength="20"
          ref="username"
        />
      </div>
      <div class="textbox">
        <i class="fas fa-lock"></i>
        <input
          v-model="password"
          :type="type"
          name=""
          value=""
          placeholder="Mật khẩu"
          v-on:keyup.enter="login"
          maxlength="50"
          ref="password"
        />
        <i
          class="fas fa-eye"
          @click="showPassword"
          style="cursor: pointer;"
        ></i>
      </div>
      <div
        class="invalid-login"
        style="color: red; text-align: start"
        v-show="seen"
      >
        Tên đăng nhập hoặc mật khẩu sai
      </div>
    </form>
    <div class="flex-row">
      <div class="check-remember">
        <input type="checkbox" v-model="rememberLogin" />
        <label>Nhớ tài khoản</label>
      </div>
    </div>
    <button v-on:click="login">Đăng nhập</button>
  </div>
</template>
<script>
export default {
  mounted() {
    const rememberLoginInStorage = localStorage.getItem("rememberLogin");
    if (rememberLoginInStorage) {
      this.username = localStorage.getItem("username");
      this.password = localStorage.getItem("password");
      this.rememberLogin = localStorage.getItem("rememberLogin");
    }
  },

  watch: {
    password(newVal, oldVal) {
      if (newVal.length > 50) {
        this.password = newVal.slice(0, 50);
      }
    },
    username(newVal, oldVal) {
      if (newVal.length > 20) {
        this.username = newVal.slice(0, 20);
      }
    }
  },

  data() {
    return {
      seen: false,
      username: null,
      password: null,
      type: "password",
      rememberLogin: false
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    async login() {
      try {
        if (!this.username && !this.password) {
          this.$refs.password.focus();
          return this.$notify({
            title: "Bạn chưa nhập Tên đăng nhập và mật khẩu",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        }
        if (!this.username) {
          this.$refs.username.focus();
          return this.$notify({
            title: "Bạn chưa nhập tên đăng nhập",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        } else if (!this.password) {
          this.$refs.password.focus();
          return this.$notify({
            title: "Mật khẩu không hợp lệ",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        }
        const res = await this.$axios.post("/users/login", {
          username: this.username.toLowerCase().trim(),
          password: this.password
        });
        if (res.data.status === 2) {
          return this.$notify({
            title: res.data.message,
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        }
        this.$notify({
          title: "Đăng nhập thành công",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        if (this.rememberLogin) {
          localStorage.setItem("username", this.username);
          localStorage.setItem("password", this.password);
          localStorage.setItem("rememberLogin", this.rememberLogin);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberLogin");
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("fullName", res.data.fullName);
        localStorage.setItem("_id", res.data._id);
        // console.log(res.data);
        this.$router.push("/dashboard", { fullName: res.data.fullName });
      } catch (error) {
        this.seen = true;
        console.log(error);
        this.$notify({
          title: "Đã có lỗi xảy ra",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
        this.disabled = "false";
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
  color: #177dff;
}

.login-box .textbox {
  width: 100%;
  margin: 8px 0;
  padding: 8px 0;
  border-bottom: 1px solid #177dff;
  display: flex;
  flex-direction: row;
  justify-content: start;
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
  color: #177dff;
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
  background-color: #177dff;
  border-radius: 20px;
}
</style>
