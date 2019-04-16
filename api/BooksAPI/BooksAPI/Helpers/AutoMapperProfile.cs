using AutoMapper;
using BooksAPI.Dtos;
using BooksAPI.Models;

namespace BooksAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}