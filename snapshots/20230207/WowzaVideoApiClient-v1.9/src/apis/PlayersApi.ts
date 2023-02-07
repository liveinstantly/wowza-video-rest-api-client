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


import * as runtime from '../runtime';
import type {
  Error401,
  Error403,
  Error404,
  Error410,
  Error422,
  PlayerRebuildResponse,
  PlayerResponse,
  PlayerStateResponse,
  PlayerUpdateInput,
  PlayerUrlInput,
  PlayerUrlResponse,
  PlayerUrls,
  Players,
} from '../models';
import {
    Error401FromJSON,
    Error401ToJSON,
    Error403FromJSON,
    Error403ToJSON,
    Error404FromJSON,
    Error404ToJSON,
    Error410FromJSON,
    Error410ToJSON,
    Error422FromJSON,
    Error422ToJSON,
    PlayerRebuildResponseFromJSON,
    PlayerRebuildResponseToJSON,
    PlayerResponseFromJSON,
    PlayerResponseToJSON,
    PlayerStateResponseFromJSON,
    PlayerStateResponseToJSON,
    PlayerUpdateInputFromJSON,
    PlayerUpdateInputToJSON,
    PlayerUrlInputFromJSON,
    PlayerUrlInputToJSON,
    PlayerUrlResponseFromJSON,
    PlayerUrlResponseToJSON,
    PlayerUrlsFromJSON,
    PlayerUrlsToJSON,
    PlayersFromJSON,
    PlayersToJSON,
} from '../models';

export interface CreatePlayerUrlRequest {
    playerId: string;
    body: PlayerUrlInput;
}

export interface DeletePlayerUrlRequest {
    playerId: string;
    id: string;
}

export interface ListPlayerUrlsRequest {
    playerId: string;
}

export interface ListPlayersRequest {
    page?: number;
    perPage?: number;
}

export interface RequestPlayerRebuildRequest {
    id: string;
}

export interface ShowPlayerRequest {
    id: string;
}

export interface ShowPlayerStateRequest {
    id: string;
}

export interface ShowPlayerUrlRequest {
    playerId: string;
    id: string;
}

export interface UpdatePlayerRequest {
    id: string;
    playerUpdateInput: PlayerUpdateInput;
}

export interface UpdatePlayerUrlRequest {
    playerId: string;
    id: string;
    body: PlayerUrlInput;
}

/**
 * 
 */
export class PlayersApi extends runtime.BaseAPI {

