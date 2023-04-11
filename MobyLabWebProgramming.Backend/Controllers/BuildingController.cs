
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

[ApiController]
[Route("api/[controller]/[action]")]
public class BuildingController : AuthorizedController
{
    private readonly IBuildingService _buildingService;

    public BuildingController(IUserService userService, IBuildingService buildingService) : base(userService)
    {
        _buildingService = buildingService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<BuildingDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _buildingService.GetBuilding(id)) :
            this.ErrorMessageResult<BuildingDTO>(currentUser.Error);
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] BuildingAddDTO building)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _buildingService.AddBuilding(building, currentUser.Result)).Result! :
            this.ErrorMessageResult(currentUser.Error);
    }
}
