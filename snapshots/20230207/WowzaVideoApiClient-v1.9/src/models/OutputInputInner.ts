/* tslint:disable */
/* eslint-disable */
/**
 * Wowza Video REST API Reference Documentation
 * API lifecycle phase: [Current](https://www.wowza.com/docs/wowza-video-rest-api-lifecycle-management#api-lifecycle0)   <table> <tr style=\"background-color:lightgrey;\"><td> <strong>Want to take the API for a test run?</strong>  All you\'ll need is a [Wowza Video subscription](https://www.wowza.com/pricing), or [free trial](https://www.wowza.com/free-trial), for the API access token. Then, fork [our collection in Postman](https://www.postman.com/wowzavideo/workspace/wowza-video-rest-api) and you\'ll be making calls to our REST API in minutes!  See [Trial the Wowza Video REST API using Postman](https://www.wowza.com/docs/trial-the-wowza-video-rest-api-using-postman) for more information. </td> </tr> <table>    # About the REST API  ___  The Wowza Video<sup>TM</sup> REST API allows you to add live streaming and playback functionality to your applications. It offers complete programmatic control over live streams, transcoders, stream sources, and stream targets. Anything you can do in the Wowza Video UI can also be achieved by making HTTP-based requests to cloud-based servers through the REST API.   ## CORS  The Wowza Video REST API features *cross-origin resource sharing*, or CORS.  CORS is a [W3C specification](https://www.w3.org/TR/cors/) that provides headers in HTTP requests to enable a web server to safely make a network request to another domain.   ## Limits  In order to protect shared resources, the Wowza Video REST API is subject to limits. For details, see [Wowza Video REST API limits](https://www.wowza.com/docs/wowza-video-rest-api-limits).   ## Versions  The Wowza Video REST API is periodically versioned. Minor updates are iterated using sequential dot numbers; major versions are iterated using sequential whole numbers. For details, see [Wowza Video REST API lifecycle management](https://www.wowza.com/docs/wowza-video-rest-api-lifecycle-management).  Each version is one of these types:    * **Beta**: The beta version contains everything that\'s in the current version as well as some features and functionality that are still in development. These work-in-progress features aren\'t fully tested and are subject to change. When we\'re done testing, we\'ll promote the beta version to the current version and then create a new beta with new features. You\'re free to use the beta version for testing and evaluation, but beta versions aren\'t intended for use in production environments and we caution against using a beta in production. There is only one beta version available at any time.   * **Current**: The current version offers the most complete, up-to-date, tested, and stable code base. We strongly recommend using the current version in your production environment. There is only one current version available at any time.   * **Supported 1**: The first supported version was current at one time but has been replaced by a newer version of the API. This version doesn\'t have the newest features, and may contain features or functions that are outdated and don\'t offer the most efficient methods for accomplishing your streaming goals. If you\'re using this version, we recommend that you upgrade to the current version, as soon as possible.   * **Supported 2**: The second supported version is no longer part of our active code base and the functionality is frozen. This version is offered as a convenience as you plan and execute your migration to the current version.   * **Deprecated**: A deprecated version isn\'t guaranteed to work in production environments. While the paths to the endpoints remain operable, the calls are re-routed to the **Supported 2** endpoints. Because of this, if there are compatibility differences between **Deprecated** and **Supported 2**, you\'ll receive error responses on those requests. Also, all relevant documentation is no longer accessible. If you\'re using a deprecated version, update to the current version immediately.   * **Discontinued**: A discontinued version is no longer accessible. This stage was formerly known as **Sunset**.  ### Query for version status  You can use the following GET request to fetch the current status for versions of the REST API.   ```bash  curl -X GET \\  -H \'Authorization: Bearer ${WV_JWT}\' \\  \'https://api.video.wowza.com/api/versions\'  ```   The response should look something like this, but it will differ according to current version status. Note that the beta version is not included in the response.  ```bash  {   \"1.9\": {     \"status\": \"current\",     \"base_uri\": \"/api/v1.9\"      },     \"1.8\": {         \"status\": \"supported\",         \"base_uri\": \"/api/v1.8\"     }     ... }  ```   # Documentation  ___  ## Reference doc  This reference documentation provides details about the operations, parameters, and request and reponse schemas for every resource and endpoint in the Wowza Video REST API.   Samples appear in the right column. Sample requests are presented in cURL (Shell) and JavaScript; some samples also include just the JSON object. Response samples are all JSON. Examples in cURL use environment variables so you can easily copy and paste them. To learn more, see [Using cURL](https://wowza.com/docs/how-to-use-the-wowza-video-rest-api#curl).   Reference documentation is available for every version of the API. Use the **Version** menu at the top of the page to access the reference doc for a different version of the API.   ## Release notes  Release notes are also available for each version. Release notes detail additions, changes, and deletions for each version. To learn more, see [Wowza Video REST API release notes](https://www.wowza.com/docs/wowza-video-rest-api-release-notes).   ## Technical articles  For additional documentation, including more detailed examples on using the Wowza Video REST API, see our [library of Wowza Video REST API technical articles](https://www.wowza.com/docs/wowza-video-rest-api).   # Query requirements  ___  The Wowza Video REST API uses HTTP requests to retrieve data from cloud-based servers. Requests must contain proper JSON, an authentication key, and the correct version number as the base path.   ## Use JSON  The Wowza Video REST API uses the [JSON API specification](http://jsonapi.org/format/) to request and return data. This means requests must include the header `Content-Type: application/json` and must include a single resource object in JSON format as primary data.   Responses include HTTP status codes that indicate whether the query was successful. If there was an error, a description explains the problem so that you can fix it and try again.   ## Authenticate  Requests to the Wowza Video REST API must include headers for authentication.  The Wowza Video REST API version 1.9 uses a JSON Web Token-based authentication scheme. To use JWT-based authentication, you???ll need to create an access token in the [Token Management](https://auth.wowza.com/client/token-management) portal and use it in your API requests. To learn more about JWTs and authenticating API requests, see the [Authentication](https://wowza.com/docs/how-to-use-the-wowza-video-rest-api#authentication).  Once you have a JWT, send it as a bearer token in an Authorization header of your API requests, like this (in cURL):   ```bash  curl -H \'Authorization: Bearer [your JWT]\' \\  ```  ## Specify a version  You must specify the version of the Wowza Video REST API you\'re using for the base path of your request. Use the version number or `beta`, as in  ```  https://api.video.wowza.com/api/v1.9/live_streams  ```  or  ```  https://api.video.wowza.com/api/beta/live_streams  ```  ## Example query  Here is a complete example POST request, in cURL, with proper JSON syntax, headers, authentication, and version information:  ```bash  curl -X POST \\  -H \'Authorization: Bearer [your JWT]\' \\  -H \'Content-Type: application/json\' \\  -d \'{     \"live_stream\": {       \"name\": \"My live Stream\",       \"...\": \"...\"     }   }\' \'https://api.video.wowza.com/api/[version]/live_streams\' ``` 
 *
 * The version of the OpenAPI document: v1.9
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface OutputInputInner
 */
