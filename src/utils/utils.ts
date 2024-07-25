export const getAssetUrl = (...assets: string[]) => {
  return `/${assets.join('/')}.jpg`;
};
