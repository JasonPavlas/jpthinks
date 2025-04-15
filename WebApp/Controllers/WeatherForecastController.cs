using Microsoft.AspNetCore.Mvc;
using WebApp.Services;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly WeatherService _weatherService;

    public WeatherForecastController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet]
    public async Task<ActionResult<WeatherForecast>> Get()
    {
        try
        {
            return await _weatherService.GetJacksonvilleWeatherAsync();
        }
        catch (HttpRequestException ex)
        {
            return BadRequest($"Error getting weather data: {ex.Message}");
        }
    }
}
