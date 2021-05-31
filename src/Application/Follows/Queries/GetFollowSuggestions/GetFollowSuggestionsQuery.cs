using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Follows.Queries.GetFollowSuggestions
{
    public class GetFollowSuggestionsQuery : IRequest<IEnumerable<SuggestionUserDto>>
    {
        public int? Count { get; set; }
    }
}