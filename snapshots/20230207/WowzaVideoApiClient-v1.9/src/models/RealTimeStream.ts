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
 * @interface RealTimeStream
 */
export interface RealTimeStream {
    /**
     * The date and time that the real-time stream was created.
     * @type {Date}
     * @memberof RealTimeStream
     */
    createdAt?: Date;
    /**
     * The unique identifier of the real-time stream. Use this ID to perform other operations on the stream, like getting the details of the stream or deleting it.
     * @type {string}
     * @memberof RealTimeStream
     */
    id?: string;
    /**
     * A descriptive name for the real-time stream.
     * @type {string}
     * @memberof RealTimeStream
     */
    name?: string;
    /**
     * The generated alphanumeric stream name you pass to the SDK.
     * @type {string}
     * @memberof RealTimeStream
     */
    streamName?: string;
    /**
     * The authentication token you pass to the SDK.
     * @type {string}
     * @memberof RealTimeStream
     */
    token?: string;
    /**
     * A secure token that must be passed by viewers for playback. Generated after you set *enable_secure_viewer* to **true**.
     * @type {string}
     * @memberof RealTimeStream
     */
    subscribeToken?: string;
    /**
     * The URL you can use to configure an RTMP encoder as the source.
     * @type {string}
     * @memberof RealTimeStream
     */
    rtmpUrl?: string;
    /**
     * Require viewers to pass a security token for playback.
     * @type {boolean}
     * @memberof RealTimeStream
     */
    enableSecureViewer?: boolean;
    /**
     * The date and time the security token expires. Specify **YYYY-MM-DD HH:MM:SS**, where **HH** is a 24-hour clock in UTC. If you don't specify **HH:MM:SS**, the token expires at 12AM UTC on the specified day. Required when *enable_secure_viewer* is **true**.
     * @type {Date}
     * @memberof RealTimeStream
     */
    expiresOn?: Date;
    /**
     * The state of the stream.
     * @type {string}
     * @memberof RealTimeStream
     */
    state?: string;
    /**
     * An option to set the regional server the stream is distributed through. Select the region closest to your broadcast location for the most reliable stream.

Default: americas

<blockquote>Note: You can't update this value after you create the stream.</blockquote>

**Example:** <code>"region": emea</code>
     * @type {string}
     * @memberof RealTimeStream
     */
    region?: RealTimeStreamRegionEnum;
    /**
     * If **true**, records the real-time stream so you can download an MP4 later. The recording starts when the stream starts and stops automatically when the stream stops.

Recordings for real-time streams capture up to twelve hours of content in a single MP4 file. If the real-time stream recording is longer twelve hours, you'll have multiple files for the recording.

**Default:** false

<blockquote>Note: You can't update this value after you create the stream.</blockquote>

**Example:** <code>"recording": true</code>
     * @type {boolean}
     * @memberof RealTimeStream
     */
    recording?: boolean;
    /**
     * The date and time the real-time stream was updated.
     * @type {Date}
     * @memberof RealTimeStream
     */
    updatedAt?: Date;
}


/**
 * @export
 */
export const RealTimeStreamRegionEnum = {
    Americas: 'americas',
    Emea: 'emea'
} as const;
export type RealTimeStreamRegionEnum = typeof RealTimeStreamRegionEnum[keyof typeof RealTimeStreamRegionEnum];


/**
 * Check if a given object implements the RealTimeStream interface.
 */
export function instanceOfRealTimeStream(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RealTimeStreamFromJSON(json: any): RealTimeStream {
    return RealTimeStreamFromJSONTyped(json, false);
}

export function RealTimeStreamFromJSONTyped(json: any, ignoreDiscriminator: boolean): RealTimeStream {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'streamName': !exists(json, 'stream_name') ? undefined : json['stream_name'],
        'token': !exists(json, 'token') ? undefined : json['token'],
        'subscribeToken': !exists(json, 'subscribe_token') ? undefined : json['subscribe_token'],
        'rtmpUrl': !exists(json, 'rtmp_url') ? undefined : json['rtmp_url'],
        'enableSecureViewer': !exists(json, 'enable_secure_viewer') ? undefined : json['enable_secure_viewer'],
        'expiresOn': !exists(json, 'expires_on') ? undefined : (new Date(json['expires_on'])),
        'state': !exists(json, 'state') ? undefined : json['state'],
        'region': !exists(json, 'region') ? undefined : json['region'],
        'recording': !exists(json, 'recording') ? undefined : json['recording'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
    };
}

export function RealTimeStreamToJSON(value?: RealTimeStream | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'id': value.id,
        'name': value.name,
        'stream_name': value.streamName,
        'token': value.token,
        'subscribe_token': value.subscribeToken,
        'rtmp_url': value.rtmpUrl,
        'enable_secure_viewer': value.enableSecureViewer,
        'expires_on': value.expiresOn === undefined ? undefined : (value.expiresOn.toISOString()),
        'state': value.state,
        'region': value.region,
        'recording': value.recording,
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}

