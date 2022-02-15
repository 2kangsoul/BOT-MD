/**
* Please Jangan Di Hapus Info Dan Tq To Nya
**/

/**
* Create By Zero YT7
* Contact Me on wa.me/6285157740529
* Follow Me On All Sosial Media
* Instagram : @Zero_YT7
* Tiktok : @_zeroyt7
* Github : Zero-YT7
* Youtube : Zero YT7
**/

/**
* Thanks To
* Allah S.W.T
* Ortu
* Zero YT7
* Dhika Ardiant
* All Creator Bot
* All Subscriber Ku
**/

require('./command/config')
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage } = require("@adiwajshing/baileys-md")
const { state, saveState } = useSingleFileAuthState(`./session/qrnya.json`)
const pino = require('pino')
const fs = require('fs')
const moment = require('moment-timezone')
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./message/exif')
const { smsg, getBuffer, isUrl, generateMessageTag } = require('./message/myfunc')

//━━━━━━━━━━━━━━━[ GLOBAL API ]━━━━━━━━━━━━━━━━━//

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

//━━━━━━━━━━━━━━━[ CONNECTION ]━━━━━━━━━━━━━━━━━//

async function startzeroyt7() {
const zeroyt7 = makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['Zero YT7 Multi Device','Safari','1.0.0'],
auth: state
})

//━━━━━━━━━━━━━━━[ CHAT UPDATE ]━━━━━━━━━━━━━━━━━//

zeroyt7.ev.on('messages.upsert', async chatUpdate => {
//console.log(JSON.stringify(chatUpdate, undefined, 2))
try {
zero = chatUpdate.messages[0]
if (!zero.message) return
zero.message = (Object.keys(zero.message)[0] === 'ephemeralMessage') ? zero.message.ephemeralMessage.message : zero.message
if (zero.key && zero.key.remoteJid === 'status@broadcast') return
if (!zeroyt7.public && !zero.key.fromMe && chatUpdate.type === 'notify') return
if (zero.key.id.startsWith('BAE5') && zero.key.id.length === 16) return
m = smsg(zeroyt7, zero)
require("./command/zeroyt7")(zeroyt7, m, chatUpdate)
} catch (err) {
console.log(err)
}
})

