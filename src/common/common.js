import _ from "lodash";
export const roles = {
  user: "Người dùng",
  admin: "Admin",
  chuyen_vien: "Chuyên viên",
  ql_taikhoan: "QL Tài khoản",
  ql_hopdong: "QL Hợp đồng",
  ql_dcct: "QL Điều chuyển công tác",
  ql_phongban: "QL Phòng ban",
  ql_chucvu: "QL Chức vụ",
  ql_lich: "QL Lịch làm việc",
  mail: "Mail"
};

export const getRoles = function() {
  const roles = localStorage.getItem("roles");
  return JSON.parse(roles);
};

export const hasPermision = function(roles, rolesNeedCheck) {
  let rolesArray = _.isArray(roles) ? roles : [];

  return _.intersection(rolesArray, rolesNeedCheck).length ? true : false;
};
