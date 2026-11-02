export default class UserModel {
    constructor({ userId, username, phoneNumber, nationality, placeOfResidence, profileConfig, email, experience, description }) {
        this.userId = userId;                 
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.nationality = nationality;
        this.placeOfResidence = placeOfResidence;
        this.profileConfig = profileConfig;
        this.email = email;
        this.experience = experience;
        this.description = description;
    }
}