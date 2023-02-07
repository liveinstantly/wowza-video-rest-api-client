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
/**
 * 
 * @export
 * @interface VodStream
 */
export interface VodStream {
    /**
     * Only applies to VOD streams created for Asset Management. The id for the asset associated with your VOD stream. You can manage your asset in Asset Management.
     * @type {string}
     * @memberof VodStream
     */
    assetId?: string;
    /**
     * The date and time that the VOD stream was created.
     * @type {Date}
     * @memberof VodStream
     */
    createdAt?: Date;
    /**
     * The duration of the VOD stream.
     * @type {number}
     * @memberof VodStream
     */
    duration?: number;
    /**
     * The media sequence number of the last media segment in the chunklist.
     * @type {number}
     * @memberof VodStream
     */
    endSegment?: number;
    /**
     * The unique alphanumeric string that identifies the VOD stream.
     * @type {string}
     * @memberof VodStream
     */
    id?: string;
    /**
     * A descriptive name for the VOD stream. Maximum 200 characters.
     * @type {string}
     * @memberof VodStream
     */
    name?: string;
    /**
     * The processing progress of the VOD stream.
     * @type {number}
     * @memberof VodStream
     */
    percentComplete?: number;
    /**
     * Specifies whether playback is enabled for the VOD stream.
     * @type {boolean}
     * @memberof VodStream
     */
    playbackEnabled?: VodStreamPlaybackEnabledEnum;
    /**
     * The address that can be used to configure playback of the VOD stream.
     * @type {string}
     * @memberof VodStream
     */
    playbackUrl?: string;
    /**
     * The size of the VOD stream.
     * @type {number}
     * @memberof VodStream
     */
    size?: number;
    /**
     * The date and time that the stream was started.
     * @type {Date}
     * @memberof VodStream
     */
    startedAt?: Date;
    /**
     * The media sequence number of the first media segment in the chunklist.
     * @type {number}
     * @memberof VodStream
     */
    startSegment?: number;
    /**
     * The state of the VOD stream.
     * @type {string}
     * @memberof VodStream
     */
    state?: VodStreamStateEnum;
    /**
     * The unique alphanumeric string that identifies the stream target associated with the VOD stream.
     * @type {number}
     * @memberof VodStream
     */
    streamTargetId?: number;
    /**
     * The source from which the VOD stream was created. The default is **live**.
     * @type {string}
     * @memberof VodStream
     */
    source?: string;
    /**
     * The VOD stream type.
     * @type {string}
     * @memberof VodStream
     */
    type?: string;
    /**
     * The date and time that the VOD stream was updated.
     * @type {Date}
     * @memberof VodStream
     */
    updatedAt?: Date;
    /**
     * The unique identifier associated with a specific uptime period of a transcoder.
     * @type {string}
     * @memberof VodStream
     */
    uptimeId?: string;
}


/**
 * @export
 */
export const VodStreamPlaybackEnabledEnum = {
    True: true,
    False: false
} as const;
export type VodStreamPlaybackEnabledEnum = typeof VodStreamPlaybackEnabledEnum[keyof typeof VodStreamPlaybackEnabledEnum];

/**
 * @export
 */
export const VodStreamStateEnum = {
    Processing: 'processing',
    Completed: 'completed',
    Failed: 'failed'
} as const;
export type VodStreamStateEnum = typeof VodStreamStateEnum[keyof typeof VodStreamStateEnum];


/**
 * Check if a given object implements the VodStream interface.
 */
export function instanceOfVodStream(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VodStreamFromJSON(json: any): VodStream {
    return VodStreamFromJSONTyped(json, false);
}

export function VodStreamFromJSONTyped(json: any, ignoreDiscriminator: boolean): VodStream {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'assetId': !exists(json, 'asset_id') ? undefined : json['asset_id'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'endSegment': !exists(json, 'end_segment') ? undefined : json['end_segment'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'percentComplete': !exists(json, 'percent_complete') ? undefined : json['percent_complete'],
        'playbackEnabled': !exists(json, 'playback_enabled') ? undefined : json['playback_enabled'],
        'playbackUrl': !exists(json, 'playback_url') ? undefined : json['playback_url'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'startedAt': !exists(json, 'started_at') ? undefined : (new Date(json['started_at'])),
        'startSegment': !exists(json, 'start_segment') ? undefined : json['start_segment'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'streamTargetId': !exists(json, 'stream_target_id') ? undefined : json['stream_target_id'],
        'source': !exists(json, 'source') ? undefined : json['source'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'uptimeId': !exists(json, 'uptime_id') ? undefined : json['uptime_id'],
    };
}

export function VodStreamToJSON(value?: VodStream | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'asset_id': value.assetId,
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'duration': value.duration,
        'end_segment': value.endSegment,
        'id': value.id,
        'name': value.name,
        'percent_complete': value.percentComplete,
        'playback_enabled': value.playbackEnabled,
        'playback_url': value.playbackUrl,
        'size': value.size,
        'started_at': value.startedAt === undefined ? undefined : (value.startedAt.toISOString()),
        'start_segment': value.startSegment,
        'state': value.state,
        'stream_target_id': value.streamTargetId,
        'source': value.source,
        'type': value.type,
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'uptime_id': value.uptimeId,
    };
}

