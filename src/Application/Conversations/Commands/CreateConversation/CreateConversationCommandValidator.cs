using FluentValidation;

namespace TwitterClone.Application.Conversations.Commands.CreateConversation
{
    public class CreateConversationCommandValidator : AbstractValidator<CreateConversationCommand>
    {
        public CreateConversationCommandValidator()
        {
            RuleFor(c => c.Members).NotEmpty();
        }
    }
}