import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve(process.cwd(), "public");
const source = path.join(publicDir, "logo.jpg");

const targets = [
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "android-chrome-192x192.png", size: 192 },
  { file: "android-chrome-512x512.png", size: 512 },
];

async function generate() {
  try {
    const buf = await readFile(source);

    await Promise.all(
      targets.map(async ({ file, size }) => {
        const out = path.join(publicDir, file);
        await sharp(buf)
          .resize(size, size, { fit: "cover" })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toFile(out);
        console.log("Generated", file);
      })
    );

    const manifest = {
      name: "Lotus",
      short_name: "Lotus",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
    };

    await writeFile(
      path.join(publicDir, "site.webmanifest"),
      JSON.stringify(manifest, null, 2),
      "utf8"
    );
    console.log("Generated site.webmanifest");
  } catch (err) {
    console.error("Favicon generation failed:", err);
    process.exit(1);
  }
}

generate();
