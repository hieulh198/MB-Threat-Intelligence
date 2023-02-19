const config = require('../../../config');
const splunk = require('../../../services/splunk');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports.getStatus = async (res) => {
  res.status(200).json({ api: 'OK' });
};


module.exports.getRedLineStealer = async (res) => {
  const service = splunk.createService();
  const kvStore = await splunk.getKVStore(service, config.splunk_collection_name);
  const data = kvStore.data
  const rs = data.map(e => {
    return {
      sha256_hash: e['sha256_hash'],
      first_seen: e['first_seen'],
      tags: e['tags'],
      file_type: e['file_type']
    }
  })
  res.status(200).send(rs);
};

module.exports.search = async (req, res) => {
  const hash = req.query?.hash || null
  let rs = []
  if (hash) {
    const service = splunk.createService();
    const kvStore = await splunk.getKVStore(service, config.splunk_collection_name);

    kvStore.data.forEach(e => {
      if (hash.includes(e['sha256_hash']) || e['sha256_hash'].includes(hash)) {
        rs.push({
          sha256_hash: e['sha256_hash'],
          first_seen: e['first_seen'],
          tags: e['tags'],
          file_type: e['file_type']
        })
      }
    })
    res.status(200).send(rs);
  } else {
    res.status(200).send([]);
  }
};

module.exports.getDetail = async (req, res) => {
  const hash = req.query?.hash || null
  let rs = {}
  if (hash) {
    const service = splunk.createService();
    const kvStore = await splunk.getKVStore(service, config.splunk_collection_name);

    kvStore.data.forEach(e => {
      if (hash === e['sha256_hash']) {
        rs = { ...e }
        delete rs['_key']
        delete rs['_user']
        return
      }
    })
    res.status(200).send(rs);
  } else {
    res.status(200).send({});
  }
};

module.exports.export = async (req, res) => {
  const hash = req.query?.hash || null
  let rs = {}
  if (hash) {
    const currentDirectory = process.cwd();
    const pythonProcess = spawn('python', [`${currentDirectory}/Worker2/main.py`, hash]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      fs.access(`${currentDirectory}/download/${hash}.xlsx`, (err) => {
        if (err) {
          rs = {}
          res.status(200).send(rs);

        } else {
          rs = { status: 'ok' }
          res.status(200).send(rs);

        }
      });
    });
  } else {
    res.status(200).send({});
  }
};

module.exports.download = async (req, res) => {
  const currentDirectory = process.cwd();
  const filename = req.query?.filename;
  const filePath = `${currentDirectory}/download/${filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  res.download(filePath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
};

module.exports.getListExportFiles = async (req, res) => {
  const currentDirectory = process.cwd();
  const directoryPath = `${currentDirectory}/download/`;

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send(err);
    } else {
      const rs = []
      files.forEach(function (file) {
        if (path.extname(file) === '.xlsx') {
          rs.push(file);
        }
      });
      res.status(200).send(rs);
    }
  });
};