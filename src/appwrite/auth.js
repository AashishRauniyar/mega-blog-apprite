import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";


// appwrite auth service

export class AuthService {


    client = new Client();
    account;

    constructor() {
        // this takes reference to current client inside the classa
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){

                // call another method
                return this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // read from docs to see how we can login
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}

// making object of AuthService class
const authService = new AuthService();

// exporting object authService of class AuthService
export default authService;
