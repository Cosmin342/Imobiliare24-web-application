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
import type { BuildingDTOPagedResponse } from './BuildingDTOPagedResponse';
import {
    BuildingDTOPagedResponseFromJSON,
    BuildingDTOPagedResponseFromJSONTyped,
    BuildingDTOPagedResponseToJSON,
} from './BuildingDTOPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface BuildingDTOPagedResponseRequestResponse
 */
export interface BuildingDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {BuildingDTOPagedResponse}
     * @memberof BuildingDTOPagedResponseRequestResponse
     */
    response?: BuildingDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof BuildingDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the BuildingDTOPagedResponseRequestResponse interface.
 */
export function instanceOfBuildingDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BuildingDTOPagedResponseRequestResponseFromJSON(json: any): BuildingDTOPagedResponseRequestResponse {
    return BuildingDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function BuildingDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuildingDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : BuildingDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function BuildingDTOPagedResponseRequestResponseToJSON(value?: BuildingDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': BuildingDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

