export default {
  severBaseUrl: "http://127.0.0.1:8080",
  api: {
    tasks: {
      create: "/task",
      update: "/task/",
      delete: "/task/",
      getOne: "/task/",
      getAll: "/task",
    },

    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
    },
    admintask: {
      create: "/task-admin",
      update: "/task-admin/",
      delete: "/task-admin/",
      getOne: "/task-admin/",
      getAll: "/task-admin",
    },
    auth: {
      userLogin: "/auth/signup",
      adminLogin: "/adminAuth/admin",
      validateToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
    },
  },
};
