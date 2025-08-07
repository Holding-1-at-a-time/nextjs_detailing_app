import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const assessmentId = await ctx.db.insert("assessments", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return assessmentId
  },
})

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("assessments")
      .withIndex("by_created_at")
      .order("desc")
      .collect()
  },
})

export const getById = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const updateStatus = mutation({
  args: {
    id: v.id("assessments"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    })
  },
})

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assessments")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect()
  },
})

export const getByCustomerEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assessments")
      .withIndex("by_customer_email", (q) => q.eq("customerInfo.email", args.email))
      .order("desc")
      .collect()
  },
})
