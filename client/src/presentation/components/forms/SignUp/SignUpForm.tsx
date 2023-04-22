import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Stack,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { isEmpty, isUndefined } from "lodash";
import { useSignUpFormController } from "./SignUpForm.controller";
import { useState } from "react";

/**
 * Here we declare the login form component.
 */
export const SignUpForm = () => {
  const { formatMessage } = useIntl();
  const { state, actions, computed } = useSignUpFormController(); // Use the controller.
  const [roleValue, setRoleValue] = useState("");

  return (
    <form onSubmit={actions.handleSubmit(actions.submit)}>
      {" "}
      {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
      <Stack spacing={4} style={{ width: "100%" }}>
        <ContentCard title={formatMessage({ id: "globals.signup" })}>
          <Grid container item direction="row" xs={12} columnSpacing={4}>
            <Grid container item direction="column" xs={12} md={12}>
              <FormControl fullWidth error={!isUndefined(state.errors.name)}>
                <FormLabel required>
                  <FormattedMessage id="globals.name" />
                </FormLabel>
                <OutlinedInput
                  {...actions.register("name")}
                  placeholder={formatMessage(
                    { id: "globals.placeholders.textInput" },
                    {
                      fieldName: formatMessage({
                        id: "globals.name",
                      }),
                    }
                  )}
                  autoComplete="name"
                />
                <FormHelperText hidden={isUndefined(state.errors.name)}>
                  {state.errors.name?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container item direction="column" xs={12} md={12}>
              <FormControl fullWidth error={!isUndefined(state.errors.email)}>
                {" "}
                {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                <FormLabel required>
                  <FormattedMessage id="globals.email" />
                </FormLabel>{" "}
                {/* Add a form label to indicate what the input means. */}
                <OutlinedInput
                  {...actions.register("email")} // Bind the form variable to the UI input.
                  placeholder={formatMessage(
                    { id: "globals.placeholders.textInput" },
                    {
                      fieldName: formatMessage({
                        id: "globals.email",
                      }),
                    }
                  )}
                  autoComplete="username"
                />{" "}
                {/* Add a input like a textbox shown here. */}
                <FormHelperText hidden={isUndefined(state.errors.email)}>
                  {state.errors.email?.message}
                </FormHelperText>{" "}
                {/* Add a helper text that is shown then the input has a invalid value. */}
              </FormControl>
            </Grid>
            <Grid container item direction="column" xs={12} md={12}>
              <FormControl
                fullWidth
                error={!isUndefined(state.errors.password)}
              >
                <FormLabel required>
                  <FormattedMessage id="globals.password" />
                </FormLabel>
                <OutlinedInput
                  type="password"
                  {...actions.register("password")}
                  placeholder={formatMessage(
                    { id: "globals.placeholders.textInput" },
                    {
                      fieldName: formatMessage({
                        id: "globals.password",
                      }),
                    }
                  )}
                  autoComplete="current-password"
                />
                <FormHelperText hidden={isUndefined(state.errors.password)}>
                  {state.errors.password?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container item direction="column" xs={12} md={12}>
              <FormControl
                fullWidth
                error={!isUndefined(state.errors.confirmPassword)}
              >
                <FormLabel required>
                  <FormattedMessage id="globals.confirmPassword" />
                </FormLabel>
                <OutlinedInput
                  type="password"
                  {...actions.register("confirmPassword")}
                  placeholder={formatMessage(
                    { id: "globals.placeholders.textInput" },
                    {
                      fieldName: formatMessage({
                        id: "globals.confirmPassword",
                      }),
                    }
                  )}
                />
                <FormHelperText
                  hidden={isUndefined(state.errors.confirmPassword)}
                >
                  {state.errors.confirmPassword?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid container item direction="column" xs={12} md={12}>
              <FormControl fullWidth error={!isUndefined(state.errors.role)}>
                {" "}
                {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                <FormLabel required>
                  <FormattedMessage id="globals.role" />
                </FormLabel>{" "}
                {/* Add a form label to indicate what the input means. */}
                <Select {...actions.register("role")}>
                  <MenuItem value={formatMessage({ id: "globals.personnel" })}>
                    {formatMessage({ id: "globals.personnel" })}
                  </MenuItem>
                  <MenuItem value={formatMessage({ id: "globals.client" })}>
                    {formatMessage({ id: "globals.client" })}
                  </MenuItem>
                </Select>
                <FormHelperText hidden={isUndefined(state.errors.role)}>
                  {state.errors.role?.message}
                </FormHelperText>{" "}
                {/* Add a helper text that is shown then the input has a invalid value. */}
              </FormControl>
            </Grid>
          </Grid>
        </ContentCard>
        <Grid container item direction="row" xs={12} className="padding-top-sm">
          <Grid container item direction="column" xs={12} md={7}></Grid>
          <Grid container item direction="column" xs={5}>
            <Button
              type="submit"
              disabled={!isEmpty(state.errors) || computed.isSubmitting}
            >
              {" "}
              {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
              {!computed.isSubmitting && (
                <FormattedMessage id="globals.submit" />
              )}
              {computed.isSubmitting && <CircularProgress />}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};
