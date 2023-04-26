import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type NotificationAddFormModel = {
    title: string;
    content: string;
    announcementId: string;
};

export type NotificationAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<NotificationAddFormModel>>;
};

export type NotificationAddFormActions = {
    register: UseFormRegister<NotificationAddFormModel>;
    watch: UseFormWatch<NotificationAddFormModel>;
    handleSubmit: UseFormHandleSubmit<NotificationAddFormModel>;
    submit: (body: NotificationAddFormModel) => void;
};
export type NotificationAddFormComputed = {
    defaultValues: NotificationAddFormModel,
    isSubmitting: boolean
};

export type NotificationAddFormController = FormController<NotificationAddFormState, NotificationAddFormActions, NotificationAddFormComputed>;