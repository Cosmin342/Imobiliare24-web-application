using MobyLabWebProgramming.Infrastructure.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using System;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AddressController : AuthorizedController
{
    private readonly IAddressService _addressService;
    public AddressController(IUserService userService, IAddressService addressService) : base(userService)
    {
        _addressService = addressService;
    }

    //[Authorize]
    //[HttpGet]
    //public async Task<ActionResult<RequestResponse<AddressDTO>>> Get([FromQuery] AddressAddDTO address)
    //{
    //    var currentUser = await GetCurrentUser();

    //    return currentUser.Result != null ?
    //        this.FromServiceResponse(await _addressService.GetAddressByFields(address.City, address.County, address.Street, address.Number)) :
    //        this.ErrorMessageResult<AddressDTO>(currentUser.Error);
    //}

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<AddressDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _addressService.GetAddressById(id)) :
            this.ErrorMessageResult<AddressDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] AddressAddDTO address)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _addressService.AddAddress(address, currentUser.Result)).Result :
            this.ErrorMessageResult(currentUser.Error);
    }
}
