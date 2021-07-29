import fetchJsonp from "fetch-jsonp";

export const apiFetch = (query) => {
  let url = `https://homesearch.now.hpe.com/Suggest/Csom?jsoncallback=__jsonp_callback_1gj2h2er654&querytext=${query}`;
  return fetchJsonp(url, {
    jsonpCallback: "jsoncallback",
    jsonpCallbackFunction: "__jsonp_callback_1gj2h2er654",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
