using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Medias.Commands.CreateMedia
{
    public class CreateMediaCommandHandler : IRequestHandler<CreateMediaCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateMediaCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<Guid> Handle(CreateMediaCommand request, CancellationToken cancellationToken)
        {
            using var stream = new MemoryStream();
            await request.OpenReadStream().CopyToAsync(stream, cancellationToken);

            var media = new Media {
                Content = stream.ToArray(),
                FileName = request.FileName,
                ContentType = request.ContentType
            };

            _context.Medias.Add(media);
            await _context.SaveChangesAsync(cancellationToken);

            return media.Id;
        }
    }
}