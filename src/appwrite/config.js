import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            );
        } catch (error) {
            console.log("Service :: createPost :: error", error);
        }
    }

    async updateDocument({slug,title,content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Service :: updateDocument :: error", error);
        }
    }

    async deletePost({slug}){   
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true
        } catch (error) {
            console.log("Service :: deletePost :: error", error);
            return false;
        }
    
    }

    async getPost({slug}){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Service :: getPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log("Service :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBuscketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Service :: uploadFile :: error", error);
            return false;
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBuscketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBuscketId,
            fileId
        );
    }

    getFileDownload(fileId){
        return this.bucket.getFileDownload(
            conf.appwriteBuscketId,
            fileId
        );
    }


}


const service = new Service();
export default service;
