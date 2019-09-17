module.exports = {
    port: 3000,
    fireBasePrivateKeyPath: {
        "type": "service_account",
        "project_id": "<PROJECT_NAME>-<PROJECT_ID>",
        "private_key_id": "<PROJECT_PRIVATE_KEY_ID>",
        "private_key": "<PROJECT_PRIVATE_KEY>",
        "client_email": "firebase-adminsdk-qhf77@<PROJECT_NAME>-<PROJECT_ID>.iam.gserviceaccount.com",
        "client_id": "<CLIENT_ID>",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qhf77%40<PROJECT_NAME>-<PROJECT_ID>.iam.gserviceaccount.com"
    },
    firebaseStorageBucketURL: '<PROJECT_NAME>-<PROJECT_ID>.appspot.com'
};