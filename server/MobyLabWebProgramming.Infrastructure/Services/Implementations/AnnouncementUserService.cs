using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System.Net;

public class AnnouncementUserService : IAnnouncementUserService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public AnnouncementUserService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse> AddAnnouncementUserAssociation(AnnouncementUserAddDTO announcementUser, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AnnouncementUserAddSpec(announcementUser.AnnouncementId, announcementUser.UserId), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "This user already subscribed to this announcement!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new AnnouncementUser
        {
            UserId = announcementUser.UserId,
            AnnouncementId = announcementUser.AnnouncementId
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<List<UserDTO>>> GetUsersForAnnouncement(Guid announcementId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.ListAsync(new SubscribedUsersSpec(announcementId), cancellationToken);

        return ServiceResponse<List<UserDTO>>.ForSuccess(result);
    }
}