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
import type { StreamTargetFastlyPlaybackUrls } from './StreamTargetFastlyPlaybackUrls';
import {
    StreamTargetFastlyPlaybackUrlsFromJSON,
    StreamTargetFastlyPlaybackUrlsFromJSONTyped,
    StreamTargetFastlyPlaybackUrlsToJSON,
} from './StreamTargetFastlyPlaybackUrls';

/**
 * 
 * @export
 * @interface StreamTargetFastlyPatchResponse
 */
export interface StreamTargetFastlyPatchResponse {
    /**
     * The date and time that the stream target was created.
     * @type {Date}
     * @memberof StreamTargetFastlyPatchResponse
     */
    createdAt?: Date;
    /**
     * The region where your Wowza Streaming Engine instance is located. Available from version 1.6.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    customOriginRegion?: string;
    /**
     * The Wowza Streaming Engine instance's domain or IP address. Available from version 1.6.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    customOriginUrl?: string;
    /**
     * An array of the delivery protocols available for this stream target. Available from version 1.7.
     * @type {Array<string>}
     * @memberof StreamTargetFastlyPatchResponse
     */
    deliveryProtocols?: Array<string>;
    /**
     * If **true**, requires users to play the stream over HTTPS. If **false**, the default, users can play the stream over HTTPS or HTTP.
     * @type {boolean}
     * @memberof StreamTargetFastlyPatchResponse
     */
    forceSslPlayback?: boolean;
    /**
     * If **true**, controls access to the stream from specific locations and, optionally, IP addresses. The default is **false**.
     * @type {boolean}
     * @memberof StreamTargetFastlyPatchResponse
     */
    geoblockEnabled?: boolean;
    /**
     * Specifies whether to **allow** or **deny** access to the stream from specific locations. The default is **disabled**.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    geoblockByLocation?: StreamTargetFastlyPatchResponseGeoblockByLocationEnum;
    /**
     * Required when *geoblock_by_location* is **allow** or **deny**. The locations affected by the geo-blocking. Enter a comma-separated list of capitalized two-letter ISO 3166-1 country codes. For a list, see [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) on Wikipedia.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    geoblockCountryCodes?: string;
    /**
     * Specifies whether specific IP addresses can override the locations that are allowed or restricted. **allow** permits access from IP addresses within a location that's been blocked, while **deny** restricts access from IP addresses within locations that are allowed. The default is **disabled**.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    geoblockIpOverride?: StreamTargetFastlyPatchResponseGeoblockIpOverrideEnum;
    /**
     * Required when *geoblock_ip_override* is **allow** or **deny**. Addresses that can access or restrict the stream even if they're within a specified geo-blocked location. Enter a comma-separated list of IPv4 and IPv6 IP addresses that always allow or deny streaming based on the *geoblock_ip_override* value.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    geoblockIpAddresses?: string;
    /**
     * The unique alphanumeric string that identifies the stream target.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    id?: string;
    /**
     * A descriptive name for the stream target. Maximum 255 characters.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    name?: string;
    /**
     * 
     * @type {StreamTargetFastlyPlaybackUrls}
     * @memberof StreamTargetFastlyPatchResponse
     */
    playbackUrls?: StreamTargetFastlyPlaybackUrls;
    /**
     * If **true**, controls access to the stream from specific domains. The client or player requesting access to the stream must send the Referer header so the origin of the request can be validated. The default is **false**.

**Note:** If you change *referer_enabled* to **false** after configuring the referer policy, then later re-enable it, you'll need to re-configure the other referer policy values as well.

Available from version 1.7. For more information about the Referer header, see the [HTTP specification](https://tools.ietf.org/html/rfc7231#section-5.5.2).
     * @type {boolean}
     * @memberof StreamTargetFastlyPatchResponse
     */
    refererEnabled?: boolean;
    /**
     * The Referer header sent by the client or player can be empty and not identify the origin of the request. The default is **false** when *referer_enabled* is **true**. While less secure, if you know you'll have viewers with a client or player that won't send a Referer header, you can specify **true** to allow an empty Referer header so those viewers can still access the stream.

Available from version 1.7.
     * @type {boolean}
     * @memberof StreamTargetFastlyPatchResponse
     */
    refererAllowEmpty?: boolean;
    /**
     * Specifies whether to **allow** or **deny** access to the stream from specific domains. The default is **allow** when *referer_enabled* is **true**. Specify the domains to allow or deny in *referer_domains*.

Available from version 1.7.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    refererPolicy?: StreamTargetFastlyPatchResponseRefererPolicyEnum;
    /**
     * Domains that are either allowed or blocked from accessing the stream. Enter a comma-separated list of domains that are always allowed or denied access based on the *referer_policy* value. Required when *referer_enabled* is **true**.

We recommend you enter the simplest form of the domain as possible, but you do need to build out the domain to the level of subdomains you want to allow or deny. You can fully express to the subdomain (_mysubdomain.example.com_) to specify that single, specific subdomain or you can use a wildcard (&#42;) to cover all subdomains at a specific level (_&#42;.example.com_).

**Example:** _example.com, *.example.com, *.mysubdomain.example.com_

If you entered the above example value for *referer_domains*, and *referer_policy* is **allow**, the following domains are allowed access to the stream: <ul> <li>https://example.com</li> <li>https://subdomain.example.com, https://subdomain2.example.com, etc.</li> <li>https://subdomainA.mysubdomain.example.com, https://subdomainB.mysubdomain.example.com, etc.</li> </ul>

Available from version 1.7.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    refererDomains?: string;
    /**
     * The state of the stream target.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    state?: StreamTargetFastlyPatchResponseStateEnum;
    /**
     * The name of the stream being ingested into the target.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    streamName?: string;
    /**
     * If **true**, token authentication protects the stream by ensuring that it's delivered only to authorized viewers and can't be shared by unauthorized links or player hijacking attacks. The default is **false**.
     * @type {boolean}
     * @memberof StreamTargetFastlyPatchResponse
     */
    tokenAuthEnabled?: boolean;
    /**
     * The shared secret of the token authentication. Must contain only hexadecimal characters and be an even number of total characters not exceeding 32.
     * @type {string}
     * @memberof StreamTargetFastlyPatchResponse
     */
    tokenAuthSharedSecret?: string;
    /**
     *  If **true**, Wowza Video uses token authentication to protect the master playlist only and leaves individual media playlists and media segments unprotected. This feature enables playback compatibility with media players that don’t support the *withCredentials* property. It may also be useful when addressing token auth compatibility issues with specific browsers. The default is **false**.
     * @type {boolean}
     * @memberof StreamTargetFastlyPatchResponse
     */
    tokenAuthPlaylistOnly?: boolean;
    /**
     * The date and time that the stream target was updated.
     * @type {Date}
     * @memberof StreamTargetFastlyPatchResponse
     */
    updatedAt?: Date;
}


