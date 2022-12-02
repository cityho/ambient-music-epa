const ResponseBuilder = require("./response-builder");
const ServiceError = require("../errors/service-error");

const express = require("express");

const DeviceService = require("../services/device-service");
const AmbientMusicService = require("../services/ambient-music-service");
const MusicData = require("../services/music-data-builder");

const router = express.Router();

router
  .get("/", (req, res) => {
    console.log("routing ... ");
    res.send("Hello");
  })
  .get("/musicInfo/:id", async (req, res) => {
    if (!req.params.id) req.params.id = "5iis9J2sptrUy0VIpFVIg1";
    console.log(req.params);

    const id = req.params.id;
    const amService = new AmbientMusicService();
    const result = await amService.getMusicInfo(id);

    const musicData = MusicData.Builder.build(result).responseMessage();

    try {
      res.send(new ResponseBuilder().message(musicData).build());
    } catch (error) {
      if (error instanceof ServiceError) {
        return new ResponseBuilder(error.code).message(error.data).build();
      }
      // console.error('Internal Server Error : ' + JSON.stringify(error));
      return new ResponseBuilder(500).message("Internal Server Error").build();
    }
  })
  .get("/playlist/:id", async (req, res) => {
    if (!req.params.id) req.params.id = "37i9dQZF1DZ06evO1A8iR2";

    console.log("get playlist id ", req.params.id);
    const amService = new AmbientMusicService();
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
  .put("/start", async (req, res) => {
    const amService = new AmbientMusicService();

    try {
      amService.start();
      res.send("success");
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
    return await deviceService.getAirDevices();
  });

module.exports = router;
