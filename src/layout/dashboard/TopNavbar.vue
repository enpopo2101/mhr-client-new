<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" @click="showProfile">
            <a href="#" class="nav-link">
              <img
                class="avatar border-white"
                src="@/assets/img/faces/face-2.jpg"
                alt="..."
              />
              <p style="margin: 0 0 0 5px">{{ getFullName() }}</p>
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p v-on:click="logout">
                Đăng xuất
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  mounted() {
    // this.data = localStorage.getItem("fullame");
  },
  methods: {
    getFullName() {
      return localStorage.getItem("fullName");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      return this.$notify({
        title: "Đăng xuất thành công",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "success"
      });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showProfile() {
      this.$router.push("/stats");
    }
  }
};
</script>
<style>
img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
