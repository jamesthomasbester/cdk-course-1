import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


// L3 construct
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);
    new Bucket(this, 'MyL3Buckets', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expiration),
      }]
    })
  }
}

export class CdkCourse1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //L3 construct
    new L3Bucket(this, 'MyL3Buckets', 2);    

    // Construct parameters
    const duration = new cdk.CfnParameter(this, 'duration',{
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number',
    })
    
    // L2 construct
    const myL2Bucket = new Bucket(this, 'MyL2Buckets', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(duration.valueAsNumber),
      }]
    })

    // L1 construct
    new CfnBucket(this, 'MyL1Buckets', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]  
      }
    }) 

    // new CfnOutput(this, 'MyL2BucketName1', {
    //   value: myL2Bucket.bucketName
    // })

  }
}
