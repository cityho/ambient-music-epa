const ServiceError = require("../errors/service-error");
const DeviceApis = require("../smartthings-apis/device-apis");
const ColorMap = require("../utils/color-table");
const MusicDataBuilder = require("../utils/music-data-builder").Builder;
const ESApi = require("../apis/es-api");
const { LIGHT1, LIGHT2 } = require("../utils/device-constants");

const OnSetMocks = require("../mocks/onset-mocks");
const ColorMocks = require("../mocks/color-mocks");
const colorMocks = require("../mocks/color-mocks");

const capability = "colorControl"; //'switchLevel';
const command = "setColor"; //'setLevel';
const component = "main";

const commandItem = {
  component: "main",
  capability: "",
  command: "",
  arguments: [],
};

module.exports = class AmbientMusicService {
  constructor() {
    this.devices = [LIGHT1, LIGHT2];
    this.deviceId = "0b4a112c-feb0-4457-afba-3c859b9f70ad";
    this.accessToken = "b87326ac-2e52-4b27-a41f-04334f4faee9";
    this.deviceApis = new DeviceApis(this.accessToken);
    this.esApi = new ESApi();
    this.isPlaying = false;
    this.timers = [];
    this.availableCounts = 1;
  }
  setInitialState(initColor = ColorMap.PURPLE) {
    let devices = [];
    if (this.availableCounts < 2) devices = [LIGHT1];
    else devices = [...this.devices];

    let initCommands = [
      { component: "main", capability: "switch", command: "on", arguments: [] },
      {
        component: "main",
        capability: "switchLevel",
        command: "setLevel",
        arguments: [82],
      },
      {
        component: "main",
        capability: "colorControl",
        command: "setColor",
        arguments: [initColor],
      },
    ];
    devices.forEach((deviceId) => {
      this.deviceApis.executeCommands(deviceId, initCommands);
    });
  }
  async setLightCounts(counts) {
    this.availableCounts = counts;
    return counts;
  }
  async getOnsets(id) {
    //return MusicData.Builder.getOnsets();
    return await OnSetMocks.onset_detect;
  }

  async getColors(id) {
    //return MusicData.Builder.getColors();
    return await ColorMocks.colors;
  }
  async setDeviceCommands(colors, onsets) {
    let devices = [];
    if (this.availableCounts < 2) devices = [LIGHT1];
    else devices = [...this.devices];

    const colorlen = colors.length;

    for (let i = 0; i < onsets.length; ++i) {
      const s = onsets[i];

      const color = colors[(i + 1) % colorlen];
      let timerId = setTimeout(() => {
        console.log(
          `${s} sec  , command : ${command}, color : ${(i + 1) % colorlen}`
        );
        // this.deviceApis.executeCommand(
        //   this.devices[0],
        //   component,
        //   capability,
        //   command,
        //   [color]
        // );
        devices.forEach((deviceId) => {
          this.deviceApis.executeCommand(
            deviceId,
            component,
            capability,
            command,
            [color]
          );
        });
        if (this.timers) {
          this.timers.shift();
        }
      }, s * 1000);
      this.timers.push(timerId);
    }
  }
  async start(id) {
    //const onsets = MusicDataBuilder.getOnsets();
    //const colors = MusicDataBuilder.getColors();
    //const mood = "joy";
    this.timers.map((timerId) => {
      clearTimeout(timerId);
    });
    this.timers = [];

    const { onsets, mood } = await this.getMusicInfo(id);
    const colors = colorMocks.colors[mood].map((c) => ({
      hue: c.hue,
      saturation: c.saturation,
    }));
    console.log("colors ", colors);

    //const colorlen = colors.length;

    this.setInitialState(colors[0]);

    this.setDeviceCommands(colors, onsets);

    this.isPlaying = true;

    return id;
  }
  async stop() {
    this.isPlaying = false;
    console.log("stop : timers count", this.timers.length);
    this.timers.map((timerId) => {
      clearTimeout(timerId);
    });
    this.timers = [];

    const cmd = {
      component: "main",
      capability: "switch",
      command: "off",
      arguments: [],
    };

    let devices = [];
    if (this.availableCounts < 2) devices = [LIGHT1];
    else devices = [...this.devices];

    devices.forEach((deviceId) => {
      this.deviceApis.executeCommands(deviceId, [cmd]);
    });

    return "stopped";
  }
  async getPlayList(id) {
    const response = await this.esApi.getPlaylist(id);
    return response;
  }
  async getAllPlaylists() {
    const response = await this.esApi.getAllPlaylists();
    let data = response.aggregations.playlist.buckets.map(({ key }) => key);
    const result = Object.assign(
      [],
      data.map((x) => ({
        playlist_id: x[0],
        playlist_name: x[1],
        playlist_img_hrl: x[2],
      }))
    );
    return result;
  }
  async getMusicInfo(id) {
    const response = await this.esApi.getMusicInfo(id);

    console.log(response);
    const result = MusicDataBuilder.build(response[0]);

    return result;
  }
  async getDeviceStatus() {
    const result = await this.deviceApis.getComponentStatus(
      this.deviceId,
      this.component
    );
    console.log(result);
  }
};
