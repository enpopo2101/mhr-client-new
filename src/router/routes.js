import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Login from "@/pages/Login.vue";
import AwardPenalty from "@/pages/AwardPenalty.vue";
import Calendar from "@/pages/Calendar.vue";
import HumanResourceManager from "@/pages/HumanResourceManager.vue";
import LaborContract from "@/pages/LaborContract.vue";
import DepartmentManager from "@/pages/DepartmentManager.vue"
import MassMail from "@/pages/MassMail.vue";

const routes = [
  { path: "/login", component: Login, name: "Login" },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: "human-resource-manager",
        name: "Quản lí nhân viên",
        component: HumanResourceManager,
        meta: { requiresAuth: true }
      },
      {
        path: "award-penalty",
        name: "Khen thưởng - Kỉ luật",
        component: AwardPenalty,
        meta: { requiresAuth: true }
      },
      {
        path: "calendar",
        name: "Lịch làm việc",
        component: Calendar,
        meta: { requiresAuth: true }
      },
      {
        path: "labor-contract",
        name: "Quản lý hợp đồng",
        component: LaborContract,
        meta: { requiresAuth: true }
      },
      {
        path: "stats",
        name: "Tài khoản",
        component: UserProfile,
        meta: { requiresAuth: true }
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
        meta: { requiresAuth: true }
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
        meta: { requiresAuth: true }
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
        meta: { requiresAuth: true }
      },
      {
        path: "department-manager",
        name: "Quản lý phòng làm việc",
        component: DepartmentManager
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "mass-mail",
        name: "Massmail",
        component: MassMail
      },
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
