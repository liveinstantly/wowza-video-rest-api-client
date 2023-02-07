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
import type { BroadcastLocation } from './BroadcastLocation';
import {
    BroadcastLocationFromJSON,
    BroadcastLocationFromJSONTyped,
    BroadcastLocationToJSON,
} from './BroadcastLocation';

/**
 * 
 * @export
 * @interface LiveStreamCreateInputInner
 */
export interface LiveStreamCreateInputInner {
    /**
     * The height, in pixels, of the video source. Should correspond to a widescreen (16:9) or standard (4:3) aspect ratio and be divisible by 8.
     * @type {number}
     * @memberof LiveStreamCreateInputInner
     */
    aspectRatioHeight: number;
    /**
     * The width, in pixels, of the video source. Should correspond to a widescreen (16:9) or standard (4:3) aspect ratio and be divisible by 8.
     * @type {number}
     * @memberof LiveStreamCreateInputInner
     */
    aspectRatioWidth: number;
    /**
     * The billing mode for the stream. The default is **pay_as_you_go**.
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    billingMode: LiveStreamCreateInputInnerBillingModeEnum;
    /**
     * 
     * @type {BroadcastLocation}
     * @memberof LiveStreamCreateInputInner
     */
    broadcastLocation: BroadcastLocation;
    /**
     * The video source for the live stream. Choose the type of camera or encoder you're using to connect to the Wowza Video transcoder. If your specific device isn't listed, choose **ipcamera**, **other_rtmp**, or **other_rtsp**.
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    encoder: LiveStreamCreateInputInnerEncoderEnum;
    /**
     * A descriptive name for the live stream. Maximum 200 characters.
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    name: string;
    /**
     * The type of transcoder, either **transcoded** for streams that are transcoded into adaptive bitrate renditions or **passthrough** for streams that aren't processed by the transcoder. The default is **transcoded**.
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    transcoderType: LiveStreamCreateInputInnerTranscoderTypeEnum;
    /**
     * The type of closed caption data being passed from the source. The default, **none**, indicates that no data is being provided. **cea** indicates that a CEA closed captioning data stream is being provided. **on_text** indicates that an onTextData closed captioning data stream is being provided. **both** indicates that both CEA and onTextData closed captioning data streams are being provided.

**Example:** <code>"closed_caption_type": "none"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    closedCaptionType?: LiveStreamCreateInputInnerClosedCaptionTypeEnum;
    /**
     * The type of connection between the video source and the transcoder. The default, **push**, instructs the source to push the stream to the transcoder. **pull** instructs the transcoder to pull the video from the source. **cdn** uses a stream source to deliver the stream to the transcoder.

Default: **push**

**Example:** <code>"delivery_method": "pull"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    deliveryMethod?: LiveStreamCreateInputInnerDeliveryMethodEnum;
    /**
     * An array of direct delivery protocols enabled for this live stream. By default, **rtmp**, **rtsp**, **webrtc**, and **wowz** are enabled.

**Example:** See response body sample
     * @type {Array<string>}
     * @memberof LiveStreamCreateInputInner
     */
    deliveryProtocols?: Array<string>;
    /**
     * **(Deprecated)** The **delivery_type** parameter is deprecated. For streams whose *encoder* is **wowza_streaming_engine**, the only value is **single-bitrate** which we default to.

For streams whose *encoder* is **wowza_streaming_engine**. The default is **multi-bitrate**, which means you're sending one or more bitrate renditions from Wowza Streaming Engine directly to a Wowza CDN target without transcoding in Wowza Video. The value **single-bitrate** means you're sending a single source stream to Wowza Video for transcoding and/or to deliver the source stream to multiple stream targets in Wowza Video.

**Example:** <code>"delivery_type": "single-bitrate"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    deliveryType?: LiveStreamCreateInputInnerDeliveryTypeEnum;
    /**
     * Authentication is required by default for RTMP and RTSP push connections from a video source to Wowza Video. Specify **true** to disable authentication with the video source.

**Example:** <code>"disable_authentication": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    disableAuthentication?: boolean;
    /**
     * A web page hosted by Wowza Video that includes a player for the live stream. The default, **true**, creates a hosted page. Specify **false** to not create a hosted web page.

**Example:** <code>"hosted_page": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    hostedPage?: boolean;
    /**
     * A description that appears on the hosted page below the player. Can't include custom HTML, JavaScript, or other tags.

**Example:** <code>"hosted_page_description": "My Hosted Page Description"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    hostedPageDescription?: string;
    /**
     * A Base64-encoded string representation of a GIF, JPEG, or PNG logo file that that appears in the upper-left corner of the hosted page. Logo file must be 2.5 MB or smaller.

**Example:** <code>"hosted_page_logo_image": "[Base64-encoded string representation of GIF, JPEG, or PNG file]"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    hostedPageLogoImage?: string;
    /**
     * Icons that let viewers share the stream on Facebook, Google+, Twitter, and by email. The default, **true**, includes sharing icons on the hosted page. Specify **false** to omit sharing icons.

**Example:** <code>"hosted_page_sharing_icons": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    hostedPageSharingIcons?: boolean;
    /**
     * A title for the page that appears above the player. Can't include custom HTML, JavaScript, or other tags.

**Example:** <code>"hosted_page_title": "My Hosted Page"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    hostedPageTitle?: string;
    /**
     * For streams whose *target_delivery_protocol* is **hls-https**. If **true**, turns off incoming and sort packet buffers and delivers smaller video packets to the player, which can reduce latency as long as networks can handle the increased overhead. The default is **false**.

 This parameter only affects streams played over a stream target whose *type* is **fastly** or **wowza**. If using a **wowza** target, the *provider* must be set to **akamai_cupertino**.


 **Example:** <code>"low_latency": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    lowLatency?: boolean;
    /**
     * A password for authenticating an RTMP or RTSP push connection. Can contain only uppercase and lowercase letters; numbers; and the period (.), underscore (_), and hyphen (-) characters. No other special characters can be used.

**Example:** <code>"password": 68332313</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    password?: string;
    /**
     * A clock that appears in the player before the event and counts down to the start of the stream. Specify **true** to display the countdown clock. The default is **false**.

**Example:** <code>"player_countdown": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    playerCountdown?: boolean;
    /**
     * The date and time that the event starts, used by the countdown clock. Specify **YYYY-MM-DD HH:MM:SS**, where **HH** is a 24-hour clock in UTC.

**Example:** <code>"player_countdown_at": "2020-02-01T17:00:00.000Z"</code>
     * @type {Date}
     * @memberof LiveStreamCreateInputInner
     */
    playerCountdownAt?: Date;
    /**
     * A Base64-encoded string representation of a GIF, JPEG, or PNG logo file that appears partially transparent in a corner of the player throughout playback. Logo file must be 2.5 MB or smaller.

**Example:** <code>"player_logo_image": "[Base64-encoded string representation of GIF, JPEG, or PNG file]"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    playerLogoImage?: string;
    /**
     * The corner of the player in which you want the player logo to appear. The default is **top-left**.

**Example:** <code>"player_logo_position": "top-right"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    playerLogoPosition?: LiveStreamCreateInputInnerPlayerLogoPositionEnum;
    /**
     * A player whose size adjusts according to the device on which it's being viewed. If **true**, creates a responsive player. If **false**, specify a *player_width*.

**Example:** <code>"player_type": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    playerResponsive?: boolean;
    /**
     * The player you want to use.

**Wowza Video subscribers**</br> Wowza Flowplayer (wowza_flowplayer) is the only valid option. You're a subscriber if you have access to Asset Management and Historic and Live Analytics in the user interface.

The Wowza Flowplayer is an easy-to-use, commercial grade player designed for builders and developers. It provides HTML5, HLS, and MPEG-DASH playback and plays streams on any browser and device. It can be [customized](https://www.wowza.com/docs/embed-and-customize-wowza-flowplayer-in-your-site) if you embed it in your site.

**Other subscribers**</br> original _html5 and wowza_player are the only valid options and original_html5 is the default. **original_html5** provides HTML5 playback and falls back to Flash on older browsers. **wowza_player** requires that *target_delivery_protocol* be **hls-https** and *closed_caption_type* be **none**.

**Example:** <code>"player_type": "wowza_flowplayer"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    playerType?: string;
    /**
     * A Base64-encoded string representation of a GIF, JPEG, or PNG poster image that appears in the player before the stream begins. Poster image files must be 2.5 MB or smaller.

**Example:** <code>"player_video_poster_image": "[Base64-encoded string representation of GIF, JPEG, or PNG file]"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    playerVideoPosterImage?: string;
    /**
     * The width, in pixels, of a fixed-size player. The default is **640**.

**Example:** <code>"player_width": 640</code>
     * @type {number}
     * @memberof LiveStreamCreateInputInner
     */
    playerWidth?: number;
    /**
     * If **true**, creates a recording of the live stream. The recording starts when the live stream starts and stops automatically when the live stream stops.

Recordings created from a live stream capture up to eight hours of content. If a live stream runs for longer than eight hours, the most recent eight hours are recorded. To record more than eight hours of a single broadcast, stop the live stream and start it again to create multiple recordings.

Default: **false**

> **Note**: If **save_asset** is **true**, that field overrides a true **recording** value and the asset is saved in Asset Management.

**Example:** <code>"recording": true</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    recording?: boolean;
    /**
     * A unique, alphanumeric ID returned in transcoder webhook payloads. Setting a *reference_id* is useful if you have an ID in your system or application you want to associate with transcoder events that trigger webhooks. Maximum 70 characters. Can only contain: a-z A-Z 0-9 !@#$%^&*()-_+=:;,.?~|

You can't use brackets or quotation marks.

See <a href="https://www.wowza.com/docs/wowza-video-webhook-event-reference-documentation">Wowza Video Webhook Event Reference Documentation</a> to learn about webhooks.

Available from version 1.7.

**Example:** <code>"reference_id": "mySystemID_01"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    referenceId?: string;
    /**
     * If **true**, removes the logo file from the hosted page. The default is **false**.

**Example:** <code>"remove_hosted_page_logo_image": true</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    removeHostedPageLogoImage?: boolean;
    /**
     * If **true**, removes the logo file from the player. The default is **false**.

**Example:** <code>"remove_hosted_page_logo_image": true</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    removePlayerLogoImage?: boolean;
    /**
     * If **true**, removes the poster image. The default is **false**.

**Example:** <code>"remove_player_video_poster_image": true</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    removePlayerVideoPosterImage?: boolean;
    /**
     * If **true**, saves an MP4 recording and a VOD asset in Asset Management. The default is **false**. You can't set **save_asset** for a live stream created from re-streaming an asset in Asset Management.
> **Note**: If this value is true, **recording** and/or **vod_stream** are set to false. You need a Wowza Video subscription to access Asset Management.

Available from version 1.8.

**Example:** <code>"save_asset": true</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    saveAsset?: boolean;
    /**
     * For the *delivery_method* **pull** or *encoder* **file**.

For **pull**, enter the URL of an IP camera or video encoder using an RTMP and RTSP pull connection to Wowza Video. Consult the camera or encoder documentation for the URL syntax.

For **file**, enter the source file URL, including the protocol (http, https, gs, s3).


**Example:** <code>"source_url": "xyz.streamlock.net/vod/mp4:Movie.mov"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    sourceUrl?: string;
    /**
     * The type of stream being delivered from Wowza Video. The default and only valid value is **hls-https**. To send a stream with HDS, use the transcoder workflow with a Wowza stream target that has a *provider* of **akamai**.

**Example:** <code>"target_delivery_protocol": "hls-https"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    targetDeliveryProtocol?: LiveStreamCreateInputInnerTargetDeliveryProtocolEnum;
    /**
     * If **true**, uses a stream source to deliver the stream to Wowza Video. The default, **false**, pushes directly to Wowza Video.

**Example:** <code>"use_stream_source": false</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    useStreamSource?: boolean;
    /**
     * A user name for authenticating an RTMP or RTSP push connection. Can contain only uppercase and lowercase letters; numbers; and the period (.), underscore (_), and hyphen (-) characters. No other special characters can be used.

**Example:** <code>"username": "client2"</code>
     * @type {string}
     * @memberof LiveStreamCreateInputInner
     */
    username?: string;
    /**
     * If **true**, creates a VOD stream after the live stream ends. The default is **false**. VOD streams require a Fastly stream target with HLS as a delivery protocol.
> **Note**: If **save_asset** is **true**, that field overrides a true **vod_stream** value and the asset is saved in Asset Management.

**Example:** <code>"vod_stream": true</code>
     * @type {boolean}
     * @memberof LiveStreamCreateInputInner
     */
    vodStream?: boolean;
}


