
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;

public interface IAddressService
{
    public Task<ServiceResponse<AddressDTO>> GetAddressById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<AddressDTO>> GetAddressByFields(string city, string county, string street, int streetNumber, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<AddressDTO>> AddAddress(AddressAddDTO newAddress, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<Address>> GetNonDTOAddressById(Guid id, CancellationToken cancellationToken = default);
}