export default {
  async sendOtp(ctx) {
    const { email } = ctx.request.body

    if (!email) {
      return ctx.badRequest("Email is required")
    }

    // 1️⃣ Generate OTP
    const { otp, hashedOtp, expiresAt } =
      await strapi.service("api::auth.auth").generateOTP()

    // 2️⃣ Save OTP in DB
    await strapi.entityService.create("api::email-otp.email-otp", {
      data: {
        email,
        otp: hashedOtp,
        expiresAt,
        used: false,
      },
    })

    // 3️⃣ Send OTP email
    await strapi.service("api::auth.auth").sendOtpEmail(email, otp)

    return { message: "OTP sent successfully" }
  },
}
