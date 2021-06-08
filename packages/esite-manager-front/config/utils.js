const chalk = require('chalk');
const os = require('os');

// 项目开发环境启动成功提示
function printInstructions(appName, urls, useYarn) {
    console.log();
    console.log(`You can now view ${chalk.green(appName)} in the browser.`);
    console.log();
  
    if (urls.lanUrlForTerminal) {
      console.log(
        `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
      );
      console.log(
        `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
      );
    } else {
      console.log(`  ${urls.localUrlForTerminal}`);
    }
  
    console.log();
    console.log('Note that the development build is not optimized.');
    console.log(
      `To create a production build, use ` +
        `${chalk.cyan(`${useYarn ? 'yarn' : 'npm run'} build`)}.`
    );
    console.log();
}

// 获取本地Ip
function getLocalIp(callback)  {
    require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
        callback(addr);
    })
}


const ifaces = os.networkInterfaces();

const getLocalIpSync = () => {
    let host = '127.0.0.1';

    for (const dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (details.family === 'IPv4' && details.address.indexOf('192.168') >= 0) {
                host = details.address;
            }
        });
    }

    return host;
};



module.exports = {
    getLocalIp,
    getLocalIpSync,
    printInstructions
}