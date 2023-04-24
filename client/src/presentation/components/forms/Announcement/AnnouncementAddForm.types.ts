import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type AnnouncementAddFormModel = {
    title: string,
    description: string,
    price: number,
    surface: number,
    roomsNumber: number,
    specificCharacteristics?: string,
    floor?: number,
    year: number,
    county: string,
    city: string,
    street: string,
    streetNumber: number
};

export type AnnouncementAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<AnnouncementAddFormModel>>;
};

export type AnnouncementAddFormActions = {
    register: UseFormRegister<AnnouncementAddFormModel>;
    watch: UseFormWatch<AnnouncementAddFormModel>;
    handleSubmit: UseFormHandleSubmit<AnnouncementAddFormModel>;
    submit: (body: AnnouncementAddFormModel) => void;
};
export type AnnouncementAddFormComputed = {
    defaultValues: AnnouncementAddFormModel,
    isSubmitting: boolean
};

export type AnnouncementAddFormController = FormController<AnnouncementAddFormState, AnnouncementAddFormActions, AnnouncementAddFormComputed>;