const ResponseBuilder = require("./response-builder");
const ServiceError = require("../errors/service-error");

const express = require("express");
//const cors = require("cors");

const DeviceService = require("../services/device-service");
const AmbientMusicService = require("../services/ambient-music-service");
const MusicData = require("../utils/music-data-builder");
const Player = require("../services/am-player");

const { SPOTIPY_CLIENT_ID } = require("../server-config/constants");
const router = express.Router();
//router.options("*", cors());

const amService = new AmbientMusicService();

router
  .get("/", (req, res) => {
    console.log("routing ... ");
    res.send("Hello");
  })
  .get("/musicInfo/:id", async (req, res) => {
    //if (!req.params.id) req.params.id = "5iis9J2sptrUy0VIpFVIg1";
    console.log(req.params);

    const id = req.params.id;
    //const amService = new AmbientMusicService();
    const result = await amService.getMusicInfo(id);
    //const musicData = MusicData.Builder.build(result).responseMessage();

    try {
      res.send(new ResponseBuilder().message(result).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        return new ResponseBuilder(error.code).message(error.data).build();
      }
      // console.error('Internal Server Error : ' + JSON.stringify(error));
      return new ResponseBuilder(500).message("Internal Server Error").build();
    }
  })
  .get("/playlist/:id", async (req, res) => {
    //if (!req.params.id) req.params.id = "37i9dQZF1DZ06evO1A8iR2";

    console.log("get playlist id ", req.params.id);
    //const amService = new AmbientMusicService();
    const result = await amService.getPlayList(req.params.id);

    try {
      res.send(new ResponseBuilder().message(result).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        return new ResponseBuilder(error.code).message(error.data).build();
      }
      // console.error('Internal Server Error : ' + JSON.stringify(error));
      return new ResponseBuilder(500).message("Internal Server Error").build();
    }
  })
  .get("/playlistAll", async (req, res) => {
    //const amService = new AmbientMusicService();
    const result = await amService.getAllPlaylists();

    try {
      // res.header({
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      //   "Access-Control-Allow-Headers": "Content-Type",
      // });

      res.send(new ResponseBuilder().message(result).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        return new ResponseBuilder(error.code).message(error.data).build();
      }
      return new ResponseBuilder(500).message("Internal Server Error").build();
    }
  })
  .put("/play/:id", async (req, res) => {
    console.log(`play with song id : ${req.params.id}`);
    //const amService = new AmbientMusicService();
    try {
      const response = await amService.start(req.params.id);
      res.send(new ResponseBuilder().message(response).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        //throw error; // foward
        return new ResponseBuilder(error.code).message(error.data).build();
      } else {
        //throw new ServiceError(400, "Bad Request");
        return new ResponseBuilder(400).message("Bad Request").build();
      }
    }

    // TODO compose response
  })
  .put("/pause/:id", async (req, res) => {
    console.log(`pause playing`);
    //const amService = new AmbientMusicService();
    try {
      const response = await amService.stop();
      res.send(new ResponseBuilder().message(response).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error; // foward
      } else {
        throw new ServiceError(400, "Bad Request");
      }
    }

    // TODO compose response
  })
  .put("/lights/:counts", async (req, res) => {
    console.log(`light counts : ${req.params.counts}`);
    //const amService = new AmbientMusicService();
    try {
      const response = await amService.setLightCounts(req.params.counts);
      res.send(new ResponseBuilder().message(response).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error; // foward
      } else {
        throw new ServiceError(400, "Bad Request");
      }
    }

    // TODO compose response
  })

  .get("/devices", async (req, res) => {
    // get all supported devices
    const deviceService = new DeviceService();
    return await deviceService.getLightDevices();
  });

module.exports = router;
