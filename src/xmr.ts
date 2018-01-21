import { get } from "./util/ask";

export async function getXmrBalance(xmrBaseAddress: string): Promise<number> {
  let res = await get(`https://p5.minexmr.com/stats_address?address=${xmrBaseAddress}&longpoll=false`, null);

  return res.stats.balance;
}

export function toValue(str: string, len: number) {
  let strLen = str.length;
  if (strLen <= len) {
    while (str.length < len) {
      str = "0" + str;
    }
    return `0.${str}`;
  } else {
    return `${str.substr(0, strLen - len)}.${str.substr(strLen - len)}`;
  }
}

// getXMRInfo('41zf2aUR75LJDM2Vz3ee3i1eRssK97F4aRbxCpViBF5n6GjvMNKqvMVF93yZ57Q89Q3mSCzHS5x9zEP258R9ooaQAeTWwAa').then(v => {
//   console.log(v);
// })

// console.log(toValue('3279', 12));
// console.log(toValue('1', 12));
// console.log(toValue('12', 12));
// console.log(toValue('123', 12));
// console.log(toValue('1234', 12));
// console.log(toValue('12345', 12));
// console.log(toValue('123456', 12));
// console.log(toValue('1234567', 12));
// console.log(toValue('12345678', 12));
// console.log(toValue('123456789', 12));
// console.log(toValue('1234567890', 12));
// console.log(toValue('12345678901', 12));
// console.log(toValue('123456789012', 12));
// console.log(toValue('1234567890123', 12));
// console.log(toValue('12345678901234', 12));
// console.log(toValue('123456789012345', 12));
