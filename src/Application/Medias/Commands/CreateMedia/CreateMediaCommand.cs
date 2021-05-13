using System;
using System.IO;
using MediatR;

namespace TwitterClone.Application.Medias.Commands.CreateMedia
{
    public class CreateMediaCommand : IRequest<Guid>
    {
        public string FileName { get; set; }
        public long Length { get; set; }
        public string ContentType { get; set; }
        public Func<Stream> OpenReadStream { get; set; }
    }
}