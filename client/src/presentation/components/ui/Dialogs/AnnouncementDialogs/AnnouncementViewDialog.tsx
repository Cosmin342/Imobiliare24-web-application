import { AnnouncementDTO } from "@infrastructure/apis/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Card,
  Grid,
  TextareaAutosize,
  Typography,
  Container,
} from "@mui/material";
import { useIntl } from "react-intl";

export const AnnouncementViewDialog = (props: {
  renderModal: boolean;
  setRenderModal: Function;
  entry: AnnouncementDTO;
}) => {
  const { formatMessage } = useIntl();

  return (
    <Dialog
      open={props.renderModal}
      onClose={() => props.setRenderModal(false)}
    >
      <DialogTitle>{props.entry ? props.entry.title : ""}</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm" className="Dialog_container">
          <b>{formatMessage({ id: "globals.description" })}</b>
          <br />
          {props.entry && props.entry.description}
        </Container>
        <Container maxWidth="sm" className="Dialog_container">
          <b>{formatMessage({ id: "globals.surface" })}</b>{": "}{props.entry ? props.entry.building?.surface : ""}<br/>
          <b>{formatMessage({ id: "globals.roomsNumber" })}</b>{": "}{props.entry ? props.entry.building?.roomsNumber : ""}<br/>
          <b>{formatMessage({ id: "globals.year" })}</b>{": "}{props.entry ? props.entry.building?.year : ""}<br/>
          <b>{formatMessage({ id: "globals.specificCharacteristics" })}</b>{": "}{props.entry ? props.entry.building?.specificCharacteristics : ""}<br/>
          <b>{formatMessage({ id: "globals.floor" })}</b>{": "}{props.entry ? props.entry.building?.floor : ""}
        </Container>
        <Container maxWidth="sm" className="Dialog_container">
          <b>{formatMessage({ id: "globals.address" })}</b>
          <br />
          {formatMessage({ id: "globals.street" })}{" "}
          {props.entry ? props.entry.building?.address?.street : ""},{" "}
          {formatMessage({ id: "globals.streetNumber" })}{" "}
          {props.entry ? props.entry.building?.address?.number : ""},{" "}
          {props.entry ? props.entry.building?.address?.city : ""},{" "}
          {props.entry ? props.entry.building?.address?.county : ""}
        </Container>
      </DialogContent>
    </Dialog>
  );
};
