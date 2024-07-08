using Chat.Data;
namespace Chat.WebAPI.Extensions
{
    public static class InfraExtensions
    {
        public static void AddInfraServices(this IServiceCollection services, IConfiguration configuration, string policyName)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddSignalR();
            services.AddData();
            services.AddJwtConfigs(configuration);

            services.AddCors(options =>
            {
                options.AddPolicy(name: policyName,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200");
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                        builder.AllowCredentials();
                    });
            });
        }
    }
}
