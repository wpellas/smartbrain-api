const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
    user_app_id: {
      user_id: 'wpellas',
      app_id: 'my-first-application'
    },
    inputs: [
      {
        data: {
          image: {
            url: req.body.input
          }
        }
      }
    ]
    });
    
    const requestOptions = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key 0fcde0454b5442ff8779ee309bedf2b2'
      },
      body: raw
    };
    fetch(
      'https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs',
      requestOptions
    )
    .then(response => response.json())
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to workn with API'))
}

module.exports = {
    handleApiCall: handleApiCall
}