/* tslint:disable */
/* eslint-disable */
/**
 * Wowza Video REST API Reference Documentation
 * API lifecycle phase: [Current](https://www.wowza.com/docs/wowza-video-rest-api-lifecycle-management#api-lifecycle0)   <table> <tr style=\"background-color:lightgrey;\"><td> <strong>Want to take the API for a test run?</strong>  All you\'ll need is a [Wowza Video subscription](https://www.wowza.com/pricing), or [free trial](https://www.wowza.com/free-trial), for the API access token. Then, fork [our collection in Postman](https://www.postman.com/wowzavideo/workspace/wowza-video-rest-api) and you\'ll be making calls to our REST API in minutes!  See [Trial the Wowza Video REST API using Postman](https://www.wowza.com/docs/trial-the-wowza-video-rest-api-using-postman) for more information. </td> </tr> <table>    # About the REST API  ___  The Wowza Video<sup>TM</sup> REST API allows you to add live streaming and playback functionality to your applications. It offers complete programmatic control over live streams, transcoders, stream sources, and stream targets. Anything you can do in the Wowza Video UI can also be achieved by making HTTP-based requests to cloud-based servers through the REST API.   ## CORS  The Wowza Video REST API features *cross-origin resource sharing*, or CORS.  CORS is a [W3C specification](https://www.w3.org/TR/cors/) that provides headers in HTTP requests to enable a web server to safely make a network request to another domain.   ## Limits  In order to protect shared resources, the Wowza Video REST API is subject to limits. For details, see [Wowza Video REST API limits](https://www.wowza.com/docs/wowza-video-rest-api-limits).   ## Versions  The Wowza Video REST API is periodically versioned. Minor updates are iterated using sequential dot numbers; major versions are iterated using sequential whole numbers. For details, see [Wowza Video REST API lifecycle management](https://www.wowza.com/docs/wowza-video-rest-api-lifecycle-management).  Each version is one of these types:    * **Beta**: The beta version contains everything that\'s in the current version as well as some features and functionality that are still in development. These work-in-progress features aren\'t fully tested and are subject to change. When we\'re done testing, we\'ll promote the beta version to the current version and then create a new beta with new features. You\'re free to use the beta version for testing and evaluation, but beta versions aren\'t intended for use in production environments and we caution against using a beta in production. There is only one beta version available at any time.   * **Current**: The current version offers the most complete, up-to-date, tested, and stable code base. We strongly recommend using the current version in your production environment. There is only one current version available at any time.   * **Supported 1**: The first supported version was current at one time but has been replaced by a newer version of the API. This version doesn\'t have the newest features, and may contain features or functions that are outdated and don\'t offer the most efficient methods for accomplishing your streaming goals. If you\'re using this version, we recommend that you upgrade to the current version, as soon as possible.   * **Supported 2**: The second supported version is no longer part of our active code base and the functionality is frozen. This version is offered as a convenience as you plan and execute your migration to the current version.   * **Deprecated**: A deprecated version isn\'t guaranteed to work in production environments. While the paths to the endpoints remain operable, the calls are re-routed to the **Supported 2** endpoints. Because of this, if there are compatibility differences between **Deprecated** and **Supported 2**, you\'ll receive error responses on those requests. Also, all relevant documentation is no longer accessible. If you\'re using a deprecated version, update to the current version immediately.   * **Discontinued**: A discontinued version is no longer accessible. This stage was formerly known as **Sunset**.  ### Query for version status  You can use the following GET request to fetch the current status for versions of the REST API.   ```bash  curl -X GET \\  -H \'Authorization: Bearer ${WV_JWT}\' \\  \'https://api.video.wowza.com/api/versions\'  ```   The response should look something like this, but it will differ according to current version status. Note that the beta version is not included in the response.  ```bash  {   \"1.9\": {     \"status\": \"current\",     \"base_uri\": \"/api/v1.9\"      },     \"1.8\": {         \"status\": \"supported\",         \"base_uri\": \"/api/v1.8\"     }     ... }  ```   # Documentation  ___  ## Reference doc  This reference documentation provides details about the operations, parameters, and request and reponse schemas for every resource and endpoint in the Wowza Video REST API.   Samples appear in the right column. Sample requests are presented in cURL (Shell) and JavaScript; some samples also include just the JSON object. Response samples are all JSON. Examples in cURL use environment variables so you can easily copy and paste them. To learn more, see [Using cURL](https://wowza.com/docs/how-to-use-the-wowza-video-rest-api#curl).   Reference documentation is available for every version of the API. Use the **Version** menu at the top of the page to access the reference doc for a different version of the API.   ## Release notes  Release notes are also available for each version. Release notes detail additions, changes, and deletions for each version. To learn more, see [Wowza Video REST API release notes](https://www.wowza.com/docs/wowza-video-rest-api-release-notes).   ## Technical articles  For additional documentation, including more detailed examples on using the Wowza Video REST API, see our [library of Wowza Video REST API technical articles](https://www.wowza.com/docs/wowza-video-rest-api).   # Query requirements  ___  The Wowza Video REST API uses HTTP requests to retrieve data from cloud-based servers. Requests must contain proper JSON, an authentication key, and the correct version number as the base path.   ## Use JSON  The Wowza Video REST API uses the [JSON API specification](http://jsonapi.org/format/) to request and return data. This means requests must include the header `Content-Type: application/json` and must include a single resource object in JSON format as primary data.   Responses include HTTP status codes that indicate whether the query was successful. If there was an error, a description explains the problem so that you can fix it and try again.   ## Authenticate  Requests to the Wowza Video REST API must include headers for authentication.  The Wowza Video REST API version 1.9 uses a JSON Web Token-based authentication scheme. To use JWT-based authentication, you’ll need to create an access token in the [Token Management](https://auth.wowza.com/client/token-management) portal and use it in your API requests. To learn more about JWTs and authenticating API requests, see the [Authentication](https://wowza.com/docs/how-to-use-the-wowza-video-rest-api#authentication).  Once you have a JWT, send it as a bearer token in an Authorization header of your API requests, like this (in cURL):   ```bash  curl -H \'Authorization: Bearer [your JWT]\' \\  ```  ## Specify a version  You must specify the version of the Wowza Video REST API you\'re using for the base path of your request. Use the version number or `beta`, as in  ```  https://api.video.wowza.com/api/v1.9/live_streams  ```  or  ```  https://api.video.wowza.com/api/beta/live_streams  ```  ## Example query  Here is a complete example POST request, in cURL, with proper JSON syntax, headers, authentication, and version information:  ```bash  curl -X POST \\  -H \'Authorization: Bearer [your JWT]\' \\  -H \'Content-Type: application/json\' \\  -d \'{     \"live_stream\": {       \"name\": \"My live Stream\",       \"...\": \"...\"     }   }\' \'https://api.video.wowza.com/api/[version]/live_streams\' ``` 
 *
 * The version of the OpenAPI document: v1.9
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { DirectPlaybackUrls } from './DirectPlaybackUrls';
import {
    DirectPlaybackUrlsFromJSON,
    DirectPlaybackUrlsFromJSONTyped,
    DirectPlaybackUrlsToJSON,
} from './DirectPlaybackUrls';
import type { Output } from './Output';
import {
    OutputFromJSON,
    OutputFromJSONTyped,
    OutputToJSON,
} from './Output';

/**
 * 
 * @export
 * @interface Transcoder
 */
