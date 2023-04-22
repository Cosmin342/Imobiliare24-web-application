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
  AnnouncementAddDTO,
  AnnouncementDTOPagedResponseRequestResponse,
  AnnouncementDTORequestResponse,
  AnnouncementUpdateDTO,
  RequestResponse,
} from '../models';
import {
    AnnouncementAddDTOFromJSON,
    AnnouncementAddDTOToJSON,
    AnnouncementDTOPagedResponseRequestResponseFromJSON,
    AnnouncementDTOPagedResponseRequestResponseToJSON,
    AnnouncementDTORequestResponseFromJSON,
    AnnouncementDTORequestResponseToJSON,
    AnnouncementUpdateDTOFromJSON,
    AnnouncementUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiAnnouncementAddPostRequest {
    announcementAddDTO?: AnnouncementAddDTO;
}

export interface ApiAnnouncementDeleteIdDeleteRequest {
    id: string;
}

export interface ApiAnnouncementDisableIdPutRequest {
    id: string;
}

export interface ApiAnnouncementGetByIdIdGetRequest {
    id: string;
}

export interface ApiAnnouncementGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
    active?: boolean;
    forCurrentUser?: boolean;
}

export interface ApiAnnouncementGetPageSubscribedGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiAnnouncementSubscribeAnnouncementIdPostRequest {
    announcementId: string;
}

export interface ApiAnnouncementUnsubscribeAnnouncementIdDeleteRequest {
    announcementId: string;
}

export interface ApiAnnouncementUpdatePutRequest {
    announcementUpdateDTO?: AnnouncementUpdateDTO;
}

/**
 * 
 */
export class AnnouncementApi extends runtime.BaseAPI {

    /**
     */
    async apiAnnouncementAddPostRaw(requestParameters: ApiAnnouncementAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AnnouncementAddDTOToJSON(requestParameters.announcementAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementAddPost(requestParameters: ApiAnnouncementAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAnnouncementAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementDeleteIdDeleteRaw(requestParameters: ApiAnnouncementDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiAnnouncementDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementDeleteIdDelete(requestParameters: ApiAnnouncementDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAnnouncementDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementDisableIdPutRaw(requestParameters: ApiAnnouncementDisableIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiAnnouncementDisableIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/Disable/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementDisableIdPut(requestParameters: ApiAnnouncementDisableIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAnnouncementDisableIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementGetByIdIdGetRaw(requestParameters: ApiAnnouncementGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AnnouncementDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiAnnouncementGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AnnouncementDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementGetByIdIdGet(requestParameters: ApiAnnouncementGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnnouncementDTORequestResponse> {
        const response = await this.apiAnnouncementGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementGetPageGetRaw(requestParameters: ApiAnnouncementGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AnnouncementDTOPagedResponseRequestResponse>> {
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

        if (requestParameters.active !== undefined) {
            queryParameters['active'] = requestParameters.active;
        }

        if (requestParameters.forCurrentUser !== undefined) {
            queryParameters['forCurrentUser'] = requestParameters.forCurrentUser;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AnnouncementDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementGetPageGet(requestParameters: ApiAnnouncementGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnnouncementDTOPagedResponseRequestResponse> {
        const response = await this.apiAnnouncementGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementGetPageSubscribedGetRaw(requestParameters: ApiAnnouncementGetPageSubscribedGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AnnouncementDTOPagedResponseRequestResponse>> {
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

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/GetPageSubscribed`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AnnouncementDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementGetPageSubscribedGet(requestParameters: ApiAnnouncementGetPageSubscribedGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnnouncementDTOPagedResponseRequestResponse> {
        const response = await this.apiAnnouncementGetPageSubscribedGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementSubscribeAnnouncementIdPostRaw(requestParameters: ApiAnnouncementSubscribeAnnouncementIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.announcementId === null || requestParameters.announcementId === undefined) {
            throw new runtime.RequiredError('announcementId','Required parameter requestParameters.announcementId was null or undefined when calling apiAnnouncementSubscribeAnnouncementIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/Subscribe/{announcementId}`.replace(`{${"announcementId"}}`, encodeURIComponent(String(requestParameters.announcementId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementSubscribeAnnouncementIdPost(requestParameters: ApiAnnouncementSubscribeAnnouncementIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAnnouncementSubscribeAnnouncementIdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementUnsubscribeAnnouncementIdDeleteRaw(requestParameters: ApiAnnouncementUnsubscribeAnnouncementIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.announcementId === null || requestParameters.announcementId === undefined) {
            throw new runtime.RequiredError('announcementId','Required parameter requestParameters.announcementId was null or undefined when calling apiAnnouncementUnsubscribeAnnouncementIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/Unsubscribe/{announcementId}`.replace(`{${"announcementId"}}`, encodeURIComponent(String(requestParameters.announcementId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementUnsubscribeAnnouncementIdDelete(requestParameters: ApiAnnouncementUnsubscribeAnnouncementIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAnnouncementUnsubscribeAnnouncementIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAnnouncementUpdatePutRaw(requestParameters: ApiAnnouncementUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Announcement/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AnnouncementUpdateDTOToJSON(requestParameters.announcementUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAnnouncementUpdatePut(requestParameters: ApiAnnouncementUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAnnouncementUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}