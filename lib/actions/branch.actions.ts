"use server";

import { ID, Query } from "node-appwrite";
import { DATABASE_ID, BRANCHES_COLLECTION_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Branch } from "@/types";

// GET ALL BRANCHES
export const getAllBranches = async () => {
  try {
    const branches = await databases.listDocuments(
      DATABASE_ID!,
      BRANCHES_COLLECTION_ID!,
      [Query.equal("isActive", [true])] // Only active branches
    );
    
    return parseStringify(branches.documents);
  } catch (error) {
    console.error("An error occurred while fetching branches:", error);
    return [];
  }
};

// GET BRANCH BY ID
export const getBranchById = async (branchId: string) => {
  try {
    const branch = await databases.getDocument(
      DATABASE_ID!,
      BRANCHES_COLLECTION_ID!,
      branchId
    );
    
    return parseStringify(branch);
  } catch (error) {
    console.error("An error occurred while fetching branch:", error);
    return null;
  }
};

// CREATE BRANCH (for admin/seed)
export const createBranch = async (branch: Branch) => {
  try {
    const newBranch = await databases.createDocument(
      DATABASE_ID!,
      BRANCHES_COLLECTION_ID!,
      ID.unique(),
      branch
    );
    
    return parseStringify(newBranch);
  } catch (error) {
    console.error("An error occurred while creating branch:", error);
    return null;
  }
};