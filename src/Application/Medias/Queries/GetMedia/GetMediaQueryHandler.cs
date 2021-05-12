using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Medias.Queries.GetMedia
{
    public class GetMediaQueryHandler : IRequestHandler<GetMediaQuery, Media>
    {
        private readonly IApplicationDbContext _context;

        public GetMediaQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Media> Handle(GetMediaQuery request, CancellationToken cancellationToken)
        {
            var media = await _context.Medias.FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

            if(media == null)
                throw new NotFoundException(nameof(Media), request.Id);

            return media;
        }
    }
}