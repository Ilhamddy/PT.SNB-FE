module.exports = {
    google: {
      API_KEY: "",
      CLIENT_ID: "",
      SECRET: "",
    },
    facebook: {
      APP_ID: "",
    },
    api: {
      API_URL: process.env.REACT_APP_API_URL,
      IV_LENGTH: Number(process.env.REACT_APP_IV_LENGTH)
    }
};