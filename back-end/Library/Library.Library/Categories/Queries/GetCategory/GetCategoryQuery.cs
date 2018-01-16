﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.Data.Entities.Library;
using Library.Data.Services;
using Library.Library.Categories.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Library.Library.Categories.Queries.GetCategory
{
    public class GetCategoryQuery : IGetCategoryQuery
    {
        private readonly IRepository<Category> _categoryRepository;

        public GetCategoryQuery(IRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryViewModel>> ExecuteAsync()
        {
            var result = await _categoryRepository.TableNoTracking.Where(x => x.Enabled.Value)
                .Select(x => new CategoryViewModel
                {
                    Id = x.Id,
                    CategoryName = x.CategoryName,
                    Type = x.Type
                }).ToListAsync();

            return result;
        }
    }
}
