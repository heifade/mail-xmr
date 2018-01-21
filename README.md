mail-xmr


[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build Status](https://travis-ci.org/heifade/mail-xmr.svg?branch=master)](https://travis-ci.org/heifade/mail-xmr)
[![Coverage Status](https://coveralls.io/repos/github/heifade/mail-xmr/badge.svg?branch=master)](https://coveralls.io/github/heifade/mail-xmr?branch=master)

[npm-image]: https://img.shields.io/npm/v/mail-xmr.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mail-xmr
[downloads-image]: https://img.shields.io/npm/dm/mail-xmr.svg

# 源代码及文档
[源代码](https://github.com/heifade/mail-xmr)
[开发文档](https://heifade.github.io/mail-xmr/)

# 安装
```bash
npm install mail-xmr
```

# 介绍


# 例子1：
```bash
每隔1分钟获取一下XMR的信息发邮件给指定邮箱
mail-xmr -f 发件人邮箱 -t 收件人邮箱 -p 发件人邮箱密码 -n 60 -u XMR情况 -d XXXXXXXXXXXXXXXXX
```

# 参数：
```bash
-f 发件人邮箱
-t 收件人邮箱
-p 发件人邮箱密码
-s 发件人邮件服务器地址 smtp.qq.com
-o 发件人邮件服务器端口
-n 间隔时长（隔多长时间获取一下XMR的情况）,单位秒
-u 邮件主题
-d XMR地址
```