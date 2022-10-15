const ora = require("ora");
const chalk = require("chalk");

const spinner = ora(`Loading ${chalk.red("unicorns")}`).start();
const { rmdirSync } = require("fs");
const { log } = console;

const downloadGitRepo = require("download-git-repo");

function download(url, directory) {
  return new Promise((resolve, reject) => {
    rmdirSync(directory, { recursive: true, force: true });
    downloadGitRepo(`direct:${url}`, directory, { clone: true }, (err) => {
      if (err) return reject(err);
      resolve();
      spinner.stop();
    });
  });
}

download("https://github.com/LOG1997/vue3-weather.git", "server")
  .then(() => {
    log("SUCCESS");
  })
  .catch((err) => log(err));