export interface Transcoder {
    /**
     * The application name from the pull stream source URL.
     * @type {string}
     * @memberof Transcoder
     */
    applicationName?: string;
    /**
     * Only applies to the transcoder of a live stream created from re-streaming an asset in Asset Management. The id for the asset associated with the re-streamed live stream. You can manage this asset in Asset Management.
     * @type {string}
     * @memberof Transcoder
     */
    assetId?: string;
    /**
     * The billing mode for the transcoder. The default is **pay_as_you_go**.
     * @type {string}
     * @memberof Transcoder
     */
    billingMode?: TranscoderBillingModeEnum;
    /**
     * The location where Wowza Video transcodes your stream. Choose a location as close as possible to your video source.
     * @type {string}
     * @memberof Transcoder
     */
    broadcastLocation?: TranscoderBroadcastLocationEnum;
    /**
     * The size, in milliseconds, of the incoming buffer. **0** means no buffer. The default is **4000** (4 seconds).
     * @type {number}
     * @memberof Transcoder
     */
    bufferSize?: TranscoderBufferSizeEnum;
    /**
     * The type of closed caption data being passed from the source. The default, **none**, indicates that no data is being provided. **cea** indicates that a CEA closed captioning data stream is being provided. **on_text** indicates that an onTextData closed captioning data stream is being provided. **both** indicates that both CEA and onTextData closed captioning data streams are being provided.
     * @type {string}
     * @memberof Transcoder
     */
    closedCaptionType?: TranscoderClosedCaptionTypeEnum;
    /**
     * The date and time that the transcoder was created.
     * @type {Date}
     * @memberof Transcoder
     */
    createdAt?: Date;
    /**
     * The type of connection between the source encoder and the transcoder. The default, **pull**, instructs the transcoder to pull the video from the source. **push** instructs the source to push the stream to the transcoder. **cdn** uses a stream source to deliver the stream to the transcoder.
     * @type {string}
     * @memberof Transcoder
     */
    deliveryMethod?: TranscoderDeliveryMethodEnum;
    /**
     * An array of playback protocols enabled for this transcoder. By default, **rtmp**, **rtsp**, **webrtc**, and **wowz** are returned.
     * @type {Array<string>}
     * @memberof Transcoder
     */
    deliveryProtocols?: Array<string>;
    /**
     * An optional description of the transcoder.
     * @type {string}
     * @memberof Transcoder
     */
    description?: string;
    /**
     * 
     * @type {DirectPlaybackUrls}
     * @memberof Transcoder
     */
    directPlaybackUrls?: DirectPlaybackUrls;
    /**
     * Authentication is required by default for RTMP and RTSP push connections from a video source to the transcoder. Specify **true** to disable authentication with the video source.
     * @type {boolean}
     * @memberof Transcoder
     */
    disableAuthentication?: boolean;
    /**
     * The domain name from the pull stream source URL.
     * @type {string}
     * @memberof Transcoder
     */
    domainName?: string;
    /**
     * The unique alphanumeric string that identifies the transcoder.
     * @type {string}
     * @memberof Transcoder
     */
    id?: string;
    /**
     * The amount of idle time, in seconds, before the transcoder automatically shuts down. Valid values are the integers **0** (never shuts down) to **172800** (48 hours). The default is **1200** (20 minutes).
     * @type {number}
     * @memberof Transcoder
     */
    idleTimeout?: number;
    /**
     * If **true**, turns off the sort packet buffer and speeds the time it takes to decode and deliver video data to the player. The default is **false**.
     * @type {boolean}
     * @memberof Transcoder
     */
    lowLatency?: boolean;
    /**
     * A descriptive name for the transcoder. Maximum 200 characters.
     * @type {string}
     * @memberof Transcoder
     */
    name?: string;
    /**
     * Output renditions associated with the transcoder.
     * @type {Array<Output>}
     * @memberof Transcoder
     */
    outputs?: Array<Output>;
    /**
     * A password for authenticating an RTMP or RTSP push connection. Can contain only uppercase and lowercase letters; numbers; and the period (.), underscore (_), and hyphen (-) characters. No other special characters can be used.
     * @type {string}
     * @memberof Transcoder
     */
    password?: string;
    /**
     * The stream name used in the direct playback URL.
     * @type {string}
     * @memberof Transcoder
     */
    playbackStreamName?: string;
    /**
     * The number of users who are allowed to connect directly to the transcoder. The minimum and default value is **10**. The maximum number of connections varies by the size of the transcoder, with the maximum value for the largest transcoder being 300 viewers.
     * @type {number}
     * @memberof Transcoder
     */
    playMaximumConnections?: number;
    /**
     * The transport protocol for the source video. The default is **rtmp**.
     * @type {string}
     * @memberof Transcoder
     */
    protocol?: TranscoderProtocolEnum;
    /**
     * A unique, alphanumeric ID returned in transcoder webhook payloads. Setting a *reference_id* is useful if you have an ID in your system or application you want to associate with transcoder events that trigger webhooks. Maximum 70 characters. Can only contain: a-z A-Z 0-9 !@#$%^&*()-_+=:;,.?~|

You can't use brackets or quotation marks.

See <a href="https://www.wowza.com/docs/wowza-video-webhook-event-reference-documentation">Wowza Video Webhook Event Reference Documentation</a> to learn about webhooks.

Available from version 1.7.
     * @type {string}
     * @memberof Transcoder
     */
    referenceId?: string;
    /**
     * The port used for RTMP pull connections to Wowza Video.
     * @type {number}
     * @memberof Transcoder
     */
    sourcePort?: number;
    /**
     * For the *delivery_method* **pull** or *protocol* **file**.

For **pull**, enter the source's web address without the preceding protocol or the trailing slash (/).

For **file**, enter the source file URL, including the protocol (http, https, gs, s3).
     * @type {string}
     * @memberof Transcoder
     */
    sourceUrl?: string;
    /**
     * For the *delivery_method* **push**. Some encoders append an extension to their stream names. If the device you're using does this, enter the extension as a period (.) followed by alphanumeric characters.
     * @type {string}
     * @memberof Transcoder
     */
    streamExtension?: string;
    /**
     * The stream name from the pull stream source URL.
     * @type {string}
     * @memberof Transcoder
     */
    streamName?: string;
    /**
     * A dynamic buffer that helps stabilize streams in rough network conditions, but adds latency. Specify **true** to enable stream smoothing. The default is **false**.
     * @type {boolean}
     * @memberof Transcoder
     */
    streamSmoother?: boolean;
    /**
     * For the *delivery_method* **cdn**. The alphanumeric string that identifies the stream source that you want to use to deliver the stream to the transcoder.
     * @type {string}
     * @memberof Transcoder
     */
    streamSourceId?: string;
    /**
     * If **true**, disables stream targets when the transcoder starts. If **false** (the default), the targets start when the transcoder starts.
     * @type {boolean}
     * @memberof Transcoder
     */
    suppressStreamTargetStart?: boolean;
    /**
     * The type of transcoder, either **transcoded** for streams that are transcoded into adaptive bitrate renditions or **passthrough** for streams that aren't processed by the transcoder. The default is **transcoded**.
     * @type {string}
     * @memberof Transcoder
     */
    transcoderType?: TranscoderTranscoderTypeEnum;
    /**
     * The date and time that the transcoder was updated.
     * @type {Date}
     * @memberof Transcoder
     */
    updatedAt?: Date;
    /**
     * A username for authenticating an RTMP or RTSP push connection. Can contain only uppercase and lowercase letters; numbers; and the period (.), underscore (_), and hyphen (-) characters. No other special characters can be used.
     * @type {string}
     * @memberof Transcoder
     */
    username?: string;
    /**
     * Embeds an image into the transcoded stream for copyright protection. Specify **true** to embed a watermark image.
     * @type {boolean}
     * @memberof Transcoder
     */
    watermark?: boolean;
    /**
     * The height, in pixels, of the watermark image. If blank, Wowza Video uses the original image height.
     * @type {number}
     * @memberof Transcoder
     */
    watermarkHeight?: number;
    /**
     * The path to a GIF, JPEG, or PNG image that is embedded in all bitrate renditions of the stream. Watermark image files must be 2.5 MB or smaller.
     * @type {string}
     * @memberof Transcoder
     */
    watermarkImageUrl?: string;
    /**
     * The opacity, or percentage of transparency, of the watermark. **0** is fully transparent; **100** is fully opaque.
     * @type {number}
     * @memberof Transcoder
     */
    watermarkOpacity?: TranscoderWatermarkOpacityEnum;
    /**
     * The corner of the video frame in which you want the watermark to appear. The default is **top-left**.
     * @type {string}
     * @memberof Transcoder
     */
    watermarkPosition?: TranscoderWatermarkPositionEnum;
    /**
     * The width, in pixels, of the watermark image. If blank, Wowza Video uses the original image width.
     * @type {number}
     * @memberof Transcoder
     */
    watermarkWidth?: number;
}


