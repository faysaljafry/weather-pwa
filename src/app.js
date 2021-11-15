// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const mongo = require('mongodb');
// var cron = require('node-cron');
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongo from 'mongodb';
import cron from 'node-cron';
import fetch from 'node-fetch';
import path from 'path';
import serveStatic from 'serve-static';

const __dirname = path.resolve();
//hello world testing

const MongoClient = mongo.MongoClient;
const uri = process.env.MONGO_URI;
// const uri =
//   'mongodb+srv://faysaljafry:faisal0341!@vuejs.yelyi.mongodb.net/vueJs?retryWrites=true&w=majority';
var client;

var mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
});

mongoClient.connect((err, db) => {
  if (err != null) {
    console.log(err);
    return;
  }
  client = db;
});
const app = express();

//make app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.post('/addCity', (req, res) => {
  const city_collection = client.db('vueJs').collection('cities');
  var city_info = req.body.city_info;

  city_collection.insertOne({ title: city_info }, function (err, results) {
    if (err) {
      console.log(err);
      res.send('');
      return;
    }
    res.send('City was added successfully');
  });
});
app.post('/addForecast', (req, res) => {
  console.log('In the Post Method');
  const collection = client.db('vueJs').collection('weather');

  var weatherData = req.body.weatherData;

  collection.insertOne({ title: weatherData }, function (err, results) {
    if (err) {
      console.log(err);
      res.send('');
      return;
    }
    res.send('Data was set successfully');
  });
});

app.get('/fetchweatherData', (req, res) => {
  const collection = client.db('vueJs').collection('weather');
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err);
      res.send('');
      return;
    }
    res.send(results);
  });
});

app.get('/getCitiesData', (req, res) => {
  const collection = client.db('vueJs').collection('cities');
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err);
      res.send('');
      return;
    }
    res.send(results);
  });
});

app.get('./updateWeatherdata', (req, res) => {
  const collection = client.db('vueJs').collection('cities');
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err);
      res.send('');
      return;
    }
    res.send(results);
  });
});

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

cron.schedule(' * 2 * * *', async () => {
  console.log('Running Crone Job...');
  let cities = await client.db('vueJs').collection('cities').find().toArray();
  console.log(cities);

  for (city in cities) {
    setTimeout(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=31.52&lon=74.35&appid=db225a9416a485c121752c8f2876d298`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('deleting for lahore');
          let collection = client.db('vueJs').collection('weather');
          try {
            console.log(new Date('2021-11-06T00:00:00').getTime() / 1000);
            //delete records from daily database that are past the date
            collection
              .updateOne(
                { 'title.city': city.title },
                {
                  $pull: {
                    'title.daily': {
                      dt: {
                        $lte: new Date('2021-11-06T00:00:00').getTime() / 1000,
                      },
                    },
                  },
                },
                false,
                true
              )
              .then((res) => console.log(res));
            //console.log(city);
          } catch (e) {
            console.log(e);
          }

          //Update daily databse array with an updated 7 days data starting from current date
          try {
            collection
              .updateOne(
                { 'title.city': 'Basti Dosa' },
                {
                  $push: {
                    'title.daily': result.daily[7],
                  },
                },
                false,
                true
              )
              .then((res) => console.log(res));
          } catch (e) {
            console.log(e);
          }

          try {
            collection
              .updateMany(
                { 'title.city': 'Basti Dosa' },
                {
                  $pull: {
                    'title.hourly': {
                      dt: {
                        $lt: new Date('2021-11-06T00:00:00').getTime() / 1000,
                      },
                    },
                  },
                },
                false,
                true
              )
              .then((res) => console.log(res));
          } catch (e) {
            console.log(e);
          }
        });
    }, 1);
  }
});

app.listen(process.env.PORT || 8083); // client is already running on 8080
console.log(`app is listening on port: 8083`);
//democron();
