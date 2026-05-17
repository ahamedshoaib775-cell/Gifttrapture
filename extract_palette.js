const { execSync } = require('child_process');
try { require('sharp'); } catch(e) {
  console.log('Installing sharp for colour extraction…');
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
}
const sharp = require('sharp');
const fs = require('fs');

const palette = {};
async function main() {
  const { data, info } = await sharp('giftlogo.PNG')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  console.log('Image size:', info.width, 'x', info.height);
  console.log('Channels:', info.channels);
}
main().catch(e => console.error(e.message));
