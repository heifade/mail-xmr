import { option } from "yargs";
import { sendMail, MailInfo } from "./mail";
import chalk from "chalk";
import { getXmrBalance, toValue } from "./xmr";
import { dateToString } from "./util/util";

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

  let html = `<table>
  <tr>
    <th>时间</th>
    <th>余额</th>
    <th>变动</th>
  </tr>`;

  balanceList.map(m => {
    html += `<tr>
  <th>${dateToString(m.time)}</th>
  <td>${toValue(m.balance.toString(), 12)}</td>
  <td>${add}</td>
</tr>`;
  });
  html += "</table";

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