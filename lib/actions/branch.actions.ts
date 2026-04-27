// ===== FILE: lib/actions/branch.actions.ts (REPLACE) =====

"use server";

import { Query } from "node-appwrite";
import { DATABASE_ID, BRANCHES_COLLECTION_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { adaptBranch, adaptBranches, type AppBranch, type DatabaseBranch } from "@/lib/branch-adapter";

// GET ALL BRANCHES - Returns adapted branches
export const getAllBranches = async (): Promise<AppBranch[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      BRANCHES_COLLECTION_ID!,
      [Query.equal("isActive", [true])]
    );
    
    // Adapt database format to app format
    const adaptedBranches = adaptBranches(response.documents as unknown as DatabaseBranch[]);
    return parseStringify(adaptedBranches);
  } catch (error) {
    console.error("An error occurred while fetching branches:", error);
    return [];
  }
};

// GET BRANCH BY ID - Returns adapted branch
export const getBranchById = async (branchId: string): Promise<AppBranch | null> => {
  try {
    const branch = await databases.getDocument(
      DATABASE_ID!,
      BRANCHES_COLLECTION_ID!,
      branchId
    );
    
    const adaptedBranch = adaptBranch(branch as unknown as DatabaseBranch);
    return parseStringify(adaptedBranch);
  } catch (error) {
    console.error("An error occurred while fetching branch:", error);
    return null;
  }
};

// CREATE BRANCH (for admin/seed) - Accepts app format, stores as database format
export const createBranch = async (branch: Omit<AppBranch, "$id" | "$createdAt" | "$updatedAt">) => {
  try {
    // Convert operatingHours object back to string for database
    const dbBranch = {
      ...branch,
      operatingHours: `${branch.operatingHours.weekdays}, Sat ${branch.operatingHours.saturday}`,
    };
    
    const newBranch = await databases.createDocument(
      DATABASE_ID!,
      BRANCHES_COLLECTION_ID!,
      ID.unique(),
      dbBranch
    );
    
    return parseStringify(adaptBranch(newBranch as unknown as DatabaseBranch));
  } catch (error) {
    console.error("An error occurred while creating branch:", error);
    return null;
  }
};