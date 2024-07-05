// import AWS from "aws-sdk";

// const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
// const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_KEY;
// const REGION = "ap-northeast-2";
// const S3_BUCKET = "lotd-test";
// const FOLDER_NAME = "test1";

// AWS.config.update({
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// });

// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION,
// });

// export const uploadImageFile = async (image, setImage) => {
//     console.log(image);
//     const params = {
//         Body: image,
//         Bucket: S3_BUCKET,
//         Key: `${FOLDER_NAME}/${image.name}`,
//         ContentType: image.type,
//     };

//     try {
//         const response = await myBucket.upload(params).promise();
//         console.log(response);
//         return response.Location;
//     } catch (error) {
//         console.log("Upload Image Error");
//         console.log(error);
//     }

/**
 * 버킷 이미지 중복 시 중첩된 이미지 파일경로 가져오는 api
 */
// const params = {
//     Bucket: S3_BUCKET,
//     Key: `${FOLDER_NAME}/${image.name}`,
// };

// myBucket.headObject(params, (err, data) => {
//     if (err) {
//         if (err.code === "NotFound") {
//             console.log("기존 파일이 없습니다.");
//         } else {
//             console.error("파일 확인 중 에러 발생: ", err);
//         }
//     } else {
//         console.log("기존 파일 경로: ", params.Key);
//     }
// });

// myBucket
//     .upload(params)
//     .promise()
//     .then((response) => {
//         return response.Location;
//     })
//     .catch((error) => {

//     });

// myBucket
//     .putObject(params)
//     .on("httpUploadProgress", (evt) => {
//         console.log(evt);
//     })
//     .promise()
//     .then((response) => console.log(response));
// .send((error, data) => {
//     console.log(data);
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Upload Success", data);
//     }
// });
// };
