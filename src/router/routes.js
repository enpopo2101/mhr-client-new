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
import DepartmentManager from "@/pages/DepartmentManager.vue";
import MassMail from "@/pages/MassMail.vue";
import DetailAwardPenalty from "@/pages/DetailAwardPenalty.vue";
import CreateUser from "@/pages/CreateNewUser.vue";
import CreateAwardPenalty from "@/pages/CreateAwardPenalty.vue";
import UpdateAwardPenalty from "@/pages/UpdateAwardPenalty.vue";
import CreateCalendar from "@/pages/CreateCalendar.vue";
import UpdateCalendar from "@/pages/UpdateCalendar.vue";
import DetailCalendar from "@/pages/DetailCalendar.vue";
import DetailAccount from "@/pages/DetailAccount.vue";

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
        name: "Quản lí tài khoản",
        component: HumanResourceManager,
        meta: { requiresAuth: true }
      },
      {
        path: "create-user",
        component: CreateUser,
        name: "Tạo mới tài khoản",
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
        path: "department-manager",
        name: "Quản lý phòng làm việc",
        component: DepartmentManager,
        meta: { requiresAuth: true }
      },

      {
        path: "mass-mail",
        name: "Massmail",
        component: MassMail,
        meta: { requiresAuth: true }
      },
      {
        path: "detail-award-penalty/:id",
        name: "Chi tiết kỉ luật khen thưởng",
        component: DetailAwardPenalty,
        meta: { requiresAuth: true }
      },
      {
        path: "create-award-penalty",
        name: "Tạo mới kỉ luật khen thưởng",
        component: CreateAwardPenalty,
        meta: { requiresAuth: true }
      },
      {
        path: "update-award-penalty/:id",
        name: "Sửa kỉ luật khen thưởng",
        component: UpdateAwardPenalty,
        meta: { requiresAuth: true }
      },
      {
        path: "create-calendar",
        name: "Tạo mới lịch làm việc",
        component: CreateCalendar,
        meta: { requiresAuth: true }
      },
      {
        path: "detail-calendar/:id",
        name: "Chi tiết lịch làm việc",
        component: DetailCalendar,
        meta: { requiresAuth: true }
      },
      {
        path: "update-calendar/:id",
        name: "Sửa lịch làm việc",
        component: UpdateCalendar,
        meta: { requiresAuth: true }
      },
      {
        path: "detail-account",
        name: "Chi tiết tài khoản",
        component: DetailAccount,
        meta: { requiresAuth: true }
      }
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
