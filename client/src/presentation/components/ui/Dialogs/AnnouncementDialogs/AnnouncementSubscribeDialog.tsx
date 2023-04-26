import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useIntl } from "react-intl";
import { useAnnouncementAddDialogController } from "./AnnouncementAddDialog.controller";
import { AnnouncementAddForm } from "@presentation/components/forms/Announcement/AnnouncementAddForm";
import { AnnouncementTable } from "../../Tables/AnnouncementTable/AnnouncementTable";

export const AnnouncementSubscribeDialog = () => {
  const { open, close, isOpen } = useAnnouncementAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.subscribe" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.subscribe" })}
      </DialogTitle>
      <DialogContent>
        <AnnouncementTable disableButtons />
      </DialogContent>
    </Dialog>
  </div>
};