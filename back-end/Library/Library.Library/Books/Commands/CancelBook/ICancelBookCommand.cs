﻿using HRM.CrossCutting.Command;
using System.Threading.Tasks;

namespace Library.Library.Books.Commands.CancelBook
{
    public interface ICancelBookCommand
    {
        Task<CommandResult> ExecuteAsync(int userId, string bookCode, int requestId);
    }
}