    /**
     * This operation creates a new player URL.
     * Create a player URL
     */
    async createPlayerUrlRaw(requestParameters: CreatePlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerUrlResponse>> {
        if (requestParameters.playerId === null || requestParameters.playerId === undefined) {
            throw new runtime.RequiredError('playerId','Required parameter requestParameters.playerId was null or undefined when calling createPlayerUrl.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createPlayerUrl.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/players/{player_id}/urls`.replace(`{${"player_id"}}`, encodeURIComponent(String(requestParameters.playerId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerUrlResponseFromJSON(jsonValue));
    }

    /**
     * This operation creates a new player URL.
     * Create a player URL
     */
    async createPlayerUrl(requestParameters: CreatePlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerUrlResponse> {
        const response = await this.createPlayerUrlRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation deletes a player URL. 
     * Delete a player URL
     */
    async deletePlayerUrlRaw(requestParameters: DeletePlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.playerId === null || requestParameters.playerId === undefined) {
            throw new runtime.RequiredError('playerId','Required parameter requestParameters.playerId was null or undefined when calling deletePlayerUrl.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePlayerUrl.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players/{player_id}/urls/{id}`.replace(`{${"player_id"}}`, encodeURIComponent(String(requestParameters.playerId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes a player URL. 
     * Delete a player URL
     */
    async deletePlayerUrl(requestParameters: DeletePlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deletePlayerUrlRaw(requestParameters, initOverrides);
    }

    /**
     * This operation shows the details of all player URLs.
     * Fetch all player URLs
     */
    async listPlayerUrlsRaw(requestParameters: ListPlayerUrlsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerUrls>> {
        if (requestParameters.playerId === null || requestParameters.playerId === undefined) {
            throw new runtime.RequiredError('playerId','Required parameter requestParameters.playerId was null or undefined when calling listPlayerUrls.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players/{player_id}/urls`.replace(`{${"player_id"}}`, encodeURIComponent(String(requestParameters.playerId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerUrlsFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of all player URLs.
     * Fetch all player URLs
     */
    async listPlayerUrls(requestParameters: ListPlayerUrlsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerUrls> {
        const response = await this.listPlayerUrlsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows limited details for all of your players. For detailed information, fetch a single player.
     * Fetch all players
     */
    async listPlayersRaw(requestParameters: ListPlayersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Players>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayersFromJSON(jsonValue));
    }

    /**
     * This operation shows limited details for all of your players. For detailed information, fetch a single player.
     * Fetch all players
     */
    async listPlayers(requestParameters: ListPlayersRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Players> {
        const response = await this.listPlayersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation rebuilds the player with the current configuration.
     * Rebuild player code
     */
    async requestPlayerRebuildRaw(requestParameters: RequestPlayerRebuildRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerRebuildResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling requestPlayerRebuild.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players/{id}/rebuild`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerRebuildResponseFromJSON(jsonValue));
    }

    /**
     * This operation rebuilds the player with the current configuration.
     * Rebuild player code
     */
    async requestPlayerRebuild(requestParameters: RequestPlayerRebuildRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerRebuildResponse> {
        const response = await this.requestPlayerRebuildRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows details of a specific player.
     * Fetch a player
     */
    async showPlayerRaw(requestParameters: ShowPlayerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showPlayer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows details of a specific player.
     * Fetch a player
     */
    async showPlayer(requestParameters: ShowPlayerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerResponse> {
        const response = await this.showPlayerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the current state of a player.
     * Fetch the state of a player
     */
    async showPlayerStateRaw(requestParameters: ShowPlayerStateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerStateResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showPlayerState.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players/{id}/state`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerStateResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the current state of a player.
     * Fetch the state of a player
     */
    async showPlayerState(requestParameters: ShowPlayerStateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerStateResponse> {
        const response = await this.showPlayerStateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a player URL.
     * Fetch a player URL
     */
    async showPlayerUrlRaw(requestParameters: ShowPlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerUrlResponse>> {
        if (requestParameters.playerId === null || requestParameters.playerId === undefined) {
            throw new runtime.RequiredError('playerId','Required parameter requestParameters.playerId was null or undefined when calling showPlayerUrl.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showPlayerUrl.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players/{player_id}/urls/{id}`.replace(`{${"player_id"}}`, encodeURIComponent(String(requestParameters.playerId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerUrlResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a player URL.
     * Fetch a player URL
     */
    async showPlayerUrl(requestParameters: ShowPlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerUrlResponse> {
        const response = await this.showPlayerUrlRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates a player.
     * Update a player
     */
    async updatePlayerRaw(requestParameters: UpdatePlayerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePlayer.');
        }

        if (requestParameters.playerUpdateInput === null || requestParameters.playerUpdateInput === undefined) {
            throw new runtime.RequiredError('playerUpdateInput','Required parameter requestParameters.playerUpdateInput was null or undefined when calling updatePlayer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/players/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PlayerUpdateInputToJSON(requestParameters.playerUpdateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates a player.
     * Update a player
     */
    async updatePlayer(requestParameters: UpdatePlayerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerResponse> {
        const response = await this.updatePlayerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates a player URL.
     * Update a player URL
     */
    async updatePlayerUrlRaw(requestParameters: UpdatePlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayerUrlResponse>> {
        if (requestParameters.playerId === null || requestParameters.playerId === undefined) {
            throw new runtime.RequiredError('playerId','Required parameter requestParameters.playerId was null or undefined when calling updatePlayerUrl.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePlayerUrl.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updatePlayerUrl.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/players/{player_id}/urls/{id}`.replace(`{${"player_id"}}`, encodeURIComponent(String(requestParameters.playerId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerUrlResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates a player URL.
     * Update a player URL
     */
    async updatePlayerUrl(requestParameters: UpdatePlayerUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayerUrlResponse> {
        const response = await this.updatePlayerUrlRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
