using TwitterClone.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;

namespace TwitterClone.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
    }
}