/**
 * @export
 */
export const TranscoderBillingModeEnum = {
    PayAsYouGo: 'pay_as_you_go',
    TwentyfourSeven: 'twentyfour_seven'
} as const;
export type TranscoderBillingModeEnum = typeof TranscoderBillingModeEnum[keyof typeof TranscoderBillingModeEnum];

/**
 * @export
 */
export const TranscoderBroadcastLocationEnum = {
    AsiaPacificAustralia: 'asia_pacific_australia',
    AsiaPacificIndia: 'asia_pacific_india',
    AsiaPacificJapan: 'asia_pacific_japan',
    AsiaPacificSingapore: 'asia_pacific_singapore',
    AsiaPacificSKorea: 'asia_pacific_s_korea',
    AsiaPacificTaiwan: 'asia_pacific_taiwan',
    EuBelgium: 'eu_belgium',
    EuGermany: 'eu_germany',
    EuIreland: 'eu_ireland',
    SouthAmericaBrazil: 'south_america_brazil',
    UsCentralIowa: 'us_central_iowa',
    UsEastSCarolina: 'us_east_s_carolina',
    UsEastVirginia: 'us_east_virginia',
    UsWestCalifornia: 'us_west_california',
    UsWestOregon: 'us_west_oregon'
} as const;
export type TranscoderBroadcastLocationEnum = typeof TranscoderBroadcastLocationEnum[keyof typeof TranscoderBroadcastLocationEnum];

