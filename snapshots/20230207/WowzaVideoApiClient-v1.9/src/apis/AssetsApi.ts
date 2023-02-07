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
  AssetCreateInput,
  AssetCreateResponse,
  AssetLiveStreamResponse,
  AssetReportUploadFailedInput,
  AssetReportUploadFailedResponse,
  AssetReportUploadedInput,
  AssetReportUploadedResponse,
  AssetResponse,
  AssetTags,
  AssetUpdateInput,
  AssetUpdateResponse,
  Assets,
  Error401,
  Error403,
  Error404,
  Error410,
  Error422,
  Error422AssetNotAvailable,
} from '../models';
import {
    AssetCreateInputFromJSON,
    AssetCreateInputToJSON,
    AssetCreateResponseFromJSON,
    AssetCreateResponseToJSON,
    AssetLiveStreamResponseFromJSON,
    AssetLiveStreamResponseToJSON,
    AssetReportUploadFailedInputFromJSON,
    AssetReportUploadFailedInputToJSON,
    AssetReportUploadFailedResponseFromJSON,
    AssetReportUploadFailedResponseToJSON,
    AssetReportUploadedInputFromJSON,
    AssetReportUploadedInputToJSON,
    AssetReportUploadedResponseFromJSON,
    AssetReportUploadedResponseToJSON,
    AssetResponseFromJSON,
    AssetResponseToJSON,
    AssetTagsFromJSON,
    AssetTagsToJSON,
    AssetUpdateInputFromJSON,
    AssetUpdateInputToJSON,
    AssetUpdateResponseFromJSON,
    AssetUpdateResponseToJSON,
    AssetsFromJSON,
    AssetsToJSON,
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
    Error422AssetNotAvailableFromJSON,
    Error422AssetNotAvailableToJSON,
} from '../models';

export interface AssetTagsRequest {
    page?: number;
    perPage?: number;
}

export interface CreateAssetRequest {
    assetCreateInput: AssetCreateInput;
}

export interface DeleteAssetRequest {
    id: string;
}

export interface ListAssetsRequest {
    query?: string;
    page?: number;
    perPage?: number;
}

export interface ReportUploadFailedAssetRequest {
    id: string;
    assetReportUploadFailedInput: AssetReportUploadFailedInput;
}

export interface ReportUploadedAssetRequest {
    id: string;
    assetReportUploadedInput: AssetReportUploadedInput;
}

export interface RestreamAssetRequest {
    id: string;
}

export interface ShowAssetRequest {
    id: string;
}

export interface UpdateAssetRequest {
    id: string;
    assetUpdateInput: AssetUpdateInput;
}

/**
 * 
 */
export class AssetsApi extends runtime.BaseAPI {

