using FluentValidation;

namespace TwitterClone.Application.Users.Queries.UserSearch
{
    public class UserSearchQueryValidator : AbstractValidator<UserSearchQuery>
    {
        public UserSearchQueryValidator()
        {
            RuleFor(q => q.Search)
                .NotEmpty().WithMessage("Search can't be empty.")
                .MaximumLength(60).WithMessage("Search must not exceed 60 characters.");
        }
    }
}