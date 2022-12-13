# Static site

This creates the infrastructure for a static site, which uses an S3 bucket for storing the content.  The site contents (located in the '../dist') are deployed to the bucket.

The site redirects from HTTP to HTTPS, using a CloudFront distribution, Route53 alias record, and ACM certificate.

## Prep

The domain for the static site must be configured as a hosted zone in Route53 prior to deploying this infra. For instructions on configuring Route53 as the DNS service for your domain, see the [Route53 documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html).

## Deploy

```shell
$ npm install -g aws-cdk
$ npm install
$ npm run build
$ cdk deploy -c accountId=${ACCOUNT_ID} -c domain=${DOMAIN} -c subdomain=${SUB_DOMAIN} -c s3Bucket=${S3_BUCKET_NAME}
```
