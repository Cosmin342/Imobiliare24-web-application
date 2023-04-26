import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useIntl } from "react-intl";

export const AnnouncementUnsubscribeDialog = (props: {renderModal: boolean, setRenderModal: Function, remove: Function, entryId: string}) => {
    const { formatMessage } = useIntl();
    
    return <Dialog open={props.renderModal} onClose={() => props.setRenderModal(false)}>
      <DialogTitle>
        {formatMessage({ id: "labels.unsubscribe" })}
      </DialogTitle>
      <DialogContent>
        {formatMessage({ id: "notifications.messages.unsubscribeAnnouncement" })}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setRenderModal(false)}>
          {formatMessage({ id: "labels.no" })}
        </Button>
        <Button
          onClick={() => {
            props.setRenderModal(false);
            props.remove(props.entryId);
          }}
          autoFocus
        >
          {formatMessage({ id: "labels.yes" })}
        </Button>
      </DialogActions>
    </Dialog>
}