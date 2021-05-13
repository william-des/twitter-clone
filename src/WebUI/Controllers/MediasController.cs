using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Medias.Commands.CreateMedia;
using TwitterClone.Application.Medias.Queries.GetMedia;

namespace TwitterClone.WebUI.Controllers
{
    public class MediasController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) {
            var media = await Mediator.Send(new GetMediaQuery { Id = id });

            return File(media.Content, media.ContentType);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(IFormFile file) 
        {
            var command = new CreateMediaCommand
            {
                ContentType = file.ContentType,
                FileName = file.FileName,
                Length = file.Length,
                OpenReadStream = file.OpenReadStream
            };

            return await Mediator.Send(command);
        }
    }
}