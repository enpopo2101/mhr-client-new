<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/stats" name="Tài khoản" icon="ti-user" />
        <sidebar-link
          to="human-resource-management"
          name="Quản lý nhân viên"
          icon="ti-panel"
        />
        <sidebar-link
          to="/calendar"
          name="Lịch làm việc"
          icon="ti-view-list-alt"
        />
        <sidebar-link to="/typography" name="Phòng ban" icon="ti-text" />
        <sidebar-link to="/icons" name="Chức vụ" icon="ti-pencil-alt2" />
        <sidebar-link to="/maps" name="Quản lý hợp đồng" icon="ti-map" />
        <sidebar-link to="/maps" name="Điều chuyển công tác" icon="ti-map" />
        <sidebar-link
          to="/award-penalty"
          name="Khen thưởng - Kỉ luật"
          icon="ti-view-list-alt"
        />
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" />
        <sidebar-link to="/mass-mail" name="Massmail" icon="ti-bell" />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
