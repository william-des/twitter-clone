using System;

namespace TwitterClone.Domain.Entities
{
    public class Media
    {
        public Guid Id { get; set; }
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
    }
}