export interface OutputInputInner {
    /**
     * The codec used to encode the video stream. **disabled** sends the stream without a video track and **passthrough** sends the stream without transcoding the video track. Available from version 1.6.
     * @type {string}
     * @memberof OutputInputInner
     */
    videoCodec: OutputInputInnerVideoCodecEnum;
    /**
     * The codec used to encode the audio stream. **disabled** sends the stream without an audio track and **passthrough** sends the stream without transcoding the audio track. **aac** is the most commonly compatible audio codec for protocols, while **opus** is for WebRTC streams. Available from version 1.6.
     * @type {string}
     * @memberof OutputInputInner
     */
    audioCodec: OutputInputInnerAudioCodecEnum;
    /**
     * The height, in pixels, of the output rendition. Should correspond to a widescreen or standard aspect ratio and be divisible by 8. The default is **1080**.

**Example:** <code>"aspect_ratio_height": 1080</code>
     * @type {number}
     * @memberof OutputInputInner
     */
    aspectRatioHeight?: number;
    /**
     * The width, in pixels, of the output rendition. Should correspond to a widescreen or standard aspect ratio and be divisible by 8. The default is **1920**.

**Example:** <code>"aspect_ratio_width": 1920</code>
     * @type {number}
     * @memberof OutputInputInner
     */
    aspectRatioWidth?: number;
    /**
     * The audio bitrate, in kilobits per second (Kbps). Must be between **1** and **9999**. If the **audio_codec** is **opus**, the default is **510**, otherwise the default is **128**.

**Example:** <code>"bitrate_audio": 128</code>
     * @type {number}
     * @memberof OutputInputInner
     */
    bitrateAudio?: number;
    /**
     * The video bitrate, in kilobits per second (Kbps). Must be between **1** and **10240**. The default is **4000**.

**Example:** <code>"bitrate_audio": 1600</code>
     * @type {number}
     * @memberof OutputInputInner
     */
    bitrateVideo?: number;
    /**
     * Reduce the frame rate of the transcoded output rendition. The default, **0**, uses the encoded stream's frame rate without reduction.

**Example:** <code>"frame_reduction": "1/2"</code>
     * @type {string}
     * @memberof OutputInputInner
     */
    framerateReduction?: OutputInputInnerFramerateReductionEnum;
    /**
     * The encoding method. Specify **main** for desktop streaming, **baseline** for playback on mobile devices, or **high** for HD playback. The default is **high**.

**Example:** <code>"h264_profile": "main"</code>
     * @type {string}
     * @memberof OutputInputInner
     */
    h264Profile?: OutputInputInnerH264ProfileEnum;
    /**
     * The interval used to define the compression applied to a group of frames. The default, **follow_source**, uses the keyframe interval of the source video.

**Example:** <code>"keyframes": "follow_source"</code>
     * @type {string}
     * @memberof OutputInputInner
     */
    keyframes?: OutputInputInnerKeyframesEnum;
}


