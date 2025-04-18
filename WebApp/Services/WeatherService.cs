using System.Net.Http;
using System.Text.Json;
using System.Net.Http.Json;
using WebApp;
using Microsoft.ApplicationInsights;
using System.Diagnostics;

namespace WebApp.Services;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly TelemetryClient _telemetryClient;
    private const string JAX_OFFICE = "JAX";
    private const string JAX_GRID_X = "51";
    private const string JAX_GRID_Y = "62";

    public WeatherService(HttpClient httpClient, TelemetryClient telemetryClient)
    {
        _httpClient = httpClient;
        _telemetryClient = telemetryClient;
        _httpClient.BaseAddress = new Uri("https://api.weather.gov/");
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "JPThinks Weather App");
    }

    public async Task<WeatherForecast> GetJacksonvilleWeatherAsync()
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var endpoint = $"gridpoints/{JAX_OFFICE}/{JAX_GRID_X},{JAX_GRID_Y}/forecast";
            var forecast = await _httpClient.GetFromJsonAsync<NWSResponse>(endpoint)
                ?? throw new HttpRequestException("Failed to get forecast data");

            var currentPeriod = forecast.Properties?.Periods?.FirstOrDefault()
                ?? throw new HttpRequestException("No forecast periods available");

            var result = new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now),
                TemperatureF = currentPeriod.Temperature,
                TemperatureC = (int)((currentPeriod.Temperature - 32) * 5 / 9),
                Summary = currentPeriod.ShortForecast ?? "No forecast available",
                DetailedForecast = currentPeriod.DetailedForecast ?? "No detailed forecast available"
            };

            _telemetryClient.TrackMetric("WeatherAPI_ResponseTime", stopwatch.ElapsedMilliseconds);
            return result;
        }
        catch (Exception ex)
        {
            _telemetryClient.TrackException(ex);
            throw;
        }
    }
}

public class NWSResponse
{
    public NWSProperties? Properties { get; set; }
}

public class NWSProperties
{
    public NWSPeriod[]? Periods { get; set; }
}

public class NWSPeriod
{
    public int Temperature { get; set; }
    public string? ShortForecast { get; set; }
    public string? DetailedForecast { get; set; }
}