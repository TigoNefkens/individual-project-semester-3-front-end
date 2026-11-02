export default class ApplicationModel {
    constructor({ applicationId, bandId, applicantUserId, content }) {
        this.applicationId = applicationId;
        this.bandId = bandId;
        this.applicantUserId = applicantUserId;
        this.content = content;
    }
}