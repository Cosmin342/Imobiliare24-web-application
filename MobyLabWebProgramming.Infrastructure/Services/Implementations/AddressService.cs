using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System.Net;

public class AddressService : IAddressService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IAddressRepository _addressRepository;

    public AddressService(IRepository<WebAppDatabaseContext> repository, IAddressRepository addressRepository)
    {
        _repository = repository;
        _addressRepository = addressRepository;
    }

    public async Task<ServiceResponse<AddressDTO>> GetAddressById(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AddressSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<AddressDTO>.ForSuccess(result) :
            ServiceResponse<AddressDTO>.FromError(CommonErrors.AddressNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<AddressDTO>>> GetAddresses(PaginationSearchQueryParams pagination, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new AddressSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<AddressDTO>>.ForSuccess(result);
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
        var address = await _addressRepository.GetAddressWithBuildings(id, cancellationToken);

        return address != null ?
            ServiceResponse<Address>.ForSuccess(address) :
            ServiceResponse<Address>.FromError(CommonErrors.AddressNotFound);
    }

    public async Task<ServiceResponse> Update(AddressDTO address, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var newAddress = await _repository.GetAsync(new AddressAddSpec(address.Id), cancellationToken);

        if (newAddress != null)
        {
            newAddress.Street = address.Street;
            newAddress.Number = address.Number;
            newAddress.City = address.City;
            newAddress.County = address.County;

            await _repository.UpdateAsync(newAddress, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This address doesn't exist!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> DeleteAddress(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only an admin can delete an address!", ErrorCodes.CannotDelete));
        }

        var result = await GetNonDTOAddressById(id);

        if (result != null && result.Result.Buildings.Count != 0)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "There are some buildings registered at this address!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Address>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}