/**
 * @export
 */
export const StreamTargetFastlyPatchResponseGeoblockByLocationEnum = {
    Allow: 'allow',
    Deny: 'deny',
    Disabled: 'disabled'
} as const;
export type StreamTargetFastlyPatchResponseGeoblockByLocationEnum = typeof StreamTargetFastlyPatchResponseGeoblockByLocationEnum[keyof typeof StreamTargetFastlyPatchResponseGeoblockByLocationEnum];

/**
 * @export
 */
export const StreamTargetFastlyPatchResponseGeoblockIpOverrideEnum = {
    Allow: 'allow',
    Deny: 'deny',
    Disabled: 'disabled'
} as const;
export type StreamTargetFastlyPatchResponseGeoblockIpOverrideEnum = typeof StreamTargetFastlyPatchResponseGeoblockIpOverrideEnum[keyof typeof StreamTargetFastlyPatchResponseGeoblockIpOverrideEnum];

/**
 * @export
 */
export const StreamTargetFastlyPatchResponseRefererPolicyEnum = {
    Allow: 'allow',
    Deny: 'deny'
} as const;
export type StreamTargetFastlyPatchResponseRefererPolicyEnum = typeof StreamTargetFastlyPatchResponseRefererPolicyEnum[keyof typeof StreamTargetFastlyPatchResponseRefererPolicyEnum];

/**
 * @export
 */
