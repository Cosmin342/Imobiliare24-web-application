import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useIntl } from "react-intl";

export const AnnouncementDeleteDialog = (props: {renderModal: boolean, setRenderModal: Function, remove: Function, entryId: string}) => {
    const { formatMessage } = useIntl();
    
    return <Dialog open={props.renderModal} onClose={() => props.setRenderModal(false)}>
      <DialogTitle>
        {formatMessage({ id: "labels.deleteAnnouncement" })}
      </DialogTitle>
      <DialogContent>
        {formatMessage({ id: "notifications.messages.deleteAnnouncement" })}
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