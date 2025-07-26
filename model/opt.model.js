const { default: mongoose } = require("mongoose");

const optSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  { timestamps: true }
);
// we use here mongo ttl-time to limit this delete data after their time period
optSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const OTPModel = mongoose.model.OTP || mongoose.model("Otp", optSchema);
export default OTPModel;
