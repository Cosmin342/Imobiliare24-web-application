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

import { exists, mapValues } from '../runtime';
import type { NotificationDTO } from './NotificationDTO';
import {
    NotificationDTOFromJSON,
    NotificationDTOFromJSONTyped,
    NotificationDTOToJSON,
} from './NotificationDTO';

/**
 * 
 * @export
 * @interface NotificationDTOPagedResponse
 */
export interface NotificationDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof NotificationDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<NotificationDTO>}
     * @memberof NotificationDTOPagedResponse
     */
    data?: Array<NotificationDTO> | null;
}

/**
 * Check if a given object implements the NotificationDTOPagedResponse interface.
 */
export function instanceOfNotificationDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function NotificationDTOPagedResponseFromJSON(json: any): NotificationDTOPagedResponse {
    return NotificationDTOPagedResponseFromJSONTyped(json, false);
}

export function NotificationDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(NotificationDTOFromJSON)),
    };
}

export function NotificationDTOPagedResponseToJSON(value?: NotificationDTOPagedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'pageSize': value.pageSize,
        'totalCount': value.totalCount,
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(NotificationDTOToJSON)),
    };
}

