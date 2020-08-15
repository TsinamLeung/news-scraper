# usage

```javascript
// json参數必需
const controller = require('./Controller/Controller_app.js');
controller.fetchNews("人“,"news_apple_daily.js",20,2000);   // Fetch result via specified model name then output csv to Output Folder and returns result; 
controller.fetchAllNews("人",20,200);   // Fetch result via All Model then output csv to Output Folder and returns result; 

```