using NUnit.Framework;
using System.Threading.Tasks;

namespace TwitterClone.Application.IntegrationTests
{
    using static TwitterClone.Application.IntegrationTests.Testing;

    public class TestBase
    {
        [SetUp]
        public async Task TestSetUp()
        {
            await ResetState();
        }
    }
}
