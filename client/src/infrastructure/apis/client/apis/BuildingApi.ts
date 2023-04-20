/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BuildingAddDTO,
  BuildingDTOPagedResponseRequestResponse,
  BuildingDTORequestResponse,
  BuildingUpdateDTO,
  RequestResponse,
} from '../models';
import {
    BuildingAddDTOFromJSON,
    BuildingAddDTOToJSON,
    BuildingDTOPagedResponseRequestResponseFromJSON,
    BuildingDTOPagedResponseRequestResponseToJSON,
    BuildingDTORequestResponseFromJSON,
    BuildingDTORequestResponseToJSON,
    BuildingUpdateDTOFromJSON,
    BuildingUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiBuildingAddPostRequest {
    buildingAddDTO?: BuildingAddDTO;
}

export interface ApiBuildingDeleteIdDeleteRequest {
    id: string;
}

export interface ApiBuildingGetByIdIdGetRequest {
    id: string;
}

export interface ApiBuildingGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
    roomsNumber?: number;
}

export interface ApiBuildingUpdatePutRequest {
    buildingUpdateDTO?: BuildingUpdateDTO;
}

/**
 * 
 */
export class BuildingApi extends runtime.BaseAPI {

    /**
     */
    async apiBuildingAddPostRaw(requestParameters: ApiBuildingAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Building/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BuildingAddDTOToJSON(requestParameters.buildingAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiBuildingAddPost(requestParameters: ApiBuildingAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiBuildingAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiBuildingDeleteIdDeleteRaw(requestParameters: ApiBuildingDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiBuildingDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Building/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiBuildingDeleteIdDelete(requestParameters: ApiBuildingDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiBuildingDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiBuildingGetByIdIdGetRaw(requestParameters: ApiBuildingGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BuildingDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiBuildingGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Building/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiBuildingGetByIdIdGet(requestParameters: ApiBuildingGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BuildingDTORequestResponse> {
        const response = await this.apiBuildingGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiBuildingGetPageGetRaw(requestParameters: ApiBuildingGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BuildingDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.roomsNumber !== undefined) {
            queryParameters['roomsNumber'] = requestParameters.roomsNumber;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Building/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiBuildingGetPageGet(requestParameters: ApiBuildingGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BuildingDTOPagedResponseRequestResponse> {
        const response = await this.apiBuildingGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiBuildingUpdatePutRaw(requestParameters: ApiBuildingUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Building/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BuildingUpdateDTOToJSON(requestParameters.buildingUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiBuildingUpdatePut(requestParameters: ApiBuildingUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiBuildingUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
