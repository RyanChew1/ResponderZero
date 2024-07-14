import { Client, Account, ID, Databases, Query } from "react-native-appwrite";

export const appwriteConfig = {

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
        logs: { responderId: newAccount.$id },
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
    await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw Error;
  } catch (error) {
    throw new Error(error);
  }
};

export const enterUserAddress = async (lat, long) => {
  try {
    getCurrentUser().then((response) => {
      console.log(response);
    });
    const result = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      response.$id,
      {
        latitude: lat,
        longitude: long,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export async function reportEmergency(lat, long) {
  try {
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