zeroyt7.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await zeroyt7.groupMetadata(anu.id)
memeg = metadata.participants.length;
let participants = anu.participants
const jamnyy = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
/*num = anu.participants[0];
let v = zeroyt7.contacts[num] || { notify: num.replace(/@.+/, "") };
anu_user = v.vname || v.notify || num.split("@")[0];*/
for (let num of participants) {
try {
ppuser = await zeroyt7.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
try {
ppgroup = await zeroyt7.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
let buffu = Buffer.isBuffer(ppuser) ? ppuser : /^data:.*?\/.*?;base64,/i.test(ppuser) ? Buffer.from(ppuser.split`,`[1], 'base64') : /^https?:\/\//.test(ppuser) ? await (await fetch(ppuser)).buffer() : fs.existsSync(ppuser) ? fs.readFileSync(ppuser) : Buffer.alloc(0)
			 
let biffu = await getBuffer(ppgroup)
			 
if (anu.action == 'add') {
teks = `Welcome To *${metadata.subject}* @${num.split("@")[0]}
Silahkan Intro Dulu Kak😇

🌍Nama :
🗺Umur :
☎Asal Kota :
📦Gender :

Semoga Betah Ya Kak
Jangan Lupa Patuhi Rules Groupnya`
var buatpesan = generateWAMessageFromContent(m.chat, {
"templateMessage": {
"hydratedTemplate": {
"locationMessage": {
"degreesLatitude": 0,
"degreesLongitude": 0,
"jpegThumbnail": buffu
},
"hydratedContentText": teks,
"hydratedFooterText": `©𝑪𝒓𝒆𝒂𝒕𝒆𝒅 𝑩𝒚 ٬࿊⃟𝑮𝒂𝒗𝒖𝒆𝒍'𝒔シ`,
"hydratedButtons": [
{
"urlButton": {
"displayText": "My Instagram",
"url": `https://www.instagram.com/2kangsoul_/`
}
},
{
"urlButton": {
"displayText": "Facebok",              
"url": `https://www.facebook.com/Alyssaexct/`

}
},
{
"quickReplyButton": {
"displayText": "Status Bot",
"id": 'ping'
}
},
{
"quickReplyButton": {
"displayText": "Owner",
"id": 'owner'
}
},
{
"quickReplyButton": {
"displayText": "Script",
"id": 'sc'
}
}
]
}
}
}, {contextInfo: { mentionedJid: [num] }})
 zeroyt7.relayMessage(anu.id, buatpesan.message, { messageId: buatpesan.key.id })
}
else if (anu.action == 'remove') {
var outt = `Yah Kok Keluar Dari *${metadata.subject}*, Sayonara @${num.split("@")[0]} :(`
var buatpesan = generateWAMessageFromContent(m.chat, {
"templateMessage": {
"hydratedTemplate": {
"locationMessage": {
"degreesLatitude": 0,
"degreesLongitude": 0,
"jpegThumbnail": buffu
},
"hydratedContentText": outt,
"hydratedFooterText": `©𝑪𝒓𝒆𝒂𝒕𝒆𝒅 𝑩𝒚 ٬࿊⃟𝑮𝒂𝒗𝒖𝒆𝒍'𝒔シ`,
"hydratedButtons": [
{
"urlButton": {
"displayText": "Rest Api's",
"url": `https://zeroyt7-api.xyz`
}
},
{
"urlButton": {
"displayText": "Web Olshop",              
"url": `https://zeroyt7.xyz`

}
},
{
"quickReplyButton": {
"displayText": "Status Bot",
"id": 'ping'
}
},
{
"quickReplyButton": {
"displayText": "Owner",
"id": 'owner'
}
},
{
"quickReplyButton": {
"displayText": "Script",
"id": 'sc'
}
}
]
}
}
}, {contextInfo: { mentionedJid: [num] }})
zeroyt7.relayMessage(anu.id, buatpesan.message, { messageId: buatpesan.key.id })
}
}
} catch (err) {
console.log(err)
}
})

//━━━━━━━━━━━━━━━[ SETTING ]━━━━━━━━━━━━━━━━━//

zeroyt7.public = true

zeroyt7.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startzeroyt7() : console.log('Koneksi Terputus...')
}
console.log('Koneksi Terhubung...', update)
})

zeroyt7.ev.on('creds.update', saveState)

//━━━━━━━━━━━━━━━[ ADD OTHER ]━━━━━━━━━━━━━━━━━//

/**
* 
* @param {*} jid 
* @param {*} text 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendText = (jid, text, quoted = '', options) => zeroyt7.sendMessage(jid, { text: text, ...options }, { quoted })

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} caption 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await zeroyt7.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} caption 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await zeroyt7.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} quoted 
* @param {*} mime 
* @param {*} options 
* @returns 
*/
zeroyt7.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await zeroyt7.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} text 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendTextWithMentions = async (jid, text, quoted, options = {}) => zeroyt7.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await zeroyt7.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await zeroyt7.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
	
/**
* 
* @param {*} message 
* @param {*} filename 
* @param {*} attachExtension 
* @returns 
*/
zeroyt7.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}
    
/**
* 
* @param {*} jid 
* @param {*} path 
* @param {*} quoted 
* @param {*} options 
* @returns 
*/
zeroyt7.sendMedia = async (jid, path, quoted, options = {}) => {
let { ext, mime, data } = await zeroyt7.getFile(path)
messageType = mime.split("/")[0]
pase = messageType.replace('application', 'document') || messageType
return await zeroyt7.sendMessage(m.chat, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
}

/**
* 
* @param {*} jid 
* @param {*} message 
* @param {*} forceForward 
* @param {*} options 
* @returns 
*/
zeroyt7.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}

let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await zeroyt7.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

/**
* 
* @param {*} path 
* @returns 
*/
zeroyt7.getFile = async (path) => {
let res
let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}

return {
res,
...type,
data
}
}

return zeroyt7
}

startzeroyt7()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})