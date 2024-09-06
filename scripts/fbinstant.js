document.writeln("<script type='text/javascript' src='https://connect.facebook.net/en_US/fbinstant.6.3.js'></script>");

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