//import moment from 'moment';

import RNFetchBlob from 'rn-fetch-blob';
var GLOBAL = require('./global');

class DAL {
    async writeFile(path, content) {
        const dirs = RNFetchBlob.fs.dirs;
        var write = await RNFetchBlob.fs.writeFile(
            dirs.MainBundleDir + '/' + path,
            content,
            'utf8',
        );
        return write;
    }
    async getFile(path) {
        const dirs = RNFetchBlob.fs.dirs;
        var get = await RNFetchBlob.fs.readFile(
            dirs.MainBundleDir + '/' + path,
            'utf-8',
        );
        return get;
    }
    async checkFile(path) {
        const dirs = RNFetchBlob.fs.dirs;
        var check = await RNFetchBlob.fs.exists(
            dirs.MainBundleDir + '/' + path,
        );
        return check;
    }
    async resolveStartUrl(path) {
        return fetch(path)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }
    async getLoginSettings(path) {
        return fetch(
            GLOBAL.HTTPvsHTTPS +
                'authorize.akamaized.net/mappings/' +
                path +
                '/settings/settings.json?time=' +
                moment().unix(),
        )
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }
    async checkLoginServices(path) {
        return fetch(
            GLOBAL.HTTPvsHTTPS +
                'authorize.akamaized.net/mappings/' +
                path +
                '/settings/services.json?time=' +
                moment().unix(),
            {method: 'HEAD'},
        )
            .then(res => {
                if (res.ok) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(error => {
                return false;
            });
    }
    async getLoginServices(path) {
        var path =
            GLOBAL.HTTPvsHTTPS +
            'authorize.akamaized.net/mappings/' +
            path +
            '/settings/services.json?time=' +
            moment().unix();
        return fetch(path)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }
    async getGuiSettings(path) {
        return fetch(path)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }
    async getUserHash(path) {
        return fetch(
            GLOBAL.HTTPvsHTTPS +
                'authorize.akamaized.net/encrypt.php?CID=' +
                path +
                '&time=' +
                moment().unix(),
            {
                cors: 'no-cors',
            },
        )
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }

    async getUserToken(hash) {
        return fetch(
            GLOBAL.HTTPvsHTTPS +
                'authorize.akamaized.net/login.php?CID=' +
                hash +
                '&time=' +
                moment().unix(),
            {
                cors: 'no-cors',
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    getStreamToken = async Url => {
        const response = await fetch(
            GLOBAL.HTTPvsHTTPS +
                'authorize.akamaized.net/encrypt.php?CID=' +
                Url,
            {
                cors: 'no-cors',
            },
        ).catch(error => {});
        const json = await response.json();
        return json;
    };
    getDataToken = async (Url, Token) => {
        const url = 'path=' + Url + '~token=' + Token;
        const response = await fetch(
            GLOBAL.HTTPvsHTTPS +
                'authorize.akamaized.net/encrypt.php?CID=' +
                url +
                '&time=' +
                moment().unix(),
            {
                cors: 'no-cors',
            },
        ).catch(error => {});
        const json = await response.json();
        return json;
    };

    getData = async hash => {
        const response = await fetch(
            GLOBAL.HTTPvsHTTPS +
                'cloudtv.akamaized.net/getfile.php?CID=' +
                hash +
                '&time=' +
                moment().unix(),
            {
                cors: 'no-cors',
            },
        ).catch(error => {});
        const json = await response.json();
        return json;
    };

    async getLocation(ip) {
        return fetch(
            'https://pro.ip-api.com/json/' + ip + '?key=orgpVdNotmSbX4q',
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }

    getDevices = async (collections, documents) => {
        return fetch(
            'https://devices.tvms.io/getdevice?collection_key=' +
                collections +
                '&document_key=' +
                documents,
            {
                method: 'GET',
                cors: 'no-cors',
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {
                return {devices: undefined};
            });
    };
    setDevices = async (collections, documents, devices) => {
        return fetch('https://devices.tvms.io/setdevice', {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collection_key: collections,
                document_key: documents,
                document_data: {
                    devices: devices,
                },
            }),
        }).catch(error => {});
    };
    getProfile = async (collections, documents) => {
        return fetch(
            'https://devices.tvms.io/getprofile?collection_key=' +
                collections +
                '&document_key=' +
                documents,
            {
                method: 'GET',
                cors: 'no-cors',
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {
                return {profile: undefined};
            });
    };
    setProfile = async (collections, documents, profiles) => {
        return fetch('https://devices.tvms.io/setprofile', {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collection_key: collections,
                document_key: documents,
                document_data: {
                    profile: profiles,
                },
            }),
        }).catch(error => {});
    };
    setMessage = async () => {
        var path = 'https://messaging.tvms.io/setmessage';
        return fetch(path, {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: GLOBAL.UserID,
                password: GLOBAL.Pass,
                crm: GLOBAL.CRM,
                ims: GLOBAL.IMS,
                message: {
                    content:
                        'Your subscription is about to expire, use the QR code to renew today.',
                    hyperlink: 'https://google.com',
                    subject: 'Renew your subscription',
                    timestamp: moment().unix(),
                    type: 'Warning',
                },
            }),
        }).catch(error => {});
    };
    getMessages = async (ims, crm, username, password) => {
        var path =
            'https://messaging.tvms.io/getmessages?ims=' +
            ims +
            '&crm=' +
            crm +
            '&username=' +
            username +
            '&password=' +
            password;
        return fetch(path, {
            method: 'GET',
            cors: 'no-cors',
        })
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {
                return {messages: null};
            });
    };
    deleteMessage = async (ims, crm, username, password, index) => {
        var path =
            'https://messaging.tvms.io/deletemessage?id=' +
            index +
            '&ims=' +
            ims +
            '&crm=' +
            crm +
            '&username=' +
            username +
            '&password=' +
            password;
        return fetch(path, {
            method: 'GET',
            cors: 'no-cors',
        })
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {
                return {messages: []};
            });
    };
    async setProblemReportContent(type, name, content_id, desc) {
        return fetch(
            GLOBAL.Settings_Gui.style.web_api_location +
                '/reporting/SetProblem?boxMac=' +
                encodeURI(GLOBAL.Device_UniqueID) +
                '&type=' +
                encodeURI(type) +
                '&name=' +
                encodeURI(name) +
                '&description=' +
                encodeURI(desc) +
                '&itemId=' +
                content_id +
                '&cmsService=' +
                GLOBAL.CMS +
                '&crmService=' +
                GLOBAL.CRM +
                '&city=' +
                encodeURI(GLOBAL.City) +
                '&state=' +
                encodeURI(GLOBAL.State) +
                '&country=' +
                encodeURI(GLOBAL.Country) +
                '&userid=' +
                GLOBAL.UserID +
                '&pass=' +
                encodeURI(GLOBAL.Pass),
            {
                cors: 'no-cors',
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    getRealValue(key, content_id, content_price, content_name) {
        switch (key) {
            case 'userid':
                return encodeURI(GLOBAL.UserID);
                break;
            case 'password':
                return encodeURI(GLOBAL.Pass);
                break;
            case 'content_id':
                return content_id;
                break;
            case 'content_name':
                return encodeURI(content_name);
                break;
            case 'content_price':
                return encodeURI(content_price);
                break;
            case 'city':
                return encodeURI(GLOBAL.City);
                break;
            case 'country':
                return encodeURI(GLOBAL.Country);
                break;
            case 'state':
                return encodeURI(GLOBAL.State);
                break;
            case 'uuid':
                return GLOBAL.Device_UniqueID;
                break;
            case 'cms':
                return encodeURI(GLOBAL.CMS);
                break;
            case 'crm':
                return encodeURI(GLOBAL.CRM);
                break;
        }
    }
    validatePayPerView(
        type,
        content_id,
        content_price,
        content_name,
        payment_type,
        backdrop,
        poster,
    ) {
        var api = GLOBAL.Product.api_details.find(u => u.api_type == type);
        if (api != undefined && api != '') {
            var url = api.base_url;
            var params = '?';
            api.keys.forEach(element => {
                params +=
                    element.key_name +
                    '=' +
                    this.getRealValue(
                        element.key_value,
                        content_id,
                        content_price,
                        content_name,
                    ) +
                    '&';
            });
            url += params.slice(0, -1);
            return fetch(url)
                .then(response => {
                    const statusCode = response.status;
                    var code = api.success_code.split(' ');
                    if (statusCode == code[0]) {
                        return this.setPayPerView(
                            content_id,
                            type,
                            payment_type,
                        );
                    } else {
                        return false;
                    }
                })
                .catch(error => {
                    return false;
                });
        } else {
            return false;
        }
    }
    setPayPerView(content_id, type, payment_type) {
        var url =
            GLOBAL.Settings_Gui.style.web_api_location +
            '/device/setPayPerView_v2?userid=' +
            encodeURI(GLOBAL.UserID) +
            '&password=' +
            encodeURI(GLOBAL.Pass) +
            '&content_id=' +
            content_id +
            '&content_type=' +
            type.toLowerCase() +
            '&payment_type=' +
            payment_type +
            '&cmsService=' +
            GLOBAL.CMS +
            '&crmService=' +
            GLOBAL.CRM;
        return fetch(url, {
            cors: 'no-cors',
        })
            .then(response => {
                return true;
            })
            .catch(error => {
                return true;
            });
    }
    async setRecording(channel_id, e, s, program_name) {
        e = e + GLOBAL.Catchup_DVR_Offset;
        s = s - GLOBAL.Catchup_DVR_Offset;
        var url =
            GLOBAL.Settings_Gui.style.web_api_location +
            '/device/setCloudPVR?userid=' +
            encodeURI(GLOBAL.UserID) +
            '&password=' +
            encodeURI(GLOBAL.Pass) +
            '&channel_id=' +
            channel_id +
            '&progam_name=' +
            encodeURI(program_name) +
            '&ut_start=' +
            s +
            '&ut_end=' +
            e +
            '&cmsService=' +
            GLOBAL.CMS +
            '&crmService=' +
            GLOBAL.CRM;
        return fetch(url, {
            cors: 'no-cors',
        })
            .then(response_ => response_.json())
            .then(responseJson_ => {
                if (responseJson_ == 'Not Approved') {
                    return 'Not Approved';
                } else {
                    this.getAccessToken();
                }
            })
            .catch(error => {});
    }
    getAccessToken() {
        var splitUserId = GLOBAL.UserID.split('');
        var joinedUserId = splitUserId.join('/');
        var path =
            '/' +
            GLOBAL.IMS +
            '/customers/' +
            joinedUserId +
            '/' +
            encodeURI(GLOBAL.Pass) +
            '.json';
        this.getUserHash(path)
            .then(data => {
                this.getUserToken(data.CID)
                    .then(token => {
                        if (token != undefined) {
                            if (!token.CID) {
                            } else {
                                GLOBAL.USER_TOKEN = token.CID;
                                this.getUser(token.CID);
                            }
                        }
                    })
                    .catch(error => {});
            })
            .catch(error => {});
    }
    getUser(token) {
        var splitUserId = GLOBAL.UserID.split('');
        var joinedUserId = splitUserId.join('/');
        var path =
            '/' +
            GLOBAL.IMS +
            '/customers/' +
            joinedUserId +
            '/' +
            encodeURI(GLOBAL.Pass) +
            '.json';
        this.getDataToken(path, token)
            .then(data => {
                this.getData(data.CID)
                    .then(user => {
                        user = JSON.parse(user);
                        GLOBAL.User = user;
                        GLOBAL.ProductID = user.products.productid;
                        GLOBAL.ResellerID = user.account.resellerid;
                        GLOBAL.Recordings = user.recordings;
                        GLOBAL.Storage_Total = user.storage.total;
                        GLOBAL.Storage_Used = user.storage.used;
                        GLOBAL.PPV = user.payperview;
                        GLOBAL.Wallet_Credits = user.customer.walletbalance;
                    })
                    .catch(error => {});
            })
            .catch(error => {});
    }
    async deleteRecording(item_id) {
        var url =
            GLOBAL.Settings_Gui.style.web_api_location +
            '/device/deleteCloudPVR?userid=' +
            encodeURI(GLOBAL.UserID) +
            '&password=' +
            encodeURI(GLOBAL.Pass) +
            '&item_id=' +
            item_id +
            '&cmsService=' +
            GLOBAL.CMS +
            '&crmService=' +
            GLOBAL.CRM;
        return fetch(url)
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async registerDevice() {
        return fetch(
            GLOBAL.Settings_Login.web_api_location +
                '/device/addDevice?userId=' +
                encodeURI(GLOBAL.UserID) +
                '&password=' +
                encodeURI(GLOBAL.Pass) +
                '&uuid=' +
                encodeURI(GLOBAL.Device_UniqueID) +
                '&model=' +
                encodeURI(GLOBAL.Device_Model) +
                '&cmsService=' +
                GLOBAL.CMS +
                '&crmService=' +
                GLOBAL.CRM,
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }

    async registerCustomer(
        productid,
        firstname,
        lastname,
        password,
        userid,
        sendMail,
        sendSMS,
        email,
        mobile,
    ) {
        var path =
            GLOBAL.Settings_Login.web_api_location +
            '/CustomerProfile/AddCustomerWithDeviceAsync?userid=' +
            encodeURI(userid) +
            '&password=' +
            encodeURI(password) +
            '&uuid=' +
            encodeURI(GLOBAL.Device_UniqueID) +
            '&model=' +
            encodeURI(GLOBAL.Device_Model) +
            '&cmsService=' +
            GLOBAL.CMS +
            '&crmService=' +
            GLOBAL.CRM +
            '&city=' +
            encodeURI(GLOBAL.City) +
            '&country=' +
            encodeURI(GLOBAL.Country) +
            '&state=' +
            encodeURI(GLOBAL.State) +
            '&productid=' +
            productid +
            '&firstname=' +
            encodeURI(firstname) +
            '&lastname=' +
            encodeURI(lastname) +
            '&mobile=' +
            encodeURI(mobile) +
            '&email=' +
            encodeURI(email) +
            '&StartSubscriptionFromFirstLogin=false&sendSMS=' +
            sendSMS +
            '&sendMail=' +
            sendMail;
        return fetch(path)
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async addProfile(name, mode) {
        var body = JSON.stringify({
            userid: GLOBAL.UserID,
            password: GLOBAL.Pass,
            crmService: GLOBAL.CRM,
            cmsService: GLOBAL.CMS,
            name: name,
            mode: mode,
            avatar: '',
        });
        return await fetch(
            GLOBAL.Settings_Login.web_api_location +
                '/CustomerProfile/AddCustomerProfile?datas=' +
                encodeURI(body),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async editProfile(name, mode, profile_id) {
        var body = JSON.stringify({
            userid: GLOBAL.UserID,
            password: GLOBAL.Pass,
            crmService: GLOBAL.CRM,
            cmsService: GLOBAL.CMS,
            profile_id: profile_id,
            name: name,
            mode: mode,
            avatar: '',
        });
        return await fetch(
            GLOBAL.Settings_Login.web_api_location +
                '/CustomerProfile/EditCustomerProfile?datas=' +
                encodeURI(body),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async deleteProfile(profile_id) {
        var body = JSON.stringify({
            userid: GLOBAL.UserID,
            password: GLOBAL.Pass,
            crmService: GLOBAL.CRM,
            cmsService: GLOBAL.CMS,
            profile_id: profile_id,
        });
        return await fetch(
            GLOBAL.Settings_Login.web_api_location +
                '/CustomerProfile/DeleteCustomerProfile?datas=' +
                encodeURI(body),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async addRecommendation(tags) {
        var body = JSON.stringify({
            userid: GLOBAL.UserID,
            password: GLOBAL.Pass,
            profile_id: GLOBAL.ProfileID,
            recommendations: tags,
            crmService: GLOBAL.CRM,
            cmsService: GLOBAL.CMS,
        });

        return await fetch(
            GLOBAL.Settings_Login.web_api_location +
                '/CustomerProfile/AddCustomerRecommendation?datas=' +
                encodeURI(body),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async forgotPassword(type, email, user, mac) {
        var path =
            GLOBAL.Settings_Login.web_api_location +
            '/device/getUserLogin?sendtype=' +
            type +
            '&crmService=' +
            GLOBAL.CRM +
            '&cmsService=' +
            GLOBAL.CMS +
            '&deviceType=' +
            GLOBAL.Device_Type +
            '&deviceModel=' +
            encodeURI(GLOBAL.Device_Model) +
            '&macaddress=&userid=' +
            encodeURI(GLOBAL.UserID) +
            '&email=';
        return fetch(path)
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async requestAdInformation(id) {
        return fetch(
            GLOBAL.Settings_Login.web_api_location +
                '/reporting/requestInformation?campaignId=' +
                id +
                '&crmService=' +
                GLOBAL.CRM +
                '&cmsService=' +
                GLOBAL.CMS +
                '&city=' +
                GLOBAL.City +
                '&country=' +
                GLOBAL.Country +
                '&boxMac=' +
                encodeURI(GLOBAL.Device_UniqueID) +
                '&userid=' +
                encodeURI(GLOBAL.UserID) +
                '&state=' +
                GLOBAL.State,
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async getHomeScreenDuoAds() {
        return fetch(
            GLOBAL.Settings_Gui.style.web_api_location +
                '/advertisement/gethomescreenadvertisementduo?orientation=vertical&userId=' +
                GLOBAL.UserID +
                '&resellerId=' +
                GLOBAL.ResellerID +
                '&deviceModel=' +
                GLOBAL.Device_Model +
                '&cmsService=' +
                GLOBAL.CMS +
                '&crmService=' +
                GLOBAL.CRM +
                '&city=' +
                GLOBAL.City +
                '&state=' +
                GLOBAL.State +
                '&country=' +
                GLOBAL.Country,
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async getHomeScreenAds(orientation) {
        return fetch(
            GLOBAL.Settings_Gui.style.web_api_location +
                '/advertisement/gethomescreenadvertisement?orientation=' +
                orientation +
                '&userId=' +
                GLOBAL.UserID +
                '&resellerId=' +
                GLOBAL.ResellerID +
                '&deviceModel=' +
                GLOBAL.Device_Model +
                '&cmsService=' +
                GLOBAL.CMS +
                '&crmService=' +
                GLOBAL.CRM +
                '&city=' +
                GLOBAL.City +
                '&state=' +
                GLOBAL.State +
                '&country=' +
                GLOBAL.Country,
        )
            .then(response_ => response_.json())
            .then(responseJson_ => {
                return responseJson_;
            })
            .catch(error => {});
    }
    async getAdvertisement(path) {
        return fetch(path)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }
    getYoutube = async path => {
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).catch(error => {});
        const json = await response._bodyInit;
        return json;
    };
    async getText(path) {
        return fetch(path, {
            method: 'GET',
        })
            .then(response => response.text())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }

    async getJson(path) {
        var myHeaders = new Headers();
        if (GLOBAL.Device_IsWebTV == false) {
            myHeaders.set(
                'Cache-Control',
                'no-cache, no-store, must-revalidate',
            );
            myHeaders.set('Pragma', 'no-cache, no-store');
            myHeaders.set('Cache', 'no-store, no-cache');
            myHeaders.set('Expires', 0);
            myHeaders.set('Accept-Encoding', 'gzip;q=1.0, compress;q=0.5');
        }
        try {
            const jsonCall = await fetch(path, {
                method: 'GET',
                headers: myHeaders,
            });
            const json_ = await jsonCall;
            return json_.json();
        } catch (err) {}
    }

    async setReportLogs(message) {
        var report = {
            date: moment().unix() * 1000,
            date_str: moment().format('yyyy-mm-dd'),
            message: JSON.stringify(message),
            level: 'info',
            client: GLOBAL.Settings_Gui.client,
            cms: GLOBAL.CMS,
            crm: GLOBAL.CRM,
            uuid: GLOBAL.Device_UniqueID,
            user_id: GLOBAL.UserID,
            user_password: GLOBAL.Pass,
            device_type: GLOBAL.Device_Type,
        };
    }
    async setReportFinancial(message) {
        var report = {
            date: moment().unix() * 1000,
            date_str: moment().format('yyyy-mm-dd'),
            message: JSON.stringify(message),
            level: 'info',
            client: GLOBAL.Settings_Gui.client,
            cms: GLOBAL.CMS,
            crm: GLOBAL.CRM,
            uuid: GLOBAL.Device_UniqueID,
            user_id: GLOBAL.UserID,
            user_password: GLOBAL.Pass,
            device_type: GLOBAL.Device_Type,
        };
    }

    async getWeather() {
        var path =
            'https://www.worldweatheronline.com/feed/premium-weather-v2.ashx?q=' +
            GLOBAL.User.customer.city +
            '&date=today&key=a7a4a251cb125437120110&feedKey=887d9c34f8125518120110&format=json';
        return fetch(path)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {});
    }
}
const dal = new DAL();
export default dal;
