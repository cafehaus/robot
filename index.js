const fs = require('node:fs')
const robot = require('robotjs')
const Jimp = require('jimp') // JavaScript 编写的图像处理库

// 示例
// 鼠标 Mouse：鼠标光标从屏幕中划过
robot.setMouseDelay(2)
const twoPI = Math.PI * 2.0
const screenSize = robot.getScreenSize()
const height = (screenSize.height / 2) - 10
const width = screenSize.width
for (let x = 0; x < width; x++) {
  y = height * Math.sin((twoPI * x) / width) + height
  robot.moveMouse(x, y)
}

// 键盘 Keyboard
robot.keyTap('command') // 点一下 command 键

// 屏幕 Screen：获取屏幕颜色和鼠标光标坐标
const mouse = robot.getMousePos()
const hex = robot.getPixelColor(mouse.x, mouse.y)
console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y)

// 截屏 Bitmap
// const img = robot.screen.capture(0, 0, 1920, 1080)
// console.log(img)
// const hex = img.colorAt(50, 50) // 坐标点上的十六进制色值
// console.log(hex)
// const buffer = img.image // 截图 Buffer 数据：The raw image (buffer)

// 直接写入截图数据，图片无效，因为 Buffer 里存的是每像素上的颜色数据，还是原始图像数据
// https://qa.1r1g.com/sf/ask/3071710001/
// https://qa.1r1g.com/sf/ask/2935880601/
// let encode = require('image-encode')
// const encodeImg = encode(buffer)
// console.log(encodeImg)
// buffer && fs.writeFileSync('img.png', Buffer.from(encode(buffer), 'png'))

// 直接这样写出来颜色不对
// new Jimp({data: buffer, width: 1920, height: 1080}, (err, image) => {
//     if (err) return console.log(err)
//     image.write(path.resolve(__dirname, './img.png'))
// })

function captureImage({ x, y, w, h }) {
  const pic = robot.screen.capture(x, y, w, h)
  const width = pic.byteWidth / pic.bytesPerPixel // pic.width is sometimes wrong!
  const height = pic.height
  const image = new Jimp(width, height)
  // 修复颜色
  let red, green, blue
  pic.image.forEach((byte, i) => {
    switch (i % 4) {
      case 0: return blue = byte
      case 1: return green = byte
      case 2: return red = byte
      case 3:
        image.bitmap.data[i - 3] = red
        image.bitmap.data[i - 2] = green
        image.bitmap.data[i - 1] = blue
        image.bitmap.data[i] = 255
    }
  })
  return image
}

captureImage({ x: 0, y: 0, w: 1920, h: 1080 }).write('./img.png')
