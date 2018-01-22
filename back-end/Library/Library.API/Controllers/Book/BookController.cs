﻿using Library.Library.Books.Queries.GetBookDetail;
using Library.Library.Books.Queries.GetBookPhoto;
using Library.Library.Books.Queries.GetBookSection;
using Library.Library.Books.Queries.GetListNewBook;
using Library.Library.Favorites.Commands.UpdateBookFavorite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Library.API.Controllers.Book
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IGetListBookNewQuery _getListBookNewQuery;
        private readonly IGetBookDetailQuery _getBookDetailQuery;
        private readonly IGetBookPhotoQuery _getBookPhotoQuery;
        private readonly IUpdateBookFavoriteCommand _updateBookFavoriteCommand;
        private readonly IGetBookSectionQuery _getBookSectionQuery;

        public BookController(IGetListBookNewQuery getListBookNewQuery,
            IGetBookDetailQuery getBookDetailQuery,
            IGetBookPhotoQuery getBookPhotoQuery,
            IUpdateBookFavoriteCommand updateBookFavoriteCommand,
            IGetBookSectionQuery getBookSectionQuery)
        {
            _getListBookNewQuery = getListBookNewQuery;
            _getBookDetailQuery = getBookDetailQuery;
            _getBookPhotoQuery = getBookPhotoQuery;
            _updateBookFavoriteCommand = updateBookFavoriteCommand;
            _getBookSectionQuery = getBookSectionQuery;
        }

        [HttpGet]
        [Route("ReturnListNewBook")]
        [AllowAnonymous]
        public async Task<IActionResult> ReturnListNewBookAsync()
        {
            var result = await _getListBookNewQuery.ExecuteAsync();
            return new ObjectResult(result);
        }

        [HttpGet]
        [Route("ReturnBookDetail/{bookCode=}")]
        [AllowAnonymous]
        public async Task<IActionResult> ReturnBookDetailAsync(string bookCode)
        {
            var result = await _getBookDetailQuery.ExecuteAsync(bookCode);
            return new ObjectResult(result);
        }

        [HttpGet]
        [Route("Photo/{bookCode=}")]
        [AllowAnonymous]
        public async Task<IActionResult> PhotoAsync(string bookCode)
        {
            var result = await _getBookPhotoQuery.ExecuteAsync(bookCode);
            return new ObjectResult(result);
        }

        [HttpPost]
        [Route("UserFavoriteBook")]
        public async Task<IActionResult> UserFavoriteBookAsync([FromBody] int bookId)
        {
            var result = await _updateBookFavoriteCommand.ExecuteAsync(bookId);
            return new ObjectResult(result);
        }

        [HttpGet]
        [Route("ReturnTopBookInSection/{take:int=10}")]
        [AllowAnonymous]
        public async Task<IActionResult> ReturnTopBookInSectionAsync(int take, string sectionType)
        {
            var result = await _getBookSectionQuery.ExecuteAsync(sectionType, take);
            return new ObjectResult(result);
        }
    }
}