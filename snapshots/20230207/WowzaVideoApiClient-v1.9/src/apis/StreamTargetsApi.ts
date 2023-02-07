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
  StreamTargetAkamaiUpdateInput,
  StreamTargetCustomInput,
  StreamTargetCustomResponse,
  StreamTargetCustomUpdateInput,
  StreamTargetFastlyInput,
  StreamTargetFastlyResponse,
  StreamTargetFastlyUpdateInput,
  StreamTargetProperties,
  StreamTargetPropertyCreateInputRepsonse,
  StreamTargetPropertyCreateRequest,
  StreamTargetPropertyCreateResponse,
  StreamTargetRegenerateConnectionCodeResponse,
  StreamTargetWowzaResponse,
  StreamTargetWowzaUpdateResponse,
  StreamTargets,
  StreamTargetsAkamai,
  StreamTargetsCustom,
  StreamTargetsFastly,
  VodStreams,
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
    StreamTargetAkamaiUpdateInputFromJSON,
    StreamTargetAkamaiUpdateInputToJSON,
    StreamTargetCustomInputFromJSON,
    StreamTargetCustomInputToJSON,
    StreamTargetCustomResponseFromJSON,
    StreamTargetCustomResponseToJSON,
    StreamTargetCustomUpdateInputFromJSON,
    StreamTargetCustomUpdateInputToJSON,
    StreamTargetFastlyInputFromJSON,
    StreamTargetFastlyInputToJSON,
    StreamTargetFastlyResponseFromJSON,
    StreamTargetFastlyResponseToJSON,
    StreamTargetFastlyUpdateInputFromJSON,
    StreamTargetFastlyUpdateInputToJSON,
    StreamTargetPropertiesFromJSON,
    StreamTargetPropertiesToJSON,
    StreamTargetPropertyCreateInputRepsonseFromJSON,
    StreamTargetPropertyCreateInputRepsonseToJSON,
    StreamTargetPropertyCreateRequestFromJSON,
    StreamTargetPropertyCreateRequestToJSON,
    StreamTargetPropertyCreateResponseFromJSON,
    StreamTargetPropertyCreateResponseToJSON,
    StreamTargetRegenerateConnectionCodeResponseFromJSON,
    StreamTargetRegenerateConnectionCodeResponseToJSON,
    StreamTargetWowzaResponseFromJSON,
    StreamTargetWowzaResponseToJSON,
    StreamTargetWowzaUpdateResponseFromJSON,
    StreamTargetWowzaUpdateResponseToJSON,
    StreamTargetsFromJSON,
    StreamTargetsToJSON,
    StreamTargetsAkamaiFromJSON,
    StreamTargetsAkamaiToJSON,
    StreamTargetsCustomFromJSON,
    StreamTargetsCustomToJSON,
    StreamTargetsFastlyFromJSON,
    StreamTargetsFastlyToJSON,
    VodStreamsFromJSON,
    VodStreamsToJSON,
} from '../models';

export interface CreateCustomStreamTargetRequest {
    body: StreamTargetCustomInput;
}

export interface CreateFastlyStreamTargetRequest {
    body: StreamTargetFastlyInput;
}

export interface CreateStreamTargetPropertyRequest {
    streamTargetId: string;
    streamTargetPropertyCreateRequest: StreamTargetPropertyCreateRequest;
}

export interface DeleteCustomStreamTargetRequest {
    id: string;
}

export interface DeleteFastlyStreamTargetRequest {
    id: string;
}

export interface DeleteStreamTargetPropertyRequest {
    streamTargetId: string;
    id: string;
}

export interface DeleteWowzaStreamTargetRequest {
    id: string;
}

export interface ListCustomStreamTargetsRequest {
    page?: number;
    perPage?: number;
}

export interface ListFastlyStreamTargetVODStreamsRequest {
    id: string;
}

export interface ListFastlyStreamTargetsRequest {
    page?: number;
    perPage?: number;
}

export interface ListStreamTargetPropertiesRequest {
    streamTargetId: string;
}

export interface ListStreamTargetsRequest {
    filter?: string;
    page?: number;
    perPage?: number;
}

export interface ListWowzaStreamTargetsRequest {
    page?: number;
    perPage?: number;
}

