
export interface Config {

	

	jwtSecret: string
	defaultAvatar: string

	
	qiniu: {
		accessKey: string
    secretKey: string
    bucket: string
    url: string
	}
	alicloud: {
		accessKeyId: string
		secretAccessKey: string
		sms: {
			signName: string
			templateCode: string
		}
		push: {
			androidAppKey: string
			iOSAppKey: string
		}
	}
	
	baidu?: {
		appKey: string
		appSecret: string
	}
	IPWhitelist: Array<string>
}

let config:Config = {

	// jwt配置 [必填，建议修改]
	// https://github.com/hokaccha/node-jwt-simple
	jwtSecret: 'jwt_secret_express_sports',
	// 默认用户头像
	defaultAvatar: '//img.xiaoduyu.com/default_avatar.jpg',

	// 上传头像、图片文件到七牛 [必填, 否则将不支持图片上传]
	qiniu: {
		accessKey: '',
    secretKey: '',
    bucket: '',
    // 七牛的资源地址
    url: '//img.xiaoduyu.com'
	},
	
	// 阿里云
	alicloud: {
		accessKeyId: '',
		secretAccessKey: '',
		// 短信服务
		sms: {
			// 短信签名
			signName: '小度鱼',
			// 短信模版CODE
			templateCode: ''
		},
		push: {
			androidAppKey: '',
			iOSAppKey: ''
		}
	},


	// 百度，文本审核
	baidu: {
		appKey: '',
		appSecret: ''
	},

	// ip白名单，用于跳过每小时1500次请求的限制
	IPWhitelist: ['::1','::ffff:127.0.0.1','::ffff:192.168.1.4']

}

if (process.env.NODE_ENV == 'development') {

}

export default config;
