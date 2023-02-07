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
  OutputInput,
  OutputStreamTargetInput,
  OutputStreamTargets,
  Outputs,
  TranscoderConfigurePropertiesPostResponse,
  TranscoderConfigurePropertyPostResponse,
  TranscoderControlResponse,
  TranscoderCreateInput,
  TranscoderEnableAllStreamTargetResponse,
  TranscoderOutputResponse,
  TranscoderOutputsOutputStreamTargetControlResponse,
  TranscoderOutputsOutputStreamTargetResponse,
  TranscoderPropertyCreateRequest,
  TranscoderPropertyCreateResponse,
  TranscoderRecordingStateResponse,
  TranscoderRecordingsListResponse,
  TranscoderResponse,
  TranscoderSchedulesListResponse,
  TranscoderStateResponse,
  TranscoderStatsResponse,
  TranscoderThumbnailUrlResponse,
  TranscoderUpdateInput,
  TranscoderUptimeMetricsCurrentResponse,
  TranscoderUptimeMetricsHistoricResponse,
  TranscoderUptimeResponse,
  Transcoders,
  Uptimes,
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
    OutputInputFromJSON,
    OutputInputToJSON,
    OutputStreamTargetInputFromJSON,
    OutputStreamTargetInputToJSON,
    OutputStreamTargetsFromJSON,
    OutputStreamTargetsToJSON,
    OutputsFromJSON,
    OutputsToJSON,
    TranscoderConfigurePropertiesPostResponseFromJSON,
    TranscoderConfigurePropertiesPostResponseToJSON,
    TranscoderConfigurePropertyPostResponseFromJSON,
    TranscoderConfigurePropertyPostResponseToJSON,
    TranscoderControlResponseFromJSON,
    TranscoderControlResponseToJSON,
    TranscoderCreateInputFromJSON,
    TranscoderCreateInputToJSON,
    TranscoderEnableAllStreamTargetResponseFromJSON,
    TranscoderEnableAllStreamTargetResponseToJSON,
    TranscoderOutputResponseFromJSON,
    TranscoderOutputResponseToJSON,
    TranscoderOutputsOutputStreamTargetControlResponseFromJSON,
    TranscoderOutputsOutputStreamTargetControlResponseToJSON,
    TranscoderOutputsOutputStreamTargetResponseFromJSON,
    TranscoderOutputsOutputStreamTargetResponseToJSON,
    TranscoderPropertyCreateRequestFromJSON,
    TranscoderPropertyCreateRequestToJSON,
    TranscoderPropertyCreateResponseFromJSON,
    TranscoderPropertyCreateResponseToJSON,
    TranscoderRecordingStateResponseFromJSON,
    TranscoderRecordingStateResponseToJSON,
    TranscoderRecordingsListResponseFromJSON,
    TranscoderRecordingsListResponseToJSON,
    TranscoderResponseFromJSON,
    TranscoderResponseToJSON,
    TranscoderSchedulesListResponseFromJSON,
    TranscoderSchedulesListResponseToJSON,
    TranscoderStateResponseFromJSON,
    TranscoderStateResponseToJSON,
    TranscoderStatsResponseFromJSON,
    TranscoderStatsResponseToJSON,
    TranscoderThumbnailUrlResponseFromJSON,
    TranscoderThumbnailUrlResponseToJSON,
    TranscoderUpdateInputFromJSON,
    TranscoderUpdateInputToJSON,
    TranscoderUptimeMetricsCurrentResponseFromJSON,
    TranscoderUptimeMetricsCurrentResponseToJSON,
    TranscoderUptimeMetricsHistoricResponseFromJSON,
    TranscoderUptimeMetricsHistoricResponseToJSON,
    TranscoderUptimeResponseFromJSON,
    TranscoderUptimeResponseToJSON,
    TranscodersFromJSON,
    TranscodersToJSON,
    UptimesFromJSON,
    UptimesToJSON,
    VodStreamsFromJSON,
    VodStreamsToJSON,
} from '../models';

export interface CreateTranscoderRequest {
    transcoderCreateInput: TranscoderCreateInput;
}

