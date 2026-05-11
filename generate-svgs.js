const fs = require('fs');
const path = require('path');

const icons = {
  'carpentry': ['🪚', '#FFEFE5'],
  'construction': ['🧱', '#E5F3FF'],
  'driving': ['🚗', '#E5FFE9'],
  'gardener': ['🪴', '#FAFFE5'],
  'helper': ['🤝', '#F5E5FF'],
  'maid': ['🧹', '#FFE5F5'],
  'plumbing': ['🔧', '#E5FFFD'],
  'tailor': ['🧵', '#FFF0E5'],
  'welder': ['👨‍🏭', '#EBE5FF']
};

const dir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

Object.entries(icons).forEach(([name, [emoji, bg]]) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${bg}" rx="20"/>
  <text x="50" y="65" font-size="50" text-anchor="middle">${emoji}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
});
console.log('SVG images generated successfully.');
