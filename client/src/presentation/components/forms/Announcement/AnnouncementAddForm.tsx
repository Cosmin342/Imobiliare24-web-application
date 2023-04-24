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
  InputAdornment,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty, isUndefined } from "lodash";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { useAnnouncementAddFormController } from "./AnnouncementAddForm.controller";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const AnnouncementAddForm = (props: { onSubmit?: () => void }) => {
  const { formatMessage } = useIntl();
  const { state, actions, computed } = useAnnouncementAddFormController(
    props.onSubmit
  ); // Use the controller.

  return (
    <form onSubmit={actions.handleSubmit(actions.submit)}>
      {" "}
      {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
      <Stack spacing={4} style={{ width: "100%" }}>
        <Grid container item direction="row" xs={12} columnSpacing={4}>
          <Grid container item direction="column" xs={12} md={12}>
            <FormControl fullWidth error={!isUndefined(state.errors.title)}>
              {" "}
              {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
              <FormLabel required>
                <FormattedMessage id="globals.title" />
              </FormLabel>{" "}
              {/* Add a form label to indicate what the input means. */}
              <OutlinedInput
                {...actions.register("title")} // Bind the form variable to the UI input.
                multiline
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.title",
                    }),
                  }
                )}
                autoComplete="none"
              />{" "}
              {/* Add a input like a textbox shown here. */}
              <FormHelperText hidden={isUndefined(state.errors.title)}>
                {state.errors.title?.message}
              </FormHelperText>{" "}
              {/* Add a helper text that is shown then the input has a invalid value. */}
            </FormControl>
          </Grid>
          <Grid container item direction="column" xs={12} md={12}>
            <FormControl
              fullWidth
              error={!isUndefined(state.errors.description)}
            >
              <FormLabel required>
                <FormattedMessage id="globals.description" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("description")}
                multiline
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.description",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.description)}>
                {state.errors.description?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item direction="column" xs={3} md={3}>
            <FormControl fullWidth error={!isUndefined(state.errors.price)}>
              <FormLabel required>
                <FormattedMessage id="globals.price" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("price")}
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    {formatMessage({ id: "globals.currency" })}
                  </InputAdornment>
                }
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.price",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.price)}>
                {state.errors.price?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item direction="column" xs={3} md={3}>
            <FormControl fullWidth error={!isUndefined(state.errors.surface)}>
              <FormLabel required>
                <FormattedMessage id="globals.surface" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("surface")}
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    {formatMessage({ id: "globals.baseUnit" })}
                  </InputAdornment>
                }
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.surface",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.surface)}>
                {state.errors.surface?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl
              fullWidth
              error={!isUndefined(state.errors.roomsNumber)}
            >
              <FormLabel required>
                <FormattedMessage id="globals.roomsNumber" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("roomsNumber")}
                type="number"
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.roomsNumber",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.roomsNumber)}>
                {state.errors.roomsNumber?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl fullWidth error={!isUndefined(state.errors.floor)}>
              <FormLabel>
                <FormattedMessage id="globals.floor" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("floor")}
                type="number"
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.floor",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.floor)}>
                {state.errors.floor?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl fullWidth error={!isUndefined(state.errors.year)}>
              <FormLabel>
                <FormattedMessage id="globals.year" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("year")}
                type="number"
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.year",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.year)}>
                {state.errors.year?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl fullWidth error={!isUndefined(state.errors.county)}>
              <FormLabel>
                <FormattedMessage id="globals.county" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("county")}
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.county",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.county)}>
                {state.errors.county?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl fullWidth error={!isUndefined(state.errors.city)}>
              <FormLabel>
                <FormattedMessage id="globals.city" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("city")}
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.city",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.city)}>
                {state.errors.city?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl fullWidth error={!isUndefined(state.errors.street)}>
              <FormLabel>
                <FormattedMessage id="globals.street" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("street")}
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.street",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.street)}>
                {state.errors.street?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid container item direction="column" xs={6} md={6}>
            <FormControl fullWidth error={!isUndefined(state.errors.streetNumber)}>
              <FormLabel>
                <FormattedMessage id="globals.streetNumber" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("streetNumber")}
                type="number"
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.streetNumber",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.streetNumber)}>
                {state.errors.streetNumber?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid container item direction="column" xs={12} md={12}>
            <FormControl
              fullWidth
              error={!isUndefined(state.errors.specificCharacteristics)}
            >
              <FormLabel>
                <FormattedMessage id="globals.specificCharacteristics" />
              </FormLabel>
              <OutlinedInput
                {...actions.register("specificCharacteristics")}
                multiline
                placeholder={formatMessage(
                  { id: "globals.placeholders.textInput" },
                  {
                    fieldName: formatMessage({
                      id: "globals.specificCharacteristics",
                    }),
                  }
                )}
                autoComplete="none"
              />
              <FormHelperText hidden={isUndefined(state.errors.specificCharacteristics)}>
                {state.errors.specificCharacteristics?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
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
