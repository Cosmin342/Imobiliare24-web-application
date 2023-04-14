using MobyLabWebProgramming.Infrastructure.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Core.Requests;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AnnouncementController : AuthorizedController
{
    private readonly IAnnouncementService _announcementService;

    public AnnouncementController(IUserService userService, IAnnouncementService announcementService) : base(userService)
    {
        _announcementService = announcementService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<AnnouncementDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.GetAnnouncement(id)) :
            this.ErrorMessageResult<AnnouncementDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<AnnouncementDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination, [FromQuery] bool? active, [FromQuery] bool? forCurrentUser)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.GetAnnouncements(pagination, active, forCurrentUser, currentUser.Result.Id)) :
            this.ErrorMessageResult<PagedResponse<AnnouncementDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<AnnouncementDTO>>>> GetPageSubscribed([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.GetAnnouncementsSubscribed(pagination, currentUser.Result.Id)) :
            this.ErrorMessageResult<PagedResponse<AnnouncementDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] AnnouncementAddDTO announcement)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.AddAnnouncement(announcement, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPost("{announcementId:guid}")]
    public async Task<ActionResult<RequestResponse>> Subscribe([FromRoute] Guid announcementId)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.SubscribeToAnnouncement(new AnnouncementUserAddDTO
            {
                UserId = currentUser.Result.Id,
                AnnouncementId = announcementId
            })) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.DeleteAnnouncement(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Disable([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.DisableAnnouncement(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] AnnouncementUpdateDTO announcement)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _announcementService.Update(announcement, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}