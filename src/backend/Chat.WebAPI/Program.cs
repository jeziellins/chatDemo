using Chat.WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

var policyName = "allAllow";
builder.Services.AddChatServices();
builder.Services.AddInfraServices(builder.Configuration, policyName);

var app = builder.Build();
app.UseCors(policyName);
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMinimalApis();
app.Run();