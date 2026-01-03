import crypto from "crypto"

export default {
  generateOTP() {
    // 1️⃣ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // 2️⃣ Hash OTP (never store plain OTP)
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex")

    // 3️⃣ Expiry time (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    return {
      otp,        // plain OTP (ONLY for email)
      hashedOtp,  // stored in DB
      expiresAt,
    }
  },
  async sendOtpEmail(email: string, otp: string) {
  await strapi.plugins["email"].services.email.send({
    to: email,
    subject: "Your Productify OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    html: `
      <p>Your OTP is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 5 minutes.</p>
    `,
  })
},

}
