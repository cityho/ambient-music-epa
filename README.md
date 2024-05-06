## PAT 생성하기

1. token 발급용 사이트에 접속한다.
https://account.smartthings.com/tokens
2. 삼성계정에 로그인한다. (혹시 이미 다른 계정으로 로그인이 되있다면 로그아웃 후 진행해야 함)
3. `GENERATE NEW TOKEN`을 선택한다.
4. `Token Name`을 입력한다. (특별한 제약은 없으며, 다른 토큰과 구분될 수 있도록 한다.)
5. 사용할 권한을 선택한다.
6. Token을 복사해서, 안전하게 잘 보관한다. (이때 복사하지 않으면 다시 확인할 방법이 없다!)

### Reference
https://account.smartthings.com/tokens
https://developer-preview.smartthings.com/docs/advanced/authorization-and-permissions

## Light Onboarding
1. WWST(Works With SmartThings) 기기인지 확인한다.
2. 기기 온보딩 (클라우드 등록)을 진행한다.
- 22년 Samsung TV + Dongle / 23년 TV Smartthings앱에서 zigbee 조명과 같은 small things에 대한 온보딩 가능
- Samsung 갤럭시 Smartthings앱 + Smartthings Hub v3 로 온보딩 가능
- 온보딩이 완료되면 Smartthings 앱에 기기 카드가 나타나고 기기 컨트롤이 가능

## 기기 제어
1. curl / postman / smartthings-cli 등을 통해 기기 정보를 얻는다.
- 기기 목록 얻기
```
curl -H "Authorization: Bearer {{your PAT token here}}" -X GET https://api.smartthings.com/devices -v
```
- 특정 기기 정보 얻기
```
curl -H "Authorization: Bearer {{your PAT token here}}" -X GET https://api.smartthings.com/devices/{{your deviceId}} -v
```
- 특정 기기 상태 얻기
```
curl -H "Authorization: Bearer {{your PAT token here}}" -X GET https://api.smartthings.com/devices/{{your deviceId}}/status –v
```
- 특정 기기의 capability 상태 얻기
```
curl -H "Authorization: Bearer {{your PAT token here}}" -X GET https://api.smartthings.com/devices/{{your deviceId}}/components/{{your componentId}}/capabilities/{{your capabilityId}}/status
```

- sample
```
{
            "deviceId": "a800f06f-f1aa-4014-8b21-9b72ec129062",
            "name": "Light",
            "label": "Light2",
            "manufacturerName": "SmartThings",
            "presentationId": "SmartThings-smartthings-ZigBee_RGBW_Bulb",
            "deviceManufacturerCode": "IKEA of Sweden",
            "locationId": "98420d90-89f9-49a6-892f-ec71f9b6c8f5",
            "roomId": "32db27b6-8377-4d89-8e51-c1d6103fbf1b",
            "deviceTypeId": "479a0628-421e-426c-914d-3f16dacd3095",
            "deviceTypeName": "ZigBee RGBW Bulb",
            "deviceNetworkType": "ZIGBEE",
            "components": [
                {
                    "id": "main",
                    "label": "Light",
                    "capabilities": [
                        {
                            "id": "switch",
                            "version": 1
                        },
                        {
                            "id": "configuration",
                            "version": 1
                        },
                        {
                            "id": "switchLevel",
                            "version": 1
                        },
                        {
                            "id": "refresh",
                            "version": 1
                        },
                        {
                            "id": "colorControl",
                            "version": 1
                        },
                        {
                            "id": "actuator",
                            "version": 1
                        },
                        {
                            "id": "colorTemperature",
                            "version": 1
                        },
                        {
                            "id": "healthCheck",
                            "version": 1
                        },
                        {
                            "id": "light",
                            "version": 1
                        }
                    ],
                    "categories": [
                        {
                            "name": "Light",
                            "categoryType": "manufacturer"
                        },
                        {
                            "name": "Light",
                            "categoryType": "manufacturer"
                        }
                    ]
                }
            ],

```
2. 기기정보와 기기 capability 를 이용해 기기제어가 가능한다.
- 특정기기의 상태 변경하기 (main - switch가 존재하는 기기)
```
curl -XPOST -H "Content-Type: application/json" -H "Authorization: Bearer {{your PAT token here}}" "https://api.smartthings.com/devices/{{your deviceId here}}/commands" -d "{\"commands\":[{\"component\":\"main\",\"capability\":\"switch\",\"command\":\"on\",\"arguments\":[]}]}"
```


## Ambient Music 실행하기

1. `npm install` 을 실행하여 라이브러리 설치
2. `node ./src/index.js` 를 실행하여 서버 실행


## References
### SmartThigns Developer Workspace
https://smartthings.developer.samsung.com/workspace/

### SmartThings Developers
https://developer-preview.smartthings.com/

### SmartApp(EndpointApp) Document
https://developer-preview.smartthings.com/docs/connected-services/smartapp-basics

### SmartThings SDK docs
https://github.com/SmartThingsCommunity/smartapp-sdk-nodejs/blob/master/docs/index.md

### SmartThings API
https://developer-preview.smartthings.com/docs/api/public

### Devices
- Get Devices : https://developer-preview.smartthings.com/docs/api/public#tag/Devices
- Get the Full status of a Device : https://developer-preview.smartthings.com/docs/api/public#operation/getDeviceStatus
- Execute Command : https://developer-preview.smartthings.com/docs/api/public#operation/executeDeviceCommands

### SmartThings CLI
https://github.com/SmartThingsCommunity/smartthings-cli

