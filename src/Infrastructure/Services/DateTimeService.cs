using TwitterClone.Application.Common.Interfaces;
using System;

namespace TwitterClone.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
