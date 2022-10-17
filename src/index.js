#!/usr/bin/env node
// 进度
const ora = require("ora");
// 字体
const chalk = require("chalk");
const { rmSync } = require("fs");

const downloadGitRepo = require("download-git-repo");
// 命令行交互
const { Command, Argument } = require("commander");

const { log } = console;
const program = new Command();

// 可下载的模板
const repositoryMap = {
  basic: "v-wave",
  admin: "vue3-demo-admin",
  lib: "vue-next-lib-template",
};

function download(url, directory) {
  return new Promise((resolve, reject) => {
    rmSync(directory, { recursive: true, force: true });
    downloadGitRepo(`direct:${url}`, directory, { clone: true }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
let start, end;
program
  .name("create-my-cli")
  .version("1.0.0", "-v, --version")
  .argument("[project-directory]", "directory", "your-app")
  .option("-t --template <template>", "choose a template")
  .description(
    "clone a optional repository into a newly created <project-directory>"
  )
  .action((directory) => {
    const options = program.opts();
    log(chalk.red.bold(`Welcome to create-my-cli`));
    if (options.template && !Reflect.has(repositoryMap, options.template)) {
      log(`传入的模板: ${options.template}不可用，可选的有: basic, admin, lib`);
    }
    log(
      `Wait a mininute, ${chalk.green.bold(
        "App template"
      )} will be downloaded to ${chalk.green.bold(directory)}`
    );
    start = Date.now();
    const spinner = ora(
      chalk.hex("#DEADED").bold("👻 I'm trying......")
    ).start();
    const repository = options.template
      ? repositoryMap[options.template] || "useVue3"
      : "useVue3";
    spinner.color = "green";
    download(`https://github.com/justintaddei/${repository}.git`, directory)
      .then(() => {
        end = Date.now();
        spinner.stop();
        log(chalk.green.bold(`success in ${(end - start) / 1000} s`));
        log(`
then, you can do like this:
1. cd ${directory}
2. yarn / npm i
3. yarn dev / npm run dev
      `);
      })
      .catch((err) => {
        log(chalk.red.bold("fail, reason:", err));
        spinner.stop();
      });
  });

program.parse();
