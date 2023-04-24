import { useAppSelector } from "@application/store";
import { ApiAnnouncementGetPageGetRequest, AnnouncementAddDTO, AnnouncementApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getAnnouncementsQueryKey = "getAnnouncementsQuery";
const getAnnouncementQueryKey = "getAnnouncementQuery";
const addAnnouncementMutationKey = "addAnnouncementMutation";
const deleteAnnouncementMutationKey = "deleteAnnouncementMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the Announcement API.
 */
export const useAnnouncementApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getAnnouncements = (page: ApiAnnouncementGetPageGetRequest) => new AnnouncementApi(config).apiAnnouncementGetPageGet(page); // Use the generated client code and adapt it.
    const getAnnouncement = (id: string) => new AnnouncementApi(config).apiAnnouncementGetByIdIdGet({ id });
    const addAnnouncement = (Announcement: AnnouncementAddDTO) => new AnnouncementApi(config).apiAnnouncementAddPost({ announcementAddDTO: Announcement });
    const deleteAnnouncement = (id: string) => new AnnouncementApi(config).apiAnnouncementDeleteIdDelete({ id });

    return {
        getAnnouncements: { // Return the query object.
            key: getAnnouncementsQueryKey, // Add the key to identify the query.
            query: getAnnouncements // Add the query callback.
        },
        getAnnouncement: {
            key: getAnnouncementQueryKey,
            query: getAnnouncement
        },
        addAnnouncement: { // Return the mutation object.
            key: addAnnouncementMutationKey, // Add the key to identify the mutation.
            mutation: addAnnouncement // Add the mutation callback.
        },
        deleteAnnouncement: {
            key: deleteAnnouncementMutationKey,
            mutation: deleteAnnouncement
        }
    }
}