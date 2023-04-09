using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

public class AddressService : IAddressService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public AddressService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<AddressDTO>> GetAddressById(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AddressSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<AddressDTO>.ForSuccess(result) :
            ServiceResponse<AddressDTO>.FromError(CommonErrors.AnnouncementNotFound);
    }

    public async Task<ServiceResponse<AddressDTO>> GetAddressByFields(string city, string county, string street, int streetNumber, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AddressSpec(city, county, street, streetNumber), cancellationToken);

        return result != null ?
            ServiceResponse<AddressDTO>.ForSuccess(result) :
            ServiceResponse<AddressDTO>.FromError(CommonErrors.AddressNotFound);
    }

    public async Task<ServiceResponse<AddressDTO>> AddAddress(AddressAddDTO newAddress, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        var address = await _repository.GetAsync(new AddressSpec(newAddress.City, newAddress.County, newAddress.Street, newAddress.Number), cancellationToken);

        if (address != null)
        {
            return ServiceResponse<AddressDTO>.FromError(new(HttpStatusCode.Conflict, "There is already an address!", ErrorCodes.CannotAdd));
        }

        var addressToAdd = new Address
        {
            City = newAddress.City,
            County = newAddress.County,
            Street = newAddress.Street,
            Number = newAddress.Number
        };

        var result = await _repository.AddAsync(addressToAdd, cancellationToken);

        return ServiceResponse<AddressDTO>.ForSuccess(new AddressDTO
        {
            Id = result.Id,
            City = result.City,
            County = result.County,
            Street = result.Street,
            Number = result.Number
        });
    }
    public async Task<ServiceResponse<Address>> GetNonDTOAddressById(Guid id, CancellationToken cancellationToken = default)
    {
        var address = await _repository.GetAsync(new AddressAddSpec(id), cancellationToken);

        //var address = new Address
        //{
        //    Id = addressDTO.Id,
        //    City = addressDTO.City,
        //    County = addressDTO.County,
        //    Street = addressDTO.Street,
        //    Number = addressDTO.Number
        //};

        return ServiceResponse<Address>.ForSuccess(address);
    }
}