import mongoose from "mongoose";

const NotificationOrderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NotificationOrder || mongoose.model("NotificationOrder", NotificationOrderSchema);
