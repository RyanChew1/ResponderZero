import { Client, Account, ID, Databases, Query } from "react-native-appwrite";
import * as SMS from 'expo-sms';

// import {ENDPOINT, PLATFORM, APPWRITE_PROJECT_ID, DATABASE_ID, USER_COLLECTION_ID, LOG_COLLECTION_ID, REPORT_COLLECTION_ID } from '@env';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
  logCollectionId: process.env.EXPO_PUBLIC_LOG_COLLECTION_ID,
  reportCollectionId: process.env.EXPO_PUBLIC_REPORT_COLLECTION_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (email, password, username, phone) => {
  console.log("PW: " + password);
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name: username,
        email: email,
        phoneNumber: phone,
        logs: { responderId: newAccount.$id},
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    try {
      const response = await account.get();
      if (!response) throw Error;
      account.deleteSession("current");
    } catch {
      console.log("No session to delete");
    }

    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw Error;
  } catch (error) {
    throw new Error(error);
  }
};

export const enterUserAddress = async (lat, long) => {
  try {
    getCurrentUser().then(async (response) => {
      if (response) {
        const result = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          response.documents[0].$id,
          {
            latitude: lat,
            longitude: long,
          }
        );
      } else throw Error;
    });
  } catch (error) {
    console.log(error);
  }
};

export async function reportEmergency(lat, long) {
  try {
    const newReport = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.reportCollectionId,
      ID.unique(),
      {
        reportId: ID.unique(),
        latitude: lat,
        longitude: long,
      }
    );

    if (!newReport) throw Error;

    const nearbyResponders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.lessThan("latitude", lat + 0.04),
        Query.greaterThan("latitude", lat - 0.04),
        Query.lessThan("longitude", long + 0.04),
        Query.greaterThan("longitude", long - 0.04),
      ]
    );

    nearbyResponders.documents.forEach(async (document) => {

      let currReportIds = document.logs.reportIds

      if (currReportIds.length==0){
        const result = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.logCollectionId,
          document.logs.$id,
          {
  
            reportIds: [newReport.reportId]
          }
        );
      } else {
        const result = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.logCollectionId,
          document.logs.$id,
          {
  
            reportIds: [...document.logs.reportIds, newReport.reportId]
          }
        );
      }

      console.log(modifiedReportIds)

        
    });

    const phoneNumbers = nearbyResponders.documents.map(
      (doc) => doc.phoneNumber
    );

    console.log(phoneNumbers);

    if (!phoneNumbers) throw Error;

    const isAvailable = await SMS.isAvailableAsync();

    const message = "Emergency Reported Nearby https://www.google.com/maps/search/?api=1&query="+lat+"%2C"+long

    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        phoneNumbers,
        message,
      );
    } else {
      throw Error;
    }
    

    return newReport;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser;
  } catch (error) {
    console.log(error);
  }
};

export const getLogs = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUserLogs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.logCollectionId,
      [Query.equal("responderId", currentAccount.$id)]
    );

    if (!currentUserLogs) throw Error;
    return currentUserLogs;
  } catch (error) {
    console.log(error);
  }
};

export const getReport = async (reportId) => {
  try {
    const report = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.reportCollectionId,
      [Query.equal("reportId", reportId)]
    );

    if (!report) throw Error;

    console.log(report)
    return report;

  }catch (error) {
    console.log(error);
  }
}