export const StreamTargetFastlyPatchResponseStateEnum = {
    Activated: 'activated',
    Archived: 'archived'
} as const;
export type StreamTargetFastlyPatchResponseStateEnum = typeof StreamTargetFastlyPatchResponseStateEnum[keyof typeof StreamTargetFastlyPatchResponseStateEnum];


/**
 * Check if a given object implements the StreamTargetFastlyPatchResponse interface.
 */
export function instanceOfStreamTargetFastlyPatchResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StreamTargetFastlyPatchResponseFromJSON(json: any): StreamTargetFastlyPatchResponse {
    return StreamTargetFastlyPatchResponseFromJSONTyped(json, false);
}

export function StreamTargetFastlyPatchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): StreamTargetFastlyPatchResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'customOriginRegion': !exists(json, 'custom_origin_region') ? undefined : json['custom_origin_region'],
        'customOriginUrl': !exists(json, 'custom_origin_url') ? undefined : json['custom_origin_url'],
        'deliveryProtocols': !exists(json, 'delivery_protocols') ? undefined : json['delivery_protocols'],
        'forceSslPlayback': !exists(json, 'force_ssl_playback') ? undefined : json['force_ssl_playback'],
        'geoblockEnabled': !exists(json, 'geoblock_enabled') ? undefined : json['geoblock_enabled'],
        'geoblockByLocation': !exists(json, 'geoblock_by_location') ? undefined : json['geoblock_by_location'],
        'geoblockCountryCodes': !exists(json, 'geoblock_country_codes') ? undefined : json['geoblock_country_codes'],
        'geoblockIpOverride': !exists(json, 'geoblock_ip_override') ? undefined : json['geoblock_ip_override'],
        'geoblockIpAddresses': !exists(json, 'geoblock_ip_addresses') ? undefined : json['geoblock_ip_addresses'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'playbackUrls': !exists(json, 'playback_urls') ? undefined : StreamTargetFastlyPlaybackUrlsFromJSON(json['playback_urls']),
        'refererEnabled': !exists(json, 'referer_enabled') ? undefined : json['referer_enabled'],
        'refererAllowEmpty': !exists(json, 'referer_allow_empty') ? undefined : json['referer_allow_empty'],
        'refererPolicy': !exists(json, 'referer_policy') ? undefined : json['referer_policy'],
        'refererDomains': !exists(json, 'referer_domains') ? undefined : json['referer_domains'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'streamName': !exists(json, 'stream_name') ? undefined : json['stream_name'],
        'tokenAuthEnabled': !exists(json, 'token_auth_enabled') ? undefined : json['token_auth_enabled'],
        'tokenAuthSharedSecret': !exists(json, 'token_auth_shared_secret') ? undefined : json['token_auth_shared_secret'],
        'tokenAuthPlaylistOnly': !exists(json, 'token_auth_playlist_only') ? undefined : json['token_auth_playlist_only'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
    };
}

export function StreamTargetFastlyPatchResponseToJSON(value?: StreamTargetFastlyPatchResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'custom_origin_region': value.customOriginRegion,
        'custom_origin_url': value.customOriginUrl,
        'delivery_protocols': value.deliveryProtocols,
        'force_ssl_playback': value.forceSslPlayback,
        'geoblock_enabled': value.geoblockEnabled,
        'geoblock_by_location': value.geoblockByLocation,
        'geoblock_country_codes': value.geoblockCountryCodes,
        'geoblock_ip_override': value.geoblockIpOverride,
        'geoblock_ip_addresses': value.geoblockIpAddresses,
        'id': value.id,
        'name': value.name,
        'playback_urls': StreamTargetFastlyPlaybackUrlsToJSON(value.playbackUrls),
        'referer_enabled': value.refererEnabled,
        'referer_allow_empty': value.refererAllowEmpty,
        'referer_policy': value.refererPolicy,
        'referer_domains': value.refererDomains,
        'state': value.state,
        'stream_name': value.streamName,
        'token_auth_enabled': value.tokenAuthEnabled,
        'token_auth_shared_secret': value.tokenAuthSharedSecret,
        'token_auth_playlist_only': value.tokenAuthPlaylistOnly,
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}
