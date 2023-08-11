const TuulsIA = require('./modules/Api')

const {app} = require('electron')
const path = require('path')

if("dev" == 'dev') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../../node_modules', '.bin', 'electron')
    });
}

app.on('ready', e => {
    const MainJs = require(TuulsIA.Paths.mainJs);
    new MainJs();
});

/*const { Configuration, OpenAIApi } = require("openai");

async function loadImage() {
  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: "un carro chevrolet citation",
    n: 1,
    size: "1024x1024",
  });
  
  const image_url = response.data.data[0].url;
  console.log(image_url);
}

loadImage().catch(error => {
  console.error(error);
});*/