/**
 * @export
 */
export const TranscoderBufferSizeEnum = {
    NUMBER_0: 0,
    NUMBER_1000: 1000,
    NUMBER_2000: 2000,
    NUMBER_3000: 3000,
    NUMBER_4000: 4000,
    NUMBER_5000: 5000,
    NUMBER_6000: 6000,
    NUMBER_7000: 7000,
    NUMBER_8000: 8000
} as const;
export type TranscoderBufferSizeEnum = typeof TranscoderBufferSizeEnum[keyof typeof TranscoderBufferSizeEnum];

/**
 * @export
 */
export const TranscoderClosedCaptionTypeEnum = {
    None: 'none',
    Cea: 'cea',
    OnText: 'on_text',
    Both: 'both'
} as const;
export type TranscoderClosedCaptionTypeEnum = typeof TranscoderClosedCaptionTypeEnum[keyof typeof TranscoderClosedCaptionTypeEnum];

/**
 * @export
 */
export const TranscoderDeliveryMethodEnum = {
    Pull: 'pull',
    Cdn: 'cdn',
    Push: 'push'
} as const;
export type TranscoderDeliveryMethodEnum = typeof TranscoderDeliveryMethodEnum[keyof typeof TranscoderDeliveryMethodEnum];

/**
 * @export
 */
