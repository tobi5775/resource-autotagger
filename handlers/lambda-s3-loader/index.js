const { S3Client, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client();

exports.handler = async (event) => {
  console.log(event);
  console.log(process.env.bucketName);
  var bucketName = process.env.bucketName;
  if (event['RequestType'] == 'Create' || event['RequestType'] == 'Update') {
    const command = new PutObjectCommand({
      Key: "mapping.json",
      Bucket: process.env.bucketName,
      Body: 
      `{
          "Mapping": [
            {
              "CTEventName": "RunInstances",
              "CTEventSource": "ec2.amazonaws.com",
              "REResourceType": "ec2:instance",
              "Global": false
            },
            {
              "CTEventName": "CreateBucket",
              "CTEventSource": "s3.amazonaws.com",
              "REResourceType": "s3:bucket",
              "Global": true
            },
            {
              "CTEventName": "CreateFunction20150331",
              "CTEventSource": "lambda.amazonaws.com",
              "REResourceType": "lambda:function",
              "Global": false
            },
            {
              "CTEventName": "CreateCluster",
              "CTEventSource": "ecs.amazonaws.com",
              "REResourceType": "ecs:cluster",
              "Global": false
            },
            {
              "CTEventName": "CreateCluster",
              "CTEventSource": "eks.amazonaws.com",
              "REResourceType": "eks:cluster",
              "Global": false
            },
            {
              "CTEventName": "CreateTable",
              "CTEventSource": "dynamodb.amazonaws.com",
              "REResourceType": "dynamodb:table",
              "Global": false
            },
            {
              "CTEventName": "CreateDBInstance",
              "CTEventSource": "rds.amazonaws.com",
              "REResourceType": "rds:db-instance",
              "Global": false
            },
            {
              "CTEventName": "CreateDBCluster",
              "CTEventSource": "rds.amazonaws.com",
              "REResourceType": "rds:db-cluster",
              "Global": false
            },
            {
              "CTEventName": "CreateTopic",
              "CTEventSource": "sns.amazonaws.com",
              "REResourceType": "sns:topic",
              "Global": true
            },
            {
              "CTEventName": "CreateQueue",
              "CTEventSource": "sqs.amazonaws.com",
              "REResourceType": "sqs:queue",
              "Global": true
            },
            {
              "CTEventName": "CreateRole",
              "CTEventSource": "iam.amazonaws.com",
              "REResourceType": "iam:role",
              "Global": true
            },
            {
              "CTEventName": "CreateRestApi",
              "CTEventSource": "apigateway.amazonaws.com",
              "REResourceType": "apigateway:rest-api",
              "Global": false
            },
            {
              "CTEventName": "CreateWorkGroup",
              "CTEventSource": "athena.amazonaws.com",
              "REResourceType": "athena:workgroup",
              "Global": false
            },
            {
              "CTEventName": "CreateDatabase",
              "CTEventSource": "glue.amazonaws.com",
              "REResourceType": "glue:database",
              "Global": false
            },
            {
              "CTEventName": "CreateCrawler",
              "CTEventSource": "glue.amazonaws.com",
              "REResourceType": "glue:crawler",
              "Global": false
            }
          ]
        }
`
    });
    const response = await s3Client.send(command);
  } 
  const response = {
    statusCode: 200,
    body: JSON.stringify('S3 Loader done'),
  };
  return response;
};