export interface RegenerateConnectionCodeStreamTargetRequest {
    id: string;
}

export interface ShowCustomStreamTargetRequest {
    id: string;
}

export interface ShowFastlyStreamTargetRequest {
    id: string;
}

export interface ShowStreamTargetPropertyRequest {
    streamTargetId: string;
    id: string;
}

export interface ShowWowzaStreamTargetRequest {
    id: string;
}

export interface UpdateCustomStreamTargetRequest {
    id: string;
    streamTargetCustomUpdateInput: StreamTargetCustomUpdateInput;
}

export interface UpdateFastlyStreamTargetRequest {
    id: string;
    streamTargetFastlyUpdateInput: StreamTargetFastlyUpdateInput;
}

export interface UpdateWowzaStreamTargetRequest {
    id: string;
    streamTargetAkamaiUpdateInput: StreamTargetAkamaiUpdateInput;
}

/**
 * 
 */
export class StreamTargetsApi extends runtime.BaseAPI {

    /**
     * This operation creates a custom stream target for an external, third-party destination.
     * Create a custom stream target
     */
    async createCustomStreamTargetRaw(requestParameters: CreateCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetCustomResponse>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createCustomStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stream_targets/custom`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetCustomResponseFromJSON(jsonValue));
    }

    /**
     * This operation creates a custom stream target for an external, third-party destination.
     * Create a custom stream target
     */
    async createCustomStreamTarget(requestParameters: CreateCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetCustomResponse> {
        const response = await this.createCustomStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * (Available from version 1.4) This operation creates a Wowza CDN on Fastly stream target to deliver your stream using the Wowza CDN on Fastly.
     * Create a Wowza CDN on Fastly stream target
     */
    async createFastlyStreamTargetRaw(requestParameters: CreateFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetFastlyResponse>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createFastlyStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stream_targets/fastly`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetFastlyResponseFromJSON(jsonValue));
    }

    /**
     * (Available from version 1.4) This operation creates a Wowza CDN on Fastly stream target to deliver your stream using the Wowza CDN on Fastly.
     * Create a Wowza CDN on Fastly stream target
     */
    async createFastlyStreamTarget(requestParameters: CreateFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetFastlyResponse> {
        const response = await this.createFastlyStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation configures a property for a stream target. The properties available will depend on the *provider* you are using and are noted in the key descriptions below. For example, if you are using the provider **Wowza CDN on Fastly**, look for that in the descriptions.  For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Configure a property for a stream target
     */
    async createStreamTargetPropertyRaw(requestParameters: CreateStreamTargetPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetPropertyCreateResponse>> {
        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling createStreamTargetProperty.');
        }

        if (requestParameters.streamTargetPropertyCreateRequest === null || requestParameters.streamTargetPropertyCreateRequest === undefined) {
            throw new runtime.RequiredError('streamTargetPropertyCreateRequest','Required parameter requestParameters.streamTargetPropertyCreateRequest was null or undefined when calling createStreamTargetProperty.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stream_targets/{stream_target_id}/properties`.replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: StreamTargetPropertyCreateRequestToJSON(requestParameters.streamTargetPropertyCreateRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetPropertyCreateResponseFromJSON(jsonValue));
    }

    /**
     * This operation configures a property for a stream target. The properties available will depend on the *provider* you are using and are noted in the key descriptions below. For example, if you are using the provider **Wowza CDN on Fastly**, look for that in the descriptions.  For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Configure a property for a stream target
     */
    async createStreamTargetProperty(requestParameters: CreateStreamTargetPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetPropertyCreateResponse> {
        const response = await this.createStreamTargetPropertyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation deletes a custom stream target. <br><br><b>Note</b>: You can\'t remove stream targets that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint. 
     * Delete a custom stream target
     */
    async deleteCustomStreamTargetRaw(requestParameters: DeleteCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCustomStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/custom/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes a custom stream target. <br><br><b>Note</b>: You can\'t remove stream targets that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint. 
     * Delete a custom stream target
     */
    async deleteCustomStreamTarget(requestParameters: DeleteCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteCustomStreamTargetRaw(requestParameters, initOverrides);
    }

    /**
     * (Available from version 1.4) This operation deletes a Wowza CDN on Fastly stream target.  <br><br><b>Note</b>: You can\'t remove stream targets that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint. 
     * Delete a Wowza CDN on Fastly stream target
     */
    async deleteFastlyStreamTargetRaw(requestParameters: DeleteFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteFastlyStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/fastly/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * (Available from version 1.4) This operation deletes a Wowza CDN on Fastly stream target.  <br><br><b>Note</b>: You can\'t remove stream targets that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint. 
     * Delete a Wowza CDN on Fastly stream target
     */
    async deleteFastlyStreamTarget(requestParameters: DeleteFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteFastlyStreamTargetRaw(requestParameters, initOverrides);
    }

    /**
     * This operation removes a property from a stream target.
     * Delete a stream target property
     */
    async deleteStreamTargetPropertyRaw(requestParameters: DeleteStreamTargetPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling deleteStreamTargetProperty.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteStreamTargetProperty.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/{stream_target_id}/properties/{id}`.replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation removes a property from a stream target.
     * Delete a stream target property
     */
    async deleteStreamTargetProperty(requestParameters: DeleteStreamTargetPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteStreamTargetPropertyRaw(requestParameters, initOverrides);
    }

    /**
     * This operation deletes a Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.    > **Note:** You can\'t remove stream targets that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint.
     * Delete a Wowza CDN on Akamai stream target
     */
    async deleteWowzaStreamTargetRaw(requestParameters: DeleteWowzaStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteWowzaStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/akamai/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes a Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.    > **Note:** You can\'t remove stream targets that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint.
     * Delete a Wowza CDN on Akamai stream target
     */
    async deleteWowzaStreamTarget(requestParameters: DeleteWowzaStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteWowzaStreamTargetRaw(requestParameters, initOverrides);
    }

    /**
     * This operation lists limited details for all of your custom stream targets. For detailed information, fetch a single custom stream target.
     * Fetch all custom stream targets
     */
    async listCustomStreamTargetsRaw(requestParameters: ListCustomStreamTargetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetsCustom>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/custom`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetsCustomFromJSON(jsonValue));
    }

    /**
     * This operation lists limited details for all of your custom stream targets. For detailed information, fetch a single custom stream target.
     * Fetch all custom stream targets
     */
    async listCustomStreamTargets(requestParameters: ListCustomStreamTargetsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetsCustom> {
        const response = await this.listCustomStreamTargetsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * (Available from version 1.5) This operation shows the details of all VOD streams associated to a specific Fastly stream target.
     * Fetch all VOD streams for a Fastly stream target
     */
    async listFastlyStreamTargetVODStreamsRaw(requestParameters: ListFastlyStreamTargetVODStreamsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VodStreams>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling listFastlyStreamTargetVODStreams.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/fastly/{id}/vod_streams`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VodStreamsFromJSON(jsonValue));
    }

    /**
     * (Available from version 1.5) This operation shows the details of all VOD streams associated to a specific Fastly stream target.
     * Fetch all VOD streams for a Fastly stream target
     */
    async listFastlyStreamTargetVODStreams(requestParameters: ListFastlyStreamTargetVODStreamsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VodStreams> {
        const response = await this.listFastlyStreamTargetVODStreamsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * (Available from version 1.4) This operation lists limited details for all of your Wowza CDN on Fastly stream targets. For detailed information, fetch a single target.
     * Fetch all Wowza CDN on Fastly stream targets
     */
    async listFastlyStreamTargetsRaw(requestParameters: ListFastlyStreamTargetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetsFastly>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/fastly`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetsFastlyFromJSON(jsonValue));
    }

    /**
     * (Available from version 1.4) This operation lists limited details for all of your Wowza CDN on Fastly stream targets. For detailed information, fetch a single target.
     * Fetch all Wowza CDN on Fastly stream targets
     */
    async listFastlyStreamTargets(requestParameters: ListFastlyStreamTargetsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetsFastly> {
        const response = await this.listFastlyStreamTargetsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of all of the properties assigned to a specific stream target. The properties returned will depend on the *provider* you are using and are noted in the key descriptions below.     For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video   REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Fetch all properties of a stream target
     */
    async listStreamTargetPropertiesRaw(requestParameters: ListStreamTargetPropertiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetProperties>> {
        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling listStreamTargetProperties.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/{stream_target_id}/properties`.replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetPropertiesFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of all of the properties assigned to a specific stream target. The properties returned will depend on the *provider* you are using and are noted in the key descriptions below.     For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video   REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Fetch all properties of a stream target
     */
    async listStreamTargetProperties(requestParameters: ListStreamTargetPropertiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetProperties> {
        const response = await this.listStreamTargetPropertiesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation lists limited details for custom stream targets and Wowza CDN on Fastly stream targets. For detailed information, fetch a single stream target of a specific type.
     * Fetch all stream targets
     */
    async listStreamTargetsRaw(requestParameters: ListStreamTargetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargets>> {
        const queryParameters: any = {};

        if (requestParameters.filter !== undefined) {
            queryParameters['filter'] = requestParameters.filter;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetsFromJSON(jsonValue));
    }

    /**
     * This operation lists limited details for custom stream targets and Wowza CDN on Fastly stream targets. For detailed information, fetch a single stream target of a specific type.
     * Fetch all stream targets
     */
    async listStreamTargets(requestParameters: ListStreamTargetsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargets> {
        const response = await this.listStreamTargetsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation lists limited details for all of your Wowza CDN on Akamai stream targets. For detailed information, fetch a single Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.
     * Fetch all Wowza CDN on Akamai stream targets
     */
    async listWowzaStreamTargetsRaw(requestParameters: ListWowzaStreamTargetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetsAkamai>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/akamai`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetsAkamaiFromJSON(jsonValue));
    }

    /**
     * This operation lists limited details for all of your Wowza CDN on Akamai stream targets. For detailed information, fetch a single Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.
     * Fetch all Wowza CDN on Akamai stream targets
     */
    async listWowzaStreamTargets(requestParameters: ListWowzaStreamTargetsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetsAkamai> {
        const response = await this.listWowzaStreamTargetsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation regenerates the connection code of any kind of stream target.
     * Regenerate the connection code for any stream target
     */
    async regenerateConnectionCodeStreamTargetRaw(requestParameters: RegenerateConnectionCodeStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetRegenerateConnectionCodeResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling regenerateConnectionCodeStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/{id}/regenerate_connection_code`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetRegenerateConnectionCodeResponseFromJSON(jsonValue));
    }

    /**
     * This operation regenerates the connection code of any kind of stream target.
     * Regenerate the connection code for any stream target
     */
    async regenerateConnectionCodeStreamTarget(requestParameters: RegenerateConnectionCodeStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetRegenerateConnectionCodeResponse> {
        const response = await this.regenerateConnectionCodeStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific custom stream target.
     * Fetch a custom stream target
     */
    async showCustomStreamTargetRaw(requestParameters: ShowCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetCustomResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showCustomStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/custom/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetCustomResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific custom stream target.
     * Fetch a custom stream target
     */
    async showCustomStreamTarget(requestParameters: ShowCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetCustomResponse> {
        const response = await this.showCustomStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * (Available from version 1.4) This operation shows the details of a specific Wowza CDN on Fastly stream target.
     * Fetch a Wowza CDN on Fastly stream target
     */
    async showFastlyStreamTargetRaw(requestParameters: ShowFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetFastlyResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showFastlyStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/fastly/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetFastlyResponseFromJSON(jsonValue));
    }

    /**
     * (Available from version 1.4) This operation shows the details of a specific Wowza CDN on Fastly stream target.
     * Fetch a Wowza CDN on Fastly stream target
     */
    async showFastlyStreamTarget(requestParameters: ShowFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetFastlyResponse> {
        const response = await this.showFastlyStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific property assigned to a specific stream target. The properties returned will depend on the *provider* you are using and are noted in the key descriptions below.     For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video   REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Fetch a property of a stream target
     */
    async showStreamTargetPropertyRaw(requestParameters: ShowStreamTargetPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetPropertyCreateInputRepsonse>> {
        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling showStreamTargetProperty.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showStreamTargetProperty.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/{stream_target_id}/properties/{id}`.replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetPropertyCreateInputRepsonseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific property assigned to a specific stream target. The properties returned will depend on the *provider* you are using and are noted in the key descriptions below.     For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video   REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Fetch a property of a stream target
     */
    async showStreamTargetProperty(requestParameters: ShowStreamTargetPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetPropertyCreateInputRepsonse> {
        const response = await this.showStreamTargetPropertyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.
     * Fetch a Wowza CDN on Akamai stream target
     */
    async showWowzaStreamTargetRaw(requestParameters: ShowWowzaStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetWowzaResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showWowzaStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stream_targets/akamai/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetWowzaResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.
     * Fetch a Wowza CDN on Akamai stream target
     */
    async showWowzaStreamTarget(requestParameters: ShowWowzaStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetWowzaResponse> {
        const response = await this.showWowzaStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates a custom stream target.
     * Update a custom stream target
     */
    async updateCustomStreamTargetRaw(requestParameters: UpdateCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetCustomResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCustomStreamTarget.');
        }

        if (requestParameters.streamTargetCustomUpdateInput === null || requestParameters.streamTargetCustomUpdateInput === undefined) {
            throw new runtime.RequiredError('streamTargetCustomUpdateInput','Required parameter requestParameters.streamTargetCustomUpdateInput was null or undefined when calling updateCustomStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stream_targets/custom/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: StreamTargetCustomUpdateInputToJSON(requestParameters.streamTargetCustomUpdateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetCustomResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates a custom stream target.
     * Update a custom stream target
     */
    async updateCustomStreamTarget(requestParameters: UpdateCustomStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetCustomResponse> {
        const response = await this.updateCustomStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * (Available from version 1.4) This operation updates a Wowza CDN on Fastly stream target.
     * Update a Wowza CDN on Fastly stream target
     */
    async updateFastlyStreamTargetRaw(requestParameters: UpdateFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetFastlyResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateFastlyStreamTarget.');
        }

        if (requestParameters.streamTargetFastlyUpdateInput === null || requestParameters.streamTargetFastlyUpdateInput === undefined) {
            throw new runtime.RequiredError('streamTargetFastlyUpdateInput','Required parameter requestParameters.streamTargetFastlyUpdateInput was null or undefined when calling updateFastlyStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stream_targets/fastly/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: StreamTargetFastlyUpdateInputToJSON(requestParameters.streamTargetFastlyUpdateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetFastlyResponseFromJSON(jsonValue));
    }

    /**
     * (Available from version 1.4) This operation updates a Wowza CDN on Fastly stream target.
     * Update a Wowza CDN on Fastly stream target
     */
    async updateFastlyStreamTarget(requestParameters: UpdateFastlyStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetFastlyResponse> {
        const response = await this.updateFastlyStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates a Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.
     * Update a Wowza CDN on Akamai stream target
     */
    async updateWowzaStreamTargetRaw(requestParameters: UpdateWowzaStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamTargetWowzaUpdateResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateWowzaStreamTarget.');
        }

        if (requestParameters.streamTargetAkamaiUpdateInput === null || requestParameters.streamTargetAkamaiUpdateInput === undefined) {
            throw new runtime.RequiredError('streamTargetAkamaiUpdateInput','Required parameter requestParameters.streamTargetAkamaiUpdateInput was null or undefined when calling updateWowzaStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stream_targets/akamai/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: StreamTargetAkamaiUpdateInputToJSON(requestParameters.streamTargetAkamaiUpdateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamTargetWowzaUpdateResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates a Wowza CDN on Akamai stream target.    > **Note:** You can no longer create Wowza CDN on Akamai stream targets. All other Wowza CDN on Akamai stream target functionality will soon be deprecated. <br><br>    > See [Migrate to Wowza CDN on Fastly](https://www.wowza.com/docs/migrate-to-wowza-cdn-on-fastly) to learn how to migrate your stream targets from Akamai to Fastly.
     * Update a Wowza CDN on Akamai stream target
     */
    async updateWowzaStreamTarget(requestParameters: UpdateWowzaStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamTargetWowzaUpdateResponse> {
        const response = await this.updateWowzaStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
