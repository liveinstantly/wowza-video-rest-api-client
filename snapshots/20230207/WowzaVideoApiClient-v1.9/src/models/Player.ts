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
 * @interface Player
 */
export interface Player {
    /**
     * A clock that appears in the player before the event and counts down to the start of the stream. Specify **true** to display the countdown clock. The default is **false**.
     * @type {boolean}
     * @memberof Player
     */
    countdown?: boolean;
    /**
     * The date and time that the event starts, used by the countdown clock. Enter **YYYY-MM-DD HH:MM:SS** where **HH** is a 24-hour clock in UTC.
     * @type {Date}
     * @memberof Player
     */
    countdownAt?: Date;
    /**
     * The date and time that the player was created.
     * @type {Date}
     * @memberof Player
     */
    createdAt?: Date;
    /**
     * The HTML code that can be used in an external webpage to host the Wowza Flowplayer.
     * @type {string}
     * @memberof Player
     */
    embedCode?: string;
    /**
     * The address that can be used to configure playback of the stream using the HLS protocol.
     * @type {string}
     * @memberof Player
     */
    hlsPlaybackUrl?: string;
    /**
     * A web page hosted by Wowza Video that includes a player for the live stream. The default, **true**, creates a hosted page. Specify **false** to not create a hosted web page.
     * @type {boolean}
     * @memberof Player
     */
    hostedPage?: boolean;
    /**
     * A description that appears on the hosted page below the player. Can't include custom HTML, JavaScript, or other tags.
     * @type {string}
     * @memberof Player
     */
    hostedPageDescription?: string;
    /**
     * The path to a GIF, JPEG, or PNG logo file that appears in the upper-left corner of the hosted page. Logo file must be 2.5 MB or smaller.
     * @type {string}
     * @memberof Player
     */
    hostedPageLogoImageUrl?: string;
    /**
     * Icons that let viewers share the stream on Facebook, Google+, Twitter, and by email. The default, **true**, includes sharing icons on the hosted page. Specify **false** to omit sharing icons.
     * @type {string}
     * @memberof Player
     */
    hostedPageSharingIcons?: string;
    /**
     * A title for the page that appears above the player. Can't include custom HTML, JavaScript, or other tags.
     * @type {string}
     * @memberof Player
     */
    hostedPageTitle?: string;
    /**
     * The URL of the Wowza Video-hosted webpage that viewers can visit to watch the stream.
     * @type {string}
     * @memberof Player
     */
    hostedPageUrl?: string;
    /**
     * The unique alphanumeric string that identifies the player.
     * @type {string}
     * @memberof Player
     */
    id?: string;
    /**
     * The path to a GIF, JPEG, or PNG logo file that appears partially transparent in a corner of the player throughout playback. Logo file must be 2.5 MB or smaller.
     * @type {string}
     * @memberof Player
     */
    logoImageUrl?: string;
    /**
     * The corner of the player in which you want the player logo to appear. The default is **top-left**.
     * @type {string}
     * @memberof Player
     */
    logoPosition?: string;
    /**
     * A player whose size adjusts according to the device on which it's being viewed. If **true**, creates a responsive player. If **false**, specify a **width**.
     * @type {boolean}
     * @memberof Player
     */
    responsive?: boolean;
    /**
     * The unique alphanumeric string that identifies the transcoder.
     * @type {string}
     * @memberof Player
     */
    transcoderId?: string;
    /**
     * The player you want to use.

**Wowza Video subscribers**</br> Wowza Flowplayer (wowza_flowplayer) is the only valid option. You're a subscriber if you have access to Asset Management and Historic and Live Analytics in the user interface.

The Wowza Flowplayer is an easy-to-use, commercial grade player designed for builders and developers. It provides HTML5, HLS, and MPEG-DASH playback and plays streams on any browser and device. It can be [customized](https://www.wowza.com/docs/embed-and-customize-wowza-flowplayer-in-your-site) if you embed it in your site.

**Other subscribers**</br> original _html5 and wowza_player are the only valid options and original_html5 is the default. **original_html5** provides HTML5 playback and falls back to Flash on older browsers. **wowza_player** requires that *target_delivery_protocol* be **hls-https** and *closed_caption_type* be **none**.
     * @type {string}
     * @memberof Player
     */
    type?: string;
    /**
     * The date and time that the player was updated.
     * @type {Date}
     * @memberof Player
     */
    updatedAt?: Date;
    /**
     * The path to a GIF, JPEG, or PNG poster image that appears in the player before the stream begins. Poster image files must be 2.5 MB or smaller.
     * @type {string}
     * @memberof Player
     */
    videoPosterImageUrl?: string;
    /**
     * The width, in pixels, of a fixed-size player. The default is **640**.
     * @type {number}
     * @memberof Player
     */
    width?: number;
}

/**
 * Check if a given object implements the Player interface.
 */
export function instanceOfPlayer(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PlayerFromJSON(json: any): Player {
    return PlayerFromJSONTyped(json, false);
}

export function PlayerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Player {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'countdown': !exists(json, 'countdown') ? undefined : json['countdown'],
        'countdownAt': !exists(json, 'countdown_at') ? undefined : (new Date(json['countdown_at'])),
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'embedCode': !exists(json, 'embed_code') ? undefined : json['embed_code'],
        'hlsPlaybackUrl': !exists(json, 'hls_playback_url') ? undefined : json['hls_playback_url'],
        'hostedPage': !exists(json, 'hosted_page') ? undefined : json['hosted_page'],
        'hostedPageDescription': !exists(json, 'hosted_page_description') ? undefined : json['hosted_page_description'],
        'hostedPageLogoImageUrl': !exists(json, 'hosted_page_logo_image_url') ? undefined : json['hosted_page_logo_image_url'],
        'hostedPageSharingIcons': !exists(json, 'hosted_page_sharing_icons') ? undefined : json['hosted_page_sharing_icons'],
        'hostedPageTitle': !exists(json, 'hosted_page_title') ? undefined : json['hosted_page_title'],
        'hostedPageUrl': !exists(json, 'hosted_page_url') ? undefined : json['hosted_page_url'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'logoImageUrl': !exists(json, 'logo_image_url') ? undefined : json['logo_image_url'],
        'logoPosition': !exists(json, 'logo_position') ? undefined : json['logo_position'],
        'responsive': !exists(json, 'responsive') ? undefined : json['responsive'],
        'transcoderId': !exists(json, 'transcoder_id') ? undefined : json['transcoder_id'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'videoPosterImageUrl': !exists(json, 'video_poster_image_url') ? undefined : json['video_poster_image_url'],
        'width': !exists(json, 'width') ? undefined : json['width'],
    };
}

export function PlayerToJSON(value?: Player | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'countdown': value.countdown,
        'countdown_at': value.countdownAt === undefined ? undefined : (value.countdownAt.toISOString()),
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'embed_code': value.embedCode,
        'hls_playback_url': value.hlsPlaybackUrl,
        'hosted_page': value.hostedPage,
        'hosted_page_description': value.hostedPageDescription,
        'hosted_page_logo_image_url': value.hostedPageLogoImageUrl,
        'hosted_page_sharing_icons': value.hostedPageSharingIcons,
        'hosted_page_title': value.hostedPageTitle,
        'hosted_page_url': value.hostedPageUrl,
        'id': value.id,
        'logo_image_url': value.logoImageUrl,
        'logo_position': value.logoPosition,
        'responsive': value.responsive,
        'transcoder_id': value.transcoderId,
        'type': value.type,
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'video_poster_image_url': value.videoPosterImageUrl,
        'width': value.width,
    };
}

