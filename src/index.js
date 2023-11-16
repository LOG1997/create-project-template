#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import minimist from 'minimist';
import prompts from 'prompts';
import {
    blue,
    cyan,
    green,
    lightRed,
    magenta,
    red,
    reset,
    yellow,
} from 'kolorist';

const argv = minimist(process.argv.slice(2), { string: ['_'] });
const cwd = process.cwd();
// 定义选项
const FRAMEWORKS = [
    {
        name: 'vue3',
        color: green,
        variants: [
            {
                name: 'vue3-ts-pure',
                display: 'vue3-ts-pure',
                color: yellow,
            },
            {
                name: 'vue3-ts-pinia-router',
                display: 'vue3-ts-pinia-router',
                color: blue,
                modules: [
                    {
                        name: 'element',
                        version: '^2.2.18',
                        display: 'element-plus',
                        color: blue,
                    },
                    {
                        name: 'unocss',
                        version: '^3.5.6',
                        display: 'unocss',
                        dev: true,
                        color: magenta,
                    },
                    {
                        name: 'daiysui',
                        version: '^4.0.0',
                        display: 'daiysui',
                        dev: true,
                        color: yellow,
                    }
                ],
            },
        ],
    },
    {
        name: 'react',
        color: blue,
        variants: [
            {
                name: 'react-ts-pure',
                display: 'react-ts-pure',
                color: yellow,
            },
            {
                name: 'react-ts-redux-router',
                display: 'react-ts-redux-router',
                color: blue,
            },
        ],
    },
    {
        name: 'nestjs',
        color: yellow,
        variants: [
            {
                name: 'nestjs',
                display: 'Nestjs',
                color: yellow,
            }
        ]
    },
    {
        name: 'nextjs',
        color: blue,
        variants: [
            {
                name: 'nextjs',
                display: 'nextjs',
                color: green,
            },
        ],
    },
    {
        name: 'nuxtjs',
        color: magenta,
        variants: [
            {
                name: 'nuxtjs',
                display: 'nuxtjs',
                color: magenta,
            },
        ],
    },
    {
        name: 'tauri',
        color: yellow,
        variants: [
            {
                name: 'tauri-react',
                display: 'tauri-react',
                color: yellow,
            },
        ],
    },
    {
        name: 'vue2',
        color: blue,
        variants: [
            {
                name: 'vue2-pure',
                display: 'vue2-pure',
                color: yellow,
            },
            {
                name: 'vue2-router-vuex',
                display: 'vue2-router-vuex',
                color: blue,
                modules: [
                    {
                        name: 'element-ui',
                        display: 'element-ui',
                        color: blue,
                    },
                    {
                        name: 'unocss',
                        display: 'unocss',
                        color: magenta,
                    },
                ],
            },
        ],
    },
    {
        name: 'node',
        color: cyan,
        variants: [
            {
                name: 'node-pure',
                display: 'node-pure',
                color: yellow,
            },
            {
                name: 'node-mysql',
                display: 'node-mysql',
                color: lightRed,
            },
        ],
    },
    {
        name: 'wxapp',
        color: green,
        variants: [
            {
                name: 'wxapp-pure',
                display: '微信小程序',
                color: yellow,
            },
        ],
    },
];

const TEMPLATES = FRAMEWORKS.map(
    (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]
).reduce((a, b) => a.concat(b), []);

const renameFiles = {
    _gitignore: '.gitignore',
};

