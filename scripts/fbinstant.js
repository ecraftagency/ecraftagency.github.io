document.writeln("<script type='text/javascript' src='https://connect.facebook.net/en_US/fbinstant.7.1.js'></script>");
document.writeln("<script type='text/javascript' src='scripts/ads.js'></script>");
document.writeln("<script type='text/javascript' src='scripts/leaderboard.js'></script>");

  //social
  function GetDataContext()
  {
      var data = FBInstant.getEntryPointData();
      return data;
  }

  function ShareAsync(base64Picture)
  {
    var namePlayer = FBInstant.player.getName();
    var fbid = FBInstant.player.getID();
    FBInstant.shareAsync({
      intent: 'SHARE',
      image: base64Picture,
      text: namePlayer+' đã khoe thành tích!',
      data: "abc",
    }).then(function() {
      // continue with the game.
    });
  }
  function InviteAsync()
  {
    FBInstant.context
      .chooseAsync()
      .then(function() {
        console.log(FBInstant.context.getID());
        // 1234567890
      });
  }
  function setPlayerData(key, data) {
    var data_object = {};
    data_object[key] = data;

    FBInstant.player.setDataAsync(data_object)
        .then(function() {})
        .catch(function(error) {});
  }

  function getPlayerData(key, callback) {
    FBInstant.player.getDataAsync([key])
        .then(function(data) {
            if (data !== undefined && data[key] !== undefined) {
                callback(data[key]);
            }
            else {
                callback();
            }
        })
        .catch(function(error) {
              callback();
        });
  }