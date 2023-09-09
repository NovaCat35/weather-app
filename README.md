# weather-app
Whether (ha get it?) you like the forecast or not, there's no going forward until you prepare for the downpour...so, get ready your umbrellas or sunblock and check out this real time weather tracker!

live link: https://novacat35.github.io/weather-app/ 🌤️

<img width="915" alt="Screenshot 2023-09-09 at 12 40 05 AM" src="https://github.com/NovaCat35/weather-app/assets/54908064/e9285ebc-326c-46ec-b437-b9c21b359ce8">

## Challenges
While fetching API requests, I found myself in a bind with some function still executing even though promises are still being waited on. This cause issues with input blank and errors that would cause my reset functions and tracking variables to record the error issues instead of immediately exiting out like I planned. Eventually, I decided to account for this my placement of certain variables to prevent execution from reaching the code and specifying a better catch block to handle the errors. I learn more about the concept of promises and fetching information through these challenges.

## Features
- Display daily and weekly forecast
- Display data in metric or imperial units
- Changing backdrop depending on forecast
- Additional infos about current weather

## Webpack installation:
> To setup webpack for proper installation, enter the following installments to terminal/command prompt

```
1) npm init -y
2) npm install --save-dev webpack
3) npm install dotenv-webpack --save-dev
4) npm install --save-dev css-loader
5) npm install sass-loader node-sass --save-dev
6) npm install date-fns
```

### Sources
background images: https://www.wallpaperflare.com/search?wallpaper=firewatch
<br>
animated icons: https://icons8.com/icons/set/rain
https://www.svgrepo.com/