export const TranscoderProtocolEnum = {
    File: 'file',
    Rtmp: 'rtmp',
    Rtsp: 'rtsp',
    Srt: 'srt',
    Udp: 'udp',
    Webrtc: 'webrtc'
} as const;
export type TranscoderProtocolEnum = typeof TranscoderProtocolEnum[keyof typeof TranscoderProtocolEnum];

/**
 * @export
 */
export const TranscoderTranscoderTypeEnum = {
    Transcoded: 'transcoded',
    Passthrough: 'passthrough'
} as const;
export type TranscoderTranscoderTypeEnum = typeof TranscoderTranscoderTypeEnum[keyof typeof TranscoderTranscoderTypeEnum];

/**
 * @export
 */
export const TranscoderWatermarkOpacityEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1,
    NUMBER_2: 2,
    NUMBER_3: 3,
    NUMBER_4: 4,
    NUMBER_5: 5,
    NUMBER_6: 6,
    NUMBER_7: 7,
    NUMBER_8: 8,
    NUMBER_9: 9,
    NUMBER_10: 10,
    NUMBER_11: 11,
    NUMBER_12: 12,
    NUMBER_13: 13,
    NUMBER_14: 14,
    NUMBER_15: 15,
    NUMBER_16: 16,
    NUMBER_17: 17,
    NUMBER_18: 18,
    NUMBER_19: 19,
    NUMBER_20: 20,
    NUMBER_21: 21,
    NUMBER_22: 22,
    NUMBER_23: 23,
    NUMBER_24: 24,
    NUMBER_25: 25,
    NUMBER_26: 26,
    NUMBER_27: 27,
    NUMBER_28: 28,
    NUMBER_29: 29,
    NUMBER_30: 30,
    NUMBER_31: 31,
    NUMBER_32: 32,
    NUMBER_33: 33,
    NUMBER_34: 34,
    NUMBER_35: 35,
    NUMBER_36: 36,
    NUMBER_37: 37,
    NUMBER_38: 38,
    NUMBER_39: 39,
    NUMBER_40: 40,
    NUMBER_41: 41,
    NUMBER_42: 42,
    NUMBER_43: 43,
    NUMBER_44: 44,
    NUMBER_45: 45,
    NUMBER_46: 46,
    NUMBER_47: 47,
    NUMBER_48: 48,
    NUMBER_49: 49,
    NUMBER_50: 50,
    NUMBER_51: 51,
    NUMBER_52: 52,
    NUMBER_53: 53,
    NUMBER_54: 54,
    NUMBER_55: 55,
    NUMBER_56: 56,
    NUMBER_57: 57,
    NUMBER_58: 58,
    NUMBER_59: 59,
    NUMBER_60: 60,
    NUMBER_61: 61,
    NUMBER_62: 62,
    NUMBER_63: 63,
    NUMBER_64: 64,
    NUMBER_65: 65,
    NUMBER_66: 66,
    NUMBER_67: 67,
    NUMBER_68: 68,
    NUMBER_69: 69,
    NUMBER_70: 70,
    NUMBER_71: 71,
    NUMBER_72: 72,
    NUMBER_73: 73,
    NUMBER_74: 74,
    NUMBER_75: 75,
    NUMBER_76: 76,
    NUMBER_77: 77,
    NUMBER_78: 78,
    NUMBER_79: 79,
    NUMBER_80: 80,
    NUMBER_81: 81,
    NUMBER_82: 82,
    NUMBER_83: 83,
    NUMBER_84: 84,
    NUMBER_85: 85,
    NUMBER_86: 86,
    NUMBER_87: 87,
    NUMBER_88: 88,
    NUMBER_89: 89,
    NUMBER_90: 90,
    NUMBER_91: 91,
    NUMBER_92: 92,
    NUMBER_93: 93,
    NUMBER_94: 94,
    NUMBER_95: 95,
    NUMBER_96: 96,
    NUMBER_97: 97,
    NUMBER_98: 98,
    NUMBER_99: 99,
    NUMBER_100: 100
} as const;
export type TranscoderWatermarkOpacityEnum = typeof TranscoderWatermarkOpacityEnum[keyof typeof TranscoderWatermarkOpacityEnum];

