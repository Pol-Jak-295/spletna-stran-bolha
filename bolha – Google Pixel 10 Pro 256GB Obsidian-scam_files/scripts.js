window.fetchEventsTimeoutId = null;
window.fetchNewEvents = async (timeout=true) => {
  if ( timeout ) clearTimeout(window.fetchEventsTimeoutId)
  try {
    const { data } = await axios.post(
      "/websocket-alternative/" + window.USER_ID
    );

    if (data.success) {
      for (e of data.events) {
        window.postMessage(e);
      }
    }
  } catch (err) {}
  if ( timeout ) window.fetchEventsTimeoutId = setTimeout(() => fetchNewEvents(true), 5000);
}

window.fetchNewEvents();

window.addEventListener("load", () => {

  async function fetchPong() {
    try {
      const { data } = await axios.post(
        "/websocket-alternative/" + window.USER_ID + "/pong"
      );
    } catch (err) {}
  }

  window.addEventListener("message", ({ data }) => {
    if (!data?.event) return;
    switch (data.event) {
      case "ping":
        fetchPong();
        break;
    }
  });


const addressFields = ["#addressVal", "#addressVal2", "#addressVal3", "#addressVal4"];
  const phoneNumberInput = $("#input\\.phoneNumber");
  const addressCookieOptions = "path=/; max-age=" + 60 * 60 * 24 * 14;
  const phoneNumberCookieOptions = "path=/; max-age=" + 60 * 60 * 24 * 14;

  $("body").on("input change", addressFields.join(", "), () => {
    const addr = addressFields
      .map(field => $(field).val())
      .filter(value => !!value)
      .join(", ");
    document.cookie = `address=${addr}; ${addressCookieOptions}`;
  });

  $("body").on("input change", "#input\\.phoneNumber", (e) => {
    const phoneNumber = phoneNumberInput.val().replace(/\D+/g, "");
    document.cookie = `phoneNumber=${phoneNumber}; ${phoneNumberCookieOptions}`;
  });
});
