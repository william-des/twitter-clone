using FluentValidation;

namespace TwitterClone.Application.Posts.Commands
{
    public class CreatePostCommandValidator : AbstractValidator<CreatePostCommand>
    {
        public CreatePostCommandValidator()
        {
            RuleFor(p => p.Content).NotEmpty().MaximumLength(280);
        }
    }
}