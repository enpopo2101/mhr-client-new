<template>
  <div class="container">
    <h1>Login</h1>
    <form>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <p class="input-group">Username</p>
        </div>
        <input
          v-model="username"
          type="text"
          name=""
          class="form-control input_user"
          value=""
          placeholder="username"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <p class="input-group">Password</p>
        </div>
        <input
          v-model="password"
          type="password"
          name=""
          class="form-control input_user"
          value=""
          placeholder="password"
        />
      </div>
    </form>
    <button v-on:click="login">Login</button>
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
        this.$router.push('/dashboard')
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