export interface CreateTranscoderOutputRequest {
    transcoderId: string;
    body: OutputInput;
}

export interface CreateTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    body: OutputStreamTargetInput;
}

export interface CreateTranscoderPropertyRequest {
    transcoderId: string;
    transcoderPropertyCreateRequest: TranscoderPropertyCreateRequest;
}

export interface DeleteTranscoderRequest {
    id: string;
}

export interface DeleteTranscoderOutputRequest {
    transcoderId: string;
    id: string;
}

export interface DeleteTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    streamTargetId: string;
}

export interface DeleteTranscoderPropertyRequest {
    transcoderId: string;
    id: string;
}

export interface DisableAllStreamTargetsTranscoderRequest {
    id: string;
}

export interface DisableTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    streamTargetId: string;
}

export interface EnableAllStreamTargetsTranscoderRequest {
    id: string;
}

export interface EnableTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    streamTargetId: string;
}

export interface ListTranscoderOutputOutputStreamTargetsRequest {
    transcoderId: string;
    outputId: string;
}

export interface ListTranscoderOutputsRequest {
    transcoderId: string;
}

export interface ListTranscoderPropertiesRequest {
    transcoderId: string;
}

export interface ListTranscoderRecordingsRequest {
    id: string;
}

export interface ListTranscoderSchedulesRequest {
    id: string;
}

export interface ListTranscoderVODStreamsRequest {
    id: string;
}

export interface ListTranscodersRequest {
    filter?: string;
    page?: number;
    perPage?: number;
}

export interface ResetTranscoderRequest {
    id: string;
}

export interface RestartTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    streamTargetId: string;
}

export interface ShowTranscoderRequest {
    id: string;
}

export interface ShowTranscoderOutputRequest {
    transcoderId: string;
    id: string;
}

export interface ShowTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    streamTargetId: string;
}

export interface ShowTranscoderPropertyRequest {
    transcoderId: string;
    id: string;
}

export interface ShowTranscoderStateRequest {
    id: string;
}

export interface ShowTranscoderStatsRequest {
    id: string;
}

export interface ShowTranscoderThumbnailUrlRequest {
    id: string;
}

export interface ShowTranscoderUptimeRequest {
    transcoderId: string;
    id: string;
}

export interface ShowTranscoderUptimeMetricsCurrentRequest {
    transcoderId: string;
    id: string;
    fields?: string;
}

export interface ShowTranscoderUptimeMetricsHistoricRequest {
    transcoderId: string;
    id: string;
    fields?: string;
    from?: string;
    to?: string;
}

export interface ShowTranscoderUptimesIndexRequest {
    transcoderId: string;
    page?: number;
    perPage?: number;
}

export interface StartTranscoderRequest {
    id: string;
}

export interface StartTranscoderRecordingRequest {
    id: string;
}

export interface StopTranscoderRequest {
    id: string;
}

export interface StopTranscoderRecordingRequest {
    id: string;
}

export interface UpdateTranscoderRequest {
    id: string;
    transcoderUpdateInput: TranscoderUpdateInput;
}

export interface UpdateTranscoderOutputRequest {
    transcoderId: string;
    id: string;
    body: OutputInput;
}

export interface UpdateTranscoderOutputOutputStreamTargetRequest {
    transcoderId: string;
    outputId: string;
    streamTargetId: string;
    body: OutputStreamTargetInput;
}

/**
 * 
 */
export class TranscodersApi extends runtime.BaseAPI {

