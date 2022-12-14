#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { StaticSite } from "./static-site";
import { tryGetContext } from "./utils";

class MyStaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props);

    new StaticSite(this, "MyViteAppWithCdk", {
      domainName: tryGetContext(this.node, "domainName"),
      subDomainName: tryGetContext(this.node, "subDomainName"),
      s3BucketName: tryGetContext(this.node, "s3BucketName"),
      buildPath: tryGetContext(this.node, "buildPath"),
    });
  }
}

const app = new cdk.App();

new MyStaticSiteStack(app, "MyViteAppWithCdkStack", {
  /**
   * This is required for our use of hosted-zone lookup.
   *
   * Lookups do not work at all without an explicit environment
   * specified; to use them, you must specify env.
   * @see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
   */
  env: {
    account: tryGetContext(app.node, "accountId"),
    /**
     * Stack must be in us-east-1, because the ACM certificate for a
     * global CloudFront distribution must be requested in us-east-1.
     */
    region: "us-east-1",
  },
});

app.synth();