async function init() {
    let targetDir = formatTargetDir(argv._[0]);
    let template = argv.template || argv.t;
    // 默认显示项目名称
    const defaultTargetDir = 'vue-app';
    // 用户输入项目名称
    const getProjectName = () =>
        targetDir === '.' ? path.basename(path.resolve()) : targetDir;

    let result = {};
    try {
        result = await prompts(
            [
                // 输入项目名称
                {
                    // 类型限制
                    type: targetDir ? null : 'text',
                    // 输入变量名称
                    name: 'projectName',
                    // 输入回显
                    message: reset('Project name:'),
                    // 未输入时，初始值
                    initial: defaultTargetDir,
                    onState: (state) => {
                        targetDir = formatTargetDir(state.value) || defaultTargetDir;
                    },
                },
                //检测到已有目录，是否覆盖此目录
                {
                    type: () =>
                        !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',

                    name: 'overwrite',
                    message: () => {
                        return targetDir === '.'
                            ? 'Current dir'
                            : `TargetDir directory "${targetDir}"` +
                            `is not empty. Remove existing files and continue?`;
                    },
                },
                // 是否覆盖成功检测
                {
                    type: (_, { overwrite } = {}) => {
                        if (overwrite === false) {
                            throw new Error(red('✖') + ' Operation cancelled');
                        }
                        return null;
                    },
                    name: 'overwriteChecker',
                },
                //选择package
                {
                    type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
                    name: 'packageName',
                    message: reset('Package name:'),
                    initial: () => toValidPackageName(getProjectName()),
                    validate: (dir) =>
                        isValidPackageName(dir) || 'Invalid package.json name',
                },
                // 选择框架
                {
                    type: template && TEMPLATES.includes(template) ? null : 'select',
                    name: 'framework',
                    message:
                        typeof template === 'string' && !TEMPLATES.includes(template)
                            ? reset(
                                `"${template}" is not a valid template,Please restart choose:`
                            )
                            : reset('Select a framework:'),
                    initial: 0,
                    choices: FRAMEWORKS.map((framework) => {
                        const frameworkColor = framework.color;
                        return {
                            title: frameworkColor(framework.name),
                            value: framework,
                        };
                    }),
                },
                // 选择类型，框架下的具体配置
                {
                    type: (framework) => {
                        return framework && framework.variants ? 'select' : null;
                    },
                    name: 'variant',
                    initial: 0,
                    message: (framework) =>
                        framework.name == 'vue2'
                            ? reset(
                                `"${framework.name}" is not a valid template,Please restart choose:`
                            )
                            : reset('select a variant:'),
                    choices: (framework) => {
                        return framework.variants.map((variant) => {
                            const variantColor = variant.color;
                            if (framework.name == 'vue2') {
                                throw new Error(red('×') + ' vue 2.x is not supported');
                            }
                            return {
                                title: variantColor(variant.name),
                                value: variant,
                            };
                        });
                    },
                },
                {
                    // 选择其他插件
                    type: (variant) => {
                        return variant && variant.modules ? 'multiselect' : null;
                    },
                    name: 'module',
                    message: reset('select modules:'),
                    initial: 0,
                    choices: (variant) => {
                        return variant.modules.map((module) => {
                            const moduleColor = module.color;

                            return {
                                title: moduleColor(module.name),
                                value: module.name,
                            };
                        });
                    },
                },
            ],
            {
                onCancel: () => {
                    throw new Error(red('×') + ' Operation cancelled');
                },
            }
        );
    } catch (cancelled) {
        console.log(cancelled.message);
        return;
    }

    // user choice associated with prompts
    const { framework, overwrite, packageName, variant, module } = result;

    // 新建目录的根目录
    const root = path.join(cwd, targetDir);

    // determine template
    template = variant.name || framework || template;
    console.log(`\nScaffolding project in ${root}...`);
    const isModule = module && module.length > 0;
    const templateComName = isModule
        ? `${template}-${module.join('-')}`
        : template;
    if (templateComName.includes('daiysui') && (templateComName.includes('element') || templateComName.includes('unocss'))) {
        throw new Error(red('×') + 'daiysui is selected,not allowed add element-plus and unocss');
    }

    // 模板文件夹
    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '..',
        `template-${templateComName}`
    );
    // 重写目录则把指定目录清空，否则创建目录
    if (overwrite) {
        emptyDir(root);
    } else if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true });
    }
    const write = (file, content) => {
        const targetPath = renameFiles[file]
            ? path.join(root, renameFiles[file])
            : path.join(root, file);
        if (content) {
            fs.writeFileSync(targetPath, content);
        } else {
            copy(path.join(templateDir, file), targetPath);
        }
    };
    // 读取模板文件夹内容（除去package.json）
    const files = fs.readdirSync(templateDir);
    for (const file of files.filter((f) => f !== 'package.json')) {
        write(file);
    }
    const pkg = JSON.parse(
        fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
    );

    pkg.name = packageName || getProjectName();
    // module.forEach((item) => {
    //   if (!item.dev) {
    //     pkg.dependencies[item.name] = item.version;
    //   } else {
    //     pkg.devDependencies[item.name] = item.version;
    //   }
    // });
    write('package.json', JSON.stringify(pkg, null, 2));
    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

    console.log('\nDone. Now run:\n');
    if (root != cwd) {
        console.log(`  cd ${red(path.relative(cwd, root))}`);
    }
    switch (pkgManager) {
        case 'yarn':
            console.log('  yarn');
            console.log('  yarn dev');
            break;
        default:
            console.log(`  ${pkgManager} install`);
            console.log(`  ${pkgManager} run dev`);
            break;
    }
    console.log(`   ${green('√')}` + ' Done');
}

init().catch((e) => {
    console.error(e);
});
/**
 * @param {string | undefined} targetDir
 */
function formatTargetDir(targetDir) {
    return targetDir?.trim().replace(/\/+$/g, '');
}

/**
 * @param {string} path
 */
function isEmpty(path) {
    const files = fs.readdirSync(path);
    return files.length === 0 || (files.length === 1 && files[0] === '.git');
}
/**
 * @param {string} projectName
 */
function isValidPackageName(projectName) {
    return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
        projectName
    );
}

/**
 * @param {string} projectName
 */
function toValidPackageName(projectName) {
    return projectName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z0-9-~]+/g, '-');
}

/**
 * @param {string} dir
 */
function emptyDir(dir) {
    if (!fs.existsSync(dir)) {
        return;
    }
    for (const file of fs.readdirSync(dir)) {
        fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
    }
}

function copy(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    } else {
        fs.copyFileSync(src, dest);
    }
}
/**
 * @param {string} srcDir
 * @param {string} destDir
 */
function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file);
        const destFile = path.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
function pkgFromUserAgent(userAgent) {
    if (!userAgent) return undefined;
    const pkgSpec = userAgent.split(' ')[0];
    const pkgSpecArr = pkgSpec.split('/');
    return {
        name: pkgSpecArr[0],
        version: pkgSpecArr[1],
    };
}
