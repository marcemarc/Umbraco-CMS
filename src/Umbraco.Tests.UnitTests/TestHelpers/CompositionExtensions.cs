﻿// Copyright (c) Umbraco.
// See LICENSE for more details.

using System;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Core.DependencyInjection;

namespace Umbraco.Tests.UnitTests.TestHelpers
{
    public static class CompositionExtensions
    {
        [Obsolete("This extension method exists only to ease migration, please refactor")]
        public static IServiceProvider CreateServiceProvider(this IUmbracoBuilder builder)
        {
            builder.Build();
            return builder.Services.BuildServiceProvider();
        }
    }
}
