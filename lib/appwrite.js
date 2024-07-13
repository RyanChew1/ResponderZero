import { Client, Account, ID, Databases } from 'react-native-appwrite';

export const appwriteConfig = {

}


const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (email, password, username, phone) => {
    
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if(!newAccount) throw Error;
        
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
                logs: {responderId: newAccount.$id}
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password){
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}

export async function reportEmergency(lat, long){
    try {
        
    } catch (error) {
        throw new Error(error)
    }
}