    /**
     * This operation retrieves a list of all of the tags that have been used previously by an organization.
     * Fetch all asset tags
     */
    async assetTagsRaw(requestParameters: AssetTagsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetTags>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/asset_tags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetTagsFromJSON(jsonValue));
    }

    /**
     * This operation retrieves a list of all of the tags that have been used previously by an organization.
     * Fetch all asset tags
     */
    async assetTags(requestParameters: AssetTagsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetTags> {
        const response = await this.assetTagsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation creates an asset. You can only upload MP4 format and H.264 and AAC encoded files. Any files with unsupported codecs are rejected.
     * Create an asset
     */
    async createAssetRaw(requestParameters: CreateAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetCreateResponse>> {
        if (requestParameters.assetCreateInput === null || requestParameters.assetCreateInput === undefined) {
            throw new runtime.RequiredError('assetCreateInput','Required parameter requestParameters.assetCreateInput was null or undefined when calling createAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/assets`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AssetCreateInputToJSON(requestParameters.assetCreateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetCreateResponseFromJSON(jsonValue));
    }

    /**
     * This operation creates an asset. You can only upload MP4 format and H.264 and AAC encoded files. Any files with unsupported codecs are rejected.
     * Create an asset
     */
    async createAsset(requestParameters: CreateAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetCreateResponse> {
        const response = await this.createAssetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation deletes an asset, including all assigned outputs and targets.  To ensure an efficient and clean transcoding process, you can\'t delete an asset when it\'s in the **processing** state. You can only delete an asset in the **uploading**, **failed**, or **completed** state.
     * Delete an asset
     */
    async deleteAssetRaw(requestParameters: DeleteAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/assets/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This operation deletes an asset, including all assigned outputs and targets.  To ensure an efficient and clean transcoding process, you can\'t delete an asset when it\'s in the **processing** state. You can only delete an asset in the **uploading**, **failed**, or **completed** state.
     * Delete an asset
     */
    async deleteAsset(requestParameters: DeleteAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteAssetRaw(requestParameters, initOverrides);
    }

    /**
     * This operation shows limited details for all of your assets. For detailed information, fetch a single asset.
     * Fetch all assets
     */
    async listAssetsRaw(requestParameters: ListAssetsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Assets>> {
        const queryParameters: any = {};

        if (requestParameters.query !== undefined) {
            queryParameters['query'] = requestParameters.query;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['per_page'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/assets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetsFromJSON(jsonValue));
    }

    /**
     * This operation shows limited details for all of your assets. For detailed information, fetch a single asset.
     * Fetch all assets
     */
    async listAssets(requestParameters: ListAssetsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Assets> {
        const response = await this.listAssetsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation reports that an asset uploaded to storage failed. You can only upload MP4 format and H.264 and AAC encoded files. Any files with unsupported codecs are rejected.
     * Report asset upload as failed
     */
    async reportUploadFailedAssetRaw(requestParameters: ReportUploadFailedAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetReportUploadFailedResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling reportUploadFailedAsset.');
        }

        if (requestParameters.assetReportUploadFailedInput === null || requestParameters.assetReportUploadFailedInput === undefined) {
            throw new runtime.RequiredError('assetReportUploadFailedInput','Required parameter requestParameters.assetReportUploadFailedInput was null or undefined when calling reportUploadFailedAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/assets/{id}/upload_failed`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AssetReportUploadFailedInputToJSON(requestParameters.assetReportUploadFailedInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetReportUploadFailedResponseFromJSON(jsonValue));
    }

    /**
     * This operation reports that an asset uploaded to storage failed. You can only upload MP4 format and H.264 and AAC encoded files. Any files with unsupported codecs are rejected.
     * Report asset upload as failed
     */
    async reportUploadFailedAsset(requestParameters: ReportUploadFailedAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetReportUploadFailedResponse> {
        const response = await this.reportUploadFailedAssetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation reports that an asset was successfully uploaded to storage.
     * Report asset as uploaded
     */
    async reportUploadedAssetRaw(requestParameters: ReportUploadedAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetReportUploadedResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling reportUploadedAsset.');
        }

        if (requestParameters.assetReportUploadedInput === null || requestParameters.assetReportUploadedInput === undefined) {
            throw new runtime.RequiredError('assetReportUploadedInput','Required parameter requestParameters.assetReportUploadedInput was null or undefined when calling reportUploadedAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/assets/{id}/upload_completed`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AssetReportUploadedInputToJSON(requestParameters.assetReportUploadedInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetReportUploadedResponseFromJSON(jsonValue));
    }

    /**
     * This operation reports that an asset was successfully uploaded to storage.
     * Report asset as uploaded
     */
    async reportUploadedAsset(requestParameters: ReportUploadedAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetReportUploadedResponse> {
        const response = await this.reportUploadedAssetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation returns a live stream ID you can use to re-stream an uploaded asset.
     * Restream an asset
     */
    async restreamAssetRaw(requestParameters: RestreamAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetLiveStreamResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling restreamAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/assets/{id}/live_streams`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetLiveStreamResponseFromJSON(jsonValue));
    }

    /**
     * This operation returns a live stream ID you can use to re-stream an uploaded asset.
     * Restream an asset
     */
    async restreamAsset(requestParameters: RestreamAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetLiveStreamResponse> {
        const response = await this.restreamAssetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation shows the details of a specific asset.  The fields returned vary depending on when you send this request. For example, if a resource hasn\'t been created yet during the processing state, you won\'t see **available_renditions** in the response.  **Tip**: If your original upload URL expired and you need a new one for an asset, send this request and the response will contain a new upload URL.
     * Fetch an asset
     */
    async showAssetRaw(requestParameters: ShowAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/assets/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetResponseFromJSON(jsonValue));
    }

    /**
     * This operation shows the details of a specific asset.  The fields returned vary depending on when you send this request. For example, if a resource hasn\'t been created yet during the processing state, you won\'t see **available_renditions** in the response.  **Tip**: If your original upload URL expired and you need a new one for an asset, send this request and the response will contain a new upload URL.
     * Fetch an asset
     */
    async showAsset(requestParameters: ShowAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetResponse> {
        const response = await this.showAssetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation updates an asset. Assets must be uploaded and complete processing before they can be updated.  The fields returned vary depending on when you send this request. For example, if a stream doesn\'t have unique viewer data, you won\'t see **unique_viewers** in the response.
     * Update an asset
     */
    async updateAssetRaw(requestParameters: UpdateAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssetUpdateResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateAsset.');
        }

        if (requestParameters.assetUpdateInput === null || requestParameters.assetUpdateInput === undefined) {
            throw new runtime.RequiredError('assetUpdateInput','Required parameter requestParameters.assetUpdateInput was null or undefined when calling updateAsset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/assets/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AssetUpdateInputToJSON(requestParameters.assetUpdateInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetUpdateResponseFromJSON(jsonValue));
    }

    /**
     * This operation updates an asset. Assets must be uploaded and complete processing before they can be updated.  The fields returned vary depending on when you send this request. For example, if a stream doesn\'t have unique viewer data, you won\'t see **unique_viewers** in the response.
     * Update an asset
     */
    async updateAsset(requestParameters: UpdateAssetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssetUpdateResponse> {
        const response = await this.updateAssetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
