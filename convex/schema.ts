import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  assessments: defineTable({
    customerInfo: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
    }),
    vehicleInfo: v.object({
      year: v.number(),
      make: v.string(),
      model: v.string(),
      color: v.string(),
      mileage: v.number(),
      vehicleType: v.string(),
    }),
    servicePreferences: v.object({
      serviceTypes: v.array(v.string()),
      urgency: v.string(),
      budget: v.string(),
      preferredDate: v.string(),
      preferredTime: v.string(),
      location: v.string(),
    }),
    vehicleCondition: v.object({
      exteriorCondition: v.string(),
      interiorCondition: v.string(),
      paintCondition: v.string(),
      hasScratches: v.boolean(),
      hasDents: v.boolean(),
      hasStains: v.boolean(),
      hasOdors: v.boolean(),
      lastDetailDate: v.string(),
    }),
    additionalInfo: v.object({
      specialRequests: v.string(),
      hearAboutUs: v.string(),
    }),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_customer_email", ["customerInfo.email"]),
})
