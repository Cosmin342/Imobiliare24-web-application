import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useIntl } from "react-intl";
import { useAnnouncementAddDialogController } from "./AnnouncementAddDialog.controller";
import { AnnouncementAddForm } from "@presentation/components/forms/Announcement/AnnouncementAddForm";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const AnnouncementAddDialog = () => {
  const { open, close, isOpen } = useAnnouncementAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addAnnouncement" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addAnnouncement" })}
      </DialogTitle>
      <DialogContent>
        <AnnouncementAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};