# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# Копируем файл проекта и восстанавливаем зависимости
COPY *.csproj ./
RUN dotnet restore
# Копируем оставшиеся файлы и публикуем проект
COPY . .
RUN dotnet publish -c Release -o /app

# Этап выполнения
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
# Контейнер будет слушать на порту 80
EXPOSE 80
ENTRYPOINT ["dotnet", "TodoWepApi.dll"]