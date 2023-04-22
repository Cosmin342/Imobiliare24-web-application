import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired
} from "react-hook-form";

export type SingUpFormModel = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

export type SingUpFormState = {
    errors: FieldErrorsImpl<DeepRequired<SingUpFormModel>>;
};

export type SingUpFormActions = {
    register: UseFormRegister<SingUpFormModel>;
    handleSubmit: UseFormHandleSubmit<SingUpFormModel>;
    submit: (body: SingUpFormModel) => void;
};
export type SignUpFormComputed = {
    defaultValues: SingUpFormModel,
    isSubmitting: boolean
};

export type SignUpFormController = FormController<SingUpFormState, SingUpFormActions, SignUpFormComputed>;