/**
 * @export
 */
export const TranscoderWatermarkPositionEnum = {
    TopLeft: 'top-left',
    TopRight: 'top-right',
    BottomLeft: 'bottom-left',
    BottomRight: 'bottom-right'
} as const;
export type TranscoderWatermarkPositionEnum = typeof TranscoderWatermarkPositionEnum[keyof typeof TranscoderWatermarkPositionEnum];


/**
 * Check if a given object implements the Transcoder interface.
 */
export function instanceOfTranscoder(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TranscoderFromJSON(json: any): Transcoder {
    return TranscoderFromJSONTyped(json, false);
}

export function TranscoderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Transcoder {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'applicationName': !exists(json, 'application_name') ? undefined : json['application_name'],
        'assetId': !exists(json, 'asset_id') ? undefined : json['asset_id'],
        'billingMode': !exists(json, 'billing_mode') ? undefined : json['billing_mode'],
        'broadcastLocation': !exists(json, 'broadcast_location') ? undefined : json['broadcast_location'],
        'bufferSize': !exists(json, 'buffer_size') ? undefined : json['buffer_size'],
        'closedCaptionType': !exists(json, 'closed_caption_type') ? undefined : json['closed_caption_type'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'deliveryMethod': !exists(json, 'delivery_method') ? undefined : json['delivery_method'],
        'deliveryProtocols': !exists(json, 'delivery_protocols') ? undefined : json['delivery_protocols'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'directPlaybackUrls': !exists(json, 'direct_playback_urls') ? undefined : DirectPlaybackUrlsFromJSON(json['direct_playback_urls']),
        'disableAuthentication': !exists(json, 'disable_authentication') ? undefined : json['disable_authentication'],
        'domainName': !exists(json, 'domain_name') ? undefined : json['domain_name'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'idleTimeout': !exists(json, 'idle_timeout') ? undefined : json['idle_timeout'],
        'lowLatency': !exists(json, 'low_latency') ? undefined : json['low_latency'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'outputs': !exists(json, 'outputs') ? undefined : ((json['outputs'] as Array<any>).map(OutputFromJSON)),
        'password': !exists(json, 'password') ? undefined : json['password'],
        'playbackStreamName': !exists(json, 'playback_stream_name') ? undefined : json['playback_stream_name'],
        'playMaximumConnections': !exists(json, 'play_maximum_connections') ? undefined : json['play_maximum_connections'],
        'protocol': !exists(json, 'protocol') ? undefined : json['protocol'],
        'referenceId': !exists(json, 'reference_id') ? undefined : json['reference_id'],
        'sourcePort': !exists(json, 'source_port') ? undefined : json['source_port'],
        'sourceUrl': !exists(json, 'source_url') ? undefined : json['source_url'],
        'streamExtension': !exists(json, 'stream_extension') ? undefined : json['stream_extension'],
        'streamName': !exists(json, 'stream_name') ? undefined : json['stream_name'],
        'streamSmoother': !exists(json, 'stream_smoother') ? undefined : json['stream_smoother'],
        'streamSourceId': !exists(json, 'stream_source_id') ? undefined : json['stream_source_id'],
        'suppressStreamTargetStart': !exists(json, 'suppress_stream_target_start') ? undefined : json['suppress_stream_target_start'],
        'transcoderType': !exists(json, 'transcoder_type') ? undefined : json['transcoder_type'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'username': !exists(json, 'username') ? undefined : json['username'],
        'watermark': !exists(json, 'watermark') ? undefined : json['watermark'],
        'watermarkHeight': !exists(json, 'watermark_height') ? undefined : json['watermark_height'],
        'watermarkImageUrl': !exists(json, 'watermark_image_url') ? undefined : json['watermark_image_url'],
        'watermarkOpacity': !exists(json, 'watermark_opacity') ? undefined : json['watermark_opacity'],
        'watermarkPosition': !exists(json, 'watermark_position') ? undefined : json['watermark_position'],
        'watermarkWidth': !exists(json, 'watermark_width') ? undefined : json['watermark_width'],
    };
}

export function TranscoderToJSON(value?: Transcoder | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'application_name': value.applicationName,
        'asset_id': value.assetId,
        'billing_mode': value.billingMode,
        'broadcast_location': value.broadcastLocation,
        'buffer_size': value.bufferSize,
        'closed_caption_type': value.closedCaptionType,
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'delivery_method': value.deliveryMethod,
        'delivery_protocols': value.deliveryProtocols,
        'description': value.description,
        'direct_playback_urls': DirectPlaybackUrlsToJSON(value.directPlaybackUrls),
        'disable_authentication': value.disableAuthentication,
        'domain_name': value.domainName,
        'id': value.id,
        'idle_timeout': value.idleTimeout,
        'low_latency': value.lowLatency,
        'name': value.name,
        'outputs': value.outputs === undefined ? undefined : ((value.outputs as Array<any>).map(OutputToJSON)),
        'password': value.password,
        'playback_stream_name': value.playbackStreamName,
        'play_maximum_connections': value.playMaximumConnections,
        'protocol': value.protocol,
        'reference_id': value.referenceId,
        'source_port': value.sourcePort,
        'source_url': value.sourceUrl,
        'stream_extension': value.streamExtension,
        'stream_name': value.streamName,
        'stream_smoother': value.streamSmoother,
        'stream_source_id': value.streamSourceId,
        'suppress_stream_target_start': value.suppressStreamTargetStart,
        'transcoder_type': value.transcoderType,
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'username': value.username,
        'watermark': value.watermark,
        'watermark_height': value.watermarkHeight,
        'watermark_image_url': value.watermarkImageUrl,
        'watermark_opacity': value.watermarkOpacity,
        'watermark_position': value.watermarkPosition,
        'watermark_width': value.watermarkWidth,
    };
}

