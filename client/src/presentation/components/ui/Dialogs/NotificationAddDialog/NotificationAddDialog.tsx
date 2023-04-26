import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { UserAddForm } from "@presentation/components/forms/User/UserAddForm";
import { useIntl } from "react-intl";
import { useNotificationAddDialogController } from "./NotificationAddDialog.controller";
import { NotificationAddForm } from "@presentation/components/forms/Notification/NotificationAddForm";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const NotificationAddDialog = () => {
  const { open, close, isOpen } = useNotificationAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addNotification" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addNotification" })}
      </DialogTitle>
      <DialogContent>
        <NotificationAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};