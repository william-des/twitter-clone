using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
    }
}