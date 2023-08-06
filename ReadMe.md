# Introduction
We all always want to access the properties for our api response,Imagine Creating Types for API, You will usually head over to tool or create on your self if the API list is few, 😌 Imagine the List is 500 Now ? How Many hours are your ready to spend, to Speed this up, Presenting POSTMAN-API-TYPES Generator ⚙️ which will automate this for you in just few seconds.

> Contribution's are Appericiated, This is Open Source - lets Build it Awesome 🥳

# Features
- Supports PostMan Collection 
- Supports Exported PostMan Collection JSON


# Installation
- git clone https://github.com/mrniamster/postman-collection-ts
-  npm install 


# Usage

## Local Generation

- Export the Postman collaction JSON 
- Paste the content inside data.json
- Run ``` node index.js ```

## PostMan Collecion Generation

- Right Click your Collection on Postman
- Click on Share
- Select "Via Api"
- Copy the Collection Link , Format should be like this (https://api.postman.com/collections/14847620-56888139-d2e7-46e0-8b2a-7e77ce040607?access_key=`<token>`)
- Run ``` node index.js -c  https://api.postman.com/collections/14847620-56888139-d2e7-46e0-8b2a-7e77ce040607?access_key=<token>```

> The Types  will be generated inside Types directory



# RoadMap

- [ ] GENERAL - Convert js to TS
- [x] POSTMAN - Fetch JSON from Collection POSTMAN URL
- [ ] GENERAL - Create Custom CMD for Postman / Normal JSON 