/* eslint-disable */
/**
 * Generated `dataModel` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  AnyDataModel,
  AnySystemTable,
  AnyTable,
  BaseSystemTable,
  DataModelFromSchemaDefinition,
  TableNamesInDataModel,
  SystemTableNames,
} from "convex/server";
import type { GenericId } from "convex/values";

/**
 * No `schema.ts` file found!
 *
 * This generated code has permissive types like `any` because Convex doesn't know
 * your schema. If you're not using a schema, you can ignore this file.
 *
 * If you are using a schema, create a `schema.ts` file in your `convex/` folder
 * and re-run `npx convex dev`.
 */

/**
 * The names of all of your Convex tables.
 */
export type TableNames = "assessments";

/**
 * The type of a document stored in Convex.
 */
export type Doc<TableName extends TableNames> = TableName extends "assessments"
  ? {
      _id: Id<"assessments">;
      _creationTime: number;
      customerInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        zipCode: string;
      };
      vehicleInfo: {
        year: number;
        make: string;
        model: string;
        color: string;
        mileage: number;
        vehicleType: string;
      };
      servicePreferences: {
        serviceTypes: string[];
        urgency: string;
        budget: string;
        preferredDate: string;
        preferredTime: string;
        location: string;
      };
      vehicleCondition: {
        exteriorCondition: string;
        interiorCondition: string;
        paintCondition: string;
        hasScratches: boolean;
        hasDents: boolean;
        hasStains: boolean;
        hasOdors: boolean;
        lastDetailDate: string;
      };
      additionalInfo: {
        specialRequests: string;
        hearAboutUs: string;
      };
      status: string;
      createdAt: number;
      updatedAt: number;
    }
  : any;

/**
 * The type of an ID for a given table.
 */
export type Id<TableName extends TableNames> = GenericId<TableName>;

/**
 * A type describing your Convex data model.
 */
export type DataModel = {
  assessments: {
    document: Doc<"assessments">;
    fieldPaths:
      | "_id"
      | "_creationTime"
      | "customerInfo"
      | "customerInfo.name"
      | "customerInfo.email"
      | "customerInfo.phone"
      | "customerInfo.address"
      | "customerInfo.city"
      | "customerInfo.zipCode"
      | "vehicleInfo"
      | "vehicleInfo.year"
      | "vehicleInfo.make"
      | "vehicleInfo.model"
      | "vehicleInfo.color"
      | "vehicleInfo.mileage"
      | "vehicleInfo.vehicleType"
      | "servicePreferences"
      | "servicePreferences.serviceTypes"
      | "servicePreferences.urgency"
      | "servicePreferences.budget"
      | "servicePreferences.preferredDate"
      | "servicePreferences.preferredTime"
      | "servicePreferences.location"
      | "vehicleCondition"
      | "vehicleCondition.exteriorCondition"
      | "vehicleCondition.interiorCondition"
      | "vehicleCondition.paintCondition"
      | "vehicleCondition.hasScratches"
      | "vehicleCondition.hasDents"
      | "vehicleCondition.hasStains"
      | "vehicleCondition.hasOdors"
      | "vehicleCondition.lastDetailDate"
      | "additionalInfo"
      | "additionalInfo.specialRequests"
      | "additionalInfo.hearAboutUs"
      | "status"
      | "createdAt"
      | "updatedAt";
    indexes: {
      by_status: {
        status: string;
      };
      by_created_at: {
        createdAt: number;
      };
      by_customer_email: {
        "customerInfo.email": string;
      };
    };
    searchIndexes: {};
    vectorIndexes: {};
  };
};
