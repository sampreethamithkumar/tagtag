# Upload Image to S3 Bucket.

# Install the dependency

```
npm install
```

# Things to configure before starting the server:

1. Create a .env file
2. Get the Access Key, Secrete Key and Session Key from Aws Educate
3. Set the key name of bucket as: AWS_BUCKET_NAME = "tagtag-image-storage"
4. Set the Bucket region as: AWS_BUCKET_REGION = "us-east-1"
5. Set the access key as: AWS_ACCESS_KEY = "{access key from aws educate}"
6. Set the secret key as: AWS_SECRET_KEY = "{secret key from aws educate}"
7. Set the Session token as: AWS_SESSION_TOKEN = "{session token from aws educate}"

Set the above mentioned params in .env file.

# Start the Server

```
npm start
```
