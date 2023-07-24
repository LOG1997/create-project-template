
import * as fs from 'fs';
import * as path from 'path';

const env = process.env.NODE_ENV;
const envPathObj =
{
    'dev': '.env.dev',
    'prod': '.env.prod',
    'test': '.env.test'
}

function parseEnv() {
    const envFilePath = path.resolve(envPathObj[env]);

    if (!fs.existsSync(envFilePath)) {
        throw new Error('缺少环境配置文件');
    }

    return { envPath: envFilePath };
}
export default parseEnv();