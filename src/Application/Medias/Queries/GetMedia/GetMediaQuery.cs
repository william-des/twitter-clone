using System;
using MediatR;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Medias.Queries.GetMedia
{
    public class GetMediaQuery : IRequest<Media>
    {
        public Guid Id { get; set; }
    }
}