/**
 * @export
 */
export const LiveStreamCreateInputInnerBillingModeEnum = {
    PayAsYouGo: 'pay_as_you_go',
    TwentyfourSeven: 'twentyfour_seven'
} as const;
export type LiveStreamCreateInputInnerBillingModeEnum = typeof LiveStreamCreateInputInnerBillingModeEnum[keyof typeof LiveStreamCreateInputInnerBillingModeEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerEncoderEnum = {
    WowzaClearcaster: 'wowza_clearcaster',
    WowzaGocoder: 'wowza_gocoder',
    WowzaStreamingEngine: 'wowza_streaming_engine',
    MediaDs: 'media_ds',
    Axis: 'axis',
    Epiphan: 'epiphan',
    File: 'file',
    Hauppauge: 'hauppauge',
    Jvc: 'jvc',
    LiveU: 'live_u',
    Matrox: 'matrox',
    NewtekTricaster: 'newtek_tricaster',
    Osprey: 'osprey',
    Sony: 'sony',
    TelestreamWirecast: 'telestream_wirecast',
    TeradekCube: 'teradek_cube',
    Vmix: 'vmix',
    XSplit: 'x_split',
    Ipcamera: 'ipcamera',
    OtherRtmp: 'other_rtmp',
    OtherRtsp: 'other_rtsp',
    OtherWebrtc: 'other_webrtc',
    OtherUdp: 'other_udp',
    OtherSrt: 'other_srt'
} as const;
export type LiveStreamCreateInputInnerEncoderEnum = typeof LiveStreamCreateInputInnerEncoderEnum[keyof typeof LiveStreamCreateInputInnerEncoderEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerTranscoderTypeEnum = {
    Transcoded: 'transcoded',
    Passthrough: 'passthrough'
} as const;
export type LiveStreamCreateInputInnerTranscoderTypeEnum = typeof LiveStreamCreateInputInnerTranscoderTypeEnum[keyof typeof LiveStreamCreateInputInnerTranscoderTypeEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerClosedCaptionTypeEnum = {
    None: 'none',
    Cea: 'cea',
    OnText: 'on_text',
    Both: 'both'
} as const;
export type LiveStreamCreateInputInnerClosedCaptionTypeEnum = typeof LiveStreamCreateInputInnerClosedCaptionTypeEnum[keyof typeof LiveStreamCreateInputInnerClosedCaptionTypeEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerDeliveryMethodEnum = {
    Pull: 'pull',
    Cdn: 'cdn',
    Push: 'push'
} as const;
export type LiveStreamCreateInputInnerDeliveryMethodEnum = typeof LiveStreamCreateInputInnerDeliveryMethodEnum[keyof typeof LiveStreamCreateInputInnerDeliveryMethodEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerDeliveryTypeEnum = {
    SingleBitrate: 'single-bitrate'
} as const;
export type LiveStreamCreateInputInnerDeliveryTypeEnum = typeof LiveStreamCreateInputInnerDeliveryTypeEnum[keyof typeof LiveStreamCreateInputInnerDeliveryTypeEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerPlayerLogoPositionEnum = {
    TopLeft: 'top-left',
    TopRight: 'top-right',
    BottomLeft: 'bottom-left',
    BottomRight: 'bottom-right'
} as const;
export type LiveStreamCreateInputInnerPlayerLogoPositionEnum = typeof LiveStreamCreateInputInnerPlayerLogoPositionEnum[keyof typeof LiveStreamCreateInputInnerPlayerLogoPositionEnum];

/**
 * @export
 */
export const LiveStreamCreateInputInnerTargetDeliveryProtocolEnum = {
    HlsHttps: 'hls-https'
} as const;
export type LiveStreamCreateInputInnerTargetDeliveryProtocolEnum = typeof LiveStreamCreateInputInnerTargetDeliveryProtocolEnum[keyof typeof LiveStreamCreateInputInnerTargetDeliveryProtocolEnum];


/**
 * Check if a given object implements the LiveStreamCreateInputInner interface.
 */
export function instanceOfLiveStreamCreateInputInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "aspectRatioHeight" in value;
    isInstance = isInstance && "aspectRatioWidth" in value;
    isInstance = isInstance && "billingMode" in value;
    isInstance = isInstance && "broadcastLocation" in value;
    isInstance = isInstance && "encoder" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "transcoderType" in value;

    return isInstance;
}

export function LiveStreamCreateInputInnerFromJSON(json: any): LiveStreamCreateInputInner {
    return LiveStreamCreateInputInnerFromJSONTyped(json, false);
}

export function LiveStreamCreateInputInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): LiveStreamCreateInputInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'aspectRatioHeight': json['aspect_ratio_height'],
        'aspectRatioWidth': json['aspect_ratio_width'],
        'billingMode': json['billing_mode'],
        'broadcastLocation': BroadcastLocationFromJSON(json['broadcast_location']),
        'encoder': json['encoder'],
        'name': json['name'],
        'transcoderType': json['transcoder_type'],
        'closedCaptionType': !exists(json, 'closed_caption_type') ? undefined : json['closed_caption_type'],
        'deliveryMethod': !exists(json, 'delivery_method') ? undefined : json['delivery_method'],
        'deliveryProtocols': !exists(json, 'delivery_protocols') ? undefined : json['delivery_protocols'],
        'deliveryType': !exists(json, 'delivery_type') ? undefined : json['delivery_type'],
        'disableAuthentication': !exists(json, 'disable_authentication') ? undefined : json['disable_authentication'],
        'hostedPage': !exists(json, 'hosted_page') ? undefined : json['hosted_page'],
        'hostedPageDescription': !exists(json, 'hosted_page_description') ? undefined : json['hosted_page_description'],
        'hostedPageLogoImage': !exists(json, 'hosted_page_logo_image') ? undefined : json['hosted_page_logo_image'],
        'hostedPageSharingIcons': !exists(json, 'hosted_page_sharing_icons') ? undefined : json['hosted_page_sharing_icons'],
        'hostedPageTitle': !exists(json, 'hosted_page_title') ? undefined : json['hosted_page_title'],
        'lowLatency': !exists(json, 'low_latency') ? undefined : json['low_latency'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'playerCountdown': !exists(json, 'player_countdown') ? undefined : json['player_countdown'],
        'playerCountdownAt': !exists(json, 'player_countdown_at') ? undefined : (new Date(json['player_countdown_at'])),
        'playerLogoImage': !exists(json, 'player_logo_image') ? undefined : json['player_logo_image'],
        'playerLogoPosition': !exists(json, 'player_logo_position') ? undefined : json['player_logo_position'],
        'playerResponsive': !exists(json, 'player_responsive') ? undefined : json['player_responsive'],
        'playerType': !exists(json, 'player_type') ? undefined : json['player_type'],
        'playerVideoPosterImage': !exists(json, 'player_video_poster_image') ? undefined : json['player_video_poster_image'],
        'playerWidth': !exists(json, 'player_width') ? undefined : json['player_width'],
        'recording': !exists(json, 'recording') ? undefined : json['recording'],
        'referenceId': !exists(json, 'reference_id') ? undefined : json['reference_id'],
        'removeHostedPageLogoImage': !exists(json, 'remove_hosted_page_logo_image') ? undefined : json['remove_hosted_page_logo_image'],
        'removePlayerLogoImage': !exists(json, 'remove_player_logo_image') ? undefined : json['remove_player_logo_image'],
        'removePlayerVideoPosterImage': !exists(json, 'remove_player_video_poster_image') ? undefined : json['remove_player_video_poster_image'],
        'saveAsset': !exists(json, 'save_asset') ? undefined : json['save_asset'],
        'sourceUrl': !exists(json, 'source_url') ? undefined : json['source_url'],
        'targetDeliveryProtocol': !exists(json, 'target_delivery_protocol') ? undefined : json['target_delivery_protocol'],
        'useStreamSource': !exists(json, 'use_stream_source') ? undefined : json['use_stream_source'],
        'username': !exists(json, 'username') ? undefined : json['username'],
        'vodStream': !exists(json, 'vod_stream') ? undefined : json['vod_stream'],
    };
}

export function LiveStreamCreateInputInnerToJSON(value?: LiveStreamCreateInputInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'aspect_ratio_height': value.aspectRatioHeight,
        'aspect_ratio_width': value.aspectRatioWidth,
        'billing_mode': value.billingMode,
        'broadcast_location': BroadcastLocationToJSON(value.broadcastLocation),
        'encoder': value.encoder,
        'name': value.name,
        'transcoder_type': value.transcoderType,
        'closed_caption_type': value.closedCaptionType,
        'delivery_method': value.deliveryMethod,
        'delivery_protocols': value.deliveryProtocols,
        'delivery_type': value.deliveryType,
        'disable_authentication': value.disableAuthentication,
        'hosted_page': value.hostedPage,
        'hosted_page_description': value.hostedPageDescription,
        'hosted_page_logo_image': value.hostedPageLogoImage,
        'hosted_page_sharing_icons': value.hostedPageSharingIcons,
        'hosted_page_title': value.hostedPageTitle,
        'low_latency': value.lowLatency,
        'password': value.password,
        'player_countdown': value.playerCountdown,
        'player_countdown_at': value.playerCountdownAt === undefined ? undefined : (value.playerCountdownAt.toISOString()),
        'player_logo_image': value.playerLogoImage,
        'player_logo_position': value.playerLogoPosition,
        'player_responsive': value.playerResponsive,
        'player_type': value.playerType,
        'player_video_poster_image': value.playerVideoPosterImage,
        'player_width': value.playerWidth,
        'recording': value.recording,
        'reference_id': value.referenceId,
        'remove_hosted_page_logo_image': value.removeHostedPageLogoImage,
        'remove_player_logo_image': value.removePlayerLogoImage,
        'remove_player_video_poster_image': value.removePlayerVideoPosterImage,
        'save_asset': value.saveAsset,
        'source_url': value.sourceUrl,
        'target_delivery_protocol': value.targetDeliveryProtocol,
        'use_stream_source': value.useStreamSource,
        'username': value.username,
        'vod_stream': value.vodStream,
    };
}

