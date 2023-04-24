import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { AnnouncementAddFormController, AnnouncementAddFormModel } from "./AnnouncementAddForm.types";
import { useAnnouncementApi } from "@infrastructure/apis/api-management/announcement";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: AnnouncementAddFormModel) => {
    const defaultValues = {
        title: "",
        description: "",
        price: 0,
        surface: 0,
        roomsNumber: 0,
        specificCharacteristics: undefined,
        floor: undefined,
        year: 0,
        county: "",
        city: "",
        street: "",
        streetNumber: 0
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitAnnouncementAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        title: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.title",
                    }),
                }))
            .default(defaultValues.title)
            .max(255, formatMessage({ id: "globals.validations.maximumCharacters" }, {
                number: 255
            }))
            .min(16, formatMessage({ id: "globals.validations.minimumCharacters" }, {
                number: 16
            })),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.description",
                    }),
                }))
            .default(defaultValues.description)
            .max(1023, formatMessage({ id: "globals.validations.maximumCharacters" }, {
                number: 1023
            }))
            .min(80, formatMessage({ id: "globals.validations.minimumCharacters" }, {
                number: 80
            })),
        price: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.price",
                    }),
                }))
            .moreThan(0, formatMessage({ id: "globals.validations.minimumValue" })),
        surface: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.surface",
                    }),
                }))
            .moreThan(0, formatMessage({ id: "globals.validations.minimumValue" })),
        roomsNumber: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.roomsNumber",
                    }),
                }))
            .moreThan(0, formatMessage({ id: "globals.validations.minimumValue" })),
        year: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.year",
                    }),
                }))
            .moreThan(0, formatMessage({ id: "globals.validations.minimumValue" })),
        specificCharacteristics: yup.string(),
        floor: yup.number(),
        county: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.county",
                    }),
                })),
        city: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.city",
                    }),
                })),
        street: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.street",
                    }),
                })),
        streetNumber: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.streetNumber",
                    }),
                }))
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useAnnouncementAddFormController = (onSubmit?: () => void): AnnouncementAddFormController => {
    const { defaultValues, resolver } = useInitAnnouncementAddForm();
    const { addAnnouncement: { mutation, key: mutationKey }, getAnnouncements: { key: queryKey } } = useAnnouncementApi();
    const { mutateAsync: add, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const submit = useCallback((data: AnnouncementAddFormModel) => // Create a submit callback to send the form data to the backend.
        add({
            title: data.title,
            description: data.description,
            price: data.price,
            building: {
                surface: data.surface,
                roomsNumber: data.roomsNumber,
                floor: data.floor,
                specificCharacteristics: data.specificCharacteristics,
                year: data.year,
                address: {
                    county: data.county,
                    city: data.city,
                    street: data.street,
                    number: data.streetNumber
                }
            }
        }).then(() => {
            queryClient.invalidateQueries([queryKey]); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<AnnouncementAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
        },
        computed: {
            defaultValues,
            isSubmitting: status === "loading" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }
}