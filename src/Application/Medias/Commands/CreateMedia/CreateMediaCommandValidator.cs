using FluentValidation;

namespace TwitterClone.Application.Medias.Commands.CreateMedia
{
    public class CreateMediaCommandValidator : AbstractValidator<CreateMediaCommand>
    {
        private const long MAX_BYTES = 1000*1000L;

        public CreateMediaCommandValidator()
        {
            RuleFor(c => c.ContentType).Matches(@"^image\/(?:png|jpeg)$").WithMessage("Invalid type. File must be an image");
            RuleFor(c => c.Length).GreaterThan(0).LessThanOrEqualTo(MAX_BYTES);
        }
    }
}