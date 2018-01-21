import { option } from "yargs";
import { sendMail, MailInfo } from "./mail";
import chalk from "chalk";
import { getXmrBalance, getXmrData } from "./xmr";
import { dateToString, toValue, average } from "./util/util";

let pars = option("f", {
  alias: "fromEmailAddress",
  demand: true,
  default: "",
  describe: "Please input mail from address",
  type: "string"
})
  .option("d", {
    alias: "xmrBaseAddress",
    demand: true,
    default: "",
    describe: "Please input xmr base address",
    type: "string"
  })
  .option("p", {
    alias: "password",
    demand: true,
    default: "",
    describe: "Please input password",
    type: "string"
  })
  .option("s", {
    alias: "server",
    demand: false,
    default: "smtp.qq.com",
    describe: "Please input mail server",
    type: "string"
  })
  .option("t", {
    alias: "toEmailAddress",
    demand: true,
    default: "",
    describe: "Please input mail to address",
    type: "string"
  })
  .option("o", {
    alias: "port",
    demand: false,
    default: 465,
    describe: "Please input server port",
    type: "number"
  })
  .option("n", {
    alias: "time",
    demand: false,
    default: 60,
    describe: "Please input time of send xmr info",
    type: "number"
  })
  .option("u", {
    alias: "subject",
    demand: false,
    default: "XMR info",
    describe: "Please input subject of the mail",
    type: "string"
  }).argv;

function send(html: string) {
  let mailInfo: MailInfo = {
    host: pars.s,
    port: pars.o,
    from: pars.f,
    to: pars.t,
    password: pars.p,
    html: html,
    subject: pars.u
  };

  sendMail(mailInfo)
    .then(v => {
      console.log(chalk.blue(v));
    })
    .catch(err => {
      console.log(chalk.red(err));
    });
}

let balanceList: {
  time: Date;
  balance: number;
  add: number;
}[] = [];

async function getInfoAndSend() {
  let balance = await getXmrBalance(pars.d);
  let add = 0;
  if (balanceList.length) {
    add = balance - balanceList[balanceList.length - 1].balance;
  }

  balanceList.unshift({ time: new Date(), balance, add });
  if (balanceList.length > 10) {
    balanceList.pop();
  }

  let html = `<html>
<head>
  <style>
    table {border-color:#ccc; border-collapse: collapse;}
    table th {font-size: 14px;border:1px #ccc solid;}
    table td {font-size: 12px;border:1px #ccc solid;}
  </style>
</head>
<body>
  <table>
    <tr>
      <th>时间</th>
      <th>余额</th>
      <th>变动</th>
    </tr>`;

  balanceList.map(m => {
    html += `<tr>
  <td>${dateToString(m.time)}</td>
  <td>${toValue(m.balance.toString(), 12)}</td>
  <td>${m.add}</td>
</tr>`;
  });
  html += "</table><br/><br/>";

  let now = new Date();
  let time12 = new Date();
  time12.setHours(now.getHours() - 12);
  let time1 = new Date();
  time1.setHours(now.getHours() - 1);

  let data = await getXmrData(pars.d);

  html += `<table>
      <tr><th>24小时平均</th><td>${average(data, 24)} H/s</td></tr>
      <tr><th>12小时平均</th><td>${average(data, 12)} H/s</td></tr>
      <tr><th>1小时平均</th><td>${average(data, 1)} H/s</td></tr>
    </table>
  </body>
</html>`;
  send(html);
}

function getInfoAndSends() {
  getInfoAndSend()
    .then()
    .catch();

  setTimeout(() => {
    getInfoAndSends();
  }, 1000 * pars.n);
}

getInfoAndSends();
