#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkCourse1Stack } from '../lib/cdk-course-1-stack';
import { PhotosStack } from '../lib/PhotosStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack');