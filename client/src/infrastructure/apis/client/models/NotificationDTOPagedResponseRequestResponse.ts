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
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { NotificationDTOPagedResponse } from './NotificationDTOPagedResponse';
import {
    NotificationDTOPagedResponseFromJSON,
    NotificationDTOPagedResponseFromJSONTyped,
    NotificationDTOPagedResponseToJSON,
} from './NotificationDTOPagedResponse';

/**
 * 
 * @export
 * @interface NotificationDTOPagedResponseRequestResponse
 */
export interface NotificationDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {NotificationDTOPagedResponse}
     * @memberof NotificationDTOPagedResponseRequestResponse
     */
    response?: NotificationDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof NotificationDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the NotificationDTOPagedResponseRequestResponse interface.
 */
export function instanceOfNotificationDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function NotificationDTOPagedResponseRequestResponseFromJSON(json: any): NotificationDTOPagedResponseRequestResponse {
    return NotificationDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function NotificationDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : NotificationDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function NotificationDTOPagedResponseRequestResponseToJSON(value?: NotificationDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': NotificationDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