    /**
     * This operation creates a transcoder.
     * Create a transcoder
     */
    async createTranscoderRaw(requestParameters: CreateTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderResponse>> {
        if (requestParameters.transcoderCreateInput === null || requestParameters.transcoderCreateInput === undefined) {
            throw new runtime.RequiredError('transcoderCreateInput','Required parameter requestParameters.transcoderCreateInput was null or undefined when calling createTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TranscoderCreateInputToJSON(requestParameters.transcoderCreateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderResponseFromJSON(jsonValue));
    }

    /**
     * This operation creates a transcoder.
     * Create a transcoder
     */
    async createTranscoder(requestParameters: CreateTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderResponse> {
        const response = await this.createTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation creates an output rendition for a specific transcoder. You can create up to 10 outputs per transcoder.
     * Create an output
     */
    async createTranscoderOutputRaw(requestParameters: CreateTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling createTranscoderOutput.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createTranscoderOutput.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputResponseFromJSON(jsonValue));
    }

    /**
     * This operation creates an output rendition for a specific transcoder. You can create up to 10 outputs per transcoder.
     * Create an output
     */
    async createTranscoderOutput(requestParameters: CreateTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputResponse> {
        const response = await this.createTranscoderOutputRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation creates an output stream target, assigning the stream target to the specified output rendition. 
     * Create an output stream target
     */
    async createTranscoderOutputOutputStreamTargetRaw(requestParameters: CreateTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputsOutputStreamTargetResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling createTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling createTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputsOutputStreamTargetResponseFromJSON(jsonValue));
    }

    /**
     * This operation creates an output stream target, assigning the stream target to the specified output rendition. 
     * Create an output stream target
     */
    async createTranscoderOutputOutputStreamTarget(requestParameters: CreateTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputsOutputStreamTargetResponse> {
        const response = await this.createTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation configures a single property or an array of properties for a transcoder.  For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Configure a property for a transcoder
     */
    async createTranscoderPropertyRaw(requestParameters: CreateTranscoderPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderPropertyCreateResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling createTranscoderProperty.');
        }

        if (requestParameters.transcoderPropertyCreateRequest === null || requestParameters.transcoderPropertyCreateRequest === undefined) {
            throw new runtime.RequiredError('transcoderPropertyCreateRequest','Required parameter requestParameters.transcoderPropertyCreateRequest was null or undefined when calling createTranscoderProperty.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/properties`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TranscoderPropertyCreateRequestToJSON(requestParameters.transcoderPropertyCreateRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderPropertyCreateResponseFromJSON(jsonValue));
    }

    /**
     * This operation configures a single property or an array of properties for a transcoder.  For a comprehensive resource describing the use of advanced properties, see [Set advanced properties with the Wowza Video REST API](https://www.wowza.com/docs/how-to-set-advanced-properties-by-using-the-wowza-video-rest-api).
     * Configure a property for a transcoder
     */
    async createTranscoderProperty(requestParameters: CreateTranscoderPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderPropertyCreateResponse> {
        const response = await this.createTranscoderPropertyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation deletes a transcoder, including all of its assigned output renditions and stream targets. <br><br><b>Note</b>: You can\'t remove transcoders that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint. 
     * Delete a transcoder
     */
    async deleteTranscoderRaw(requestParameters: DeleteTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes a transcoder, including all of its assigned output renditions and stream targets. <br><br><b>Note</b>: You can\'t remove transcoders that have an asset_id. Assets must be removed by sending a DEL request to the /assets endpoint. 
     * Delete a transcoder
     */
    async deleteTranscoder(requestParameters: DeleteTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTranscoderRaw(requestParameters, initOverrides);
    }

    /**
     * This operation deletes an output, including all of its assigned targets.
     * Delete an output
     */
    async deleteTranscoderOutputRaw(requestParameters: DeleteTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling deleteTranscoderOutput.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTranscoderOutput.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes an output, including all of its assigned targets.
     * Delete an output
     */
    async deleteTranscoderOutput(requestParameters: DeleteTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTranscoderOutputRaw(requestParameters, initOverrides);
    }

    /**
     * This operation deletes an output stream target, including all of its assigned targets.
     * Delete an output stream target
     */
    async deleteTranscoderOutputOutputStreamTargetRaw(requestParameters: DeleteTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling deleteTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling deleteTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling deleteTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes an output stream target, including all of its assigned targets.
     * Delete an output stream target
     */
    async deleteTranscoderOutputOutputStreamTarget(requestParameters: DeleteTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
    }

    /**
     * This operation deletes a specific property from a specific transcoder.
     * Delete a transcoder\'s property
     */
    async deleteTranscoderPropertyRaw(requestParameters: DeleteTranscoderPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling deleteTranscoderProperty.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTranscoderProperty.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/properties/{id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes a specific property from a specific transcoder.
     * Delete a transcoder\'s property
     */
    async deleteTranscoderProperty(requestParameters: DeleteTranscoderPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTranscoderPropertyRaw(requestParameters, initOverrides);
    }

    /**
     * This operation disables all of the stream targets assigned to a specific transcoder.
     * Disable a transcoder\'s stream targets
     */
    async disableAllStreamTargetsTranscoderRaw(requestParameters: DisableAllStreamTargetsTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderEnableAllStreamTargetResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling disableAllStreamTargetsTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/disable_all_stream_targets`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderEnableAllStreamTargetResponseFromJSON(jsonValue));
    }

    /**
     * This operation disables all of the stream targets assigned to a specific transcoder.
     * Disable a transcoder\'s stream targets
     */
    async disableAllStreamTargetsTranscoder(requestParameters: DisableAllStreamTargetsTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderEnableAllStreamTargetResponse> {
        const response = await this.disableAllStreamTargetsTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation disables an output stream target.
     * Disable an output stream target
     */
    async disableTranscoderOutputOutputStreamTargetRaw(requestParameters: DisableTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputsOutputStreamTargetControlResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling disableTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling disableTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling disableTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}/disable`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputsOutputStreamTargetControlResponseFromJSON(jsonValue));
    }

    /**
     * This operation disables an output stream target.
     * Disable an output stream target
     */
    async disableTranscoderOutputOutputStreamTarget(requestParameters: DisableTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputsOutputStreamTargetControlResponse> {
        const response = await this.disableTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation enables all of the stream targets assigned to a specific transcoder.
     * Enable a transcoder\'s stream targets
     */
    async enableAllStreamTargetsTranscoderRaw(requestParameters: EnableAllStreamTargetsTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderEnableAllStreamTargetResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling enableAllStreamTargetsTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/enable_all_stream_targets`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderEnableAllStreamTargetResponseFromJSON(jsonValue));
    }

    /**
     * This operation enables all of the stream targets assigned to a specific transcoder.
     * Enable a transcoder\'s stream targets
     */
    async enableAllStreamTargetsTranscoder(requestParameters: EnableAllStreamTargetsTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderEnableAllStreamTargetResponse> {
        const response = await this.enableAllStreamTargetsTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation enables an output stream target.
     * Enable an output stream target
     */
    async enableTranscoderOutputOutputStreamTargetRaw(requestParameters: EnableTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputsOutputStreamTargetControlResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling enableTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling enableTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling enableTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}/enable`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputsOutputStreamTargetControlResponseFromJSON(jsonValue));
    }

    /**
     * This operation enables an output stream target.
     * Enable an output stream target
     */
    async enableTranscoderOutputOutputStreamTarget(requestParameters: EnableTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputsOutputStreamTargetControlResponse> {
        const response = await this.enableTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of all of the output stream targets of an output of a transcoder.
     * Fetch all output stream targets of an output of a transcoder
     */
    async listTranscoderOutputOutputStreamTargetsRaw(requestParameters: ListTranscoderOutputOutputStreamTargetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputStreamTargets>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling listTranscoderOutputOutputStreamTargets.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling listTranscoderOutputOutputStreamTargets.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputStreamTargetsFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of all of the output stream targets of an output of a transcoder.
     * Fetch all output stream targets of an output of a transcoder
     */
    async listTranscoderOutputOutputStreamTargets(requestParameters: ListTranscoderOutputOutputStreamTargetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputStreamTargets> {
        const response = await this.listTranscoderOutputOutputStreamTargetsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of all of the output renditions of a specific transcoder.
     * Fetch all outputs of a transcoder
     */
    async listTranscoderOutputsRaw(requestParameters: ListTranscoderOutputsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Outputs>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling listTranscoderOutputs.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputsFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of all of the output renditions of a specific transcoder.
     * Fetch all outputs of a transcoder
     */
    async listTranscoderOutputs(requestParameters: ListTranscoderOutputsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Outputs> {
        const response = await this.listTranscoderOutputsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows all of the properties of a specific transcoder.
     * Fetch a transcoder\'s properties
     */
    async listTranscoderPropertiesRaw(requestParameters: ListTranscoderPropertiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderConfigurePropertiesPostResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling listTranscoderProperties.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/properties`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderConfigurePropertiesPostResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows all of the properties of a specific transcoder.
     * Fetch a transcoder\'s properties
     */
    async listTranscoderProperties(requestParameters: ListTranscoderPropertiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderConfigurePropertiesPostResponse> {
        const response = await this.listTranscoderPropertiesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows limited details of all of the recordings for a specific transcoder. For detailed information about a recording, use the recording ID to fetch a recording.
     * Fetch a transcoder\'s recordings
     */
    async listTranscoderRecordingsRaw(requestParameters: ListTranscoderRecordingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderRecordingsListResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling listTranscoderRecordings.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/recordings`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderRecordingsListResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows limited details of all of the recordings for a specific transcoder. For detailed information about a recording, use the recording ID to fetch a recording.
     * Fetch a transcoder\'s recordings
     */
    async listTranscoderRecordings(requestParameters: ListTranscoderRecordingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderRecordingsListResponse> {
        const response = await this.listTranscoderRecordingsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of all of the schedules for a specific transcoder.
     * Fetch transcoder\'s schedules
     */
    async listTranscoderSchedulesRaw(requestParameters: ListTranscoderSchedulesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderSchedulesListResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling listTranscoderSchedules.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/schedules`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderSchedulesListResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of all of the schedules for a specific transcoder.
     * Fetch transcoder\'s schedules
     */
    async listTranscoderSchedules(requestParameters: ListTranscoderSchedulesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderSchedulesListResponse> {
        const response = await this.listTranscoderSchedulesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * (Available from version 1.5) This operation shows the details of all VOD streams associated to a specific transcoder.
     * Fetch all VOD streams for a transcoder
     */
    async listTranscoderVODStreamsRaw(requestParameters: ListTranscoderVODStreamsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VodStreams>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling listTranscoderVODStreams.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/vod_streams`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VodStreamsFromJSON(jsonValue));
    }

    /**
     * (Available from version 1.5) This operation shows the details of all VOD streams associated to a specific transcoder.
     * Fetch all VOD streams for a transcoder
     */
    async listTranscoderVODStreams(requestParameters: ListTranscoderVODStreamsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VodStreams> {
        const response = await this.listTranscoderVODStreamsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows limited details for all of your transcoders. For detailed information, fetch a single transcoder.
     * Fetch all transcoders
     */
    async listTranscodersRaw(requestParameters: ListTranscodersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transcoders>> {
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
            path: `/transcoders`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscodersFromJSON(jsonValue));
    }

    /**
     * This operation shows limited details for all of your transcoders. For detailed information, fetch a single transcoder.
     * Fetch all transcoders
     */
    async listTranscoders(requestParameters: ListTranscodersRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transcoders> {
        const response = await this.listTranscodersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation resets a transcoder.
     * Reset a transcoder
     */
    async resetTranscoderRaw(requestParameters: ResetTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderControlResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling resetTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/reset`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderControlResponseFromJSON(jsonValue));
    }

    /**
     * This operation resets a transcoder.
     * Reset a transcoder
     */
    async resetTranscoder(requestParameters: ResetTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderControlResponse> {
        const response = await this.resetTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation restarts an output stream target.
     * Restart an output stream target
     */
    async restartTranscoderOutputOutputStreamTargetRaw(requestParameters: RestartTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputsOutputStreamTargetControlResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling restartTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling restartTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling restartTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}/restart`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputsOutputStreamTargetControlResponseFromJSON(jsonValue));
    }

    /**
     * This operation restarts an output stream target.
     * Restart an output stream target
     */
    async restartTranscoderOutputOutputStreamTarget(requestParameters: RestartTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputsOutputStreamTargetControlResponse> {
        const response = await this.restartTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific transcoder.
     * Fetch a transcoder
     */
    async showTranscoderRaw(requestParameters: ShowTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific transcoder.
     * Fetch a transcoder
     */
    async showTranscoder(requestParameters: ShowTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderResponse> {
        const response = await this.showTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific output rendition for a specific transcoder.
     * Fetch an output
     */
    async showTranscoderOutputRaw(requestParameters: ShowTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderOutput.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderOutput.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific output rendition for a specific transcoder.
     * Fetch an output
     */
    async showTranscoderOutput(requestParameters: ShowTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputResponse> {
        const response = await this.showTranscoderOutputRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of an output stream target.
     * Fetch an output stream target
     */
    async showTranscoderOutputOutputStreamTargetRaw(requestParameters: ShowTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputsOutputStreamTargetResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling showTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling showTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputsOutputStreamTargetResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of an output stream target.
     * Fetch an output stream target
     */
    async showTranscoderOutputOutputStreamTarget(requestParameters: ShowTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputsOutputStreamTargetResponse> {
        const response = await this.showTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific property for a specific transcoder.
     * Fetch a property for a transcoder
     */
    async showTranscoderPropertyRaw(requestParameters: ShowTranscoderPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderConfigurePropertyPostResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderProperty.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderProperty.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/properties/{id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderConfigurePropertyPostResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific property for a specific transcoder.
     * Fetch a property for a transcoder
     */
    async showTranscoderProperty(requestParameters: ShowTranscoderPropertyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderConfigurePropertyPostResponse> {
        const response = await this.showTranscoderPropertyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the current state and uptime ID of a transcoder.
     * Fetch the state and uptime ID of a transcoder
     */
    async showTranscoderStateRaw(requestParameters: ShowTranscoderStateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderStateResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderState.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/state`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderStateResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the current state and uptime ID of a transcoder.
     * Fetch the state and uptime ID of a transcoder
     */
    async showTranscoderState(requestParameters: ShowTranscoderStateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderStateResponse> {
        const response = await this.showTranscoderStateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation responds with a hash of metrics (keys) for a currently running transcoder. Each key has a **status**, **text** (description), **units**, and **value**.
     * Fetch statistics for a current transcoder
     */
    async showTranscoderStatsRaw(requestParameters: ShowTranscoderStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderStatsResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderStats.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/stats`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderStatsResponseFromJSON(jsonValue));
    }

    /**
     * This operation responds with a hash of metrics (keys) for a currently running transcoder. Each key has a **status**, **text** (description), **units**, and **value**.
     * Fetch statistics for a current transcoder
     */
    async showTranscoderStats(requestParameters: ShowTranscoderStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderStatsResponse> {
        const response = await this.showTranscoderStatsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the thumbnail URL of a started transcoder.
     * Fetch the thumbnail URL of a transcoder
     */
    async showTranscoderThumbnailUrlRaw(requestParameters: ShowTranscoderThumbnailUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderThumbnailUrlResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderThumbnailUrl.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/thumbnail_url`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderThumbnailUrlResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the thumbnail URL of a started transcoder.
     * Fetch the thumbnail URL of a transcoder
     */
    async showTranscoderThumbnailUrl(requestParameters: ShowTranscoderThumbnailUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderThumbnailUrlResponse> {
        const response = await this.showTranscoderThumbnailUrlRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific uptime record for a specific transcoder. An *uptime record* identifies a transcoding session.
     * Fetch an uptime record
     */
    async showTranscoderUptimeRaw(requestParameters: ShowTranscoderUptimeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderUptimeResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderUptime.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderUptime.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/uptimes/{id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderUptimeResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific uptime record for a specific transcoder. An *uptime record* identifies a transcoding session.
     * Fetch an uptime record
     */
    async showTranscoderUptime(requestParameters: ShowTranscoderUptimeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderUptimeResponse> {
        const response = await this.showTranscoderUptimeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation returns a snapshot of the current source connection and processing details of an active (running) transcoder.
     * Fetch current stream health metrics for an active transcoder
     */
    async showTranscoderUptimeMetricsCurrentRaw(requestParameters: ShowTranscoderUptimeMetricsCurrentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderUptimeMetricsCurrentResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderUptimeMetricsCurrent.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderUptimeMetricsCurrent.');
        }

        const queryParameters: any = {};

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/uptimes/{id}/metrics/current`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderUptimeMetricsCurrentResponseFromJSON(jsonValue));
    }

    /**
     * This operation returns a snapshot of the current source connection and processing details of an active (running) transcoder.
     * Fetch current stream health metrics for an active transcoder
     */
    async showTranscoderUptimeMetricsCurrent(requestParameters: ShowTranscoderUptimeMetricsCurrentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderUptimeMetricsCurrentResponse> {
        const response = await this.showTranscoderUptimeMetricsCurrentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the historic source connection and processing details for a transcoding session (uptime record). The transcoder can be running or stopped. Metrics are recorded every 20 seconds.
     * Fetch historic stream health metrics for a transcoder
     */
    async showTranscoderUptimeMetricsHistoricRaw(requestParameters: ShowTranscoderUptimeMetricsHistoricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderUptimeMetricsHistoricResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderUptimeMetricsHistoric.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showTranscoderUptimeMetricsHistoric.');
        }

        const queryParameters: any = {};

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/uptimes/{id}/metrics/historic`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderUptimeMetricsHistoricResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the historic source connection and processing details for a transcoding session (uptime record). The transcoder can be running or stopped. Metrics are recorded every 20 seconds.
     * Fetch historic stream health metrics for a transcoder
     */
    async showTranscoderUptimeMetricsHistoric(requestParameters: ShowTranscoderUptimeMetricsHistoricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderUptimeMetricsHistoricResponse> {
        const response = await this.showTranscoderUptimeMetricsHistoricRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows all of the uptime records for a specific transcoder. An *uptime record* identifies a specific transcoding session.
     * Fetch all uptime records for a transcoder
     */
    async showTranscoderUptimesIndexRaw(requestParameters: ShowTranscoderUptimesIndexRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Uptimes>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling showTranscoderUptimesIndex.');
        }

        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/uptimes`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UptimesFromJSON(jsonValue));
    }

    /**
     * This operation shows all of the uptime records for a specific transcoder. An *uptime record* identifies a specific transcoding session.
     * Fetch all uptime records for a transcoder
     */
    async showTranscoderUptimesIndex(requestParameters: ShowTranscoderUptimesIndexRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Uptimes> {
        const response = await this.showTranscoderUptimesIndexRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation starts a transcoder.
     * Start a transcoder
     */
    async startTranscoderRaw(requestParameters: StartTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderControlResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling startTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/start`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderControlResponseFromJSON(jsonValue));
    }

    /**
     * This operation starts a transcoder.
     * Start a transcoder
     */
    async startTranscoder(requestParameters: StartTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderControlResponse> {
        const response = await this.startTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation starts the recording of a transcoder after the transcoder has started. If you want the recording to start and stop automatically when you start or stop the transcoder instead, set _recording_ to **true** when you create a transcoder or update a transcoder.
     * Start recording
     */
    async startTranscoderRecordingRaw(requestParameters: StartTranscoderRecordingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderRecordingStateResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling startTranscoderRecording.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/start_recording`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderRecordingStateResponseFromJSON(jsonValue));
    }

    /**
     * This operation starts the recording of a transcoder after the transcoder has started. If you want the recording to start and stop automatically when you start or stop the transcoder instead, set _recording_ to **true** when you create a transcoder or update a transcoder.
     * Start recording
     */
    async startTranscoderRecording(requestParameters: StartTranscoderRecordingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderRecordingStateResponse> {
        const response = await this.startTranscoderRecordingRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation stops a transcoder.
     * Stop a transcoder
     */
    async stopTranscoderRaw(requestParameters: StopTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderControlResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling stopTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/stop`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderControlResponseFromJSON(jsonValue));
    }

    /**
     * This operation stops a transcoder.
     * Stop a transcoder
     */
    async stopTranscoder(requestParameters: StopTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderControlResponse> {
        const response = await this.stopTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation stops the recording of a transcoder before the transcoder has stopped. Wowza Video begins converting the recording to an MP4 file after the transcoder has stopped. You can use this operation to manually stop recording even if _recording_ is set to **true** on the transcoder, meaning the recording was automatically started at transcoder start. If you want the recording to start and stop automatically when you start and stop the transcoder, set _recording_ to **true** when you create a transcoder or  update a transcoder and then don\'t use the manual stop recording operation.
     * Stop recording
     */
    async stopTranscoderRecordingRaw(requestParameters: StopTranscoderRecordingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderRecordingStateResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling stopTranscoderRecording.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcoders/{id}/stop_recording`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderRecordingStateResponseFromJSON(jsonValue));
    }

    /**
     * This operation stops the recording of a transcoder before the transcoder has stopped. Wowza Video begins converting the recording to an MP4 file after the transcoder has stopped. You can use this operation to manually stop recording even if _recording_ is set to **true** on the transcoder, meaning the recording was automatically started at transcoder start. If you want the recording to start and stop automatically when you start and stop the transcoder, set _recording_ to **true** when you create a transcoder or  update a transcoder and then don\'t use the manual stop recording operation.
     * Stop recording
     */
    async stopTranscoderRecording(requestParameters: StopTranscoderRecordingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderRecordingStateResponse> {
        const response = await this.stopTranscoderRecordingRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates a transcoder.
     * Update a transcoder
     */
    async updateTranscoderRaw(requestParameters: UpdateTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTranscoder.');
        }

        if (requestParameters.transcoderUpdateInput === null || requestParameters.transcoderUpdateInput === undefined) {
            throw new runtime.RequiredError('transcoderUpdateInput','Required parameter requestParameters.transcoderUpdateInput was null or undefined when calling updateTranscoder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: TranscoderUpdateInputToJSON(requestParameters.transcoderUpdateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates a transcoder.
     * Update a transcoder
     */
    async updateTranscoder(requestParameters: UpdateTranscoderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderResponse> {
        const response = await this.updateTranscoderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates an output rendition.
     * Update an output
     */
    async updateTranscoderOutputRaw(requestParameters: UpdateTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling updateTranscoderOutput.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTranscoderOutput.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateTranscoderOutput.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates an output rendition.
     * Update an output
     */
    async updateTranscoderOutput(requestParameters: UpdateTranscoderOutputRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputResponse> {
        const response = await this.updateTranscoderOutputRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates an output stream target.
     * Update an output stream target
     */
    async updateTranscoderOutputOutputStreamTargetRaw(requestParameters: UpdateTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TranscoderOutputsOutputStreamTargetResponse>> {
        if (requestParameters.transcoderId === null || requestParameters.transcoderId === undefined) {
            throw new runtime.RequiredError('transcoderId','Required parameter requestParameters.transcoderId was null or undefined when calling updateTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling updateTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.streamTargetId === null || requestParameters.streamTargetId === undefined) {
            throw new runtime.RequiredError('streamTargetId','Required parameter requestParameters.streamTargetId was null or undefined when calling updateTranscoderOutputOutputStreamTarget.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateTranscoderOutputOutputStreamTarget.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}`.replace(`{${"transcoder_id"}}`, encodeURIComponent(String(requestParameters.transcoderId))).replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"stream_target_id"}}`, encodeURIComponent(String(requestParameters.streamTargetId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TranscoderOutputsOutputStreamTargetResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates an output stream target.
     * Update an output stream target
     */
    async updateTranscoderOutputOutputStreamTarget(requestParameters: UpdateTranscoderOutputOutputStreamTargetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TranscoderOutputsOutputStreamTargetResponse> {
        const response = await this.updateTranscoderOutputOutputStreamTargetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
