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
import type { AudioCodecMetric } from './AudioCodecMetric';
import {
    AudioCodecMetricFromJSON,
    AudioCodecMetricFromJSONTyped,
    AudioCodecMetricToJSON,
} from './AudioCodecMetric';
import type { BitsInRateMetric } from './BitsInRateMetric';
import {
    BitsInRateMetricFromJSON,
    BitsInRateMetricFromJSONTyped,
    BitsInRateMetricToJSON,
} from './BitsInRateMetric';
import type { BitsOutRateMetric } from './BitsOutRateMetric';
import {
    BitsOutRateMetricFromJSON,
    BitsOutRateMetricFromJSONTyped,
    BitsOutRateMetricToJSON,
} from './BitsOutRateMetric';
import type { BytesInRateMetric } from './BytesInRateMetric';
import {
    BytesInRateMetricFromJSON,
    BytesInRateMetricFromJSONTyped,
    BytesInRateMetricToJSON,
} from './BytesInRateMetric';
import type { BytesOutRateMetric } from './BytesOutRateMetric';
import {
    BytesOutRateMetricFromJSON,
    BytesOutRateMetricFromJSONTyped,
    BytesOutRateMetricToJSON,
} from './BytesOutRateMetric';
import type { ConfiguredBytesOutRateMetric } from './ConfiguredBytesOutRateMetric';
import {
    ConfiguredBytesOutRateMetricFromJSON,
    ConfiguredBytesOutRateMetricFromJSONTyped,
    ConfiguredBytesOutRateMetricToJSON,
} from './ConfiguredBytesOutRateMetric';
import type { ConnectedMetric } from './ConnectedMetric';
import {
    ConnectedMetricFromJSON,
    ConnectedMetricFromJSONTyped,
    ConnectedMetricToJSON,
} from './ConnectedMetric';
import type { FrameRateMetric } from './FrameRateMetric';
import {
    FrameRateMetricFromJSON,
    FrameRateMetricFromJSONTyped,
    FrameRateMetricToJSON,
} from './FrameRateMetric';
import type { FrameSizeMetric } from './FrameSizeMetric';
import {
    FrameSizeMetricFromJSON,
    FrameSizeMetricFromJSONTyped,
    FrameSizeMetricToJSON,
} from './FrameSizeMetric';
import type { HeightMetric } from './HeightMetric';
import {
    HeightMetricFromJSON,
    HeightMetricFromJSONTyped,
    HeightMetricToJSON,
} from './HeightMetric';
import type { KeyframeIntervalMetric } from './KeyframeIntervalMetric';
import {
    KeyframeIntervalMetricFromJSON,
    KeyframeIntervalMetricFromJSONTyped,
    KeyframeIntervalMetricToJSON,
} from './KeyframeIntervalMetric';
import type { StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetric } from './StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetric';
import {
    StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetricFromJSON,
    StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetricFromJSONTyped,
    StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetricToJSON,
} from './StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetric';
import type { UniqueViewsMetric } from './UniqueViewsMetric';
import {
    UniqueViewsMetricFromJSON,
    UniqueViewsMetricFromJSONTyped,
    UniqueViewsMetricToJSON,
} from './UniqueViewsMetric';
import type { VideoCodecMetric } from './VideoCodecMetric';
import {
    VideoCodecMetricFromJSON,
    VideoCodecMetricFromJSONTyped,
    VideoCodecMetricToJSON,
} from './VideoCodecMetric';
import type { WidthMetric } from './WidthMetric';
import {
    WidthMetricFromJSON,
    WidthMetricFromJSONTyped,
    WidthMetricToJSON,
} from './WidthMetric';

/**
 * 
 * @export
 * @interface ShmMetrics
 */
export interface ShmMetrics {
    /**
     * 
     * @type {AudioCodecMetric}
     * @memberof ShmMetrics
     */
    audioCodec?: AudioCodecMetric;
    /**
     * 
     * @type {BitsInRateMetric}
     * @memberof ShmMetrics
     */
    bitsInRate?: BitsInRateMetric;
    /**
     * 
     * @type {BitsOutRateMetric}
     * @memberof ShmMetrics
     */
    bitsOutRate?: BitsOutRateMetric;
    /**
     * 
     * @type {BytesInRateMetric}
     * @memberof ShmMetrics
     */
    bytesInRate?: BytesInRateMetric;
    /**
     * 
     * @type {BytesOutRateMetric}
     * @memberof ShmMetrics
     */
    bytesOutRate?: BytesOutRateMetric;
    /**
     * 
     * @type {ConfiguredBytesOutRateMetric}
     * @memberof ShmMetrics
     */
    configuredBytesOutRate?: ConfiguredBytesOutRateMetric;
    /**
     * 
     * @type {ConnectedMetric}
     * @memberof ShmMetrics
     */
    connected?: ConnectedMetric;
    /**
     * 
     * @type {FrameSizeMetric}
     * @memberof ShmMetrics
     */
    frameSize?: FrameSizeMetric;
    /**
     * 
     * @type {FrameRateMetric}
     * @memberof ShmMetrics
     */
    frameRate?: FrameRateMetric;
    /**
     * 
     * @type {HeightMetric}
     * @memberof ShmMetrics
     */
    height?: HeightMetric;
    /**
     * 
     * @type {KeyframeIntervalMetric}
     * @memberof ShmMetrics
     */
    keyframeInterval?: KeyframeIntervalMetric;
    /**
     * 
     * @type {StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetric}
     * @memberof ShmMetrics
     */
    streamTargetStatusOUTPUTIDXSTREAMTARGETIDX?: StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetric;
    /**
     * 
     * @type {UniqueViewsMetric}
     * @memberof ShmMetrics
     */
    uniqueViews?: UniqueViewsMetric;
    /**
     * 
     * @type {VideoCodecMetric}
     * @memberof ShmMetrics
     */
    videoCodec?: VideoCodecMetric;
    /**
     * 
     * @type {WidthMetric}
     * @memberof ShmMetrics
     */
    width?: WidthMetric;
}

