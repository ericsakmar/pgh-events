const fetch = require("node-fetch");
const AbortController = require("abort-controller");

const getPage = async (url) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(url, {
    signal: controller.signal,
    headers: {
      "User-Agent": "node-fetch",
    },
  });

  clearTimeout(id);
  return res;
};

exports.fetchPage = async (url) => {
  let res;

  try {
    res = await getPage(url);
  } catch (exception) {
    const error = {
      exception,
      url,
    };

    throw error;
  }

  const body = await res.text();

  if (res.ok) {
    return body;
  }

  const error = {
    code: res.status,
    url,
    body,
  };

  throw error;
};
