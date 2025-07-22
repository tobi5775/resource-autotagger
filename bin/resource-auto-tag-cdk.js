#!/usr/bin/env node

const {App} = require('aws-cdk-lib');
const { ResourceAutoTagCdkStack } = require('../lib/resource-auto-tag-cdk-stack');

const app = new App();

const regions = ['us-east-1', 'us-west-2', 'eu-central-1', 'eu-west-1', 'eu-west-3', 'eu-north-1'];

for (const region of regions) {
    new ResourceAutoTagCdkStack(app, `ResourceAutoTagStack-${region}`, {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: region,
        },
        description: `Resource auto tagger deployed in ${region}`,
    });
}