/**
 * Check if a given object implements the ShmMetrics interface.
 */
export function instanceOfShmMetrics(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ShmMetricsFromJSON(json: any): ShmMetrics {
    return ShmMetricsFromJSONTyped(json, false);
}

export function ShmMetricsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShmMetrics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'audioCodec': !exists(json, 'audio_codec') ? undefined : AudioCodecMetricFromJSON(json['audio_codec']),
        'bitsInRate': !exists(json, 'bits_in_rate') ? undefined : BitsInRateMetricFromJSON(json['bits_in_rate']),
        'bitsOutRate': !exists(json, 'bits_out_rate') ? undefined : BitsOutRateMetricFromJSON(json['bits_out_rate']),
        'bytesInRate': !exists(json, 'bytes_in_rate') ? undefined : BytesInRateMetricFromJSON(json['bytes_in_rate']),
        'bytesOutRate': !exists(json, 'bytes_out_rate') ? undefined : BytesOutRateMetricFromJSON(json['bytes_out_rate']),
        'configuredBytesOutRate': !exists(json, 'configured_bytes_out_rate') ? undefined : ConfiguredBytesOutRateMetricFromJSON(json['configured_bytes_out_rate']),
        'connected': !exists(json, 'connected') ? undefined : ConnectedMetricFromJSON(json['connected']),
        'frameSize': !exists(json, 'frame_size') ? undefined : FrameSizeMetricFromJSON(json['frame_size']),
        'frameRate': !exists(json, 'frame_rate') ? undefined : FrameRateMetricFromJSON(json['frame_rate']),
        'height': !exists(json, 'height') ? undefined : HeightMetricFromJSON(json['height']),
        'keyframeInterval': !exists(json, 'keyframe_interval') ? undefined : KeyframeIntervalMetricFromJSON(json['keyframe_interval']),
        'streamTargetStatusOUTPUTIDXSTREAMTARGETIDX': !exists(json, 'stream_target_status_OUTPUTIDX_STREAMTARGETIDX') ? undefined : StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetricFromJSON(json['stream_target_status_OUTPUTIDX_STREAMTARGETIDX']),
        'uniqueViews': !exists(json, 'unique_views') ? undefined : UniqueViewsMetricFromJSON(json['unique_views']),
        'videoCodec': !exists(json, 'video_codec') ? undefined : VideoCodecMetricFromJSON(json['video_codec']),
        'width': !exists(json, 'width') ? undefined : WidthMetricFromJSON(json['width']),
    };
}

export function ShmMetricsToJSON(value?: ShmMetrics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'audio_codec': AudioCodecMetricToJSON(value.audioCodec),
        'bits_in_rate': BitsInRateMetricToJSON(value.bitsInRate),
        'bits_out_rate': BitsOutRateMetricToJSON(value.bitsOutRate),
        'bytes_in_rate': BytesInRateMetricToJSON(value.bytesInRate),
        'bytes_out_rate': BytesOutRateMetricToJSON(value.bytesOutRate),
        'configured_bytes_out_rate': ConfiguredBytesOutRateMetricToJSON(value.configuredBytesOutRate),
        'connected': ConnectedMetricToJSON(value.connected),
        'frame_size': FrameSizeMetricToJSON(value.frameSize),
        'frame_rate': FrameRateMetricToJSON(value.frameRate),
        'height': HeightMetricToJSON(value.height),
        'keyframe_interval': KeyframeIntervalMetricToJSON(value.keyframeInterval),
        'stream_target_status_OUTPUTIDX_STREAMTARGETIDX': StreamTargetStatusOUTPUTIDXSTREAMTARGETIDXMetricToJSON(value.streamTargetStatusOUTPUTIDXSTREAMTARGETIDX),
        'unique_views': UniqueViewsMetricToJSON(value.uniqueViews),
        'video_codec': VideoCodecMetricToJSON(value.videoCodec),
        'width': WidthMetricToJSON(value.width),
    };
}

