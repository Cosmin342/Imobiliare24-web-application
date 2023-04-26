import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { AnnouncementDTO, UserRoleEnum } from "@infrastructure/apis/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  useOwnUser,
  useOwnUserHasRole,
} from "@infrastructure/hooks/useOwnUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AnnouncementDeleteDialog } from "../../Dialogs/AnnouncementDialogs/AnnouncementDeleteDialog";
import { AnnouncementViewDialog } from "../../Dialogs/AnnouncementDialogs/AnnouncementViewDialog";
import { AnnouncementAddDialog } from "../../Dialogs/AnnouncementDialogs/AnnouncementAddDialog";
import { useFollowedAnnouncementTableController } from "./FollowedAnnouncementTable.controller";
import { AnnouncementUnsubscribeDialog } from "../../Dialogs/AnnouncementDialogs/AnnouncementUnsubscribeDialog";
import { AnnouncementSubscribeDialog } from "../../Dialogs/AnnouncementDialogs/AnnouncementSubscribeDialog";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof AnnouncementDTO; name: string }[] => {
  const { formatMessage } = useIntl();

  return [
    { key: "title", name: formatMessage({ id: "globals.title" }) },
    { key: "price", name: formatMessage({ id: "globals.price" }) },
    { key: "isActive", name: formatMessage({ id: "globals.isActive" }) },
  ];
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (
  entries: AnnouncementDTO[] | null | undefined,
  orderMap: { [key: string]: number }
) =>
  entries?.map((entry) => {
    return {
      entry: entry,
      data: Object.entries(entry)
        .filter(([e]) => !isUndefined(orderMap[e]))
        .sort(([a], [b]) => orderMap[a] - orderMap[b])
        .map(([key, value]) => {
          return { key, value };
        }),
    };
  });

/**
 * Creates the user table.
 */
export const FollowedAnnouncementTable = () => {
  const { formatMessage } = useIntl();
  const header = useHeader();
  const orderMap = header.reduce((acc, e, i) => {
    return { ...acc, [e.key]: i };
  }, {}) as { [key: string]: number }; // Get the header column order.
  const {
    handleChangePage,
    handleChangePageSize,
    pagedData,
    isError,
    isLoading,
    tryReload,
    labelDisplay,
    remove,
  } = useFollowedAnnouncementTableController(); // Use the controller hook.
  const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.
  const [renderModal, setRenderModal] = useState(false);
  const [renderViewModal, setRenderViewModal] = useState(false);
  const [entryId, setEntryId] = useState("");
  const [entry, setEntry] = useState(undefined as unknown as AnnouncementDTO);
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return (
    <DataLoadingContainer
      isError={isError}
      isLoading={isLoading}
      tryReload={tryReload}
    >
      {" "}
      {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
      <AnnouncementSubscribeDialog />
      {!isUndefined(pagedData) &&
        !isUndefined(pagedData?.totalCount) &&
        !isUndefined(pagedData?.page) &&
        !isUndefined(pagedData?.pageSize) && (
          <TablePagination // Use the table pagination to add the navigation between the table pages.
            component="div"
            count={pagedData.totalCount} // Set the entry count returned from the backend.
            page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
            onPageChange={handleChangePage} // Set the callback to change the current page.
            rowsPerPage={pagedData.pageSize} // Set the current page size.
            onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size.
            labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
            labelDisplayedRows={labelDisplay}
            showFirstButton
            showLastButton
          />
        )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                header.map((e) => (
                  <TableCell key={`header_${String(e.key)}`}>
                    {e.name}
                  </TableCell>
                )) // Add the table header.
              }
              <TableCell>{formatMessage({ id: "globals.year" })}</TableCell>
              <TableCell>{formatMessage({ id: "globals.surface" })}</TableCell>
              {isAdmin && (
                <TableCell>{formatMessage({ id: "labels.id" })}</TableCell>
              )}
              <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell>{" "}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowValues?.map(({ data, entry }, rowIndex) => (
              <TableRow key={`row_${rowIndex + 1}`}>
                {data.map((keyValue, index) => (
                  <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                    {typeof keyValue.value === "boolean" ? (
                      <Checkbox
                        disabled
                        checked={keyValue.value === true ? true : false}
                      />
                    ) : (
                      keyValue.value
                    )}
                  </TableCell>
                ))}
                <TableCell>{entry.building?.year}</TableCell>
                <TableCell>{entry.building?.surface} m<sup>2</sup></TableCell>
                {isAdmin && <TableCell>{entry.id}</TableCell>}
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setRenderModal(true);
                      setEntryId(entry.id || "");
                    }}
                  >
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setRenderViewModal(true);
                      setEntry(entry);
                    }}
                  >
                    <VisibilityIcon color="info" fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AnnouncementUnsubscribeDialog
        renderModal={renderModal}
        setRenderModal={setRenderModal}
        remove={remove}
        entryId={entryId}
      />
      <AnnouncementViewDialog
        renderModal={renderViewModal}
        setRenderModal={setRenderViewModal}
        entry={entry}
      />
    </DataLoadingContainer>
  );
};
