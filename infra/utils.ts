import { Node } from 'constructs';
import { StaticSiteProps } from './static-site';

interface Config extends StaticSiteProps {
    accountId: string
}
export const tryGetContext = (node: Node, key: keyof Config) => {
    const env = process.env.CDK_CONTEXT_ENVIRONMENT || node.tryGetContext('environment')
    if(!env) {
        throw new Error(`Context environment must be set. Either set an environment variable 'CDK_CONTEXT_ENVIRONMENT' or pass '-c environment=prod' in cli`);
    }
    const config = node.tryGetContext(env) as Config
    if(!config){
        throw new Error(`Environment config for environment='${env}' is not present in context`);
    }
    return config[key]
}