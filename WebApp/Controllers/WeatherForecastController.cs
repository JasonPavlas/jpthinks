using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly WeatherService _weatherService;
    private readonly TelemetryClient _telemetryClient;

    public WeatherForecastController(WeatherService weatherService, TelemetryClient telemetryClient)
    {
        _weatherService = weatherService;
        _telemetryClient = telemetryClient;
    }

    [HttpGet]
    public async Task<ActionResult<WeatherForecast>> Get()
    {
        try
        {
            _telemetryClient.TrackEvent("WeatherForecastRequested");
            var result = await _weatherService.GetJacksonvilleWeatherAsync();
            _telemetryClient.TrackEvent("WeatherForecastRetrieved", 
                properties: new Dictionary<string, string> 
                { 
                    { "temperature", result.TemperatureF.ToString() },
                    { "summary", result.Summary ?? "No summary" }
                });
            return result;
        }
        catch (HttpRequestException ex)
        {
            _telemetryClient.TrackException(ex);
            return BadRequest($"Error getting weather data: {ex.Message}");
        }
    }
}
