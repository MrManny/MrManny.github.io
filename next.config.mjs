/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  // next-image-export-optimizer reuses next/image's custom-loader API to build
  // responsive WebP variants at export time; the CLI step runs after next build
  // (see package.json).
  transpilePackages: ['next-image-export-optimizer'],
  images: {
    // A static export has no image optimization server, so next/image takes its
    // srcset URLs from the export optimizer's loader instead of the default one.
    loader: 'custom',
    // The srcset ladder: one WebP variant per width is generated per image at
    // build time. Goes up to 1920w for high-DPI tablet/desktop screens
    // (~710 CSS px art window at DPR 2).
    deviceSizes: [640, 828, 1080, 1280, 1536, 1920],
    imageSizes: [256, 384],
  },
  env: {
    // Where the WebP masters live (generated from assets/img/ by
    // scripts/prepare-art.mjs). Must be a subfolder of public/.
    nextImageExportOptimizer_imageFolderPath: 'public/img',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '80',
    // The live site only ever serves WebP.
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    // Tiny blurred preview images while the real art loads.
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
};

export default nextConfig;
