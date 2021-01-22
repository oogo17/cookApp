using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using cookApp_api.Data;
using cookApp_api.Helpers;
using cookApp_api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.OpenApi.Models;

namespace cookApp_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

         public void ConfigureProductionServices(IServiceCollection services) {
            services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));

            ConfigureServices(services);
        }

        public void ConfigureDevelopmentServices(IServiceCollection services) {
            //---localhost
                // "Server=localhost; Database=cookapp; Uid=appuser; Pwd=password"
            //---prod
                //"DefaultConnection": "Server=31.170.166.124;Database=u122807215_cookapp;Uid=u122807215_userapp;Pwd=Pa$$word17;"
            //--sqllite
            //  "DefaultConnection": "Data Source=userapp.db"
            //services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            
            services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
            ConfigureServices(services);
        }

       
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddControllers().AddNewtonsoftJson( opt => {
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddCors();
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddAutoMapper(typeof(CookRepository).Assembly);
            services.AddScoped<IAuthRepository,AuthRepository>();
            services.AddScoped<ICookRepository, CookRepository>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddScoped<UpdateRecipeNotification>();
             var emailConfig = Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
             services.AddSingleton(emailConfig);
             services.AddSwaggerGen(c => {  
                c.SwaggerDoc("v1", new OpenApiInfo {  
                Version = "v1",  
                Title = "CookApp API",  
            Description = "A simple example for swagger api information",  
            TermsOfService = new Uri("https://example.com/terms"),  
            Contact = new OpenApiContact {  
                Name = "Omar",  
                    Email = "oogomx@gmail.com",  
                    Url = new Uri("https://example.com"),  
            },  
            License = new OpenApiLicense {  
                Name = "Use under OpenApiLicense",  
                    Url = new Uri("https://example.com/license"),  
            }  
            });  
});   
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            { 
                app.UseDeveloperExceptionPage();
              
            }
            else {
                // comment custom exception handler to get more details on errors in prod
                app.UseExceptionHandler(builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null) {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });


                app.UseHsts();
            }
            // undo this comment to get more details on errors in prod
            //app.UseDeveloperExceptionPage();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(x =>x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            
            
            app.UseDefaultFiles();
            app.UseStaticFiles();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("index", "Fallback");
            });
            app.UseSwagger();
            app.UseSwaggerUI(c =>  
            {  
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CookApp v1");  
            });
     
        }
    }
}
