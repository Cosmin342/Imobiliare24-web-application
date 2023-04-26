import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { NotificationAddDTO } from "../client/models/NotificationAddDTO";
import { ApiNotificationGetPageForCurrentUserGetRequest, NotificationApi } from "../client/apis/NotificationApi";

/**
 * Use constants to identify mutations and queries.
 */
const getNotificationsQueryKey = "getNotificationsQuery";
const getNotificationQueryKey = "getNotificationQuery";
const addNotificationMutationKey = "addNotificationMutation";
const deleteNotificationMutationKey = "deleteNotificationMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export interface NotificationAddDTOWithAnnouncement {
    Notification: NotificationAddDTO,
    announcementId: string
}

export const useNotificationApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getNotifications = (page: ApiNotificationGetPageForCurrentUserGetRequest) => new NotificationApi(config).apiNotificationGetPageForCurrentUserGet(page); // Use the generated client code and adapt it.
    const getNotification = (id: string) => new NotificationApi(config).apiNotificationGetByIdIdGet({ id });
    const addNotification = (notification: NotificationAddDTOWithAnnouncement) => new NotificationApi(config).apiNotificationAddAnnouncementIdPost({ notificationAddDTO: notification.Notification, announcementId: notification.announcementId });
    const deleteNotification = (id: string) => new NotificationApi(config).apiNotificationDeleteIdDelete({ id });

    return {
        getNotifications: { // Return the query object.
            key: getNotificationsQueryKey, // Add the key to identify the query.
            query: getNotifications // Add the query callback.
        },
        getNotification: {
            key: getNotificationQueryKey,
            query: getNotification
        },
        addNotification: { // Return the mutation object.
            key: addNotificationMutationKey, // Add the key to identify the mutation.
            mutation: addNotification // Add the mutation callback.
        },
        deleteNotification: {
            key: deleteNotificationMutationKey,
            mutation: deleteNotification
        }
    }
}