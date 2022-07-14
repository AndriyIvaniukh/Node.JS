const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;

const {configs} = require("../config");

const BuketConfig = new S3({
    region: configs.AWS_S3_REGION,
    accessKeyId: configs.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: configs.AWS_S3_SECRET_ACCESS_KEY,
})

const uploadFine = async (file, itemType, itemId) => {
    const path = _buildFilePath(file.name, itemType, itemId);

    return BuketConfig.upload({
        Bucket: configs.AWS_S3_BUCKET,
        Key: path,
        ACL: 'public-read',
        Body: file.data,
    })
        .promise()
}

const deleteFile = async (file, itemType, itemId) => {
    const path = _buildPathForDelete(file, itemType, itemId);
    console.log(path);

    return BuketConfig.deleteObject({
        Bucket: configs.AWS_S3_BUCKET,
        Key: path,
    })
        .promise()
}

module.exports = {
    uploadFine,
    deleteFile,
}

function _buildFilePath(fileName = '', itemType, itemId) {
    const ext = fileName.split('.').pop();
    // const ext = path.extname(fileName)

    return `${itemType}/${itemId}/${uuid()}.${ext}`
    // return `${itemType}/${itemId}/${name}${ext}`
}

function _buildPathForDelete(fileName = '', itemType, itemId) {
    return `${itemType}/${itemId}/${fileName}`
}
