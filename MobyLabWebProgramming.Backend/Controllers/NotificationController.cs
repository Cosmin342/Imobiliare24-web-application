using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class NotificationController : AuthorizedController
{
    private readonly INotificationService _notificationService;

    public NotificationController(IUserService userService, INotificationService notificationService) : base(userService)
    {
        _notificationService = notificationService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<NotificationDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _notificationService.GetNotification(id)) :
            this.ErrorMessageResult<NotificationDTO>(currentUser.Error);
    }


    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<NotificationDTO>>>> GetPageForCurrentUser([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _notificationService.GetNotifications(pagination, currentUser.Result.Id)) :
            this.ErrorMessageResult<PagedResponse<NotificationDTO>>(currentUser.Error);
    }


    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _notificationService.DeleteNotification(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPost("{announcementId:guid}")]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] NotificationAddDTO notification, [FromRoute] Guid announcementId)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _notificationService.AddNotificationForAnnouncement(notification, false, announcementId, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] NotificationDTO notification)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _notificationService.Update(notification, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}