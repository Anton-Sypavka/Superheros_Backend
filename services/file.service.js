const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1;

const {
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    PORT
} = require('../configs/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

module.exports = {
    upload: (file, itemType, itemId) => {
        const uploadPath = _fileNameBuilder(file.name, itemType, itemId);

        return bucket.upload({
            Bucket: process.env.AWS_S3_NAME,
            Body: file.data,
            Key: uploadPath,
            ContentType: file.mimetype
        }).promise();
    },
    delete: (deletePath) => bucket.deleteObject({
        Bucket: process.env.AWS_S3_NAME,
        Key: deletePath,
    }, (err, data) => {})
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExt = fileName.split('.').pop();

    return `${itemType}/${itemId.toString()}/${uuid()}.${fileExt}`;
}
