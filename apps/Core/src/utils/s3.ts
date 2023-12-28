import { ObjectCannedACL, PutObjectCommand, S3 } from '@aws-sdk/client-s3';

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: 'https://sfo3.digitaloceanspaces.com',
    region: 'us-west-1',
    credentials: {
        accessKeyId: process.env.S3_APIKEY,
        secretAccessKey: process.env.S3_SECRET,
    },
});

const uploadObject = async (key: string, body: any, acl: ObjectCannedACL = 'public-read') => {
    const params = {
        Bucket: 'gc-grouping', // The path to the directory you want to upload the object to, starting with your Space name.
        Key: key, // Object key, referenced whenever you want to access this file later.
        Body: body, // The object's contents. This variable is an object, not a string.
        ACL: acl, // Defines ACL permissions, such as private or public.
        Metadata: {
            // Defines metadata tags.
            // 'x-amz-meta-my-key': 'your-value',
        },
    };
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('Successfully uploaded object: ' + params.Bucket + '/' + params.Key);
        return `https://s3.grouped.me/${key}`;
    } catch (err) {
        console.log('Error', err);
        return undefined;
    }
};

export const S3Utils = { s3Client, uploadObject };