/**
 * @export
 */
export const OutputInputInnerVideoCodecEnum = {
    H264: 'h264',
    Passthrough: 'passthrough',
    Disabled: 'disabled'
} as const;
export type OutputInputInnerVideoCodecEnum = typeof OutputInputInnerVideoCodecEnum[keyof typeof OutputInputInnerVideoCodecEnum];

/**
 * @export
 */
export const OutputInputInnerAudioCodecEnum = {
    Aac: 'aac',
    Opus: 'opus',
    Passthrough: 'passthrough',
    Disabled: 'disabled'
} as const;
export type OutputInputInnerAudioCodecEnum = typeof OutputInputInnerAudioCodecEnum[keyof typeof OutputInputInnerAudioCodecEnum];

/**
 * @export
 */
export const OutputInputInnerFramerateReductionEnum = {
    _0: '0',
    _12: '1/2',
    _14: '1/4',
    _125: '1/25',
    _130: '1/30',
    _150: '1/50',
    _160: '1/60'
} as const;
export type OutputInputInnerFramerateReductionEnum = typeof OutputInputInnerFramerateReductionEnum[keyof typeof OutputInputInnerFramerateReductionEnum];

/**
 * @export
 */
export const OutputInputInnerH264ProfileEnum = {
    Main: 'main',
    Baseline: 'baseline',
    High: 'high'
} as const;
export type OutputInputInnerH264ProfileEnum = typeof OutputInputInnerH264ProfileEnum[keyof typeof OutputInputInnerH264ProfileEnum];

/**
 * @export
 */
export const OutputInputInnerKeyframesEnum = {
    FollowSource: 'follow_source',
    _25: '25',
    _30: '30',
    _50: '50',
    _60: '60',
    _100: '100',
    _120: '120'
} as const;
export type OutputInputInnerKeyframesEnum = typeof OutputInputInnerKeyframesEnum[keyof typeof OutputInputInnerKeyframesEnum];


/**
 * Check if a given object implements the OutputInputInner interface.
 */
export function instanceOfOutputInputInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "videoCodec" in value;
    isInstance = isInstance && "audioCodec" in value;

    return isInstance;
}

export function OutputInputInnerFromJSON(json: any): OutputInputInner {
    return OutputInputInnerFromJSONTyped(json, false);
}

export function OutputInputInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): OutputInputInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'videoCodec': json['video_codec'],
        'audioCodec': json['audio_codec'],
        'aspectRatioHeight': !exists(json, 'aspect_ratio_height') ? undefined : json['aspect_ratio_height'],
        'aspectRatioWidth': !exists(json, 'aspect_ratio_width') ? undefined : json['aspect_ratio_width'],
        'bitrateAudio': !exists(json, 'bitrate_audio') ? undefined : json['bitrate_audio'],
        'bitrateVideo': !exists(json, 'bitrate_video') ? undefined : json['bitrate_video'],
        'framerateReduction': !exists(json, 'framerate_reduction') ? undefined : json['framerate_reduction'],
        'h264Profile': !exists(json, 'h264_profile') ? undefined : json['h264_profile'],
        'keyframes': !exists(json, 'keyframes') ? undefined : json['keyframes'],
    };
}

export function OutputInputInnerToJSON(value?: OutputInputInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'video_codec': value.videoCodec,
        'audio_codec': value.audioCodec,
        'aspect_ratio_height': value.aspectRatioHeight,
        'aspect_ratio_width': value.aspectRatioWidth,
        'bitrate_audio': value.bitrateAudio,
        'bitrate_video': value.bitrateVideo,
        'framerate_reduction': value.framerateReduction,
        'h264_profile': value.h264Profile,
        'keyframes': value.keyframes,
    };
}

