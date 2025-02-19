interface Metadata {
  title: string;
  description: string;
}

interface QueryParams {
  url: string;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
