const { readdirSync, statSync, writeFileSync, mkdirSync, readFileSync, rmdirSync } = require('fs')
// 路径处理
const PATH = require('path')

const downloadGitRepo = require('download-git-repo')

async function download(url, directory) {
  await new Promise((resolve, reject) => {
    rmdirSync(directory, {recursive: true, force: true})
    downloadGitRepo(`direct:${url}`, directory, { clone: true }, err => {
      if (err) return reject(err)
      resolve()
    })
  })
  
}

function read(currentPath, res) {
  const dirs = readdirSync(PATH.resolve(currentPath))
  dirs.forEach(dir => {
    const current = currentPath + '/' + dir
    const fileStatus = statSync(current)
    if (fileStatus.isDirectory()) {
      res.push({ type: 'dir', path: current })
      read(current, res)
    } else {
      res.push({ type: 'file', path: current })
    }
  })
}

function genFilePathArray(resourcePath) {
  const res = []
  read(resourcePath, res)
  return res
}

function writeFiles(filePathArray, targetDirName) {
  console.log(filePathArray)
  filePathArray.forEach(file => {
    const { type, path } = file
    if (type === 'file') {
      const data = readFileSync(path)
      writeFileSync(`./${targetDirName}${path.replace('./resource', '')}`, data)
    } else {
      mkdirSync(`./${targetDirName}${path.replace('./resource', '')}`, {recursive: true})
    }
  })
}

module.exports = {
  genFilePathArray,
  writeFiles,
  download
}
