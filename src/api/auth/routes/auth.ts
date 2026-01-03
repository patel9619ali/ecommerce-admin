export default {
  routes: [
    {
      method: "POST",
      path: "/auth/send-otp",
      handler: "auth.sendOtp",
      config: {
        auth: false,
      },
    },
  ],
}
